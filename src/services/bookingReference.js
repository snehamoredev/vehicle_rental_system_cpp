/**
 * OOP Concept: Pure Utility Function for Unique Identity Generation
 *
 * Mandated format: "VR-" followed by 6 uppercase letters or digits.
 * Example: VR-8P2K9M
 */

const CHAR_SET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // excluding ambiguous characters (0, O, 1, I)

/**
 * Generates a standard booking enquiry reference code
 * @returns {string} e.g. "VR-9K4M2Z"
 */
export function generateBookingReference() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * CHAR_SET.length);
    code += CHAR_SET[randomIndex];
  }
  return `VR-${code}`;
}

/**
 * Validates reference code format
 * @param {string} ref
 * @returns {boolean}
 */
export function isValidBookingReference(ref) {
  if (typeof ref !== 'string') return false;
  return /^VR-[A-Z0-9]{6}$/.test(ref);
}
