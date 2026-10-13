/**
 * OOP Concepts Demonstrated:
 * 1. Inheritance: Car extends the base class Vehicle
 * 2. Encapsulation: Private class fields (#hourlyRate, #dailyRate) with controlled getters
 * 3. Polymorphism: Overrides calculateRentalCost(booking) to apply everyday 4-wheeler tiered pricing
 * 4. Exception Handling: Validates booking duration and rate integrity
 */

import { Vehicle } from './Vehicle.js';
import { MAX_DURATION_DAYS, MIN_DURATION_HOURS } from '../config/bookingRules.js';

export class Car extends Vehicle {
  // Private encapsulated rate fields
  #hourlyRate;
  #dailyRate;

  constructor(data) {
    super(data);

    if (typeof data.hourlyRate !== 'number' || data.hourlyRate <= 0) {
      throw new Error(`Invalid hourly rate for Car (${data.brand} ${data.model}): Must be a positive number.`);
    }
    if (typeof data.dailyRate !== 'number' || data.dailyRate <= 0) {
      throw new Error(`Invalid daily rate for Car (${data.brand} ${data.model}): Must be a positive number.`);
    }

    this.#hourlyRate = data.hourlyRate;
    this.#dailyRate = data.dailyRate;
    this.bodyType = data.bodyType || 'Sedan'; // Hatchback, Sedan, SUV
  }

  // Public getters for encapsulated fields
  get hourlyRate() {
    return this.#hourlyRate;
  }

  get dailyRate() {
    return this.#dailyRate;
  }

  /**
   * Polymorphic Implementation of calculateRentalCost
   * Rule:
   * - If duration < 24 hours: cost = hourlyRate * ceil(hours)
   * - If duration >= 24 hours: cost = dailyRate * ceil(days)
   *
   * @param {Object} booking Parameters { durationHours }
   * @returns {Object} Cost breakdown
   */
  calculateRentalCost(booking = {}) {
    const hours = Number(booking.durationHours);

    if (isNaN(hours) || hours < MIN_DURATION_HOURS) {
      throw new Error(`Rental duration must be at least ${MIN_DURATION_HOURS} hour(s). Received: ${booking.durationHours}`);
    }

    const maxHours = MAX_DURATION_DAYS * 24;
    if (hours > maxHours) {
      throw new Error(`Rental duration cannot exceed ${MAX_DURATION_DAYS} days (${maxHours} hours) for everyday cars.`);
    }

    if (hours < 24) {
      const billedHours = Math.ceil(hours);
      const baseCost = this.#hourlyRate * billedHours;
      return {
        mode: 'hourly',
        rate: this.#hourlyRate,
        rateLabel: 'hour',
        unitsBilled: billedHours,
        unitName: billedHours === 1 ? 'hour' : 'hours',
        baseCost,
        extraCost: 0,
        estimatedTotal: baseCost,
        isUnder24Hours: true,
        note: 'Billed on an hourly basis (rounded up to the next full hour).',
      };
    } else {
      const billedDays = Math.ceil(hours / 24);
      const baseCost = this.#dailyRate * billedDays;
      return {
        mode: 'daily',
        rate: this.#dailyRate,
        rateLabel: 'day',
        unitsBilled: billedDays,
        unitName: billedDays === 1 ? 'day' : 'days',
        baseCost,
        extraCost: 0,
        estimatedTotal: baseCost,
        isUnder24Hours: false,
        note: 'Billed on a 24-hour daily cycle (rounded up to the next full day).',
      };
    }
  }

  getSummary() {
    return {
      ...super.getSummary(),
      bodyType: this.bodyType,
      hourlyRate: this.#hourlyRate,
      dailyRate: this.#dailyRate,
    };
  }
}
