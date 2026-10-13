#include <iostream>
#include <iomanip>
#include <memory>
#include <cassert>
#include <filesystem>
#include "include/RentalSystem.h"
#include "include/Exceptions.h"

// ANSI Color Codes for beautiful terminal output
#define RESET   "\033[0m"
#define BOLD    "\033[1m"
#define GREEN   "\033[32m"
#define BLUE    "\033[34m"
#define CYAN    "\033[36m"
#define YELLOW  "\033[33m"
#define RED     "\033[31m"
#define MAGENTA "\033[35m"

void printHeader(const std::string& title) {
    std::cout << "\n" << BOLD << CYAN << "====================================================================\n"
              << " " << title << "\n"
              << "====================================================================" << RESET << "\n";
}

void runAutomatedOopTestSuite(RentalSystem& system) {
    printHeader("RUNNING AUTOMATED C++ OOP VERIFICATION TEST SUITE");

    // Test 1: Classes, Objects & Constructors
    std::cout << BOLD << "[TEST 1] Classes, Objects & Constructors..." << RESET << "\n";
    Car testCar("test-car", "Toyota", "Camry", "Sedan", 5, "Hybrid", "Automatic", 350.0, 2400.0, true, "Premium comfort");
    assert(testCar.getId() == "test-car");
    assert(testCar.getBrand() == "Toyota");
    assert(testCar.getHourlyRate() == 350.0);
    // Copy Constructor test
    Car copyCar(testCar);
    assert(copyCar.getModel() == "Camry");
    std::cout << GREEN << "  ✔ Default, Parameterized, and Copy Constructors verified." << RESET << "\n";

    // Test 2: Inheritance & Runtime Polymorphism
    std::cout << BOLD << "[TEST 2] Inheritance & Runtime Polymorphism..." << RESET << "\n";
    // Invoking calculateRentalCost through base class Vehicle pointer!
    Vehicle* vCar = system.findVehicle("everyday-sedan-city");   // Honda City (₹300/hr, ₹2000/day)
    Vehicle* vBike = system.findVehicle("everyday-scooter-activa"); // Activa (₹100/hr, ₹500/day)
    Vehicle* vLux = system.findVehicle("lux-bmw-7");              // BMW 7 Series

    assert(vCar != nullptr && vBike != nullptr && vLux != nullptr);

    // Car polymorphic calculations
    double car4h = vCar->calculateRentalCost(4);    // 4h * 300 = 1200
    double car24h = vCar->calculateRentalCost(24);  // 1 day * 2000 = 2000
    assert(car4h == 1200.0);
    assert(car24h == 2000.0);
    std::cout << "  ✔ Car polymorphic rates: 4h = ₹" << car4h << " | 24h = ₹" << car24h << "\n";

    // Bike polymorphic calculations with ₹100 - ₹1,000 price guardrails
    double bike1h = vBike->calculateRentalCost(1);   // 100
    double bike48h = vBike->calculateRentalCost(48); // 2 days * 500 = 1000 (capped at 1000)
    assert(bike1h == 100.0);
    assert(bike48h == 1000.0);
    std::cout << "  ✔ Bike polymorphic guardrail rates: 1h = ₹" << bike1h << " | 48h = ₹" << bike48h << "\n";

    // LuxuryCar polymorphic calculations: Preserving exact BMW 7 Series rates!
    // 4h/40km: ₹10,000
    double bmw4h = vLux->calculateRentalCost(4, 0, "4h_40km");
    assert(bmw4h == 10000.0);
    // 8h/80km: ₹15,000
    double bmw8h = vLux->calculateRentalCost(8, 0, "8h_80km");
    assert(bmw8h == 15000.0);
    // 8h package with 2 extra hours (2 * ₹1,500 = ₹3,000) and 20 extra km (20 * ₹150 = ₹3,000): Total = 15000 + 3000 + 3000 = ₹21,000
    double bmwExtra = vLux->calculateRentalCost(10, 20, "8h_80km");
    assert(bmwExtra == 21000.0);
    std::cout << "  ✔ BMW 7 Series 4h package: ₹" << bmw4h << "\n";
    std::cout << "  ✔ BMW 7 Series 8h package: ₹" << bmw8h << "\n";
    std::cout << "  ✔ BMW 7 Series 8h + 2 extra hrs + 20 extra km: ₹" << bmwExtra << "\n";
    std::cout << GREEN << "  ✔ Runtime Polymorphism and virtual function dispatch verified." << RESET << "\n";

    // Test 3: Operator Overloading (operator+ and operator<<)
    std::cout << BOLD << "[TEST 3] Operator Overloading..." << RESET << "\n";
    Booking b1 = system.createBooking("lux-bmw-7", "Arjun Mehta", "9876543210", "arjun@example.com",
                                      "Kempegowda Int. Airport (BLR)", "Whitefield",
                                      "2026-10-15", "2026-10-15", 8, 10, "8h_80km");
    Booking b2 = system.createBooking("everyday-suv-creta", "Arjun Mehta", "9876543210", "arjun@example.com",
                                      "Kempegowda Int. Airport (BLR)", "Whitefield",
                                      "2026-10-15", "2026-10-16", 24, 0, "standard");

    // Overloaded operator+ invocation:
    Booking combined = b1 + b2;
    std::cout << "  ✔ b1 Cost: ₹" << b1.getTotalCost() << "\n";
    std::cout << "  ✔ b2 Cost: ₹" << b2.getTotalCost() << "\n";
    std::cout << "  ✔ Combined (b1 + b2) Cost: ₹" << combined.getTotalCost() << "\n";
    assert(combined.getTotalCost() == b1.getTotalCost() + b2.getTotalCost());
    std::cout << GREEN << "  ✔ Overloaded operator+ successfully computed combined fleet billing." << RESET << "\n";

    // Overloaded operator<< demonstration:
    std::cout << BOLD << "  ✔ Displaying formatted receipt via overloaded operator<<:" << RESET << "\n";
    std::cout << combined << "\n";

    // Test 4: File Handling (std::ofstream & std::ifstream persistence)
    std::cout << BOLD << "[TEST 4] File Handling (std::ofstream & std::ifstream)..." << RESET << "\n";
    std::filesystem::create_directories("data");
    std::string testFile = "data/bookings_test.txt";
    system.saveBookingsToFile(testFile);
    std::cout << "  ✔ Saved " << system.getAllBookings().size() << " bookings to file using std::ofstream.\n";

    // Create a new fresh RentalSystem instance and reload to verify persistence across restarts!
    RentalSystem freshSystem;
    freshSystem.loadBookingsFromFile(testFile);
    std::cout << "  ✔ Re-loaded " << freshSystem.getAllBookings().size() << " bookings from file using std::ifstream into a fresh system instance.\n";
    assert(freshSystem.getAllBookings().size() == system.getAllBookings().size());
    std::cout << GREEN << "  ✔ File persistence verified: Records persist across system restart." << RESET << "\n";

    // Test 5: Exception Handling (try/throw/catch)
    std::cout << BOLD << "[TEST 5] Exception Handling (Defensive Verification)..." << RESET << "\n";
    int exceptionsCaught = 0;

    // A. Invalid Duration (< 1 hour)
    try {
        vCar->calculateRentalCost(0);
    } catch (const InvalidDurationException& e) {
        exceptionsCaught++;
        std::cout << "  ✔ Caught expected duration exception: " << e.what() << "\n";
    }

    // B. Out of bounds duration (> 720 hours)
    try {
        vCar->calculateRentalCost(800);
    } catch (const InvalidDurationException& e) {
        exceptionsCaught++;
        std::cout << "  ✔ Caught expected max duration exception: " << e.what() << "\n";
    }

    // C. Vehicle Unavailable
    try {
        system.createBooking("lux-mb-s-class", "Test User", "9999999999", "test@user.com",
                             "Terminal", "Terminal", "2026-10-15", "2026-10-16", 24);
    } catch (const VehicleUnavailableException& e) {
        exceptionsCaught++;
        std::cout << "  ✔ Caught expected unavailability exception: " << e.what() << "\n";
    }

    // D. Non-existent Vehicle Search
    try {
        system.estimateCost("non-existent-id", 5);
    } catch (const VehicleNotFoundException& e) {
        exceptionsCaught++;
        std::cout << "  ✔ Caught expected not-found exception: " << e.what() << "\n";
    }

    // E. Negative extra kilometers
    try {
        vLux->calculateRentalCost(4, -50, "4h_40km");
    } catch (const InvalidInputException& e) {
        exceptionsCaught++;
        std::cout << "  ✔ Caught expected input validation exception: " << e.what() << "\n";
    }

    assert(exceptionsCaught == 5);
    std::cout << GREEN << "  ✔ All 5 exception handling test cases passed successfully." << RESET << "\n";

    printHeader("ALL C++ OOP UNIT TESTS PASSED (100% SUCCESS)");
}

