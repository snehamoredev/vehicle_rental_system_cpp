import React, { useState } from 'react';
import { Heart, Users, Fuel, Gauge, Sparkles, Check, Calculator, Send } from 'lucide-react';
import { formatCurrency } from '../services/rentalCalculator.js';

export default function VehicleCard({
  vehicle,
  isWishlisted = false,
  onToggleWishlist,
  onOpenDetails,
  onOpenEnquiry,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const isLuxury = vehicle.category === 'Luxury';
  const isAvailable = vehicle.isAvailable();

  return (
    <article className="vehicle-card" aria-label={`${vehicle.getFullName()} rental card`}>
      {/* Media Image Frame */}
      <div className="vehicle-card-media">
        {!imageFailed && vehicle.image ? (
          <img
            src={vehicle.image}
            alt={`${vehicle.getFullName()} rental showcase`}
            className="vehicle-card-img"
            onError={() => setImageFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="vehicle-card-fallback">
            <Sparkles size={28} />
            <span>{vehicle.getFullName()}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="vehicle-card-badge-top">
          {isLuxury ? (
            <span className="badge badge-chauffeur">Chauffeur-driven only</span>
          ) : isAvailable ? (
            <span className="badge badge-selfdrive">Self-drive</span>
          ) : (
            <span className="badge badge-unavailable">Reserved</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`vehicle-card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(vehicle.id);
          }}
          aria-label={isWishlisted ? `Remove ${vehicle.getFullName()} from wishlist` : `Add ${vehicle.getFullName()} to wishlist`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Body Content */}
      <div className="vehicle-card-body">
        <div className="vehicle-card-title-row">
          <h3 className="vehicle-card-title">{vehicle.getFullName()}</h3>
          {!isAvailable && (
            <span style={{ fontSize: '0.75rem', color: '#F87171', fontWeight: 600 }}>
              Unavailable
            </span>
          )}
        </div>

        <p className="vehicle-card-tagline">{vehicle.tagline}</p>

        {/* Key Specs */}
        <div className="vehicle-specs-list">
          <div className="vehicle-spec-item">
            <Users size={14} />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="vehicle-spec-item">
            <Fuel size={14} />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="vehicle-spec-item">
            <Gauge size={14} />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        {/* Rates Section */}
        <div className="vehicle-pricing-block">
          {isLuxury ? (
            <div className="luxury-rates-matrix">
              <div className="luxury-rate-cell">
                <span className="luxury-rate-label">4h / 40 km</span>
                <span className="luxury-rate-value tabular-nums">
                  {formatCurrency(vehicle.pkg4hRate)}
                </span>
              </div>
              <div className="luxury-rate-cell">
                <span className="luxury-rate-label">8h / 80 km</span>
                <span className="luxury-rate-value tabular-nums">
                  {formatCurrency(vehicle.pkg8hRate)}
                </span>
              </div>
              <div className="luxury-rate-cell">
                <span className="luxury-rate-label">Extra Hour</span>
                <span className="luxury-rate-value tabular-nums">
                  {formatCurrency(vehicle.extraHourRate)}/hr
                </span>
              </div>
              <div className="luxury-rate-cell">
                <span className="luxury-rate-label">Extra Distance</span>
                <span className="luxury-rate-value tabular-nums">
                  {formatCurrency(vehicle.extraKmRate)}/km
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <div>
                <span className="price-main tabular-nums">
                  {formatCurrency(vehicle.hourlyRate)}
                </span>
                <span className="price-unit"> / hour</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }} className="tabular-nums">
                  {formatCurrency(vehicle.dailyRate)}
                </span>
                <span className="price-unit"> / day</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="vehicle-card-footer">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={() => onOpenDetails(vehicle)}
          >
            <Calculator size={14} />
            <span>Calculate</span>
          </button>

          <button
            type="button"
            className={`btn btn-sm ${isLuxury ? 'btn-gold' : 'btn-primary'}`}
            style={{ flex: 1 }}
            onClick={() => onOpenEnquiry(vehicle)}
            disabled={!isAvailable}
          >
            <Send size={14} />
            <span>{isAvailable ? 'Enquire' : 'Reserved'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
