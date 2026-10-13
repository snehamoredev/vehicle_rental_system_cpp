# AutoSphere - C++ OOP Core Architecture & Integration Guide

This document details the conversion of the **AutoSphere Vehicle Rental System** core domain logic to modern C++ (C++17) using Object-Oriented Programming (OOP) concepts, while preserving the full frontend design, styling, and user experience.

---

## 1. Overall System Architecture

### The Browser & C++ Execution Reality
Web browsers natively execute **HTML, CSS, and JavaScript/WebAssembly**. A web browser's JavaScript engine (like Google Chrome's V8) cannot directly run native x86/ARM C++ machine code binary files (`.exe` or ELF binaries). 

Therefore, a real-world C++ web application adopts one of two technically sound, production-proven architectures:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CLIENT BROWSER (Vite + React)                        │
│   HTML5 + CSS3 (Dark Navy & Emerald Theme) + Responsive UI Components  │
│        [Everyday Rides] [Luxury Chauffeur Fleet] [Search & Date]       │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                                       │
                 ▼                                       ▼
    [Architecture Option A]                 [Architecture Option B]
   WebAssembly / Emscripten             Native C++ Backend / Desktop Engine
   • C++ compiled via emcc              • C++ compiled via g++ / MSVC
   • Runs directly in browser sandbox   • Native binary runs on host
   • High performance in-page math      • Direct disk file streams (I/O)
```

1. **Architecture Option A (WebAssembly via Emscripten):**
   - The C++ classes are compiled using the Emscripten toolchain (`emcc`) to a `.wasm` binary module.
   - The browser loads `autosphere_engine.wasm` via WebAssembly JavaScript bindings.
   - Core pricing calculations, input validations, and booking aggregations run directly inside the browser using compiled C++ bytecode.

2. **Architecture Option B (Native C++ Engine & Desktop / CLI Integration):**
   - The exact same C++ codebase compiles natively with standard `g++`, `clang++`, or `cl.exe` (MSVC) into a standalone native executable (`autosphere_cpp` or `autosphere_cpp.exe`).
   - Uses real OS file streams (`std::ofstream`, `std::ifstream`) to read and write records to `data/bookings.txt`.
   - Offers an automated test suite (`--test`) and interactive menu for evaluation, viva defense, and automated testing.

In this project, **both architectures share the exact same clean C++ OOP codebase** in `cpp/`.

---

## 2. File-by-File Project Structure

```
autosphere/
├── cpp/                                # C++ Object-Oriented Core Engine
│   ├── include/
│   │   ├── Exceptions.h                # Custom C++ exception hierarchy
│   │   ├── Vehicle.h                   # Abstract Base Class definition
│   │   ├── Car.h                       # Derived Car/SUV Class definition
│   │   ├── Bike.h                      # Derived Two-Wheeler Class definition
│   │   ├── LuxuryCar.h                 # Derived Luxury Chauffeur Class definition
│   │   ├── Booking.h                   # Booking entity & Operator Overloading
│   │   └── RentalSystem.h              # Fleet Manager, File I/O & Domain Facade
│   ├── src/
│   │   ├── Vehicle.cpp                 # Vehicle implementations & virtual methods
│   │   ├── Car.cpp                     # Car tiered hourly/daily pricing logic
│   │   ├── Bike.cpp                    # Bike guardrail clamping (₹100–₹1,000)
│   │   ├── LuxuryCar.cpp               # BMW 7 Series package calculations
│   │   ├── Booking.cpp                 # Operator+ and stream << implementations
│   │   └── RentalSystem.cpp            # File streams (ifstream/ofstream) & catalog
│   ├── main.cpp                        # Standalone executable driver & test suite
│   ├── Makefile                        # Linux/macOS build script
│   └── CMakeLists.txt                  # Windows / VS Code CMake configuration
├── data/
│   └── bookings.txt                    # Persistent disk stream storage for bookings
├── src/                                # Frontend UI (Preserving 100% of Original Design)
│   ├── components/
│   │   ├── Navbar.jsx                  # Top bar with C++ Engine Console trigger
│   │   ├── CppEngineModal.jsx          # Live Interactive C++ Engine Inspector
│   │   ├── Hero.jsx                    # Hero presentation & visuals
│   │   ├── BookingPanel.jsx            # Location, date/time pickers & validation
│   │   ├── CategorySection.jsx         # Everyday Rides vs Luxury Chauffeur
│   │   ├── VehicleCard.jsx             # Card displays with accurate fleet rates
│   │   ├── VehicleDetailModal.jsx      # Detail modal with fare estimator
│   │   ├── CostCalculator.jsx          # Interactive rate calculator
│   │   ├── EnquiryModal.jsx            # Confirmed reservation flow
│   │   ├── LoginForm.jsx               # Account login dialog
│   │   ├── RegisterForm.jsx            # Account registration dialog
│   │   ├── WishlistPanel.jsx           # Saved fleet drawer & JSON export
│   │   ├── FAQ.jsx                     # Customer FAQ questions
│   │   ├── AboutUs.jsx                 # Fleet standards & service commitments
│   │   ├── ContactForm.jsx             # 24/7 Concierge contact desk
│   │   └── Footer.jsx                  # Site footer & corporate links
│   ├── styles/
│   │   ├── global.css                  # Dark navy, white & emerald design tokens
│   │   └── components.css              # Component styling
│   ├── App.tsx                         # Root application orchestrator
│   └── main.tsx                        # Web entry point
├── CPP_ARCHITECTURE.md                 # Complete C++ Architecture & Viva Guide
└── README.md                           # Project documentation & setup steps
```

---

## 3. Demonstration of the 7 Required C++ OOP Concepts

### A. Classes and Objects
- **`Vehicle`**: Abstract base blueprint encapsulating common identity (`id`, `brand`, `model`, `category`, `seats`, `fuelType`, `transmission`, `available`).
- **`Car`**, **`Bike`**, **`LuxuryCar`**: Concrete vehicle objects representing four-wheelers, two-wheelers, and executive chauffeur vehicles.
- **`Booking`**: Models customer reservations, billing amounts, and schedules.
- **`RentalSystem`**: Coordinates dynamic fleet storage (`std::vector<std::unique_ptr<Vehicle>>`) and persistent bookings.

### B. Constructors (Default, Parameterized, Copy)
Every entity implements default, parameterized, and copy constructors:
```cpp
// 1. Parameterized Constructor calling base constructor
Car::Car(const std::string& id, const std::string& brand, const std::string& model,
         const std::string& bodyType, int seats, const std::string& fuelType,
         const std::string& transmission, double hourlyRate, double dailyRate,
         bool available, const std::string& tagline)
    : Vehicle(id, brand, model, "Everyday", seats, fuelType, transmission, available, tagline),
      hourlyRate(hourlyRate), dailyRate(dailyRate), bodyType(bodyType) {}

