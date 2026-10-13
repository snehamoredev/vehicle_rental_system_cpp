#ifndef EXCEPTIONS_H
#define EXCEPTIONS_H

#include <stdexcept>
#include <string>

/**
 * OOP Concept: Exception Handling Hierarchy
 * Custom exception classes derived from std::runtime_error:
 * - Invalid durations
 * - Missing or unavailable vehicles
 * - Negative inputs for extra hours/km
 * - File stream I/O errors
 */

class RentalException : public std::runtime_error {
public:
    explicit RentalException(const std::string& message)
        : std::runtime_error(message) {}
};

class InvalidDurationException : public RentalException {
public:
    explicit InvalidDurationException(const std::string& message)
        : RentalException("Duration Error: " + message) {}
};

class VehicleUnavailableException : public RentalException {
public:
    explicit VehicleUnavailableException(const std::string& message)
        : RentalException("Availability Error: " + message) {}
};

class VehicleNotFoundException : public RentalException {
public:
    explicit VehicleNotFoundException(const std::string& message)
        : RentalException("Search Error: " + message) {}
};

class InvalidInputException : public RentalException {
public:
    explicit InvalidInputException(const std::string& message)
        : RentalException("Input Validation Error: " + message) {}
};

class FileIOException : public RentalException {
public:
    explicit FileIOException(const std::string& message)
        : RentalException("File I/O Error: " + message) {}
};

#endif // EXCEPTIONS_H
