#include "../include/RentalSystem.h"
#include <fstream>
#include <sstream>
#include <random>
#include <ctime>
#include <iomanip>

RentalSystem::RentalSystem()
    : dataFilePath("data/bookings.txt") {
    initializeDefaultFleet();
}

RentalSystem::RentalSystem(const std::string& storagePath)
    : dataFilePath(storagePath) {
    initializeDefaultFleet();
}

RentalSystem::~RentalSystem() {}

/**
 * Seeds the exact fleet catalog from the original AutoSphere web application
 * Preserving:
 * - Everyday cars, SUVs, and two-wheelers
 * - BMW 7 Series Signature Edition and exact luxury fleet rates
 */
void RentalSystem::initializeDefaultFleet() {
    fleet.clear();

    // 1. Luxury Chauffeur Fleet (BMW 7 Series, GLS 350, Audi A6, E-Class, S-Class, BMW 5 Series)
    // BMW 7 Series Signature Edition (4h/40km: ₹10,000, 8h/80km: ₹15,000, Extra hr: ₹1,500, Extra km: ₹150)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-bmw-7", "BMW", "7 Series Signature Edition", 4, "Petrol / Hybrid",
        10000.0, 15000.0, 1500.0, 150.0, true,
        "Flagship executive saloon with rear executive lounge seating"));

    // Mercedes-Benz GLS 350 4MATIC (4h/40km: ₹12,000, 8h/80km: ₹16,000, Extra hr: ₹1,600, Extra km: ₹160)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-mb-gls", "Mercedes-Benz", "GLS 350 4MATIC", 7, "Diesel",
        12000.0, 16000.0, 1600.0, 160.0, true,
        "The S-Class of luxury SUVs with unmatched road presence"));

    // Audi A6 Matrix (4h/40km: ₹6,000, 8h/80km: ₹9,000, Extra hr: ₹600, Extra km: ₹60)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-audi-a6", "Audi", "A6 Matrix", 5, "Petrol",
        6000.0, 9000.0, 600.0, 60.0, true,
        "Refined business mobility with Matrix LED lighting & dual touchscreens"));

    // Mercedes-Benz E-Class Avant-garde (4h/40km: ₹5,500, 8h/80km: ₹8,500, Extra hr: ₹850, Extra km: ₹85)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-mb-e-class", "Mercedes-Benz", "E-Class Avant-garde", 5, "Diesel",
        5500.0, 8500.0, 850.0, 85.0, true,
        "Long wheelbase luxury with reclined rear seats and touch control"));

    // Mercedes-Benz S-Class 2022 (4h/40km: ₹10,000, 8h/80km: ₹15,000, Extra hr: ₹1,500, Extra km: ₹150)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-mb-s-class", "Mercedes-Benz", "S-Class 2022", 4, "Petrol",
        10000.0, 15000.0, 1500.0, 150.0, false, // Reserved status
        "The pinnacle of automotive luxury and bespoke craftsmanship"));

    // BMW 5 Series Luxury Line — Black (4h/40km: ₹6,000, 8h/80km: ₹9,000, Extra hr: ₹900, Extra km: ₹90)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-bmw-5-black", "BMW", "5 Series Luxury Line — Black", 5, "Diesel",
        6000.0, 9000.0, 900.0, 90.0, true,
        "Sophisticated all-black executive styling with active steering"));

    // BMW 5 Series (4h/40km: ₹5,500, 8h/80km: ₹8,500, Extra hr: ₹850, Extra km: ₹85)
    addVehicle(std::make_unique<LuxuryCar>(
        "lux-bmw-5", "BMW", "5 Series", 5, "Petrol",
        5500.0, 8500.0, 850.0, 85.0, true,
        "Dynamic elegance and class-leading boardroom arrival presence"));

    // 2. Everyday Self-Drive Fleet (Cars & SUVs)
    // Hyundai Creta SX(O) (₹450/hr, ₹3,000/day)
    addVehicle(std::make_unique<Car>(
        "everyday-suv-creta", "Hyundai", "Creta SX(O)", "SUV", 5, "Diesel", "Automatic",
        450.0, 3000.0, true,
        "Spacious urban SUV with panoramic sunroof and high road clearance"));

    // Mahindra XUV700 AX7 (₹450/hr, ₹3,000/day)
    addVehicle(std::make_unique<Car>(
        "everyday-suv-xuv700", "Mahindra", "XUV700 AX7 Luxury", "SUV", 7, "Diesel", "Automatic",
        450.0, 3000.0, true,
        "Robust 7-seater highway cruiser with ADAS and dual superscreens"));

    // Honda City ZX (₹300/hr, ₹2,000/day)
    addVehicle(std::make_unique<Car>(
        "everyday-sedan-city", "Honda", "City ZX", "Sedan", 5, "Petrol", "CVT Automatic",
        300.0, 2000.0, true,
        "The iconic executive sedan with plush legroom and effortless ride"));

    // Maruti Suzuki Swift ZXi+ (₹300/hr, ₹2,000/day, Reserved)
    addVehicle(std::make_unique<Car>(
        "everyday-hatch-swift", "Maruti Suzuki", "Swift ZXi+", "Hatchback", 5, "Petrol", "Manual",
        300.0, 2000.0, false, // Reserved
        "Agile and peppy city hatchback, effortless in metropolitan traffic"));

    // 3. Two-Wheelers (Bikes & Scooters)
    // Royal Enfield Classic 350 (₹150/hr, ₹800/day)
    addVehicle(std::make_unique<Bike>(
        "everyday-bike-classic", "Royal Enfield", "Classic 350", "Motorcycle",
        150.0, 800.0, true,
        "Timeless retro cruiser motorcycle with signature thump and poise"));

    // Honda Activa 6G (₹100/hr, ₹500/day)
    addVehicle(std::make_unique<Bike>(
        "everyday-scooter-activa", "Honda", "Activa 6G Deluxe", "Scooter",
        100.0, 500.0, true,
        "The undisputed king of daily urban commuting and zippy errands"));
}

