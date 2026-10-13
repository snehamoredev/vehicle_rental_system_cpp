/**
 * OOP Concepts Demonstrated:
 * 1. Inheritance: LuxuryCar extends the base class Vehicle
 * 2. Encapsulation: Private class fields (#pkg4hRate, #pkg8hRate, #extraHourRate, #extraKmRate)
 * 3. Polymorphism: Overrides calculateRentalCost(booking) to apply package-based chauffeur pricing
 * 4. Exception Handling: Strict defensive checks for non-negative integer extra hours and km
 */

import { Vehicle } from './Vehicle.js';

export class LuxuryCar extends Vehicle {
  // Encapsulated private pricing rates for luxury packages
  #pkg4hRate;
  #pkg8hRate;
  #extraHourRate;
  #extraKmRate;

  constructor(data) {
    super(data);

    if (typeof data.pkg4hRate !== 'number' || data.pkg4hRate <= 0) {
      throw new Error(`Invalid 4h/40km package rate for ${data.brand} ${data.model}.`);
    }
    if (typeof data.pkg8hRate !== 'number' || data.pkg8hRate <= 0) {
      throw new Error(`Invalid 8h/80km package rate for ${data.brand} ${data.model}.`);
    }
    if (typeof data.extraHourRate !== 'number' || data.extraHourRate < 0) {
      throw new Error(`Invalid extra hour rate for ${data.brand} ${data.model}.`);
    }
    if (typeof data.extraKmRate !== 'number' || data.extraKmRate < 0) {
      throw new Error(`Invalid extra km rate for ${data.brand} ${data.model}.`);
    }

    this.#pkg4hRate = data.pkg4hRate;
    this.#pkg8hRate = data.pkg8hRate;
    this.#extraHourRate = data.extraHourRate;
    this.#extraKmRate = data.extraKmRate;

    // Chauffeur-driven invariant
    this.serviceType = 'Chauffeur-driven only';
  }

  // Public getters for encapsulated fields
  get pkg4hRate() {
    return this.#pkg4hRate;
  }

  get pkg8hRate() {
    return this.#pkg8hRate;
  }

  get extraHourRate() {
    return this.#extraHourRate;
  }

  get extraKmRate() {
    return this.#extraKmRate;
  }

  /**
   * Polymorphic Implementation of calculateRentalCost
   *
   * @param {Object} booking Parameters { packageId: '4h_40km' | '8h_80km', extraHours: number, extraKm: number }
   * @returns {Object} Cost breakdown
   */
  calculateRentalCost(booking = {}) {
    const { packageId = '4h_40km', extraHours = 0, extraKm = 0 } = booking;

    // Strict validation with Exception Handling
    const parsedExtraHours = Number(extraHours);
    if (!Number.isInteger(parsedExtraHours) || parsedExtraHours < 0) {
      throw new Error('Extra hours must be a non-negative whole integer.');
    }

    const parsedExtraKm = Number(extraKm);
    if (!Number.isInteger(parsedExtraKm) || parsedExtraKm < 0) {
      throw new Error('Extra distance (km) must be a non-negative whole integer.');
    }

    let packagePrice = 0;
    let packageLabel = '';
    let includedHours = 4;
    let includedKm = 40;

    if (packageId === '8h_80km') {
      packagePrice = this.#pkg8hRate;
      packageLabel = '8 Hours / 80 km Package';
      includedHours = 8;
      includedKm = 80;
    } else {
      packagePrice = this.#pkg4hRate;
      packageLabel = '4 Hours / 40 km Package';
      includedHours = 4;
      includedKm = 40;
    }

    const extraHoursCharge = parsedExtraHours * this.#extraHourRate;
    const extraKmCharge = parsedExtraKm * this.#extraKmRate;
    const estimatedTotal = packagePrice + extraHoursCharge + extraKmCharge;

    return {
      mode: 'luxury_package',
      packageId,
      packageLabel,
      includedHours,
      includedKm,
      packagePrice,
      extraHours: parsedExtraHours,
      extraHourRate: this.#extraHourRate,
      extraHoursCharge,
      extraKm: parsedExtraKm,
      extraKmRate: this.#extraKmRate,
      extraKmCharge,
      baseCost: packagePrice,
      extraCost: extraHoursCharge + extraKmCharge,
      estimatedTotal,
      serviceType: this.serviceType,
      note: 'Luxury rentals are strictly chauffeur-driven. Fuel & Chauffeur services are included in prototype package.',
    };
  }

  getSummary() {
    return {
      ...super.getSummary(),
      serviceType: this.serviceType,
      pkg4hRate: this.#pkg4hRate,
      pkg8hRate: this.#pkg8hRate,
      extraHourRate: this.#extraHourRate,
      extraKmRate: this.#extraKmRate,
    };
  }
}
