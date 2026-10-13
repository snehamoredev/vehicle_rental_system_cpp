import React from 'react';
import { Car, Sparkles, Check, ArrowRight, Shield, Fuel } from 'lucide-react';

export default function CategorySection({ onSelectCategory }) {
  return (
    <section className="section-padding" id="categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Distinct Rental Tiers</span>
          <h2 className="section-title">Engineered for Everyday &amp; Executive Mobility</h2>
          <p className="section-subtitle">
            From self-drive hatchbacks, sedans, and SUVs for spontaneous road trips to flagship chauffeur-driven luxury for corporate galas and airport transfers.
          </p>
        </div>

        <div className="category-grid">
          {/* Everyday Rides Card */}
          <div className="category-card" id="everyday-section">
            <div>
              <div className="category-card-header">
                <div style={{ display: 'inline-flex', padding: '0.6rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--btn-primary)', marginBottom: '1rem' }}>
                  <Car size={28} />
                </div>
                <h3 className="category-card-title">Everyday Rides</h3>
                <p className="category-card-desc">
                  Self-drive compact hatchbacks, executive sedans, rugged SUVs, and two-wheelers for daily commuting and weekend getaways.
                </p>
              </div>

              <ul className="category-features-list">
                <li className="category-feature-item">
                  <Check size={16} color="var(--btn-primary)" />
                  <span>Flexible hourly (under 24h) and daily (24h+) tiered billing</span>
                </li>
                <li className="category-feature-item">
                  <Check size={16} color="var(--btn-primary)" />
                  <span>Economical city scooters &amp; touring motorcycles from ₹100/hr</span>
                </li>
                <li className="category-feature-item">
                  <Check size={16} color="var(--btn-primary)" />
                  <span>Verified, fully insured self-drive fleet with zero hidden charges</span>
                </li>
                <li className="category-feature-item">
                  <Check size={16} color="var(--btn-primary)" />
                  <span>Up to 30 days continuous rental tenure</span>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ marginBottom: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Fares starting from: <strong style={{ color: '#FFFFFF' }}>₹100/hr</strong> (scooter) to <strong style={{ color: '#FFFFFF' }}>₹3,000/day</strong> (SUV)
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%' }}
                onClick={() => onSelectCategory('Everyday')}
              >
                <span>Browse Everyday Rides</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Luxury Chauffeur Rides Card */}
          <div className="category-card luxury-accent" id="luxury-section">
            <div>
              <div className="category-card-header">
                <div style={{ display: 'inline-flex', padding: '0.6rem', backgroundColor: 'rgba(212, 175, 55, 0.12)', borderRadius: 'var(--radius-md)', color: 'var(--gold-accent)', marginBottom: '1rem' }}>
                  <Sparkles size={28} />
                </div>
                <h3 className="category-card-title">Luxury Chauffeur Rides</h3>
                <p className="category-card-desc">
                  Premium Mercedes-Benz, BMW, and Audi flagships. Exclusively chauffeur-driven for boardroom arrivals, airport transfers, and VIP delegations.
                </p>
              </div>

              <ul className="category-features-list">
                <li className="category-feature-item">
                  <Check size={16} color="var(--gold-accent)" />
                  <strong style={{ color: '#FFFFFF' }}>Chauffeur-driven only</strong> — professional driver included
                </li>
                <li className="category-feature-item">
                  <Check size={16} color="var(--gold-accent)" />
                  <span>Fixed curated packages: 4 Hours / 40 km or 8 Hours / 80 km</span>
                </li>
                <li className="category-feature-item">
                  <Check size={16} color="var(--gold-accent)" />
                  <span>Predictable extra hour &amp; extra km rates with transparent calculation</span>
                </li>
                <li className="category-feature-item">
                  <Check size={16} color="var(--gold-accent)" />
                  <span>Uniformed, vetted executive chauffeurs with route mastery</span>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ marginBottom: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Curated packages from: <strong style={{ color: 'var(--gold-accent)' }}>₹5,500</strong> to <strong style={{ color: 'var(--gold-accent)' }}>₹16,000</strong>
              </div>
              <button
                type="button"
                className="btn btn-outline-gold"
                style={{ width: '100%' }}
                onClick={() => onSelectCategory('Luxury')}
              >
                <span>Browse Luxury Fleet</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
