CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Iinclude -O2

SRC = src/Vehicle.cpp src/Car.cpp src/Bike.cpp src/LuxuryCar.cpp src/Booking.cpp src/RentalSystem.cpp main.cpp
OBJ = $(SRC:.cpp=.o)
TARGET = autosphere_cpp

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)
	@echo "Build complete: $(TARGET)"

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

test: $(TARGET)
	./$(TARGET) --test

clean:
	rm -f $(OBJ) $(TARGET) data/bookings_test.txt
