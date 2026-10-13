import React from 'react';
import { Car, ShieldCheck, PhoneCall, Mail } from 'lucide-react';

export default function Footer({ onNavigateSection }) {
  const handleLink = (e, sectionId) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>
              <Car size={24} color="var(--btn-primary)" />
              <span>AutoSphere Rentals</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1.25rem' }}>
              India's premier self-drive and executive chauffeur mobility network. Curated pristine vehicles, upfront transparent fares, and express airport handovers.
            </p>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Operating across Bengaluru, Mumbai, and New Delhi corridors.
            </div>
          </div>

          {/* Quick Fleets */}
          <div>
            <h4 className="footer-col-title">Fleet Collections</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#everyday" className="footer-link" onClick={(e) => handleLink(e, 'everyday-section')}>
                  Self-Drive Cars &amp; SUVs
                </a>
              </li>
              <li>
                <a href="#everyday" className="footer-link" onClick={(e) => handleLink(e, 'everyday-section')}>
                  City Scooters &amp; Motorbikes
                </a>
              </li>
              <li>
                <a href="#luxury" className="footer-link" onClick={(e) => handleLink(e, 'luxury-section')}>
                  Flagship Luxury Chauffeurs
                </a>
              </li>
              <li>
                <a href="#booking-panel" className="footer-link" onClick={(e) => handleLink(e, 'booking-panel')}>
                  Airport Express Handover
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Standards */}
          <div>
            <h4 className="footer-col-title">About &amp; Standards</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#about" className="footer-link" onClick={(e) => handleLink(e, 'about-section')}>
                  Why Choose AutoSphere
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => handleLink(e, 'about-section')}>
                  Pristine Sanitization Protocol
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link" onClick={(e) => handleLink(e, 'about-section')}>
                  Executive Chauffeur Academy
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link" onClick={(e) => handleLink(e, 'contact-section')}>
                  Corporate Fleet Accounts
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="footer-col-title">Support &amp; Policies</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#faq" className="footer-link" onClick={(e) => handleLink(e, 'faq-section')}>
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link" onClick={(e) => handleLink(e, 'faq-section')}>
                  Rental Eligibility &amp; ID Proof
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link" onClick={(e) => handleLink(e, 'faq-section')}>
                  Cancellation &amp; Refund Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link" onClick={(e) => handleLink(e, 'contact-section')}>
                  24/7 Roadside Assistance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} AutoSphere Mobility Technologies. All rights reserved.
          </div>
          <div>
            Sanitized Vehicles · Zero Hidden Charges · 24/7 Customer Care
          </div>
        </div>
      </div>
    </footer>
  );
}
