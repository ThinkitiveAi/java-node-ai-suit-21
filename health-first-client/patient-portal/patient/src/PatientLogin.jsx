import React, { useState } from 'react';
import './App.css';

const initialState = {
  identifier: '',
  password: '',
  remember: false,
};

const initialErrors = {
  identifier: '',
  password: '',
  general: '',
};

function validateIdentifier(value) {
  if (!value) return 'Email or phone is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/;
  if (value.includes('@')) {
    if (!emailRegex.test(value)) return 'e.g. johndoe@email.com';
  } else {
    if (!phoneRegex.test(value)) return 'e.g. +1234567890';
  }
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 6) return 'At least 6 characters.';
  return '';
}

const errorScenarios = {
  'wrong-password': 'Incorrect password. Forgot password?',
  'not-found': 'Account not found. Please check your email/phone or register.',
  'network': 'Network error. Please try again.',
  'server': 'Server error. Please try again.',
};

export default function PatientLogin() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [welcome, setWelcome] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors((err) => ({ ...err, [name]: '', general: '' }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    let error = '';
    if (name === 'identifier') error = validateIdentifier(value);
    if (name === 'password') error = validatePassword(value);
    setErrors((err) => ({ ...err, [name]: error }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const identifierError = validateIdentifier(form.identifier);
    const passwordError = validatePassword(form.password);
    if (identifierError || passwordError) {
      setErrors((err) => ({ ...err, identifier: identifierError, password: passwordError }));
      return;
    }
    setLoading(true);
    setErrors(initialErrors);
    setTimeout(() => {
      setLoading(false);
      // Demo: fake error scenarios
      if (form.identifier === 'notfound@patient.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['not-found'] }));
      } else if (form.password === 'wrongpass') {
        setErrors((err) => ({ ...err, general: errorScenarios['wrong-password'] }));
      } else if (form.identifier === 'network@patient.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['network'] }));
      } else if (form.identifier === 'server@patient.com') {
        setErrors((err) => ({ ...err, general: errorScenarios['server'] }));
      } else {
        setSuccess(true);
        setWelcome(true);
        setTimeout(() => {
          setWelcome(false);
          // Simulate dashboard redirect
          window.location.href = '/patient-dashboard';
        }, 1800);
      }
    }, 1500);
  }

  return (
    <div className="patient-login-container">
      <form className="patient-login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="patient-login-title">Patient Login</h2>
        <p className="patient-login-subtitle">Welcome! Please log in to access your healthcare account.</p>
        <div className="patient-login-field">
          <label htmlFor="identifier">Email or Phone Number</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="e.g. johndoe@email.com or +1234567890"
            value={form.identifier}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            autoFocus
            className={errors.identifier ? 'error' : ''}
            inputMode="email"
            autoComplete="username"
          />
          {errors.identifier && <span className="patient-login-error">{errors.identifier}</span>}
        </div>
        <div className="patient-login-field">
          <label htmlFor="password">Password</label>
          <div className="patient-login-password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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
              className="patient-login-toggle"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={loading}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <span className="patient-login-error">{errors.password}</span>}
        </div>
        <div className="patient-login-options">
          <label className="patient-login-remember">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              disabled={loading}
            />
            Remember Me
          </label>
          <button
            type="button"
            className="patient-login-forgot"
            tabIndex={loading ? -1 : 0}
            aria-disabled={loading}
            onClick={() => alert('Password recovery flow coming soon!')}
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>
        {errors.general && <div className="patient-login-error general">{errors.general}</div>}
        <button
          type="submit"
          className="patient-login-submit"
          disabled={loading}
        >
          {loading ? <span className="patient-login-spinner"></span> : 'Login'}
        </button>
        {success && (
          <div className="patient-login-success">
            {welcome ? (
              <>
                <span>Welcome, patient!</span>
                <br />
                <span>Redirecting to your dashboard…</span>
              </>
            ) : (
              <span>Login successful!</span>
            )}
          </div>
        )}
      </form>
    </div>
  );
} 