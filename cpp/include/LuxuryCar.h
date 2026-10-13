#ifndef LUXURYCAR_H
#define LUXURYCAR_H

#include "Vehicle.h"

class LuxuryCar : public Vehicle {
private:
    double pkg4hRate;
    double pkg8hRate;
    double extraHourRate;
    double extraKmRate;
    std::string serviceType;

public:
    LuxuryCar();
    LuxuryCar(const std::string& id,
              const std::string& brand,
              const std::string& model,
              int seats,
              const std::string& fuelType,
              double pkg4hRate,
              double pkg8hRate,
              double extraHourRate,
              double extraKmRate,
              bool available = true,
              const std::string& tagline = "");
    LuxuryCar(const LuxuryCar& other);
    ~LuxuryCar() override;

    double getPkg4hRate() const;
    double getPkg8hRate() const;
    double getExtraHourRate() const;
    double getExtraKmRate() const;
    std::string getServiceType() const;

    double calculateRentalCost(int durationHours, int extraKm, const std::string& packageType) const override;
    void displayDetails(std::ostream& os = std::cout) const override;
    std::unique_ptr<Vehicle> clone() const override;
};

#endif // LUXURYCAR_H
