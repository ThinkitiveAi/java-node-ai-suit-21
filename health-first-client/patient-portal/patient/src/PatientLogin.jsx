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

const forgotPasswordInitialState = {
  email: '',
};

const forgotPasswordInitialErrors = {
  email: '',
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

function validateEmail(value) {
  if (!value) return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Invalid email format.';
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
  
  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotForm, setForgotForm] = useState(forgotPasswordInitialState);
  const [forgotErrors, setForgotErrors] = useState(forgotPasswordInitialErrors);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

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

  // Forgot password handlers
  function handleForgotChange(e) {
    const { name, value } = e.target;
    setForgotForm(f => ({ ...f, [name]: value }));
    setForgotErrors(err => ({ ...err, [name]: '', general: '' }));
  }

  function handleForgotBlur(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      setForgotErrors(err => ({ ...err, [name]: validateEmail(value) }));
    }
  }

  async function handleForgotSubmit(e) {
    e.preventDefault();
    const emailError = validateEmail(forgotForm.email);
    if (emailError) {
      setForgotErrors(err => ({ ...err, email: emailError }));
      return;
    }
    
    setForgotLoading(true);
    setForgotErrors(forgotPasswordInitialErrors);
    
    try {
      // API call for forgot password
      const response = await fetch('/api/patient/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotForm.email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setForgotSuccess(true);
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotForm(forgotPasswordInitialState);
          setForgotSuccess(false);
        }, 3000);
      } else {
        setForgotErrors(err => ({ ...err, general: data.message || 'Failed to send reset email.' }));
      }
    } catch (error) {
      setForgotErrors(err => ({ ...err, general: 'Network error. Please try again.' }));
    } finally {
      setForgotLoading(false);
    }
  }

  function closeForgotModal() {
    setShowForgotModal(false);
    setForgotForm(forgotPasswordInitialState);
    setForgotErrors(forgotPasswordInitialErrors);
    setForgotSuccess(false);
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
            onClick={() => setShowForgotModal(true)}
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="forgot-password-modal">
          <div className="forgot-password-modal-content">
            <button className="forgot-password-modal-close" onClick={closeForgotModal}>&times;</button>
            {!forgotSuccess ? (
              <>
                <h3>Forgot Password</h3>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <form onSubmit={handleForgotSubmit}>
                  <div className="forgot-password-field">
                    <label htmlFor="forgot-email">Email Address</label>
                    <input
                      id="forgot-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={forgotForm.email}
                      onChange={handleForgotChange}
                      onBlur={handleForgotBlur}
                      disabled={forgotLoading}
                      className={forgotErrors.email ? 'error' : ''}
                      autoComplete="email"
                    />
                    {forgotErrors.email && <span className="forgot-password-error">{forgotErrors.email}</span>}
                  </div>
                  {forgotErrors.general && <div className="forgot-password-error">{forgotErrors.general}</div>}
                  <div className="forgot-password-actions">
                    <button type="button" className="forgot-password-cancel" onClick={closeForgotModal}>
                      Cancel
                    </button>
                    <button type="submit" className="forgot-password-submit" disabled={forgotLoading}>
                      {forgotLoading ? <span className="forgot-password-spinner"></span> : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="forgot-password-success">
                <div className="forgot-password-success-icon">✓</div>
                <h4>Email Sent!</h4>
                <p>We've sent a password reset link to your email address.</p>
                <p>Please check your inbox and follow the instructions to reset your password.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 