#include "../include/Bike.h"
#include <cmath>
#include <algorithm>

Bike::Bike()
    : Vehicle("bike-default", "Honda", "Activa 6G Deluxe", "Everyday", 2, "Petrol", "Automatic (CVT)", true, "Zippy city commuter scooter"),
      hourlyRate(100.0), dailyRate(500.0), bikeType("Scooter") {}

Bike::Bike(const std::string& id,
           const std::string& brand,
           const std::string& model,
           const std::string& bikeType,
           double hourlyRate,
           double dailyRate,
           bool available,
           const std::string& tagline)
    : Vehicle(id, brand, model, "Everyday", 2, "Petrol", (bikeType == "Scooter" ? "Automatic (CVT)" : "Manual 5-Speed"), available, tagline),
      hourlyRate(hourlyRate), dailyRate(dailyRate), bikeType(bikeType) {
    if (hourlyRate <= 0 || dailyRate <= 0) {
        throw InvalidInputException("Bike rates must be positive values.");
    }
}

Bike::Bike(const Bike& other)
    : Vehicle(other),
      hourlyRate(other.hourlyRate), dailyRate(other.dailyRate), bikeType(other.bikeType) {}

Bike::~Bike() {}

double Bike::getHourlyRate() const { return hourlyRate; }
double Bike::getDailyRate() const { return dailyRate; }
std::string Bike::getBikeType() const { return bikeType; }

double Bike::calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const {
    (void)extraKm;
    (void)packageType;

    if (durationHours < 1) {
        throw InvalidDurationException("Rental duration must be at least 1 hour.");
    }
    if (durationHours > 720) {
        throw InvalidDurationException("Two-wheeler rentals cannot exceed 30 days (720 hours).");
    }

    double rawCost = 0.0;
    if (durationHours < 24) {
        rawCost = hourlyRate * durationHours;
    } else {
        int billedDays = static_cast<int>(std::ceil(durationHours / 24.0));
        rawCost = dailyRate * billedDays;
    }

    // Invariant: Two-wheeler prices must stay between ₹100 and ₹1,000
    double clampedCost = std::max(100.0, std::min(rawCost, 1000.0));
    return clampedCost;
}

void Bike::displayDetails(std::ostream& os) const {
    Vehicle::displayDetails(os);
    os << "  Two-Wheeler Type: " << bikeType << "\n"
       << "  Rates: ₹" << hourlyRate << "/hour | ₹" << dailyRate << "/day\n"
       << "  Price Guardrail: Guaranteed between ₹100 and ₹1,000\n";
}

std::unique_ptr<Vehicle> Bike::clone() const {
    return std::make_unique<Bike>(*this);
}
