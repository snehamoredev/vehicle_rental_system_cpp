import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldAlert, Send, FileText, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import { validateEnquiryForm } from '../services/bookingValidator.js';
import { generateBookingReference } from '../services/bookingReference.js';
import { TAX_NOTE } from '../config/bookingRules.js';
import { formatCurrency } from '../services/rentalCalculator.js';

export default function EnquiryModal({
  vehicle,
  bookingContext = {},
  isOpen,
  onClose,
  onBookingConfirmed,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedBooking, setSubmittedBooking] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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

  // Reset form when reopened with a new vehicle
  useEffect(() => {
    if (isOpen) {
      setSubmittedBooking(null);
      setErrors({});
    }
  }, [isOpen, vehicle]);

  if (!isOpen || !vehicle) return null;

  const isLuxury = vehicle.category === 'Luxury';

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    setErrors(validation.errors);

    if (validation.isValid) {
      const reference = generateBookingReference();
      const confirmedData = {
        reference,
        vehicleId: vehicle.id,
        vehicleName: vehicle.getFullName(),
        category: vehicle.category,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        pickupLocation: bookingContext.pickupLocation || 'Main Hub',
        dropoffLocation: bookingContext.dropoffLocation || 'Main Hub',
        pickupDate: bookingContext.pickupDate || 'Scheduled date',
        pickupTime: bookingContext.pickupTime || '10:00',
        dropoffDate: bookingContext.dropoffDate || 'Scheduled date',
        dropoffTime: bookingContext.dropoffTime || '18:00',
        createdAt: new Date().toISOString(),
        status: 'Reservation Request Received',
      };

      setSubmittedBooking(confirmedData);
      if (onBookingConfirmed) {
        onBookingConfirmed(confirmedData);
      }
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 id="enquiry-modal-title" className="modal-title">
              {submittedBooking ? 'Reservation Request Received' : 'Vehicle Rental Enquiry'}
            </h2>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              {vehicle.getFullName()} · {isLuxury ? 'Chauffeur-Driven Only' : 'Self-Drive Fleet'}
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close enquiry modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          {submittedBooking ? (
            /* Confirmation Screen */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--btn-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <CheckCircle size={36} />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Reservation Enquiry Registered
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Thank you! Our fleet manager is verifying vehicle availability for your requested dates and will contact you shortly to confirm handover.
              </p>

              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Booking Reference Code:</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--btn-primary)', letterSpacing: '0.05em' }}>
                    {submittedBooking.reference}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Customer: </span>
                    <strong style={{ color: '#FFFFFF' }}>{submittedBooking.customerName}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Vehicle: </span>
                    <strong style={{ color: '#FFFFFF' }}>{submittedBooking.vehicleName}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Mobile: </span>
                    <span style={{ color: '#FFFFFF' }}>{submittedBooking.customerPhone}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Pick-up: </span>
                    <span style={{ color: '#FFFFFF' }}>{submittedBooking.pickupLocation}</span>
                  </div>
                </div>
              </div>

              {/* Tax Note requirement */}
              <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                <strong style={{ color: 'var(--gold-accent)' }}>Pricing Notice: </strong>
                {TAX_NOTE}
              </div>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Trip Recap */}
                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <MapPin size={14} color="var(--btn-primary)" />
                    <span><strong>Pick-up:</strong> {bookingContext.pickupLocation || 'Main Hub'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} color="var(--btn-primary)" />
                    <span>
                      {bookingContext.pickupDate || 'Tomorrow'} {bookingContext.pickupTime || '10:00'} → {bookingContext.dropoffDate || 'Next day'} {bookingContext.dropoffTime || '18:00'}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiryName">
                    <User size={14} />
                    <span>Full Legal Name</span>
                  </label>
                  <input
                    id="enquiryName"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    className={`form-input ${errors.name ? 'has-error' : ''}`}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiryPhone">
                    <Phone size={14} />
                    <span>10-Digit Mobile Number</span>
                  </label>
                  <input
                    id="enquiryPhone"
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    className={`form-input ${errors.phone ? 'has-error' : ''}`}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="enquiryEmail">
                    <Mail size={14} />
                    <span>Email Address</span>
                  </label>
                  <input
                    id="enquiryEmail"
                    type="email"
                    placeholder="name@example.com"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                {/* Tax Note */}
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {TAX_NOTE}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className={`btn ${isLuxury ? 'btn-gold' : 'btn-primary'}`}>
                  <Send size={15} />
                  <span>Submit Reservation Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {submittedBooking && (
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
