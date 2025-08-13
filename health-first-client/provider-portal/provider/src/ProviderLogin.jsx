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

const forgotPasswordInitialState = {
  email: '',
};

const forgotPasswordInitialErrors = {
  email: '',
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

function validateEmail(value) {
  if (!value) return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Invalid email format.';
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
      const response = await fetch('/api/provider/forgot-password', {
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
          <button
            type="button"
            className="provider-login-forgot"
            tabIndex={loading ? -1 : 0}
            aria-disabled={loading}
            onClick={() => setShowForgotModal(true)}
            disabled={loading}
          >
            Forgot Password?
          </button>
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