/**
 * OOP Concept: Configuration Management & Encapsulation of Global Business Rules
 *
 * NOTE: These are proposed prototype rules designed for a college OOP demonstration,
 * NOT verified policies of a commercial rental enterprise.
 */

export const MIN_DURATION_HOURS = 1;
export const MAX_DURATION_DAYS = 30; // regular cars and two-wheelers
export const MIN_NOTICE_HOURS = 2; // earliest pick-up is now + 2 hours

export const LUXURY_PACKAGES = [
  { id: '4h_40km', hours: 4, km: 40, label: '4 Hours / 40 km' },
  { id: '8h_80km', hours: 8, km: 80, label: '8 Hours / 80 km' },
];

export const CURRENCY = 'INR';
export const CURRENCY_LOCALE = 'en-IN';

export const TAX_NOTE = 'Taxes and additional charges, if applicable, will be confirmed during enquiry.';

// Constraints for TwoWheeler pricing guardrails
export const TWO_WHEELER_MIN_PRICE = 100;
export const TWO_WHEELER_MAX_PRICE = 1000;

export const POPULAR_LOCATIONS = [
  'Kempegowda Int. Airport (BLR), Bengaluru',
  'Indiranagar Metro Terminal, Bengaluru',
  'Koramangala 5th Block, Bengaluru',
  'Whitefield Tech Hub, Bengaluru',
  'Chhatrapati Shivaji Maharaj Airport (BOM), Mumbai',
  'Bandra Kurla Complex (BKC), Mumbai',
  'Connaught Place, New Delhi',
  'IGI Airport Terminal 3, New Delhi',
];
