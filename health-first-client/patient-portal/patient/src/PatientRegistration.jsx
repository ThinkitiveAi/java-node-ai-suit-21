import React, { useState } from 'react';
import './App.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  password: '',
  confirmPassword: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  password: '',
  confirmPassword: '',
  form: '',
};

const genders = [
  '',
  'Male',
  'Female',
  'Other',
  'Prefer not to say',
];

function validateField(name, value, form) {
  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!value) return 'Required';
      if (value.length < 2) return 'At least 2 characters';
      if (value.length > 50) return 'Max 50 characters';
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
    case 'dob': {
      if (!value) return 'Required';
      const now = new Date();
      const dob = new Date(value);
      if (dob >= now) return 'Date must be in the past';
      // Age check (min 13)
      const age = now.getFullYear() - dob.getFullYear() - (now < new Date(dob.setFullYear(now.getFullYear())) ? 1 : 0);
      if (age < 13) return 'You must be at least 13 years old';
      break;
    }
    case 'gender':
      if (!value) return 'Required';
      break;
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
    case 'emergencyPhone': {
      if (value) {
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!phoneRegex.test(value)) return 'Invalid phone number';
        if (value === form.phone) return 'Must be different from your phone';
      }
      break;
    }
    case 'emergencyName':
      if (value && value.length > 100) return 'Max 100 characters';
      break;
    case 'emergencyRelationship':
      if (value && value.length > 50) return 'Max 50 characters';
      break;
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

export default function PatientRegistration(props) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [retry, setRetry] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      if (form.email === 'duplicate@patient.com') {
        setErrors(err => ({ ...err, email: 'Email already registered', form: 'Duplicate email error.' }));
      } else if (form.phone === '+1111111111') {
        setErrors(err => ({ ...err, phone: 'Phone already registered', form: 'Duplicate phone error.' }));
      } else if (form.email === 'network@patient.com') {
        setErrors(err => ({ ...err, form: 'Network error. Please try again.' }));
        setRetry(true);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.href = '/patient-dashboard';
        }, 2200);
      }
    }, 1800);
  }

  return (
    <div className="patient-login-container">
      <form className="patient-login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="patient-login-title">Patient Registration</h2>
        <p className="patient-login-subtitle">Create your account to access healthcare services.</p>
        {errors.form && <div className="patient-login-error general">{errors.form}</div>}
        <section style={{ marginBottom: 8 }}>
          <h3 className="patient-login-section-title">Personal Information</h3>
          <div className="patient-login-field">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" minLength={2} maxLength={50} value={form.firstName} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.firstName ? 'error' : ''} />
            {errors.firstName && <span className="patient-login-error">{errors.firstName}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" minLength={2} maxLength={50} value={form.lastName} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.lastName ? 'error' : ''} />
            {errors.lastName && <span className="patient-login-error">{errors.lastName}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.email ? 'error' : ''} autoComplete="username" />
            {errors.email && <span className="patient-login-error">{errors.email}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.phone ? 'error' : ''} />
            {errors.phone && <span className="patient-login-error">{errors.phone}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.dob ? 'error' : ''} max={new Date().toISOString().split('T')[0]} />
            {errors.dob && <span className="patient-login-error">{errors.dob}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.gender ? 'error' : ''}>
              {genders.map((g) => (
                <option key={g} value={g}>{g ? g : 'Select gender'}</option>
              ))}
            </select>
            {errors.gender && <span className="patient-login-error">{errors.gender}</span>}
          </div>
        </section>
        <section style={{ marginBottom: 8 }}>
          <h3 className="patient-login-section-title">Address</h3>
          <div className="patient-login-field">
            <label htmlFor="street">Street Address</label>
            <input id="street" name="street" type="text" maxLength={200} value={form.street} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.street ? 'error' : ''} />
            {errors.street && <span className="patient-login-error">{errors.street}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" maxLength={100} value={form.city} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.city ? 'error' : ''} />
            {errors.city && <span className="patient-login-error">{errors.city}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="state">State/Province</label>
            <input id="state" name="state" type="text" maxLength={50} value={form.state} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.state ? 'error' : ''} />
            {errors.state && <span className="patient-login-error">{errors.state}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="zip">ZIP/Postal Code</label>
            <input id="zip" name="zip" type="text" maxLength={12} value={form.zip} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.zip ? 'error' : ''} />
            {errors.zip && <span className="patient-login-error">{errors.zip}</span>}
          </div>
        </section>
        <section style={{ marginBottom: 8 }}>
          <h3 className="patient-login-section-title">Emergency Contact (Optional)</h3>
          <div className="patient-login-field">
            <label htmlFor="emergencyName">Contact Name</label>
            <input id="emergencyName" name="emergencyName" type="text" maxLength={100} value={form.emergencyName} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.emergencyName ? 'error' : ''} />
            {errors.emergencyName && <span className="patient-login-error">{errors.emergencyName}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="emergencyRelationship">Relationship</label>
            <input id="emergencyRelationship" name="emergencyRelationship" type="text" maxLength={50} value={form.emergencyRelationship} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.emergencyRelationship ? 'error' : ''} />
            {errors.emergencyRelationship && <span className="patient-login-error">{errors.emergencyRelationship}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="emergencyPhone">Phone Number</label>
            <input id="emergencyPhone" name="emergencyPhone" type="tel" value={form.emergencyPhone} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.emergencyPhone ? 'error' : ''} />
            {errors.emergencyPhone && <span className="patient-login-error">{errors.emergencyPhone}</span>}
          </div>
        </section>
        <section style={{ marginBottom: 8 }}>
          <h3 className="patient-login-section-title">Account Security</h3>
          <div className="patient-login-field">
            <label htmlFor="password">Password</label>
            <div className="patient-login-password-wrapper">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.password ? 'error' : ''} minLength={8} autoComplete="new-password" />
              <button type="button" className="patient-login-toggle" onClick={() => setShowPassword(s => !s)} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'} disabled={loading}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="patient-login-error">{errors.password}</span>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="patient-login-password-wrapper">
              <input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} onBlur={handleBlur} disabled={loading} className={errors.confirmPassword ? 'error' : ''} minLength={8} autoComplete="new-password" />
              <button type="button" className="patient-login-toggle" onClick={() => setShowConfirm(s => !s)} tabIndex={-1} aria-label={showConfirm ? 'Hide password' : 'Show password'} disabled={loading}>
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="patient-login-error">{errors.confirmPassword}</span>}
          </div>
        </section>
        <button type="submit" className="patient-login-submit" disabled={loading}>
          {loading ? <span className="patient-login-spinner"></span> : 'Register'}
        </button>
        {retry && (
          <button type="button" className="patient-login-submit" style={{ marginTop: 8, background: '#fff', color: '#1976d2', border: '1.5px solid #1976d2' }} onClick={handleSubmit} disabled={loading}>
            Retry
          </button>
        )}
        {success && (
          <div className="patient-login-success">
            Registration successful!<br />
            Please check your email to verify your account.<br />
            Redirecting to dashboard…
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          Already have an account?{' '}
          <button
            type="button"
            className="patient-login-forgot"
            style={{ fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
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