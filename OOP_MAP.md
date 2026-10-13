# AutoSphere - Object-Oriented Programming (OOP) viva Map

This reference document maps every core Object-Oriented Programming (OOP) concept required by the syllabus and project specifications to its exact implementation file, class/function, and provides a concise one-line explanation tailored for oral viva examination.

---

| No. | OOP Concept | File Path | Class / Function / Field | Viva Explanation (One-Line Summary) |
|---|---|---|---|---|
| 1 | **Functions (Pure & Modular)** | `src/services/rentalCalculator.js` | `formatCurrency()`, `calculateDurationHours()`, `computeVehicleCost()` | Encapsulates business logic into deterministic, pure mathematical functions with no side effects. |
| 2 | **Functions (Validation & ID)** | `src/services/bookingValidator.js`, `src/services/bookingReference.js` | `validateBookingForm()`, `generateBookingReference()` | Implements input validation rules and regex-compliant `"VR-"` prefixed 6-character booking reference codes. |
| 3 | **Classes & Objects** | `src/models/Vehicle.js`, `src/data/vehicles.js` | `class Vehicle`, `INITIAL_VEHICLES` | Defines real-world vehicle blueprints and instantiates concrete objects into memory from catalog datasets. |
| 4 | **Constructors** | `src/models/Vehicle.js`, `src/models/Car.js`, `src/models/TwoWheeler.js`, `src/models/LuxuryCar.js` | `constructor(...)`, `super(...)` | Initializes instance attributes, invokes base constructor via `super()`, and defends against missing or invalid data. |
| 5 | **Operator Overloading Note** | `src/models/` & `README.md` | *Language Specification Note* | JavaScript ECMAScript standard does not support operator overloading for custom classes; rather than faking it with deceptive hacks, arithmetic is handled via explicit polymorphic methods. |
| 6 | **Inheritance** | `src/models/Car.js`, `src/models/TwoWheeler.js`, `src/models/LuxuryCar.js` | `class Car extends Vehicle`, `class TwoWheeler extends Vehicle`, `class LuxuryCar extends Vehicle` | Reuses and extends baseline vehicle properties and contracts across specialized categories (four-wheelers, two-wheelers, chauffeur luxury). |
| 7 | **Polymorphism** | `src/models/Vehicle.js`, `src/models/Car.js`, `src/models/TwoWheeler.js`, `src/models/LuxuryCar.js` | `calculateRentalCost(booking)` | Each subclass overrides `calculateRentalCost()`; the UI and `computeVehicleCost()` call this method on a generic `Vehicle` reference without inspecting its concrete subclass type. |
| 8 | **Encapsulation** | `src/models/Vehicle.js`, `src/models/Car.js`, `src/models/TwoWheeler.js`, `src/models/LuxuryCar.js` | `#available`, `#hourlyRate`, `#dailyRate`, `#pkg4hRate`, `#pkg8hRate`, `#extraHourRate`, `#extraKmRate` | Protects sensitive pricing states and availability flags behind private class fields (`#`) accessible solely via public getters and controlled methods. |
| 9 | **Abstraction** | `src/models/Vehicle.js` | `Vehicle.prototype.calculateRentalCost()`, `getSummary()`, `isAvailable()` | Defines high-level abstract interface; throws an explicit Error if `calculateRentalCost()` is invoked directly on the abstract base class without subclass implementation. |
| 10 | **File Handling** | `src/services/fileStorage.js` | `exportToJsonFile()`, `importFromJsonFile()` | Uses browser-native `Blob` URL downloads for JSON export and `FileReader` asynchronous parsing with schema validation for JSON import. |
| 11 | **Exception Handling** | `src/models/`, `src/services/bookingValidator.js`, `src/services/fileStorage.js` | `try { ... } catch (err) { ... }`, `throw new Error(...)` | Defensively guards against minimum notice windows (&lt;2h), invalid date order, out-of-range durations, negative extra hours/km, and corrupted JSON files with user-friendly UI toasts. |

---

## Key Viva Questions & Answers

### Q1: How is Polymorphism demonstrated in this application?
**Answer:** The base class `Vehicle` defines `calculateRentalCost(booking)`. Each subclass (`Car`, `TwoWheeler`, `LuxuryCar`) provides its own distinct mathematical implementation:
- `Car` checks if hours &lt; 24 for hourly billing vs daily billing.
- `TwoWheeler` applies minimum/maximum price guardrails (₹100–₹1,000).
- `LuxuryCar` computes package base rates plus extra hours and extra kilometers for chauffeur services.

When the UI or `computeVehicleCost(vehicle, params)` is called, it executes `vehicle.calculateRentalCost(params)`. The caller never inspects `instanceof Car` or `if (type === 'Luxury')`. The JavaScript runtime automatically dispatches to the correct subclass method based on the instantiated object.

### Q2: Why are private fields (`#`) used instead of standard object properties?
**Answer:** In classical OOP, encapsulation hides internal state so outside components cannot mutate rates or state directly (e.g., `car.#hourlyRate = 0`). Only public getters like `car.hourlyRate` are exposed for read access, ensuring state integrity and preventing tampering.

### Q3: Why doesn't the project implement operator overloading?
**Answer:** ECMAScript/JavaScript does not allow overloading mathematical operators like `+` or `*` for custom classes (unlike C++ or Python). Faking operator overloading by overriding `valueOf()` with `+` is bad engineering practice because it causes subtle type-coercion bugs. True professional practice is to document this language reality and use clear named polymorphic methods.

### Q4: How is file handling handled without a Node.js backend?
**Answer:** Client-side React runs inside a secure browser sandbox with no direct access to filesystem streams like Node's `fs`. We utilize standard browser APIs: `Blob` + `URL.createObjectURL` to serialize data into a downloadable JSON file, and `FileReader` to deserialize and validate incoming files.
