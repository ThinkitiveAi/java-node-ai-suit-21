import React, { useState } from 'react';
import './App.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialization: '',
  license: '',
  experience: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  password: '',
  confirmPassword: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialization: '',
  license: '',
  experience: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  password: '',
  confirmPassword: '',
  form: '',
};

const specializations = [
  '',
  'General Practitioner',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Psychiatrist',
  'Surgeon',
  'Other',
];

function validateField(name, value, form) {
  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!value) return 'Required';
      if (value.length < 2) return 'Must be at least 2 characters';
      if (value.length > 50) return 'Must be at most 50 characters';
      break;
    case 'email': {
      if (!value) return 'Required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Invalid email format';
      break;
    }
    case 'phone': {
      if (!value) return 'Required';
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(value)) return 'Invalid phone number';
      break;
    }
    case 'specialization':
      if (!value) return 'Required';
      if (value.length < 3) return 'Must be at least 3 characters';
      if (value.length > 100) return 'Must be at most 100 characters';
      break;
    case 'license': {
      if (!value) return 'Required';
      const licenseRegex = /^[a-zA-Z0-9]{3,}$/;
      if (!licenseRegex.test(value)) return 'Invalid license number';
      break;
    }
    case 'experience': {
      if (value === '' || value === null) return 'Required';
      const num = Number(value);
      if (isNaN(num) || num < 0 || num > 50) return 'Must be between 0 and 50';
      break;
    }
    case 'street':
      if (!value) return 'Required';
      if (value.length > 200) return 'Max 200 characters';
      break;
    case 'city':
      if (!value) return 'Required';
      if (value.length > 100) return 'Max 100 characters';
      break;
    case 'state':
      if (!value) return 'Required';
      if (value.length > 50) return 'Max 50 characters';
      break;
    case 'zip': {
      if (!value) return 'Required';
      const zipRegex = /^[a-zA-Z0-9\-\s]{3,12}$/;
      if (!zipRegex.test(value)) return 'Invalid postal code';
      break;
    }
    case 'password': {
      if (!value) return 'Required';
      if (value.length < 8) return 'At least 8 characters';
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Must include a special character';
      break;
    }
    case 'confirmPassword':
      if (!value) return 'Required';
      if (value !== form.password) return 'Passwords do not match';
      break;
    default:
      break;
  }
  return '';
}

export default function ProviderRegistration(props) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [retry, setRetry] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '', form: '' }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setErrors(err => ({ ...err, [name]: validateField(name, value, { ...form, [name]: value }) }));
  }

  function validateAll() {
    const newErrors = {};
    for (const key in form) {
      newErrors[key] = validateField(key, form[key], form);
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateAll();
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setErrors(err => ({ ...err, ...newErrors, form: 'Please fix the errors below.' }));
      return;
    }
    setLoading(true);
    setErrors(initialErrors);
    setRetry(false);
    // Simulate API call and error scenarios
    setTimeout(() => {
      setLoading(false);
      // Demo: fake duplicate email/license
      if (form.email === 'duplicate@provider.com') {
        setErrors(err => ({ ...err, email: 'Email already registered', form: 'Duplicate email error.' }));
      } else if (form.license === 'DUPLICATE123') {
        setErrors(err => ({ ...err, license: 'License already registered', form: 'Duplicate license error.' }));
      } else if (form.email === 'network@provider.com') {
        setErrors(err => ({ ...err, form: 'Network error. Please try again.' }));
        setRetry(true);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.href = '/login';
        }, 1800);
      }
    }, 1800);
  }

  return (
    <div className="provider-registration-container">
      <form className="provider-login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="provider-login-title">Provider Registration</h2>
        {errors.form && <div className="provider-login-error general">{errors.form}</div>}
        <section className="provider-login-section">
          <h3 className="provider-login-section-title">Personal Information</h3>
          <div className="provider-login-field">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" minLength={2} maxLength={50} value={form.firstName} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.firstName ? 'error' : ''} />
            {errors.firstName && <span className="provider-login-error">{errors.firstName}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" minLength={2} maxLength={50} value={form.lastName} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.lastName ? 'error' : ''} />
            {errors.lastName && <span className="provider-login-error">{errors.lastName}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.email ? 'error' : ''} autoComplete="username" />
            {errors.email && <span className="provider-login-error">{errors.email}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.phone ? 'error' : ''} />
            {errors.phone && <span className="provider-login-error">{errors.phone}</span>}
          </div>
        </section>
        <section className="provider-login-section">
          <h3 className="provider-login-section-title">Professional Information</h3>
          <div className="provider-login-field">
            <label htmlFor="specialization">Specialization</label>
            <select id="specialization" name="specialization" value={form.specialization} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.specialization ? 'error' : ''}>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec ? spec : 'Select specialization'}</option>
              ))}
            </select>
            {errors.specialization && <span className="provider-login-error">{errors.specialization}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="license">Medical License Number</label>
            <input id="license" name="license" type="text" value={form.license} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.license ? 'error' : ''} />
            {errors.license && <span className="provider-login-error">{errors.license}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="experience">Years of Experience</label>
            <input id="experience" name="experience" type="number" min={0} max={50} value={form.experience} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.experience ? 'error' : ''} />
            {errors.experience && <span className="provider-login-error">{errors.experience}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="street">Street Address</label>
            <input id="street" name="street" type="text" maxLength={200} value={form.street} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.street ? 'error' : ''} />
            {errors.street && <span className="provider-login-error">{errors.street}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" maxLength={100} value={form.city} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.city ? 'error' : ''} />
            {errors.city && <span className="provider-login-error">{errors.city}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="state">State/Province</label>
            <input id="state" name="state" type="text" maxLength={50} value={form.state} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.state ? 'error' : ''} />
            {errors.state && <span className="provider-login-error">{errors.state}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="zip">ZIP/Postal Code</label>
            <input id="zip" name="zip" type="text" maxLength={12} value={form.zip} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.zip ? 'error' : ''} />
            {errors.zip && <span className="provider-login-error">{errors.zip}</span>}
          </div>
        </section>
        <section className="provider-login-section">
          <h3 className="provider-login-section-title">Account Security</h3>
          <div className="provider-login-field">
            <label htmlFor="password">Password</label>
            <div className="provider-login-password-wrapper">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.password ? 'error' : ''} minLength={8} autoComplete="new-password" />
              <button type="button" className="provider-login-toggle" onClick={() => setShowPassword(s => !s)} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'} disabled={loading}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="provider-login-error">{errors.password}</span>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="provider-login-password-wrapper">
              <input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.confirmPassword ? 'error' : ''} minLength={8} autoComplete="new-password" />
              <button type="button" className="provider-login-toggle" onClick={() => setShowConfirm(s => !s)} tabIndex={-1} aria-label={showConfirm ? 'Hide password' : 'Show password'} disabled={loading}>
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="provider-login-error">{errors.confirmPassword}</span>}
          </div>
        </section>
        <button type="submit" className="provider-login-submit" disabled={loading}>
          {loading ? <span className="provider-login-spinner"></span> : 'Register'}
        </button>
        {retry && (
          <button type="button" className="provider-login-submit" style={{ marginTop: 8, background: '#fff', color: '#4f8cff', border: '1.5px solid #4f8cff' }} onClick={handleSubmit} disabled={loading}>
            Retry
          </button>
        )}
        {success && <div className="provider-login-success">Registration successful! Redirecting…</div>}
        <div className="provider-login-link-row">
          Already have an account?{' '}
          <button
            type="button"
            className="provider-login-forgot"
            onClick={props.onSwitchToLogin}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
