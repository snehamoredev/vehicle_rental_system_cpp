import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Hero({ onExploreClick, onLuxuryClick }) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-kicker">
              <Award size={16} />
              <span>Premium Self-Drive &amp; Chauffeur Mobility</span>
            </div>

            <h1 className="hero-title">
              Your Journey Begins Here: Premium Cars, SUVs &amp; Chauffeur Rides
            </h1>

            <p className="hero-subtitle">
              Explore handpicked self-drive hatchbacks, executive sedans, spacious SUVs, agile city two-wheelers, and flagship chauffeur-driven luxury across major airport corridors and city hubs.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onExploreClick}
              >
                <span>Find Your Ride</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onLuxuryClick}
              >
                <span>Luxury Chauffeur Fleet</span>
              </button>
            </div>

            {/* Trust points */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Clock size={16} color="var(--btn-primary)" />
                <span>Instant Fleet Allocation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={16} color="var(--btn-primary)" />
                <span>Transparent Hourly &amp; Daily Pricing</span>
              </div>
            </div>
          </div>

          <div>
            <div className="hero-image-frame">
              {!imageError ? (
                <img
                  src="/images/hero/hero_fleet.jpg"
                  alt="AutoSphere fleet of luxury executive sedans and SUVs parked in a modern airport terminal"
                  onError={() => setImageError(true)}
                  loading="eager"
                />
              ) : (
                <div style={{ height: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                  <span>AutoSphere Premium Fleet</span>
                </div>
              )}
              <div className="hero-caption">
                <span>Executive Terminal Fleet</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bengaluru, Mumbai &amp; Delhi Corridors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
