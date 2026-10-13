#ifndef VEHICLE_H
#define VEHICLE_H

#include <string>
#include <iostream>
#include <memory>
#include "Exceptions.h"

/**
 * OOP Concepts Demonstrated:
 * 1. Abstraction: Abstract base class with pure virtual calculateRentalCost()
 * 2. Encapsulation: Private members with public getters/setters
 * 3. Constructors: Default, Parameterized, and Copy constructors
 * 4. Virtual Destructor: Ensures proper cleanup of derived objects through base pointers
 */

class Vehicle {
private:
    std::string id;
    std::string brand;
    std::string model;
    std::string category;     // "Everyday" or "Luxury"
    int seats;
    std::string fuelType;
    std::string transmission;
    bool available;
    std::string tagline;

public:
    // 1. Default Constructor
    Vehicle();

    // 2. Parameterized Constructor
    Vehicle(const std::string& id,
            const std::string& brand,
            const std::string& model,
            const std::string& category,
            int seats,
            const std::string& fuelType,
            const std::string& transmission,
            bool available,
            const std::string& tagline);

    // 3. Copy Constructor
    Vehicle(const Vehicle& other);

    // Virtual Destructor (Crucial for Polymorphism)
    virtual ~Vehicle();

    // Getters
    std::string getId() const;
    std::string getBrand() const;
    std::string getModel() const;
    std::string getFullName() const;
    std::string getCategory() const;
    int getSeats() const;
    std::string getFuelType() const;
    std::string getTransmission() const;
    bool isAvailable() const;
    std::string getTagline() const;

    // Setters
    void setAvailable(bool status);
    void setTagline(const std::string& newTagline);

    // 4. Runtime Polymorphism: Pure virtual function with full parameter set
    virtual double calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const = 0;

    // 5. Function Overloading: Alternate calculation signature without extraKm/packageType
    virtual double calculateRentalCost(int durationHours) const;

    // Virtual method to display vehicle specifications
    virtual void displayDetails(std::ostream& os = std::cout) const;

    // Virtual clone method to enable polymorphic deep copying
    virtual std::unique_ptr<Vehicle> clone() const = 0;
};

#endif // VEHICLE_H
