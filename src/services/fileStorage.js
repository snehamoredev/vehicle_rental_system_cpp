/**
 * OOP Concept: Browser File Handling, JSON Serialization, and Defensive Exception Handling
 *
 * Implements client-side JSON export (via Blob & download link) and JSON import (via FileReader).
 * NOTE FOR VIVA / PRESENTATION:
 * Client-side browser web applications execute in a sandboxed runtime and cannot access Node.js
 * filesystem streams (`fs.readFile`). Hence, standard browser Blob objects and FileReader APIs
 * represent the production standard for file input/output in modern frontends.
 */

const STORAGE_KEYS = {
  WISHLIST: 'autosphere_wishlist_items',
  BOOKINGS: 'autosphere_demo_bookings',
  USER: 'autosphere_current_user',
};

/**
 * Exports arbitrary JavaScript object data as a downloadable .json file in the browser
 * @param {Object} data Serializable payload
 * @param {string} fileName Target filename
 */
export function exportToJsonFile(data, fileName = 'rental_backup.json') {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up memory
    setTimeout(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    }, 100);

    return { success: true };
  } catch (error) {
    throw new Error(`Failed to export file: ${error.message}`);
  }
}

/**
 * Reads and validates an imported JSON file from an <input type="file"> event
 * Demonstrates try/throw/catch exception handling and schema verification.
 *
 * @param {File} file
 * @returns {Promise<Object>} Resolves with parsed and validated payload
 */
export function importFromJsonFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file selected for import.'));
    }

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      return reject(new Error('Invalid file type: Please upload a valid .json file.'));
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const rawContent = event.target?.result;
        if (typeof rawContent !== 'string') {
          throw new Error('Could not read file content.');
        }

        let parsed;
        try {
          parsed = JSON.parse(rawContent);
        } catch (jsonErr) {
          throw new Error(`Malformed JSON file: Syntax error in file structure (${jsonErr.message}).`);
        }

        // Schema validation
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON structure: Root payload must be an object.');
        }

        // Check expected prototype schema
        const hasValidWishlist = Array.isArray(parsed.wishlist);
        const hasValidBookings = Array.isArray(parsed.bookings);

        if (!hasValidWishlist && !hasValidBookings) {
          throw new Error('Schema validation failed: Imported JSON must contain a "wishlist" array or "bookings" array.');
        }

        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error('Browser failed to read the file due to an I/O error.'));
    };

    reader.readAsText(file);
  });
}

/**
 * LocalStorage helpers with graceful fallback
 */
export function getStoredWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredWishlist(vehicleIds) {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(vehicleIds));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

export function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}
