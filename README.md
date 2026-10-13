# AutoSphere - Vehicle Rental System (OOP College Prototype)

An object-oriented frontend prototype of a Vehicle Rental System built with React, ES6+ JavaScript classes, and pure CSS3 for a college OOP demonstration and viva evaluation.

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- Google Chrome or any modern evergreen web browser

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (runs on port 3000)
npm run dev

# 3. Open in Google Chrome
http://localhost:3000
```

To verify code syntax and type checks:
```bash
npm run lint
```

To create a production distribution:
```bash
npm run build
```

---

## 🎯 Project Purpose & Scope
AutoSphere allows users to explore rental vehicles, compute dynamic rental costs, select pick-up/drop-off locations and schedules, manage a session wishlist, and submit demo booking enquiries.

**Academic Prototype Notice:** This application is built strictly as a collegiate prototype to demonstrate Object-Oriented Programming (OOP) architectures in JavaScript. It does NOT claim to represent an active commercial rental enterprise. There are no real payment gateways, no credit card processing, no database servers, and no background dispatch services.

---

## 💡 Object-Oriented Programming (OOP) Concepts

Refer to [`OOP_MAP.md`](./OOP_MAP.md) for the complete viva question-and-answer lookup table.

### 1. Abstract Base Class & Inheritance
- Base class `Vehicle` (`src/models/Vehicle.js`) encapsulates shared attributes (`id`, `brand`, `model`, `category`, `image`, `seats`, `fuelType`, `transmission`).
- Subclasses `Car`, `TwoWheeler`, and `LuxuryCar` extend `Vehicle` (`class Subclass extends Vehicle`), specializing behavior for four-wheelers, scooters/motorcycles, and luxury chauffeur fleets.

### 2. Polymorphism
- `calculateRentalCost(booking)` is defined on `Vehicle` as an abstract method (throws Error if called on base).
- Each subclass implements its own domain pricing formula:
  - **`Car`**: Tiered calculation (hourly rate if &lt; 24h, rounded up; daily rate if &ge; 24h, rounded up).
  - **`TwoWheeler`**: Hourly / daily calculation guarded by strict prototype limits (guaranteed between ₹100 and ₹1,000).
  - **`LuxuryCar`**: Chauffeur package pricing (4h / 40 km or 8h / 80 km) plus deterministic extra-hour and extra-kilometer additions.
- The UI and service dispatchers invoke `vehicle.calculateRentalCost(params)` on a generic `Vehicle` reference without ever checking subclass types via `if` or `instanceof`.

### 3. Encapsulation (Private Class Fields)
- Critical pricing data and availability flags use native JavaScript private fields (`#hourlyRate`, `#dailyRate`, `#pkg4hRate`, `#pkg8hRate`, `#extraHourRate`, `#extraKmRate`, `#available`).
- Outside code cannot directly mutate or corrupt rates. Access is restricted to public getters and controlled state methods.

### 4. Abstraction
- The `Vehicle` base class defines a standard interface contract (`getSummary()`, `isAvailable()`, `calculateRentalCost()`).
- Callers interact only with the interface methods, hiding internal implementation details.

### 5. Operator Overloading Note
> **Viva Technical Note:** ECMAScript (JavaScript) does **not** support operator overloading for custom user-defined classes (unlike C++ or Python). In JavaScript, attempting to simulate operator overloading (e.g. overriding `valueOf()` to make `car1 + car2` work) creates unintuitive coercion bugs. In this project, we maintain software integrity by not faking operator overloading. All arithmetic operations are explicitly executed through polymorphic methods and pure service functions.

### 6. Client-Side File Handling Note
> **Viva Technical Note:** Standard browser web applications run in a secure sandbox without access to Node.js filesystem streams (`fs.createReadStream` / `fs.writeFileSync`). Production web applications handle files through standard Web APIs:
> - **File Export:** Uses browser `Blob` objects and dynamic `URL.createObjectURL` anchor downloads to export wishlist records as valid `.json` files.
> - **File Import:** Uses the asynchronous `FileReader` API with schema validation and exception handling to parse uploaded JSON files and restore session state.

### 7. Defensive Exception Handling
- Robust `try { ... } catch (err) { ... }` blocks protect against:
  - Pick-up times inside the minimum 2-hour notice window.
  - Drop-off times scheduled before or identical to pick-up.
  - Durations outside allowed ranges (minimum 1 hour, maximum 30 days for everyday rides).
  - Negative or non-integer values for luxury extra hours / km.
  - Malformed or invalid imported JSON files.
  - User-friendly toast messages and inline validation feedback.

---

## 💎 Features Implemented

1. **Top Navigation & AutoSphere Gold Club:**
   - Single-line brand title and smooth scroll links.
   - Hover-revealed menu on desktop, click-toggled on touch, keyboard-accessible (Enter/Space to toggle, Escape to close).
   - Dedicated Gold accent (`#D4AF37`) reserved exclusively for Gold membership preview.
   - Clearly labelled as a prototype concept with zero fees and no claims of active commercial perks.

2. **Booking & Search Engine:**
   - Location selectors (popular airport and metropolitan hubs).
   - Date and time pickers with real-time inline validation.
   - Category switcher between Everyday Rides and Luxury Chauffeur Fleet.

3. **Fleet Showcase & Filters:**
   - Multi-facet filters: Category, Body Style / Classification, Available Only, Price budget, and search query.
   - Reset button to restore default views.
   - Responsive cards with subtle hover lift and rounded corners (12–16px).