void RentalSystem::addVehicle(std::unique_ptr<Vehicle> vehicle) {
    if (!vehicle) return;
    fleet.push_back(std::move(vehicle));
}

size_t RentalSystem::getFleetCount() const {
    return fleet.size();
}

Vehicle* RentalSystem::findVehicle(const std::string& id) {
    for (auto& v : fleet) {
        if (v->getId() == id) return v.get();
    }
    return nullptr;
}

const Vehicle* RentalSystem::findVehicle(const std::string& id) const {
    for (const auto& v : fleet) {
        if (v->getId() == id) return v.get();
    }
    return nullptr;
}

// Function Overload
Vehicle* RentalSystem::findVehicle(const std::string& brand, const std::string& model) {
    for (auto& v : fleet) {
        if (v->getBrand() == brand && v->getModel() == model) return v.get();
    }
    return nullptr;
}

void RentalSystem::displayFleet(const std::string& category, std::ostream& os) const {
    os << "========================================================\n"
       << " AUTOSPHERE FLEET CATALOG (" << category << ")\n"
       << "========================================================\n";
    for (const auto& v : fleet) {
        if (category == "All" || v->getCategory() == category) {
            v->displayDetails(os);
            os << "--------------------------------------------------------\n";
        }
    }
}

void RentalSystem::displayBookings(std::ostream& os) const {
    os << "========================================================\n"
       << " ACTIVE AND SAVED BOOKING RECORDS (" << bookings.size() << ")\n"
       << "========================================================\n";
    if (bookings.empty()) {
        os << " No active booking records found.\n";
        return;
    }
    for (const auto& b : bookings) {
        os << b << "\n";
    }
}

/**
 * Polymorphic rate calculation dispatcher
 * Calls vehicle->calculateRentalCost(...) through generic Vehicle*
 */
double RentalSystem::estimateCost(const std::string& vehicleId,
                                  int durationHours,
                                  int extraKm,
                                  const std::string& packageType) const {
    const Vehicle* v = findVehicle(vehicleId);
    if (!v) {
        throw VehicleNotFoundException("Vehicle with ID '" + vehicleId + "' does not exist in catalog.");
    }
    // Polymorphic invocation
    return v->calculateRentalCost(durationHours, extraKm, packageType);
}

