#include "../include/Car.h"
#include <cmath>
#include <iomanip>

Car::Car()
    : Vehicle("car-default", "Hyundai", "Verna", "Everyday", 5, "Petrol", "Automatic", true, "Comfortable executive sedan"),
      hourlyRate(300.0), dailyRate(2000.0), bodyType("Sedan") {}

Car::Car(const std::string& id,
         const std::string& brand,
         const std::string& model,
         const std::string& bodyType,
         int seats,
         const std::string& fuelType,
         const std::string& transmission,
         double hourlyRate,
         double dailyRate,
         bool available,
         const std::string& tagline)
    : Vehicle(id, brand, model, "Everyday", seats, fuelType, transmission, available, tagline),
      hourlyRate(hourlyRate), dailyRate(dailyRate), bodyType(bodyType) {
    if (hourlyRate <= 0 || dailyRate <= 0) {
        throw InvalidInputException("Car rates must be positive values.");
    }
}

Car::Car(const Car& other)
    : Vehicle(other),
      hourlyRate(other.hourlyRate), dailyRate(other.dailyRate), bodyType(other.bodyType) {}

Car::~Car() {}

double Car::getHourlyRate() const { return hourlyRate; }
double Car::getDailyRate() const { return dailyRate; }
std::string Car::getBodyType() const { return bodyType; }

double Car::calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const {
    (void)extraKm;
    (void)packageType;

    if (durationHours < 1) {
        throw InvalidDurationException("Rental duration must be at least 1 hour.");
    }
    if (durationHours > 720) {
        throw InvalidDurationException("Everyday car rentals cannot exceed 30 days (720 hours).");
    }

    if (durationHours < 24) {
        return hourlyRate * durationHours;
    } else {
        int billedDays = static_cast<int>(std::ceil(durationHours / 24.0));
        return dailyRate * billedDays;
    }
}

void Car::displayDetails(std::ostream& os) const {
    Vehicle::displayDetails(os);
    os << "  Body Style: " << bodyType << "\n"
       << "  Rates: ₹" << hourlyRate << "/hour | ₹" << dailyRate << "/day\n";
}

std::unique_ptr<Vehicle> Car::clone() const {
    return std::make_unique<Car>(*this);
}