// 2. Copy Constructor
Car::Car(const Car& other)
    : Vehicle(other),
      hourlyRate(other.hourlyRate), dailyRate(other.dailyRate), bodyType(other.bodyType) {}
```

### C. Inheritance
Derived classes inherit common state and public interfaces from `Vehicle` while adding domain-specific fields:
- `class Car : public Vehicle` adds `bodyType`, `hourlyRate`, `dailyRate`.
- `class Bike : public Vehicle` adds `bikeType`, `hourlyRate`, `dailyRate`.
- `class LuxuryCar : public Vehicle` adds `pkg4hRate`, `pkg8hRate`, `extraHourRate`, `extraKmRate`, `serviceType`.

### D. Runtime Polymorphism & Function Overloading
- **Virtual Function**: `virtual double calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const = 0;`
- **Dynamic Dispatch**: `RentalSystem` calls `v->calculateRentalCost(...)` via generic `Vehicle*` pointer. The C++ vtable dispatches to the correct subclass at runtime:
  - **`Car`**:
    - Under 24 hours: `hourlyRate * durationHours`
    - 24 hours or more: `dailyRate * ceil(durationHours / 24.0)`
  - **`Bike`**:
    - Clamped between **₹100 and ₹1,000** as mandated by the prototype specification.
  - **`LuxuryCar`**:
    - Selects 4h/40km or 8h/80km package base fare.
    - Adds extra hours (`extraHours * extraHourRate`).
    - Adds extra distance (`extraKm * extraKmRate`).
- **Function Overloading**:
  - `Vehicle::calculateRentalCost(int durationHours)` vs `Vehicle::calculateRentalCost(int durationHours, int extraKm, const std::string& packageType)`
  - `RentalSystem::findVehicle(const std::string& id)` vs `RentalSystem::findVehicle(const std::string& brand, const std::string& model)`

### E. Operator Overloading
1. **`Booking::operator+` (Combining Bookings)**:
   Overloaded `+` operator enables intuitive calculation of combined fleet reservations:
   ```cpp
   Booking Booking::operator+(const Booking& other) const {
       std::string combinedRef = reference + "&" + other.reference;
       std::string combinedVehicles = vehicleName + " + " + other.vehicleName;
       double combinedCost = totalCost + other.totalCost;
       // ... returns new aggregate Booking object
   }
   ```
2. **`operator<<` (Stream Insertion)**:
   Overloaded `<<` formats booking receipts directly for `std::cout` and file logging.
3. **`operator==`**:
   Compares booking reference equality.

### F. File Handling (C++ File Streams)
The `RentalSystem` uses C++ file streams (`std::ofstream` and `std::ifstream`) to ensure booking records persist across sessions:
```cpp
// Writing with std::ofstream
void RentalSystem::saveBookingsToFile(const std::string& filePath) const {
    std::ofstream outFile(filePath, std::ios::out | std::ios::trunc);
    if (!outFile.is_open()) throw FileIOException("Cannot write to " + filePath);
    for (const auto& b : bookings) {
        outFile << b.toFileRecord() << "\n";
    }
    outFile.close();
}

