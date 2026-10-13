import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, Sparkles, AlertCircle, Search } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../config/bookingRules.js';
import { validateBookingForm } from '../services/bookingValidator.js';

export default function BookingPanel({ onSearchSubmit, currentCategory, onCategoryChange }) {
  // Generate initial valid date/time (tomorrow + 4 hours to comfortably satisfy MIN_NOTICE_HOURS)
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const defaultPickupDate = tomorrow.toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 48 * 60 * 60 * 1000);
  const defaultDropoffDate = dayAfter.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    pickupLocation: POPULAR_LOCATIONS[0],
    dropoffLocation: POPULAR_LOCATIONS[0],
    pickupDate: defaultPickupDate,
    pickupTime: '10:00',
    dropoffDate: defaultDropoffDate,
    dropoffTime: '18:00',
    category: currentCategory || 'Everyday',
  });

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // If user already attempted submission, validate in real-time
    if (hasSubmitted) {
      const validation = validateBookingForm(updated);
      setErrors(validation.errors);
    }
  };

  const handleCategoryTab = (cat) => {
    handleChange('category', cat);
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const validation = validateBookingForm(formData);
    setErrors(validation.errors);

    if (validation.isValid) {
      onSearchSubmit({
        ...formData,
        durationHours: validation.durationHours,
      });
    }
  };

  return (
    <div className="container booking-panel-wrapper" id="booking-panel">
      <div className="booking-panel-card">
        {/* Category Switcher Tabs */}
        <div className="booking-category-tabs">
          <button
            type="button"
            className={`booking-tab-btn ${formData.category === 'Everyday' ? 'active' : ''}`}
            onClick={() => handleCategoryTab('Everyday')}
          >
            <Car size={18} />
            <span>Everyday Rides (Cars & Bikes)</span>
          </button>
          <button
            type="button"
            className={`booking-tab-btn ${formData.category === 'Luxury' ? 'active' : ''}`}
            onClick={() => handleCategoryTab('Luxury')}
          >
            <Sparkles size={18} color="var(--gold-accent)" />
            <span style={{ color: formData.category === 'Luxury' ? 'var(--gold-accent)' : 'inherit' }}>
              Luxury Chauffeur (Chauffeur-Driven Only)
            </span>
          </button>
        </div>

        {/* Booking Form Grid */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="booking-form-grid">
            {/* Pick-up Location */}
            <div className="form-group">
              <label className="form-label" htmlFor="pickupLocation">
                <MapPin size={14} color="var(--btn-primary)" />
                <span>Pick-up Location</span>
              </label>
              <select
                id="pickupLocation"
                className={`form-select ${errors.pickupLocation ? 'has-error' : ''}`}
                value={formData.pickupLocation}
                onChange={(e) => handleChange('pickupLocation', e.target.value)}
              >
                <option value="">Select pick-up location</option>
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.pickupLocation && (
                <div className="form-error">
                  <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {errors.pickupLocation}
                </div>
              )}
            </div>

            {/* Drop-off Location */}
            <div className="form-group">
              <label className="form-label" htmlFor="dropoffLocation">
                <MapPin size={14} color="var(--text-secondary)" />
                <span>Drop-off Location</span>
              </label>
              <select
                id="dropoffLocation"
                className={`form-select ${errors.dropoffLocation ? 'has-error' : ''}`}
                value={formData.dropoffLocation}
                onChange={(e) => handleChange('dropoffLocation', e.target.value)}
              >
                <option value="">Select drop-off location</option>
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.dropoffLocation && (
                <div className="form-error">
                  <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {errors.dropoffLocation}
                </div>
              )}
            </div>

            {/* Pick-up Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="pickupDate">
                <Calendar size={14} color="var(--btn-primary)" />
                <span>Pick-up Date</span>
              </label>
              <input
                id="pickupDate"
                type="date"
                className={`form-input ${errors.pickupDate ? 'has-error' : ''}`}
                value={formData.pickupDate}
                onChange={(e) => handleChange('pickupDate', e.target.value)}
              />
              {errors.pickupDate && (
                <div className="form-error">
                  <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {errors.pickupDate}
                </div>
              )}
            </div>

            {/* Pick-up Time */}
            <div className="form-group">
              <label className="form-label" htmlFor="pickupTime">
                <Clock size={14} color="var(--btn-primary)" />
                <span>Pick-up Time</span>
              </label>
              <input
                id="pickupTime"
                type="time"
                className={`form-input ${errors.pickupTime ? 'has-error' : ''}`}
                value={formData.pickupTime}
                onChange={(e) => handleChange('pickupTime', e.target.value)}
              />
              {errors.pickupTime && (
                <div className="form-error">
                  <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {errors.pickupTime}
                </div>
              )}
            </div>

            {/* Drop-off Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="dropoffDate">
                <Calendar size={14} color="var(--text-secondary)" />
                <span>Drop-off Date</span>
              </label>
              <input
                id="dropoffDate"
                type="date"
                className={`form-input ${errors.dropoffDate ? 'has-error' : ''}`}
                value={formData.dropoffDate}
                onChange={(e) => handleChange('dropoffDate', e.target.value)}
              />
              {errors.dropoffDate && (
                <div className="form-error">
                  <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {errors.dropoffDate}
                </div>
              )}
            </div>

            {/* Drop-off Time */}
            <div className="form-group">
              <label className="form-label" htmlFor="dropoffTime">
                <Clock size={14} color="var(--text-secondary)" />
                <span>Drop-off Time</span>
              </label>
              <input
                id="dropoffTime"
                type="time"
                className={`form-input ${errors.dropoffTime ? 'has-error' : ''}`}
                value={formData.dropoffTime}
                onChange={(e) => handleChange('dropoffTime', e.target.value)}
              />
              {errors.dropoffTime && (
                <div className="form-error">
                  <AlertCircle size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {errors.dropoffTime}
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <div className="booking-actions">
              <button type="submit" className="btn btn-primary" style={{ height: '44px', width: '100%' }}>
                <Search size={16} />
                <span>View Vehicles</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
