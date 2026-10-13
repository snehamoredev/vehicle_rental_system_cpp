/**
 * OOP Concept: High-Order Pure Filtering & Polymorphic Predicates
 *
 * Filters Vehicle objects using functional array pipelines without mutating the source list.
 */

/**
 * Filter vehicles across multiple facets
 *
 * @param {Array<import('../models/Vehicle.js').Vehicle>} vehicles
 * @param {Object} criteria
 * @returns {Array<import('../models/Vehicle.js').Vehicle>}
 */
export function filterVehicles(vehicles = [], criteria = {}) {
  const {
    category = 'All',
    classification = 'All',
    availableOnly = false,
    maxBudget = null,
    searchQuery = '',
    seats = 'All',
  } = criteria;

  return vehicles.filter((v) => {
    // 1. Category Filter (Everyday vs Luxury)
    if (category !== 'All' && v.category !== category) {
      return false;
    }

    // 2. Classification / Type
    if (classification !== 'All') {
      const type = v.classification || v.bodyType || v.vehicleType || '';
      if (type.toLowerCase() !== classification.toLowerCase()) {
        return false;
      }
    }

    // 3. Encapsulated Availability Filter
    if (availableOnly && !v.isAvailable()) {
      return false;
    }

    // 4. Seats filter
    if (seats !== 'All') {
      const seatsNum = Number(seats);
      if (seats === '7+' && v.seats < 7) return false;
      if (!isNaN(seatsNum) && v.seats !== seatsNum) return false;
    }

    // 5. Price budget filter
    if (maxBudget && maxBudget > 0) {
      if (v.category === 'Luxury') {
        if (v.pkg4hRate > maxBudget) return false;
      } else {
        if (v.dailyRate > maxBudget) return false;
      }
    }

    // 6. Search Query
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const name = v.getFullName().toLowerCase();
      const brand = v.brand.toLowerCase();
      const model = v.model.toLowerCase();
      const tagline = (v.tagline || '').toLowerCase();
      if (!name.includes(query) && !brand.includes(query) && !model.includes(query) && !tagline.includes(query)) {
        return false;
      }
    }

    return true;
  });
}