// Reading with std::ifstream
void RentalSystem::loadBookingsFromFile(const std::string& filePath) {
    std::ifstream inFile(filePath);
    if (!inFile.is_open()) throw FileIOException("Cannot read from " + filePath);
    std::string line;
    while (std::getline(inFile, line)) {
        if (!line.empty()) bookings.push_back(Booking::fromFileRecord(line));
    }
    inFile.close();
}
```

### G. Exception Handling
Custom exception hierarchy derived from `std::runtime_error`:
- `InvalidDurationException`: Thrown when duration &lt; 1 hour or &gt; 720 hours (30 days).
- `VehicleUnavailableException`: Thrown when attempting to book a reserved vehicle (e.g. Mercedes S-Class).
- `VehicleNotFoundException`: Thrown when searching for an invalid vehicle ID.
- `InvalidInputException`: Thrown on negative extra km or empty customer contact info.
- `FileIOException`: Thrown if disk storage cannot be opened.

---

## 4. Exact Pricing Rules Preserved (BMW 7 Series & Fleet)

| Vehicle | Tier | Base Rate / Package | Extra Rates |
|---|---|---|---|
| **BMW 7 Series Signature Edition** | Luxury (Chauffeur) | **4h / 40 km: ₹10,000**<br>**8h / 80 km: ₹15,000** | **Extra hr: ₹1,500**<br>**Extra km: ₹150** |
| **Mercedes-Benz GLS 350 4MATIC** | Luxury (Chauffeur) | 4h / 40 km: ₹12,000<br>8h / 80 km: ₹16,000 | Extra hr: ₹1,600<br>Extra km: ₹160 |
| **Audi A6 Matrix** | Luxury (Chauffeur) | 4h / 40 km: ₹6,000<br>8h / 80 km: ₹9,000 | Extra hr: ₹600<br>Extra km: ₹60 |
| **Mercedes-Benz E-Class Avant-garde** | Luxury (Chauffeur) | 4h / 40 km: ₹5,500<br>8h / 80 km: ₹8,500 | Extra hr: ₹850<br>Extra km: ₹85 |
| **Mercedes-Benz S-Class 2022** | Luxury (Reserved) | 4h / 40 km: ₹10,000<br>8h / 80 km: ₹15,000 | Extra hr: ₹1,500<br>Extra km: ₹150 |
| **BMW 5 Series Luxury Line** | Luxury (Chauffeur) | 4h / 40 km: ₹6,000<br>8h / 80 km: ₹9,000 | Extra hr: ₹900<br>Extra km: ₹90 |
| **BMW 5 Series** | Luxury (Chauffeur) | 4h / 40 km: ₹5,500<br>8h / 80 km: ₹8,500 | Extra hr: ₹850<br>Extra km: ₹85 |
| **Hyundai Creta SX(O)** | Everyday (SUV) | ₹450 / hour | ₹3,000 / day |
| **Mahindra XUV700 AX7** | Everyday (SUV) | ₹450 / hour | ₹3,000 / day |
| **Honda City ZX** | Everyday (Sedan) | ₹300 / hour | ₹2,000 / day |
| **Maruti Suzuki Swift** | Everyday (Hatchback) | ₹300 / hour | ₹2,000 / day |
| **Royal Enfield Classic 350** | Everyday (Motorcycle) | ₹150 / hour | ₹800 / day (₹100–₹1,000 capped) |
| **Honda Activa 6G** | Everyday (Scooter) | ₹100 / hour | ₹500 / day (₹100–₹1,000 capped) |

---

## 5. Development Environment Setup (Windows & VS Code)

### Prerequisites on Windows
1. **VS Code**: Download and install [VS Code](https://code.visualstudio.com/).
2. **C++ Compiler (MinGW-w64 / GCC)**:
   - Download the MinGW-w64 installer or use MSYS2 (`pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-make`).
   - Add `C:\msys64\mingw64\bin` to your Windows `PATH` environment variable.
   - Verify in Command Prompt: `g++ --version`
3. **VS Code Extensions**:
   - Install **C/C++** (by Microsoft).
   - Install **CMake Tools** (by Microsoft).

### Building and Running on Windows (VS Code Terminal)

#### Method 1: Direct Command Line (Quickest)
```bash
# Navigate to cpp folder
cd cpp

