#ifndef RENTALSYSTEM_H
#define RENTALSYSTEM_H

#include <vector>
#include <memory>
#include <string>
#include <iostream>
#include "Vehicle.h"
#include "Car.h"
#include "Bike.h"
#include "LuxuryCar.h"
#include "Booking.h"
#include "Exceptions.h"

/**
 * OOP Concepts Demonstrated:
 * 1. Classes and Objects: Central domain facade coordinating vehicle fleet and bookings
 * 2. Polymorphism: Container of std::unique_ptr<Vehicle> calls calculateRentalCost() without downcasting
 * 3. File Handling: Persistence via std::ofstream and std::ifstream to "data/bookings.txt"
 * 4. Exception Handling: Handles file errors, out-of-bounds queries, and booking conflicts
 * 5. Operator Overloading: Integrates operator+ on Booking objects for fleet aggregations
 */

class RentalSystem {
private:
    std::vector<std::unique_ptr<Vehicle>> fleet;
    std::vector<Booking> bookings;
    std::string dataFilePath;

    // Helper: Generates "VR-" + 6 alphanumeric character reference code
    std::string generateReferenceCode() const;

public:
    // 1. Default Constructor
    RentalSystem();

    // 2. Parameterized Constructor
    explicit RentalSystem(const std::string& storagePath);

    // Destructor
    ~RentalSystem();

    // Fleet Catalog Management
    void addVehicle(std::unique_ptr<Vehicle> vehicle);
    void initializeDefaultFleet();
    size_t getFleetCount() const;

    // Search and Lookup (Function Overloading)
    Vehicle* findVehicle(const std::string& id);
    const Vehicle* findVehicle(const std::string& id) const;
    Vehicle* findVehicle(const std::string& brand, const std::string& model);

    // Display
    void displayFleet(const std::string& category = "All", std::ostream& os = std::cout) const;
    void displayBookings(std::ostream& os = std::cout) const;

    // Polymorphic Rate Estimator
    double estimateCost(const std::string& vehicleId,
                        int durationHours,
                        int extraKm = 0,
                        const std::string& packageType = "4h_40km") const;

    // Booking Lifecycle
    Booking createBooking(const std::string& vehicleId,
                          const std::string& customerName,
                          const std::string& customerPhone,
                          const std::string& customerEmail,
                          const std::string& pickupLocation,
                          const std::string& dropoffLocation,
                          const std::string& pickupDate,
                          const std::string& dropoffDate,
                          int durationHours,
                          int extraKm = 0,
                          const std::string& packageType = "4h_40km");

    Booking* findBooking(const std::string& reference);
    const std::vector<Booking>& getAllBookings() const;

    // Operator Overloading Demonstration (Combines two bookings using operator+)
    Booking combineBookings(const std::string& ref1, const std::string& ref2);

    // File Handling (C++ File Streams)
    void saveBookingsToFile(const std::string& filePath = "") const;
    void loadBookingsFromFile(const std::string& filePath = "");
};

#endif // RENTALSYSTEM_H
