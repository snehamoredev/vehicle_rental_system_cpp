#include "../include/LuxuryCar.h"
#include <algorithm>
#include <iomanip>

// 1. Default Constructor: Preserves exact BMW 7 Series Signature Edition specifications
LuxuryCar::LuxuryCar()
    : Vehicle("lux-bmw-7", "BMW", "7 Series Signature Edition", "Luxury", 4, "Petrol / Hybrid", "Automatic", true, "Flagship executive saloon with rear lounge seating"),
      pkg4hRate(10000.0), pkg8hRate(15000.0), extraHourRate(1500.0), extraKmRate(150.0),
      serviceType("Chauffeur-driven only") {}

// 2. Parameterized Constructor
LuxuryCar::LuxuryCar(const std::string& id,
                     const std::string& brand,
                     const std::string& model,
                     int seats,
                     const std::string& fuelType,
                     double pkg4hRate,
                     double pkg8hRate,
                     double extraHourRate,
                     double extraKmRate,
                     bool available,
                     const std::string& tagline)
    : Vehicle(id, brand, model, "Luxury", seats, fuelType, "Automatic", available, tagline),
      pkg4hRate(pkg4hRate), pkg8hRate(pkg8hRate), extraHourRate(extraHourRate), extraKmRate(extraKmRate),
      serviceType("Chauffeur-driven only") {
    if (pkg4hRate <= 0 || pkg8hRate <= 0 || extraHourRate < 0 || extraKmRate < 0) {
        throw InvalidInputException("Luxury package rates must be positive values.");
    }
}

// 3. Copy Constructor
LuxuryCar::LuxuryCar(const LuxuryCar& other)
    : Vehicle(other),
      pkg4hRate(other.pkg4hRate), pkg8hRate(other.pkg8hRate),
      extraHourRate(other.extraHourRate), extraKmRate(other.extraKmRate),
      serviceType(other.serviceType) {}

LuxuryCar::~LuxuryCar() {}

double LuxuryCar::getPkg4hRate() const { return pkg4hRate; }
double LuxuryCar::getPkg8hRate() const { return pkg8hRate; }
double LuxuryCar::getExtraHourRate() const { return extraHourRate; }
double LuxuryCar::getExtraKmRate() const { return extraKmRate; }
std::string LuxuryCar::getServiceType() const { return serviceType; }

/**
 * Polymorphic Calculation Rule:
 * Preserves exact luxury package logic:
 * - Selects base package: 4 Hours / 40 km OR 8 Hours / 80 km
 * - Computes extra hours beyond base package (durationHours - packageHours)
 * - Computes extra distance (extraKm * extraKmRate)
 * - Total = Base Package + (extraHours * extraHourRate) + (extraKm * extraKmRate)
 */
double LuxuryCar::calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const {
    if (durationHours < 1) {
        throw InvalidDurationException("Rental duration must be at least 1 hour.");
    }
    if (extraKm < 0) {
        throw InvalidInputException("Extra kilometers cannot be negative.");
    }

    double basePackagePrice = 0.0;
    int includedHours = 4;

    if (packageType == "8h_80km") {
        basePackagePrice = pkg8hRate;
        includedHours = 8;
    } else {
        basePackagePrice = pkg4hRate;
        includedHours = 4;
    }

    int extraHours = std::max(0, durationHours - includedHours);
    double extraHoursCost = extraHours * extraHourRate;
    double extraKmCost = extraKm * extraKmRate;

    return basePackagePrice + extraHoursCost + extraKmCost;
}

void LuxuryCar::displayDetails(std::ostream& os) const {
    Vehicle::displayDetails(os);
    os << "  Chauffeur Status: " << serviceType << "\n"
       << "  4h / 40 km Package: ₹" << pkg4hRate << " | 8h / 80 km Package: ₹" << pkg8hRate << "\n"
       << "  Extra Hour: ₹" << extraHourRate << "/hr | Extra Distance: ₹" << extraKmRate << "/km\n";
}

std::unique_ptr<Vehicle> LuxuryCar::clone() const {
    return std::make_unique<LuxuryCar>(*this);
}
