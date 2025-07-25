import React, { useState } from 'react';
import './App.css';

const initialState = {
  credential: '',
  password: '',
  remember: false,
};

const initialErrors = {
  credential: '',
  password: '',
  general: '',
};

function validateCredential(value) {
  if (!value) return 'Email or phone is required.';
  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone regex (simple, for demo)
  const phoneRegex = /^\+?\d{10,15}$/;
  if (value.includes('@')) {
    if (!emailRegex.test(value)) return 'Invalid email format.';
  } else {
    if (!phoneRegex.test(value)) return 'Invalid phone number format.';
  }
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return '';
}

const errorScenarios = {
  'wrong-password': 'Incorrect password.',
  'not-found': 'Account not found.',
  'locked': 'Account is locked or suspended.',
  'network': 'Network connectivity issue.',
  'server': 'Server error. Please try again.',
};

export default function ProviderLogin(props) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors((err) => ({ ...err, [name]: '', general: '' }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    let error = '';
    if (name === 'credential') error = validateCredential(value);
    if (name === 'password') error = validatePassword(value);
    setErrors((err) => ({ ...err, [name]: error }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const credentialError = validateCredential(form.credential);
    const passwordError = validatePassword(form.password);
    if (credentialError || passwordError) {
      setErrors((err) => ({ ...err, credential: credentialError, password: passwordError }));
      return;
    }
    setLoading(true);
    setErrors(initialErrors);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Demo: fake error scenarios
      if (form.credential === 'locked@provider.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['locked'] }));
      } else if (form.credential === 'notfound@provider.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['not-found'] }));
      } else if (form.password === 'wrongpass') {
        setErrors((err) => ({ ...err, general: errorScenarios['wrong-password'] }));
      } else if (form.credential === 'network@provider.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['network'] }));
      } else if (form.credential === 'server@provider.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['server'] }));
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          if (props.onLoginSuccess) props.onLoginSuccess();
        }, 1200);
      }
    }, 1500);
  }

  return (
    <div className="provider-login-container">
      <form className="provider-login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="provider-login-title">Provider Login</h2>
        <div className="provider-login-field">
          <label htmlFor="credential">Email or Phone Number</label>
          <input
            id="credential"
            name="credential"
            type="text"
            placeholder="Enter email or phone"
            value={form.credential}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            autoFocus
            className={errors.credential ? 'error' : ''}
            inputMode="email"
            autoComplete="username"
          />
          {errors.credential && <span className="provider-login-error">{errors.credential}</span>}
        </div>
        <div className="provider-login-field">
          <label htmlFor="password">Password</label>
          <div className="provider-login-password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={errors.password ? 'error' : ''}
              minLength={6}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="provider-login-toggle"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={loading}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <span className="provider-login-error">{errors.password}</span>}
        </div>
        <div className="provider-login-options">
          <label className="provider-login-remember">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              disabled={loading}
            />
            Remember Me
          </label>
          <a
            href="#"
            className="provider-login-forgot"
            tabIndex={loading ? -1 : 0}
            aria-disabled={loading}
            onClick={e => { e.preventDefault(); alert('Forgot password flow not implemented.'); }}
          >
            Forgot Password?
          </a>
        </div>
        {errors.general && <div className="provider-login-error general">{errors.general}</div>}
        <button
          type="submit"
          className="provider-login-submit"
          disabled={loading}
        >
          {loading ? <span className="provider-login-spinner"></span> : 'Login'}
        </button>
        {success && <div className="provider-login-success">Login successful! Redirecting…</div>}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          Don't have an account?{' '}
          <button
            type="button"
            className="provider-login-forgot"
            style={{ fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={props.onSwitchToRegister}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
} 