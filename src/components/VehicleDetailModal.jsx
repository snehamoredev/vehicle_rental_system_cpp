import React, { useEffect, useState } from 'react';
import { X, Users, Fuel, Gauge, Check, Send, Sparkles } from 'lucide-react';
import CostCalculator from './CostCalculator.jsx';

export default function VehicleDetailModal({
  vehicle,
  isOpen,
  onClose,
  onOpenEnquiry,
  initialDurationHours = 4,
}) {
  const [imgFailed, setImgFailed] = useState(false);

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

  if (!isOpen || !vehicle) return null;

  const isLuxury = vehicle.category === 'Luxury';
  const isAvailable = vehicle.isAvailable();

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-detail-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 id="vehicle-detail-title" className="modal-title">
              {vehicle.getFullName()}
            </h2>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {vehicle.category} Tier · {vehicle.classification || vehicle.bodyType || vehicle.vehicleType}
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close vehicle details modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Media & Snapshot */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-tertiary)' }}>
              {!imgFailed && vehicle.image ? (
                <img
                  src={vehicle.image}
                  alt={vehicle.getFullName()}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <Sparkles size={32} />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {vehicle.tagline}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {isLuxury && (
                    <span className="badge badge-chauffeur">Chauffeur-driven only</span>
                  )}
                  {isAvailable ? (
                    <span className="badge badge-selfdrive">Ready for booking</span>
                  ) : (
                    <span className="badge badge-unavailable">Currently reserved</span>
                  )}
                </div>
              </div>

              {/* Quick Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ textAlign: 'center' }}>
                  <Users size={16} color="var(--btn-primary)" style={{ margin: '0 auto 0.25rem auto' }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Capacity</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{vehicle.seats} Seats</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Fuel size={16} color="var(--btn-primary)" style={{ margin: '0 auto 0.25rem auto' }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fuel</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{vehicle.fuelType}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Gauge size={16} color="var(--btn-primary)" style={{ margin: '0 auto 0.25rem auto' }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Drive</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{vehicle.transmission}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Cost Calculator */}
          <CostCalculator vehicle={vehicle} initialDurationHours={initialDurationHours} />
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={`btn ${isLuxury ? 'btn-gold' : 'btn-primary'}`}
            disabled={!isAvailable}
            onClick={() => {
              onClose();
              onOpenEnquiry(vehicle);
            }}
          >
            <Send size={16} />
            <span>{isAvailable ? 'Proceed to Enquiry' : 'Vehicle Unavailable'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
