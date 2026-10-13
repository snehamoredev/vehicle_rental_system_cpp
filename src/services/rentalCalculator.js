/**
 * OOP Concept: Pure Functions & Polymorphic Cost Computation
 *
 * Responsibilities:
 * 1. Indian currency formatting (Intl.NumberFormat('en-IN'))
 * 2. Polymorphic delegation to Vehicle instances (calculateRentalCost called on generic Vehicle)
 * 3. Duration calculations in hours and days
 */

import { CURRENCY_LOCALE, CURRENCY } from '../config/bookingRules.js';

// Reusable formatter adhering to Indian digit grouping (e.g. ₹1,50,000)
const indianCurrencyFormatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

/**
 * Pure function: Formats number to Indian currency string
 * @param {number} amount
 * @returns {string} e.g. "₹12,000"
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return indianCurrencyFormatter.format(amount);
}

/**
 * Pure function: Computes duration in fractional hours between two dates
 * @param {string|Date} pickupDateTime
 * @param {string|Date} dropoffDateTime
 * @returns {number} hours
 */
export function calculateDurationHours(pickupDateTime, dropoffDateTime) {
  if (!pickupDateTime || !dropoffDateTime) return 0;
  const start = new Date(pickupDateTime).getTime();
  const end = new Date(dropoffDateTime).getTime();
  if (isNaN(start) || isNaN(end) || end <= start) return 0;
  const diffMs = end - start;
  return diffMs / (1000 * 60 * 60);
}

/**
 * Polymorphic Service Dispatcher
 * Calls calculateRentalCost directly on the Vehicle instance reference
 * WITHOUT checking its subclass type (Car, TwoWheeler, LuxuryCar).
 *
 * @param {import('../models/Vehicle.js').Vehicle} vehicleInstance
 * @param {Object} bookingParams
 * @returns {Object} Cost breakdown
 */
export function computeVehicleCost(vehicleInstance, bookingParams) {
  if (!vehicleInstance) {
    throw new Error('Vehicle instance is required for cost calculation.');
  }

  // Pure Polymorphism: Delegates directly to the object instance
  return vehicleInstance.calculateRentalCost(bookingParams);
}
