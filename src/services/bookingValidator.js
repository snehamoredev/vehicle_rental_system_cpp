/**
 * OOP Concept: Business Rule Validation & Exception Handling (Defensive Programming)
 *
 * Validates date ranges, notice windows, duration boundaries, and user input.
 * Provides granular field-level error messages for clean UI inline feedback.
 */

import {
  MIN_DURATION_HOURS,
  MAX_DURATION_DAYS,
  MIN_NOTICE_HOURS,
} from '../config/bookingRules.js';

/**
 * Validates search and booking panel parameters
 *
 * @param {Object} formData
 * @returns {{ isValid: boolean, errors: Object.<string, string>, durationHours: number }}
 */
export function validateBookingForm(formData) {
  const errors = {};
  const {
    pickupLocation,
    dropoffLocation,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    category,
  } = formData;

  // 1. Required fields
  if (!pickupLocation || !pickupLocation.trim()) {
    errors.pickupLocation = 'Pick-up location is required.';
  }

  if (!dropoffLocation || !dropoffLocation.trim()) {
    errors.dropoffLocation = 'Drop-off location is required.';
  }

  if (!pickupDate) {
    errors.pickupDate = 'Pick-up date is required.';
  }
  if (!pickupTime) {
    errors.pickupTime = 'Pick-up time is required.';
  }
  if (!dropoffDate) {
    errors.dropoffDate = 'Drop-off date is required.';
  }
  if (!dropoffTime) {
    errors.dropoffTime = 'Drop-off time is required.';
  }

  // 2. Date/Time checks if fields are present
  let durationHours = 0;
  if (pickupDate && pickupTime && dropoffDate && dropoffTime) {
    const pickupCombined = new Date(`${pickupDate}T${pickupTime}`);
    const dropoffCombined = new Date(`${dropoffDate}T${dropoffTime}`);
    const now = new Date();

    if (isNaN(pickupCombined.getTime())) {
      errors.pickupDate = 'Invalid pick-up date or time format.';
    }
    if (isNaN(dropoffCombined.getTime())) {
      errors.dropoffDate = 'Invalid drop-off date or time format.';
    }

    if (!errors.pickupDate && !errors.dropoffDate) {
      // Rule: Earliest pick-up is now + MIN_NOTICE_HOURS (2 hours)
      const minPickupTime = new Date(now.getTime() + MIN_NOTICE_HOURS * 60 * 60 * 1000);
      if (pickupCombined < minPickupTime) {
        errors.pickupTime = `Pick-up must be at least ${MIN_NOTICE_HOURS} hours in advance.`;
      }

      // Rule: Drop-off strictly after pick-up
      if (dropoffCombined <= pickupCombined) {
        errors.dropoffDate = 'Drop-off must be strictly after the pick-up time.';
        errors.dropoffTime = 'Drop-off time must be later than pick-up.';
      } else {
        const diffMs = dropoffCombined.getTime() - pickupCombined.getTime();
        durationHours = diffMs / (1000 * 60 * 60);

        // Rule: Duration at least MIN_DURATION_HOURS
        if (durationHours < MIN_DURATION_HOURS) {
          errors.dropoffTime = `Minimum rental duration is ${MIN_DURATION_HOURS} hour. Current: ${durationHours.toFixed(1)} hrs.`;
        }

        // Rule: Regular cars & two-wheelers max duration 30 days
        if (category !== 'Luxury' && durationHours > MAX_DURATION_DAYS * 24) {
          errors.dropoffDate = `Everyday rentals cannot exceed ${MAX_DURATION_DAYS} days (720 hours).`;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    durationHours,
  };
}

/**
 * Validates enquiry form inputs
 *
 * @param {Object} enquiryData
 * @returns {{ isValid: boolean, errors: Object.<string, string> }}
 */
export function validateEnquiryForm(enquiryData) {
  const errors = {};
  const { name, phone, email } = enquiryData;

  if (!name || name.trim().length < 2) {
    errors.name = 'Please provide your full legal name (at least 2 characters).';
  }

  // Indian phone number regex check: 10 digits starting with 6, 7, 8, or 9
  const phoneClean = (phone || '').replace(/\D/g, '');
  if (!phoneClean || phoneClean.length !== 10 || !/^[6-9]\d{9}$/.test(phoneClean)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  // Basic email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates authentication mock forms (login/register)
 */
export function validateAuthForm(data, isRegister = false) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (isRegister) {
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Full name is required.';
    }
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
