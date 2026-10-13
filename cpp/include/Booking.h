#ifndef BOOKING_H
#define BOOKING_H

#include <string>
#include <iostream>
#include "Vehicle.h"

/**
 * OOP Concepts Demonstrated:
 * 1. Classes and Objects: Models a rental reservation entity
 * 2. Constructors: Default, Parameterized, and Copy constructors
 * 3. Operator Overloading:
 *    - operator+ : Combines two booking charges into a multi-vehicle aggregate booking
 *    - operator<<: Formatted stream output for console receipts and file logging
 *    - operator==: Reference equality check
 */

class Booking {
private:
    std::string reference;       // Format "VR-XXXXXX"
    std::string vehicleId;
    std::string vehicleName;
    std::string category;
    std::string customerName;
    std::string customerPhone;
    std::string customerEmail;
    std::string pickupLocation;
    std::string dropoffLocation;
    std::string pickupDate;
    std::string dropoffDate;
    int durationHours;
    int extraKm;
    std::string packageType;
    double totalCost;
    std::string timestamp;

public:
    // 1. Default Constructor
    Booking();

    // 2. Parameterized Constructor
    Booking(const std::string& reference,
            const std::string& vehicleId,
            const std::string& vehicleName,
            const std::string& category,
            const std::string& customerName,
            const std::string& customerPhone,
            const std::string& customerEmail,
            const std::string& pickupLocation,
            const std::string& dropoffLocation,
            const std::string& pickupDate,
            const std::string& dropoffDate,
            int durationHours,
            int extraKm,
            const std::string& packageType,
            double totalCost,
            const std::string& timestamp = "");

    // 3. Copy Constructor
    Booking(const Booking& other);

    // Destructor
    ~Booking();

    // Getters
    std::string getReference() const;
    std::string getVehicleId() const;
    std::string getVehicleName() const;
    std::string getCategory() const;
    std::string getCustomerName() const;
    std::string getCustomerPhone() const;
    std::string getCustomerEmail() const;
    std::string getPickupLocation() const;
    std::string getDropoffLocation() const;
    std::string getPickupDate() const;
    std::string getDropoffDate() const;
    int getDurationHours() const;
    int getExtraKm() const;
    std::string getPackageType() const;
    double getTotalCost() const;
    std::string getTimestamp() const;

    // Setters
    void setTotalCost(double cost);

    // 4. Operator Overloading:
    // operator+ combines two bookings into a combined fleet total
    Booking operator+(const Booking& other) const;

    // operator== checks if two bookings share the same reference
    bool operator==(const Booking& other) const;

    // Stream insertion operator for file writing and console display
    friend std::ostream& operator<<(std::ostream& os, const Booking& b);

    // Serialization helper for pipe-delimited file records
    std::string toFileRecord() const;
    static Booking fromFileRecord(const std::string& line);
};

#endif // BOOKING_H
