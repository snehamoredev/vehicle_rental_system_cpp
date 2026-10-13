#ifndef BIKE_H
#define BIKE_H

#include "Vehicle.h"

class Bike : public Vehicle {
private:
    double hourlyRate;
    double dailyRate;
    std::string bikeType;

public:
    Bike();
    Bike(const std::string& id,
         const std::string& brand,
         const std::string& model,
         const std::string& bikeType,
         double hourlyRate,
         double dailyRate,
         bool available = true,
         const std::string& tagline = "");
    Bike(const Bike& other);
    ~Bike() override;

    double getHourlyRate() const;
    double getDailyRate() const;
    std::string getBikeType() const;

    double calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const override;
    void displayDetails(std::ostream& os = std::cout) const override;
    std::unique_ptr<Vehicle> clone() const override;
};

#endif // BIKE_H
