cmake_minimum_required(VERSION 3.15)
project(AutoSphereRentalSystem VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(include)

set(SOURCES
    src/Vehicle.cpp
    src/Car.cpp
    src/Bike.cpp
    src/LuxuryCar.cpp
    src/Booking.cpp
    src/RentalSystem.cpp
    main.cpp
)

add_executable(autosphere_cpp ${SOURCES})

# Ensure data directory exists
file(MAKE_DIRECTORY ${CMAKE_BINARY_DIR}/data)