std::string RentalSystem::generateReferenceCode() const {
    static const char charset[] = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    std::string ref = "VR-";
    static std::mt19937 rng(static_cast<unsigned int>(std::time(nullptr)));
    std::uniform_int_distribution<int> dist(0, sizeof(charset) - 2);

    for (int i = 0; i < 6; ++i) {
        ref += charset[dist(rng)];
    }
    return ref;
}

Booking RentalSystem::createBooking(const std::string& vehicleId,
                                    const std::string& customerName,
                                    const std::string& customerPhone,
                                    const std::string& customerEmail,
                                    const std::string& pickupLocation,
                                    const std::string& dropoffLocation,
                                    const std::string& pickupDate,
                                    const std::string& dropoffDate,
                                    int durationHours,
                                    int extraKm,
                                    const std::string& packageType) {
    Vehicle* v = findVehicle(vehicleId);
    if (!v) {
        throw VehicleNotFoundException("Cannot book: Vehicle ID '" + vehicleId + "' not found.");
    }

    if (!v->isAvailable()) {
        throw VehicleUnavailableException("Vehicle '" + v->getFullName() + "' is currently reserved.");
    }

    // Polymorphic cost calculation with runtime exception checking
    double totalCost = v->calculateRentalCost(durationHours, extraKm, packageType);

    std::string ref = generateReferenceCode();

    // Timestamp
    std::time_t now = std::time(nullptr);
    std::stringstream ss;
    ss << std::put_time(std::gmtime(&now), "%Y-%m-%dT%H:%M:%SZ");

    Booking newBooking(ref,
                       v->getId(),
                       v->getFullName(),
                       v->getCategory(),
                       customerName,
                       customerPhone,
                       customerEmail,
                       pickupLocation,
                       dropoffLocation,
                       pickupDate,
                       dropoffDate,
                       durationHours,
                       extraKm,
                       packageType,
                       totalCost,
                       ss.str());

    bookings.push_back(newBooking);
    return newBooking;
}

Booking* RentalSystem::findBooking(const std::string& reference) {
    for (auto& b : bookings) {
        if (b.getReference() == reference) return &b;
    }
    return nullptr;
}

const std::vector<Booking>& RentalSystem::getAllBookings() const {
    return bookings;
}

/**
 * Demonstrates Operator Overloading:
 * Locates two bookings and invokes operator+ on them!
 */
Booking RentalSystem::combineBookings(const std::string& ref1, const std::string& ref2) {
    Booking* b1 = findBooking(ref1);
    Booking* b2 = findBooking(ref2);

    if (!b1 || !b2) {
        throw InvalidInputException("One or both booking references not found for operator+ combination.");
    }

    // Direct invocation of overloaded operator+
    Booking combined = (*b1) + (*b2);
    bookings.push_back(combined);
    return combined;
}

/**
 * File Handling: std::ofstream to save persistent records to disk
 */
void RentalSystem::saveBookingsToFile(const std::string& filePath) const {
    std::string targetPath = filePath.empty() ? dataFilePath : filePath;

    std::ofstream outFile(targetPath, std::ios::out | std::ios::trunc);
    if (!outFile.is_open()) {
        throw FileIOException("Unable to open file for writing: " + targetPath);
    }

    for (const auto& b : bookings) {
        outFile << b.toFileRecord() << "\n";
    }

    outFile.close();
}

/**
 * File Handling: std::ifstream to read and restore persistent records from disk
 */
void RentalSystem::loadBookingsFromFile(const std::string& filePath) {
    std::string targetPath = filePath.empty() ? dataFilePath : filePath;

    std::ifstream inFile(targetPath);
    if (!inFile.is_open()) {
        throw FileIOException("Unable to open file for reading: " + targetPath);
    }

    bookings.clear();
    std::string line;
    int lineNum = 0;

    while (std::getline(inFile, line)) {
        lineNum++;
        if (line.empty()) continue;
        try {
            Booking b = Booking::fromFileRecord(line);
            bookings.push_back(b);
        } catch (const std::exception& e) {
            std::cerr << "Warning: Skipped corrupted line " << lineNum << ": " << e.what() << "\n";
        }
    }

    inFile.close();
}