# Compile all source files into autosphere_cpp.exe
g++ -std=c++17 -Wall -Wextra -Iinclude src/*.cpp main.cpp -o autosphere_cpp.exe

# Run the automated unit test suite
./autosphere_cpp.exe --test

# Run the normal application
./autosphere_cpp.exe
```

#### Method 2: Using CMake in VS Code
```bash
cd cpp
mkdir build
cd build
cmake ..
cmake --build .
./autosphere_cpp.exe
```

### Building on Linux / macOS
```bash
cd cpp
make clean
make
./autosphere_cpp --test
```

### Compiling to WebAssembly using Emscripten (Optional WASM Mode)
```bash
# Install emsdk from https://github.com/emscripten-core/emsdk
emcc -std=c++17 -O3 -Iinclude src/*.cpp -s WASM=1 -o autosphere_wasm.js
```

---

## 6. Sample Program Output (`./autosphere_cpp --test`)

```text
╔════════════════════════════════════════════════════════════════════╗
║       AUTOSPHERE VEHICLE RENTAL SYSTEM - C++ OOP CORE ENGINE       ║
║         Demonstrating Modern C++ Object-Oriented Architecture      ║
╚════════════════════════════════════════════════════════════════════╝

====================================================================
 RUNNING AUTOMATED C++ OOP VERIFICATION TEST SUITE
====================================================================
[TEST 1] Classes, Objects & Constructors...
  ✔ Default, Parameterized, and Copy Constructors verified.
[TEST 2] Inheritance & Runtime Polymorphism...
  ✔ Car polymorphic rates: 4h = ₹1200 | 24h = ₹2000
  ✔ Bike polymorphic guardrail rates: 1h = ₹100 | 48h = ₹1000
  ✔ BMW 7 Series 4h package: ₹10000
  ✔ BMW 7 Series 8h package: ₹15000
  ✔ BMW 7 Series 8h + 2 extra hrs + 20 extra km: ₹21000
  ✔ Runtime Polymorphism and virtual function dispatch verified.
[TEST 3] Operator Overloading...
  ✔ b1 Cost: ₹16500
  ✔ b2 Cost: ₹3000
  ✔ Combined (b1 + b2) Cost: ₹19500
  ✔ Overloaded operator+ successfully computed combined fleet billing.
  ✔ Displaying formatted receipt via overloaded operator<<:
--------------------------------------------------------
 AUTO-SPHERE BOOKING RECEIPT #VR-A2KMT4&VR-TQAB95
--------------------------------------------------------
 Vehicle  : BMW 7 Series Signature Edition + Hyundai Creta SX(O) [Combined Fleet]
 Customer : Arjun Mehta (9876543210)
 Email    : arjun@example.com
 Pickup   : Kempegowda Int. Airport (BLR) (2026-10-15)
 Dropoff  : Whitefield (2026-10-15)
 Duration : 24 hrs | Extra Distance: 10 km
 Total Due: ₹19500.00
 Status   : Confirmed (Active Reservation)
--------------------------------------------------------
[TEST 4] File Handling (std::ofstream & std::ifstream)...
  ✔ Saved 2 bookings to file using std::ofstream.
  ✔ Re-loaded 2 bookings from file using std::ifstream into a fresh system instance.
  ✔ File persistence verified: Records persist across system restart.
[TEST 5] Exception Handling (Defensive Verification)...
  ✔ Caught expected duration exception: Duration Error: Rental duration must be at least 1 hour.
  ✔ Caught expected max duration exception: Duration Error: Everyday car rentals cannot exceed 30 days (720 hours).
  ✔ Caught expected unavailability exception: Availability Error: Vehicle 'Mercedes-Benz S-Class 2022' is currently reserved.
  ✔ Caught expected not-found exception: Search Error: Vehicle with ID 'non-existent-id' does not exist in catalog.
  ✔ Caught expected input validation exception: Input Validation Error: Extra kilometers cannot be negative.
  ✔ All 5 exception handling test cases passed successfully.

====================================================================
 ALL C++ OOP UNIT TESTS PASSED (100% SUCCESS)
====================================================================
```
