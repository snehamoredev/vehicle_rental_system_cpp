#include "../include/Booking.h"
#include <sstream>
#include <vector>
#include <iomanip>

// 1. Default Constructor
Booking::Booking()
    : reference("VR-000000"), vehicleId("unknown"), vehicleName("Unassigned"),
      category("Standard"), customerName("Guest"), customerPhone("0000000000"),
      customerEmail("guest@example.com"), pickupLocation("Main Hub"),
      dropoffLocation("Main Hub"), pickupDate("2026-10-15"), dropoffDate("2026-10-16"),
      durationHours(24), extraKm(0), packageType("standard"), totalCost(0.0),
      timestamp("2026-10-13T00:00:00Z") {}

// 2. Parameterized Constructor
Booking::Booking(const std::string& reference,
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
                 const std::string& timestamp)
    : reference(reference), vehicleId(vehicleId), vehicleName(vehicleName),
      category(category), customerName(customerName), customerPhone(customerPhone),
      customerEmail(customerEmail), pickupLocation(pickupLocation),
      dropoffLocation(dropoffLocation), pickupDate(pickupDate), dropoffDate(dropoffDate),
      durationHours(durationHours), extraKm(extraKm), packageType(packageType),
      totalCost(totalCost), timestamp(timestamp) {
    if (reference.empty() || customerName.empty() || customerPhone.empty()) {
        throw InvalidInputException("Booking validation error: Reference, customer name, and contact phone are required.");
    }
}

// 3. Copy Constructor
Booking::Booking(const Booking& other)
    : reference(other.reference), vehicleId(other.vehicleId),
      vehicleName(other.vehicleName), category(other.category),
      customerName(other.customerName), customerPhone(other.customerPhone),
      customerEmail(other.customerEmail), pickupLocation(other.pickupLocation),
      dropoffLocation(other.dropoffLocation), pickupDate(other.pickupDate),
      dropoffDate(other.dropoffDate), durationHours(other.durationHours),
      extraKm(other.extraKm), packageType(other.packageType),
      totalCost(other.totalCost), timestamp(other.timestamp) {}

Booking::~Booking() {}

std::string Booking::getReference() const { return reference; }
std::string Booking::getVehicleId() const { return vehicleId; }
std::string Booking::getVehicleName() const { return vehicleName; }
std::string Booking::getCategory() const { return category; }
std::string Booking::getCustomerName() const { return customerName; }
std::string Booking::getCustomerPhone() const { return customerPhone; }
std::string Booking::getCustomerEmail() const { return customerEmail; }
std::string Booking::getPickupLocation() const { return pickupLocation; }
std::string Booking::getDropoffLocation() const { return dropoffLocation; }
std::string Booking::getPickupDate() const { return pickupDate; }
std::string Booking::getDropoffDate() const { return dropoffDate; }
int Booking::getDurationHours() const { return durationHours; }
int Booking::getExtraKm() const { return extraKm; }
std::string Booking::getPackageType() const { return packageType; }
double Booking::getTotalCost() const { return totalCost; }
std::string Booking::getTimestamp() const { return timestamp; }

void Booking::setTotalCost(double cost) { totalCost = cost; }

/**
 * 4. Operator Overloading: operator+
 * Meaningful domain behavior:
 * Combines two vehicle booking charges and allowances into a unified fleet invoice.
 * Allows corporate clients or families renting multiple vehicles to compute aggregate billing.
 */
Booking Booking::operator+(const Booking& other) const {
    std::string combinedRef = reference + "&" + other.reference;
    std::string combinedVehicles = vehicleName + " + " + other.vehicleName;
    std::string combinedCategory = (category == other.category) ? category : "Combined Fleet";
    int combinedDuration = std::max(durationHours, other.durationHours);
    int combinedKm = extraKm + other.extraKm;
    double combinedCost = totalCost + other.totalCost;

    return Booking(combinedRef,
                   "multi-fleet",
                   combinedVehicles,
                   combinedCategory,
                   customerName,
                   customerPhone,
                   customerEmail,
                   pickupLocation,
                   dropoffLocation,
                   pickupDate,
                   dropoffDate,
                   combinedDuration,
                   combinedKm,
                   "multi-vehicle-combined",
                   combinedCost,
                   timestamp);
}

bool Booking::operator==(const Booking& other) const {
    return reference == other.reference;
}

/**
 * Operator Overloading: operator<<
 * Formats booking record for streams (std::cout and file streams)
 */
std::ostream& operator<<(std::ostream& os, const Booking& b) {
    os << "--------------------------------------------------------\n"
       << " AUTO-SPHERE BOOKING RECEIPT #" << b.reference << "\n"
       << "--------------------------------------------------------\n"
       << " Vehicle  : " << b.vehicleName << " [" << b.category << "]\n"
       << " Customer : " << b.customerName << " (" << b.customerPhone << ")\n"
       << " Email    : " << b.customerEmail << "\n"
       << " Pickup   : " << b.pickupLocation << " (" << b.pickupDate << ")\n"
       << " Dropoff  : " << b.dropoffLocation << " (" << b.dropoffDate << ")\n"
       << " Duration : " << b.durationHours << " hrs | Extra Distance: " << b.extraKm << " km\n"
       << " Total Due: ₹" << std::fixed << std::setprecision(2) << b.totalCost << "\n"
       << " Status   : Confirmed (Active Reservation)\n"
       << "--------------------------------------------------------";
    return os;
}

/**
 * File record serialization (pipe-delimited)
 */
std::string Booking::toFileRecord() const {
    std::ostringstream ss;
    ss << reference << "|"
       << vehicleId << "|"
       << vehicleName << "|"
       << category << "|"
       << customerName << "|"
       << customerPhone << "|"
       << customerEmail << "|"
       << pickupLocation << "|"
       << dropoffLocation << "|"
       << pickupDate << "|"
       << dropoffDate << "|"
       << durationHours << "|"
       << extraKm << "|"
       << packageType << "|"
       << totalCost << "|"
       << (timestamp.empty() ? "N/A" : timestamp);
    return ss.str();
}

/**
 * File record deserialization
 */
Booking Booking::fromFileRecord(const std::string& line) {
    std::vector<std::string> tokens;
    std::string token;
    std::istringstream tokenStream(line);

    while (std::getline(tokenStream, token, '|')) {
        tokens.push_back(token);
    }

    if (tokens.size() < 15) {
        throw FileIOException("Corrupt or invalid booking record line: " + line);
    }

    std::string ref = tokens[0];
    std::string vId = tokens[1];
    std::string vName = tokens[2];
    std::string cat = tokens[3];
    std::string name = tokens[4];
    std::string phone = tokens[5];
    std::string email = tokens[6];
    std::string pickupLoc = tokens[7];
    std::string dropoffLoc = tokens[8];
    std::string pDate = tokens[9];
    std::string dDate = tokens[10];
    int duration = std::stoi(tokens[11]);
    int extraKm = std::stoi(tokens[12]);
    std::string pkg = tokens[13];
    double cost = std::stod(tokens[14]);
    std::string ts = (tokens.size() > 15 ? tokens[15] : "");

    return Booking(ref, vId, vName, cat, name, phone, email,
                   pickupLoc, dropoffLoc, pDate, dDate,
                   duration, extraKm, pkg, cost, ts);
}
