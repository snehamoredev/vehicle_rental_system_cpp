import React from 'react';
import { ShieldCheck, Sparkles, Clock, CheckCircle, Award, Compass, Car, Headphones } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="section-padding" id="about-section" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">The AutoSphere Standard</span>
          <h2 className="section-title">Pristine Fleet, Transparent Fares &amp; Unrivaled Hospitality</h2>
          <p className="section-subtitle">
            Whether navigating metropolitan rush hours or escorting VIP delegates to executive boardrooms, AutoSphere delivers refined mobility tailored to your schedule.
          </p>
        </div>

        <div className="about-grid">
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>
              Redefining Self-Drive &amp; Chauffeur Excellence
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Founded with the conviction that renting a vehicle should be as seamless as stepping into your own driveway, AutoSphere provides a curated fleet of sanitized four-wheelers, agile bikes, and flagship chauffeur sedans.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Every vehicle undergoes rigorous mechanical and hygiene checks before handover. With instant hourly or daily fare calculations, we eliminate confusing surge markups and unannounced surcharges.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <ShieldCheck size={18} color="var(--btn-primary)" />
                  <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>100% Insured Fleet</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Comprehensive roadside insurance with zero security deposit hassles.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Clock size={18} color="var(--btn-primary)" />
                  <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>Express Airport Curbside</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Pre-positioned vehicles at BLR, BOM, and DEL terminals ready upon landing.
                </p>
              </div>
            </div>
          </div>

          <div className="about-highlight-box">
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Award size={20} color="var(--gold-accent)" />
              <span>Our Service Commitments</span>
            </h4>

            <div className="about-oop-pill-grid">
              <div className="oop-mini-card">
                <div className="oop-mini-title" style={{ color: 'var(--btn-primary)' }}>Pristine Sanitization</div>
                <div className="oop-mini-desc">12-point interior deep-clean and ozone sanitization prior to every customer handover.</div>
              </div>

              <div className="oop-mini-card">
                <div className="oop-mini-title" style={{ color: 'var(--btn-primary)' }}>Elite Chauffeur Cadre</div>
                <div className="oop-mini-desc">Background-verified, uniformed chauffeurs with English fluency and VIP protocol training.</div>
              </div>

              <div className="oop-mini-card">
                <div className="oop-mini-title" style={{ color: 'var(--btn-primary)' }}>Zero Hidden Fees</div>
                <div className="oop-mini-desc">Transparent hourly, daily, and package rates calculated instantly with zero surprises.</div>
              </div>

              <div className="oop-mini-card">
                <div className="oop-mini-title" style={{ color: 'var(--btn-primary)' }}>24/7 Roadside Assist</div>
                <div className="oop-mini-desc">Round-the-clock emergency support, battery jumps, and immediate replacement vehicles.</div>
              </div>

              <div className="oop-mini-card">
                <div className="oop-mini-title" style={{ color: 'var(--btn-primary)' }}>Doorstep Delivery</div>
                <div className="oop-mini-desc">Optional home and hotel delivery across key metropolitan business districts.</div>
              </div>

              <div className="oop-mini-card">
                <div className="oop-mini-title" style={{ color: 'var(--btn-primary)' }}>Instant Digital Handover</div>
                <div className="oop-mini-desc">Paperless driving license verification and rapid key handover in under 3 minutes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
