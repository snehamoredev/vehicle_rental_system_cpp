#ifndef CAR_H
#define CAR_H

#include "Vehicle.h"

class Car : public Vehicle {
private:
    double hourlyRate;
    double dailyRate;
    std::string bodyType;

public:
    Car();
    Car(const std::string& id,
        const std::string& brand,
        const std::string& model,
        const std::string& bodyType,
        int seats,
        const std::string& fuelType,
        const std::string& transmission,
        double hourlyRate,
        double dailyRate,
        bool available = true,
        const std::string& tagline = "");
    Car(const Car& other);
    ~Car() override;

    double getHourlyRate() const;
    double getDailyRate() const;
    std::string getBodyType() const;

    double calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const override;
    void displayDetails(std::ostream& os = std::cout) const override;
    std::unique_ptr<Vehicle> clone() const override;
};

#endif // CAR_H
