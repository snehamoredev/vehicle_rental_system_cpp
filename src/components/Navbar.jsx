import React, { useState } from 'react';
import { Car, Heart, User, LogOut, Menu, X, Terminal } from 'lucide-react';
import GoldMenu from './GoldMenu.jsx';

export default function Navbar({
  wishlistCount = 0,
  onOpenWishlist,
  onOpenAuth,
  onOpenCppEngine,
  currentUser,
  onLogout,
  onNavigateSection,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Zone */}
        <a
          href="#home"
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          aria-label="AutoSphere Rentals Home"
        >
          <Car className="brand-icon" />
          <span>AutoSphere</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          <a
            href="#everyday"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('everyday-section');
            }}
          >
            Everyday Rides
          </a>
          <a
            href="#luxury"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('luxury-section');
            }}
          >
            Luxury Chauffeur
          </a>
          <a
            href="#why-autosphere"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about-section');
            }}
          >
            Why AutoSphere
          </a>
          <a
            href="#faq"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('faq-section');
            }}
          >
            FAQ &amp; Support
          </a>

          {/* Join Gold Dropdown Menu */}
          <GoldMenu onSelectBenefit={() => handleNavClick('luxury-section')} />
        </nav>

        {/* Top Bar Actions */}
        <div className="navbar-actions">
          {/* C++ Core Engine Terminal Trigger */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onOpenCppEngine}
            title="Inspect C++ OOP Core Engine & Unit Tests"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(16, 185, 129, 0.4)' }}
          >
            <Terminal size={14} color="var(--btn-primary)" />
            <span>C++ Engine</span>
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            className="wishlist-btn"
            onClick={onOpenWishlist}
            aria-label={`Wishlist containing ${wishlistCount} vehicles`}
            title="Open Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && <span className="wishlist-counter">{wishlistCount}</span>}
          </button>

          {/* User Auth Profile / Login */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>
                {currentUser.name}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onLogout}
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onOpenAuth}
            >
              <User size={14} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="btn btn-secondary btn-sm md:hidden"
            style={{ display: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
