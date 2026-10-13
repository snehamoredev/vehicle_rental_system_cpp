#include "../include/Vehicle.h"
#include <iomanip>

// 1. Default Constructor
Vehicle::Vehicle()
    : id("veh-default"), brand("Generic"), model("Base"),
      category("Everyday"), seats(4), fuelType("Petrol"),
      transmission("Manual"), available(true), tagline("Reliable everyday mobility") {}

// 2. Parameterized Constructor
Vehicle::Vehicle(const std::string& id,
                 const std::string& brand,
                 const std::string& model,
                 const std::string& category,
                 int seats,
                 const std::string& fuelType,
                 const std::string& transmission,
                 bool available,
                 const std::string& tagline)
    : id(id), brand(brand), model(model), category(category),
      seats(seats), fuelType(fuelType), transmission(transmission),
      available(available), tagline(tagline) {
    if (id.empty() || brand.empty() || model.empty()) {
        throw InvalidInputException("Vehicle initialization failed: ID, brand, and model cannot be empty.");
    }
}

// 3. Copy Constructor
Vehicle::Vehicle(const Vehicle& other)
    : id(other.id), brand(other.brand), model(other.model),
      category(other.category), seats(other.seats), fuelType(other.fuelType),
      transmission(other.transmission), available(other.available),
      tagline(other.tagline) {}

// Virtual Destructor
Vehicle::~Vehicle() {}

// Getters
std::string Vehicle::getId() const { return id; }
std::string Vehicle::getBrand() const { return brand; }
std::string Vehicle::getModel() const { return model; }
std::string Vehicle::getFullName() const { return brand + " " + model; }
std::string Vehicle::getCategory() const { return category; }
int Vehicle::getSeats() const { return seats; }
std::string Vehicle::getFuelType() const { return fuelType; }
std::string Vehicle::getTransmission() const { return transmission; }
bool Vehicle::isAvailable() const { return available; }
std::string Vehicle::getTagline() const { return tagline; }

// Setters
void Vehicle::setAvailable(bool status) { available = status; }
void Vehicle::setTagline(const std::string& newTagline) { tagline = newTagline; }

// Function Overload implementation (delegates to 3-param virtual)
double Vehicle::calculateRentalCost(int durationHours) const {
    return calculateRentalCost(durationHours, 0, "4h_40km");
}

void Vehicle::displayDetails(std::ostream& os) const {
    os << "[" << id << "] " << getFullName() << " (" << category << ")\n"
       << "  Seats: " << seats << " | Fuel: " << fuelType << " | Transmission: " << transmission << "\n"
       << "  Status: " << (available ? "Available" : "Reserved") << "\n"
       << "  Tagline: " << tagline << "\n";
}
