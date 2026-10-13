import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, AlertCircle, Info } from 'lucide-react';
import { validateAuthForm } from '../services/bookingValidator.js';

export default function LoginForm({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateAuthForm({ email, password }, false);
    setErrors(validation.errors);

    if (validation.isValid) {
      // Simulated mock login
      const mockUser = {
        name: email.split('@')[0].replace('.', ' '),
        email,
        isDemoAccount: true,
      };
      onLoginSuccess(mockUser);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 id="login-title" className="modal-title">Sign In to AutoSphere</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Access your reservations &amp; saved vehicles</div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close login dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <Info size={16} color="var(--btn-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>Sign in to unlock express airport pickup, track ongoing enquiries, and view Gold tier benefits.</span>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="loginEmail">
                <Mail size={14} />
                <span>Email Address</span>
              </label>
              <input
                id="loginEmail"
                type="email"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" htmlFor="loginPassword">
                <Lock size={14} />
                <span>Password</span>
              </label>
              <input
                id="loginPassword"
                type="password"
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px' }}>
              <span>Sign In</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                type="button"
                style={{ color: 'var(--btn-primary)', fontWeight: 600, textDecoration: 'underline' }}
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
              >
                Create an Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