4. **Everyday Rides:**
   - Hourly and daily rates clearly displayed beside units (e.g., "₹300 / hour" and "₹2,000 / day").
   - Duration-aware billing with integer ceiling rounding.
   - Two-wheeler invariant check keeping prices within ₹100–₹1,000.

5. **Luxury Chauffeur Fleet:**
   - Chauffeur-driven only, never self-drive.
   - 7 exact luxury models with exact prototype rates (BMW 7 Series, Mercedes GLS 350, Audi A6, Mercedes E-Class, Mercedes S-Class, BMW 5 Series Black, BMW 5 Series).
   - Fixed package selection (4h / 40 km or 8h / 80 km) + extra hour / extra km calculator.

6. **Interactive Detail & Calculator Modal:**
   - View high-resolution specifications, seats, transmission, fuel type.
   - Embedded interactive Cost Calculator with immediate updates.
   - Accessible modal with Escape key listener.

7. **Demo Enquiry Modal:**
   - Validates legal full name, 10-digit Indian mobile number, and email.
   - Generates unique reference code with mandated format `"VR-"` followed by 6 uppercase characters/digits (e.g., `VR-K8P9W2`).
   - Includes mandatory tax notice: *"Taxes and additional charges, if applicable, will be confirmed during enquiry."*

8. **Session Wishlist with JSON Import/Export:**
   - Heart toggle on every vehicle.
   - Persisted in browser `localStorage`.
   - Export wishlist to `.json` file and import backup JSON file with error handling.

9. **Simulated Authentication:**
   - Demo Sign In and Registration dialogs with input validation.
   - Displays active session user in top navigation.

10. **Academic Support Sections:**
    - FAQ accordion addressing viva evaluation questions.
    - Architecture & OOP overview section.
    - Contact form with prototype feedback.
    - Toast notifications for real-time feedback.

---

## ⚙️ Project File Structure
```
/
├── public/
│   └── images/
│       ├── hero/          # Hero fleet photography
│       ├── luxury/        # Luxury car photos
│       └── everyday/      # Everyday car & bike photos
├── src/
│   ├── config/
│   │   └── bookingRules.js      # Global limits, constants & currency
│   ├── models/                  # Core OOP Classes
│   │   ├── Vehicle.js           # Abstract Base Class
│   │   ├── Car.js               # Car subclass (inherits Vehicle)
│   │   ├── TwoWheeler.js        # TwoWheeler subclass (inherits Vehicle)
│   │   └── LuxuryCar.js         # LuxuryCar subclass (inherits Vehicle)
│   ├── services/                # Pure Functional Modules
│   │   ├── rentalCalculator.js  # Currency & polymorphic cost calculation
│   │   ├── bookingValidator.js  # Validation logic & error messages
│   │   ├── bookingReference.js  # VR-XXXXXX reference generation
│   │   ├── vehicleFilter.js     # Functional filter pipelines
│   │   └── fileStorage.js       # Browser Blob export & FileReader import
│   ├── data/
│   │   └── vehicles.js          # Raw fleet catalog & class instantiation
│   ├── components/              # React UI Components
│   │   ├── Navbar.jsx
│   │   ├── GoldMenu.jsx
│   │   ├── Hero.jsx
│   │   ├── BookingPanel.jsx
│   │   ├── CategorySection.jsx
│   │   ├── VehicleCard.jsx
│   │   ├── VehicleDetailModal.jsx
│   │   ├── CostCalculator.jsx
│   │   ├── EnquiryModal.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── WishlistPanel.jsx
│   │   ├── FAQ.jsx
│   │   ├── AboutUs.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Footer.jsx
│   │   └── Toast.jsx
│   ├── styles/
│   │   ├── global.css           # Global design tokens, resets & typography
│   │   └── components.css       # Clean component-specific CSS3
│   ├── App.tsx                  # Main application orchestrator
│   ├── main.tsx                 # React entry point
│   └── index.css                # CSS import bridge
├── OOP_MAP.md                   # Concept-by-concept viva cheat-sheet
├── README.md                    # Project documentation
├── metadata.json
├── index.html
└── vite.config.ts
```

---

## 📋 Simulated Features Summary
- **Authentication**: Simulated in-memory and `localStorage` session state; no server auth tokens or password hashing.
- **Payment & Booking**: Generates simulated booking reference codes (`VR-XXXXXX`); no payment gateway integration.
- **Vehicle Availability**: Deterministic availability flags stored directly on vehicle records to guarantee consistent demonstrations during presentations.
- **File System**: Utilizes browser Web APIs (`Blob` and `FileReader`) in place of server-side Node.js streams.

---

## 📌 Assumptions Made
1. **Locations:** Curated sample major airport terminals and metropolitan hubs (Bengaluru, Mumbai, New Delhi) are provided for convenience in pick-up and drop-off selection.
2. **Indian Rupee Formatting:** Formatted with `Intl.NumberFormat('en-IN')` to adhere to Indian digit grouping (e.g. ₹1,50,000) through a dedicated service formatter.
3. **Chauffeur Fuel & Driver Policy:** In the luxury chauffeur tier, the prototype package price covers fuel and chauffeur services as is standard for 4h/40km and 8h/80km luxury corporate rentals.
4. **Browser LocalStorage:** Wishlist and demo bookings persist across page reloads in the user's browser session.
