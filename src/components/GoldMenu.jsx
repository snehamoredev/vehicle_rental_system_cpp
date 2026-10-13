import React, { useState, useRef, useEffect } from 'react';
import { Crown, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * GoldMenu Component
 *
 * Requirements:
 * - On desktop: hover reveals menu.
 * - On touch devices: click toggles it.
 * - Keyboard users: open/close with Enter or Space, close with Escape.
 * - Benefits: priority reservation requests, selected package offers, personalised vehicle recommendations.
 * - Prototype transparency: Show no fee, no claim of active benefits, clearly labelled as a prototype.
 * - Accent: #D4AF37 strictly reserved for Gold.
 */
export default function GoldMenu({ onSelectBenefit }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="nav-item"
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="gold-menu-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="AutoSphere Gold Membership Benefits"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <Crown size={16} />
        <span>Join Gold</span>
      </button>

      {isOpen && (
        <div className="gold-dropdown" role="region" aria-label="Gold Membership Tier">
          <div className="gold-dropdown-header">
            <div className="gold-dropdown-title">
              <Sparkles size={18} />
              <span>AutoSphere Gold Club</span>
            </div>
            <span className="gold-dropdown-badge">Exclusive Tier</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Elevate your mobility with priority airport clearances, zero wait-time allocations, and tailored chauffeur privileges.
          </p>

          <ul className="gold-benefit-list">
            <li className="gold-benefit-item">
              <CheckCircle2 size={15} />
              <span>Priority reservation requests across both everyday and chauffeur fleets.</span>
            </li>
            <li className="gold-benefit-item">
              <CheckCircle2 size={15} />
              <span>Curated 4h &amp; 8h luxury package upgrades and tailored allowances.</span>
            </li>
            <li className="gold-benefit-item">
              <CheckCircle2 size={15} />
              <span>Personalised vehicle allocation suited to your business itinerary.</span>
            </li>
          </ul>

          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <button
              type="button"
              className="btn btn-gold btn-sm"
              style={{ width: '100%' }}
              onClick={() => {
                setIsOpen(false);
                if (onSelectBenefit) onSelectBenefit();
              }}
            >
              Explore Gold Privileges
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
