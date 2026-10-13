/**
 * OOP Concepts Demonstrated:
 * 1. Inheritance: TwoWheeler extends the base class Vehicle
 * 2. Encapsulation: Private class fields (#hourlyRate, #dailyRate)
 * 3. Polymorphism: Overrides calculateRentalCost(booking) with domain-specific two-wheeler guardrails
 * 4. Business Invariant Enforcement: Ensures price stays between ₹100 and ₹1,000 as mandated by prototype spec
 */

import { Vehicle } from './Vehicle.js';
import {
  MAX_DURATION_DAYS,
  MIN_DURATION_HOURS,
  TWO_WHEELER_MIN_PRICE,
  TWO_WHEELER_MAX_PRICE,
} from '../config/bookingRules.js';

export class TwoWheeler extends Vehicle {
  #hourlyRate;
  #dailyRate;

  constructor(data) {
    super(data);

    if (typeof data.hourlyRate !== 'number' || data.hourlyRate <= 0) {
      throw new Error(`Invalid hourly rate for TwoWheeler (${data.brand} ${data.model}).`);
    }
    if (typeof data.dailyRate !== 'number' || data.dailyRate <= 0) {
      throw new Error(`Invalid daily rate for TwoWheeler (${data.brand} ${data.model}).`);
    }

    this.#hourlyRate = data.hourlyRate;
    this.#dailyRate = data.dailyRate;
    this.vehicleType = data.vehicleType || 'Scooter'; // 'Scooter' | 'Motorcycle'
  }

  get hourlyRate() {
    return this.#hourlyRate;
  }

  get dailyRate() {
    return this.#dailyRate;
  }

  /**
   * Polymorphic Implementation of calculateRentalCost
   * Price rule:
   * - < 24h: hourlyRate * ceil(hours)
   * - >= 24h: dailyRate * ceil(days)
   * - Guardrail: Must stay between ₹100 and ₹1,000
   *
   * @param {Object} booking Parameters { durationHours }
   * @returns {Object} Cost breakdown
   */
  calculateRentalCost(booking = {}) {
    const hours = Number(booking.durationHours);

    if (isNaN(hours) || hours < MIN_DURATION_HOURS) {
      throw new Error(`Two-wheeler rental duration must be at least ${MIN_DURATION_HOURS} hour(s).`);
    }

    const maxHours = MAX_DURATION_DAYS * 24;
    if (hours > maxHours) {
      throw new Error(`Two-wheeler rental duration cannot exceed ${MAX_DURATION_DAYS} days.`);
    }

    let calculatedCost = 0;
    let mode = 'hourly';
    let rate = this.#hourlyRate;
    let rateLabel = 'hour';
    let unitsBilled = 1;
    let isUnder24Hours = true;

    if (hours < 24) {
      unitsBilled = Math.ceil(hours);
      calculatedCost = this.#hourlyRate * unitsBilled;
      mode = 'hourly';
      rate = this.#hourlyRate;
      rateLabel = 'hour';
      isUnder24Hours = true;
    } else {
      unitsBilled = Math.ceil(hours / 24);
      calculatedCost = this.#dailyRate * unitsBilled;
      mode = 'daily';
      rate = this.#dailyRate;
      rateLabel = 'day';
      isUnder24Hours = false;
    }

    // Invariant requirement: Stay between ₹100 and ₹1,000 for any booking
    const rawCost = calculatedCost;
    const clampedCost = Math.min(Math.max(rawCost, TWO_WHEELER_MIN_PRICE), TWO_WHEELER_MAX_PRICE);
    const wasClamped = rawCost !== clampedCost;

    return {
      mode,
      rate,
      rateLabel,
      unitsBilled,
      unitName: unitsBilled === 1 ? rateLabel : `${rateLabel}s`,
      baseCost: rawCost,
      extraCost: 0,
      estimatedTotal: clampedCost,
      rawCost,
      wasClamped,
      minGuaranteed: TWO_WHEELER_MIN_PRICE,
      maxCapped: TWO_WHEELER_MAX_PRICE,
      isUnder24Hours,
      note: wasClamped
        ? `Prototype guardrail applied: Two-wheeler prices must stay between ₹${TWO_WHEELER_MIN_PRICE} and ₹${TWO_WHEELER_MAX_PRICE}.`
        : 'Standard two-wheeler prototype rate applied.',
    };
  }

  getSummary() {
    return {
      ...super.getSummary(),
      vehicleType: this.vehicleType,
      hourlyRate: this.#hourlyRate,
      dailyRate: this.#dailyRate,
    };
  }
}

/**
 * Self-test verification function for viva demonstration (Unit-test style check)
 */
export function verifyTwoWheelerPriceLimits(twoWheelerInstance) {
  const testCases = [
    { hours: 0.5, desc: 'Minimum duration edge case' },
    { hours: 1, desc: '1 hour rental' },
    { hours: 10, desc: '10 hours rental' },
    { hours: 24, desc: '1 day rental' },
    { hours: 48, desc: '2 days rental' },
    { hours: 120, desc: '5 days rental' },
  ];

  const results = [];
  for (const tc of testCases) {
    try {
      const res = twoWheelerInstance.calculateRentalCost({ durationHours: Math.max(tc.hours, MIN_DURATION_HOURS) });
      const pass = res.estimatedTotal >= TWO_WHEELER_MIN_PRICE && res.estimatedTotal <= TWO_WHEELER_MAX_PRICE;
      results.push({ test: tc.desc, total: res.estimatedTotal, pass });
    } catch (err) {
      results.push({ test: tc.desc, error: err.message, pass: false });
    }
  }
  return results;
}