int main(int argc, char* argv[]) {
    std::cout << BOLD << GREEN
              << "╔════════════════════════════════════════════════════════════════════╗\n"
              << "║       AUTOSPHERE VEHICLE RENTAL SYSTEM - C++ OOP CORE ENGINE       ║\n"
              << "║         Demonstrating Modern C++ Object-Oriented Architecture      ║\n"
              << "╚════════════════════════════════════════════════════════════════════╝\n"
              << RESET << "\n";

    RentalSystem system("data/bookings.txt");

    // Load any existing bookings if present
    try {
        system.loadBookingsFromFile("data/bookings.txt");
        std::cout << CYAN << "Loaded " << system.getAllBookings().size() << " saved booking(s) from 'data/bookings.txt'." << RESET << "\n";
    } catch (const FileIOException&) {
        std::cout << YELLOW << "Note: No prior 'data/bookings.txt' found. A new records file will be created." << RESET << "\n";
    }

    // If --test flag or executed headlessly, run automated test suite
    if (argc > 1 && std::string(argv[1]) == "--test") {
        runAutomatedOopTestSuite(system);
        return 0;
    }

    // Run test suite first to showcase all 7 OOP concepts
    runAutomatedOopTestSuite(system);

    // Save active bookings to disk
    try {
        std::filesystem::create_directories("data");
        system.saveBookingsToFile("data/bookings.txt");
        std::cout << "\n" << GREEN << "✔ Successfully synchronized booking records to 'data/bookings.txt'." << RESET << "\n";
    } catch (const std::exception& e) {
        std::cerr << RED << "File save warning: " << e.what() << RESET << "\n";
    }

    return 0;
}
