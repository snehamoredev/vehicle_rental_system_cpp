/**
 * OOP Concepts Demonstrated:
 * 1. Abstraction: Defines contract and shared interface (getSummary, isAvailable, calculateRentalCost)
 * 2. Encapsulation: Private class field #available with controlled public getter/setter
 * 3. Base Class & Constructor: Initializes common identity, specifications, and availability
 */

export class Vehicle {
  // Encapsulated private field for availability status
  #available;

  /**
   * @param {Object} data Vehicle initialization data
   */
  constructor({
    id,
    brand,
    model,
    category,
    image,
    seats = 4,
    fuelType = 'Petrol',
    transmission = 'Manual',
    isAvailable = true,
    tagline = '',
  }) {
    if (!id || !brand || !model || !category) {
      throw new Error('Vehicle initialization error: Missing required identification fields (id, brand, model, category).');
    }

    this.id = id;
    this.brand = brand;
    this.model = model;
    this.category = category;
    this.image = image;
    this.seats = seats;
    this.fuelType = fuelType;
    this.transmission = transmission;
    this.tagline = tagline;

    // Encapsulated state
    this.#available = Boolean(isAvailable);
  }

  // Getter for encapsulated availability
  isAvailable() {
    return this.#available;
  }

  // Controlled setter for availability
  setAvailability(status) {
    if (typeof status !== 'boolean') {
      throw new TypeError('Availability status must be a boolean value.');
    }
    this.#available = status;
  }

  // Returns full display title
  getFullName() {
    return `${this.brand} ${this.model}`;
  }

  // Shared abstraction method: Returns a structured summary of the vehicle
  getSummary() {
    return {
      id: this.id,
      fullName: this.getFullName(),
      category: this.category,
      available: this.#available,
      seats: this.seats,
      fuelType: this.fuelType,
      transmission: this.transmission,
    };
  }

  /**
   * Abstract Polymorphic Method.
   * Must be overridden by subclasses (Car, TwoWheeler, LuxuryCar).
   * Throws an Error if invoked directly on the base class.
   *
   * @param {Object} booking Booking calculation parameters
   * @returns {Object} Cost calculation breakdown
   */
  calculateRentalCost(booking) {
    throw new Error(`calculateRentalCost() is an abstract method in Vehicle base class. Subclass ${this.constructor.name} must implement it.`);
  }
}
