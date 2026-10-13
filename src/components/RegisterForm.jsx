import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Info } from 'lucide-react';
import { validateAuthForm } from '../services/bookingValidator.js';

export default function RegisterForm({
  isOpen,
  onClose,
  onRegisterSuccess,
  onSwitchToLogin,
}) {
  const [formData, setFormData] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });
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
    const validation = validateAuthForm(formData, true);
    setErrors(validation.errors);

    if (validation.isValid) {
      const newUser = {
        name: formData.name,
        email: formData.email,
        isDemoAccount: true,
      };
      onRegisterSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="register-title">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 id="register-title" className="modal-title">Create AutoSphere Account</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fast self-drive bookings &amp; exclusive fleet privileges</div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close register dialog">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <Info size={16} color="var(--btn-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>Join over 50,000 drivers enjoying verified vehicles, contactless key handovers, and 24/7 roadside assistance.</span>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="regName">
                <User size={14} />
                <span>Full Name</span>
              </label>
              <input
                id="regName"
                type="text"
                placeholder="Rahul Sharma"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="regEmail">
                <Mail size={14} />
                <span>Email Address</span>
              </label>
              <input
                id="regEmail"
                type="email"
                placeholder="rahul@example.com"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label" htmlFor="regPassword">
                <Lock size={14} />
                <span>Password (min 6 characters)</span>
              </label>
              <input
                id="regPassword"
                type="password"
                className={`form-input ${errors.password ? 'has-error' : ''}`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" htmlFor="regConfirmPassword">
                <Lock size={14} />
                <span>Confirm Password</span>
              </label>
              <input
                id="regConfirmPassword"
                type="password"
                className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px' }}>
              <span>Create Account</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
              <button
                type="button"
                style={{ color: 'var(--btn-primary)', fontWeight: 600, textDecoration: 'underline' }}
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
              >
                Sign In Instead
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
