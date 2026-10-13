/**
 * Vehicle Data Store (Prototype Sample Data)
 *
 * All rates and specifications are defined here as plain objects.
 * Classes (Car, TwoWheeler, LuxuryCar) instantiate their objects from this source.
 * Image paths are kept here so photos can be swapped without code changes.
 */

import { Car } from '../models/Car.js';
import { TwoWheeler } from '../models/TwoWheeler.js';
import { LuxuryCar } from '../models/LuxuryCar.js';

export const RAW_VEHICLES_DATA = [
  // ==================== LUXURY FLEET (CHAUFFEUR-DRIVEN ONLY) ====================
  {
    id: 'lux-bmw-7',
    brand: 'BMW',
    model: '7 Series Signature Edition',
    category: 'Luxury',
    classification: 'Super Luxury Sedan',
    image: '/images/luxury/bmw_7_series.jpg',
    seats: 4,
    fuelType: 'Petrol / Hybrid',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Flagship executive saloon with rear executive lounge seating',
    pkg4hRate: 10000,
    pkg8hRate: 15000,
    extraHourRate: 1500,
    extraKmRate: 150,
    features: ['Chauffeur-driven only', 'Rear Executive Console', 'Panoramic Sky Lounge', 'Harmon Kardon Sound'],
  },
  {
    id: 'lux-mb-gls',
    brand: 'Mercedes-Benz',
    model: 'GLS 350 4MATIC',
    category: 'Luxury',
    classification: 'Luxury 7-Seater SUV',
    image: '/images/luxury/mercedes_gls.jpg',
    seats: 7,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'The S-Class of luxury SUVs with unmatched road presence',
    pkg4hRate: 12000,
    pkg8hRate: 16000,
    extraHourRate: 1600,
    extraKmRate: 160,
    features: ['Chauffeur-driven only', 'Airmatic Air Suspension', '7 Luxury Seats', 'Burmester Surround Sound'],
  },
  {
    id: 'lux-audi-a6',
    brand: 'Audi',
    model: 'A6 Matrix',
    category: 'Luxury',
    classification: 'Executive Business Sedan',
    image: '/images/luxury/audi_a6.jpg',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Refined business mobility with Matrix LED lighting & dual MMI displays',
    pkg4hRate: 6000,
    pkg8hRate: 9000,
    extraHourRate: 600,
    extraKmRate: 60,
    features: ['Chauffeur-driven only', 'Matrix LED Headlamps', 'Dual Touch MMI', 'Bang & Olufsen 3D Sound'],
  },
  {
    id: 'lux-mb-e-class',
    brand: 'Mercedes-Benz',
    model: 'E-Class Avant-garde',
    category: 'Luxury',
    classification: 'Long Wheelbase Luxury Sedan',
    image: '/images/luxury/bmw_7_series.jpg', // fallback to flagship
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Long wheelbase luxury with reclined rear seats and touch control',
    pkg4hRate: 5500,
    pkg8hRate: 8500,
    extraHourRate: 850,
    extraKmRate: 85,
    features: ['Chauffeur-driven only', 'Long Wheelbase Comfort', 'Rear Tablet Control', 'Electric Sunblinds'],
  },
  {
    id: 'lux-mb-s-class',
    brand: 'Mercedes-Benz',
    model: 'S-Class 2022',
    category: 'Luxury',
    classification: 'Flagship Luxury Saloon',
    image: '/images/luxury/bmw_7_series.jpg', // fallback to flagship
    seats: 4,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    isAvailable: false, // Deterministic unavailable status for prototype demonstration
    tagline: 'The pinnacle of automotive luxury and bespoke craftsmanship',
    pkg4hRate: 10000,
    pkg8hRate: 15000,
    extraHourRate: 1500,
    extraKmRate: 150,
    features: ['Chauffeur-driven only', 'OLED Central Display', 'Rear Calf Massagers', 'Active Ambient Lighting'],
  },
  {
    id: 'lux-bmw-5-black',
    brand: 'BMW',
    model: '5 Series Luxury Line — Black',
    category: 'Luxury',
    classification: 'Premium Business Sedan',
    image: '/images/luxury/bmw_7_series.jpg',
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Sophisticated all-black executive styling with active steering',
    pkg4hRate: 6000,
    pkg8hRate: 9000,
    extraHourRate: 900,
    extraKmRate: 90,
    features: ['Chauffeur-driven only', 'Shadowline Exterior Trim', 'Wireless Apple CarPlay', 'Dakota Leather'],
  },
  {
    id: 'lux-bmw-5',
    brand: 'BMW',
    model: '5 Series',
    category: 'Luxury',
    classification: 'Premium Executive Sedan',
    image: '/images/luxury/audi_a6.jpg',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Dynamic elegance and class-leading boardroom arrival presence',
    pkg4hRate: 5500,
    pkg8hRate: 8500,
    extraHourRate: 850,
    extraKmRate: 85,
    features: ['Chauffeur-driven only', 'Live Cockpit Professional', 'Adaptive Suspension', 'Sunroof'],
  },

  // ==================== EVERYDAY RIDES (CARS & TWO-WHEELERS) ====================
  {
    id: 'everyday-suv-creta',
    brand: 'Hyundai',
    model: 'Creta SX(O)',
    category: 'Everyday',
    classification: 'SUV',
    bodyType: 'SUV',
    image: '/images/everyday/suv_creta.jpg',
    seats: 5,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Spacious urban SUV with panoramic sunroof and high road clearance',
    hourlyRate: 450,
    dailyRate: 3000,
    features: ['Self-drive', 'Panoramic Sunroof', 'Ventilated Front Seats', 'Bose Premium Audio'],
  },
  {
    id: 'everyday-suv-xuv700',
    brand: 'Mahindra',
    model: 'XUV700 AX7 Luxury',
    category: 'Everyday',
    classification: 'SUV',
    bodyType: 'SUV',
    image: '/images/everyday/suv_creta.jpg',
    seats: 7,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isAvailable: true,
    tagline: 'Robust 7-seater highway cruiser with ADAS and dual superscreens',
    hourlyRate: 450,
    dailyRate: 3000,
    features: ['Self-drive', '7-Seater Cabin', 'Dual 10.25-inch Screens', 'Skyroof'],
  },
  {
    id: 'everyday-sedan-city',
    brand: 'Honda',
    model: 'City ZX',
    category: 'Everyday',
    classification: 'Sedan',
    bodyType: 'Sedan',
    image: '/images/luxury/audi_a6.jpg',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'CVT Automatic',
    isAvailable: true,
    tagline: 'The iconic executive sedan with plush legroom and effortless ride',
    hourlyRate: 300,
    dailyRate: 2000,
    features: ['Self-drive', 'Plush Rear Armrest', 'LaneWatch Camera', '506L Trunk Capacity'],
  },
  {
    id: 'everyday-hatch-swift',
    brand: 'Maruti Suzuki',
    model: 'Swift ZXi+',
    category: 'Everyday',
    classification: 'Hatchback',
    bodyType: 'Hatchback',
    image: '/images/everyday/suv_creta.jpg',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'Manual',
    isAvailable: false, // Deterministic unavailable status
    tagline: 'Agile and peppy city hatchback, effortless in heavy metropolitan traffic',
    hourlyRate: 300,
    dailyRate: 2000,
    features: ['Self-drive', 'Compact Footprint', 'SmartPlay Studio', 'High Fuel Mileage'],
  },
  {
    id: 'everyday-bike-classic',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    category: 'Everyday',
    classification: 'Motorcycle',
    vehicleType: 'Motorcycle',
    image: '/images/everyday/bike_classic.jpg',
    seats: 2,
    fuelType: 'Petrol',
    transmission: 'Manual 5-Speed',
    isAvailable: true,
    tagline: 'Timeless retro cruiser motorcycle with signature thump and poise',
    hourlyRate: 150,
    dailyRate: 800,
    features: ['Dual Helmet Included', 'ABS Braking', 'Touring Seat', 'Mobile Mount'],
  },
  {
    id: 'everyday-scooter-activa',
    brand: 'Honda',
    model: 'Activa 6G Deluxe',
    category: 'Everyday',
    classification: 'Scooter',
    vehicleType: 'Scooter',
    image: '/images/everyday/scooter_activa.jpg',
    seats: 2,
    fuelType: 'Petrol',
    transmission: 'Automatic (CVT)',
    isAvailable: true,
    tagline: 'The undisputed king of daily urban commuting and zippy errands',
    hourlyRate: 100,
    dailyRate: 500,
    features: ['Single Helmet Included', 'Underseat Storage', 'External Fuel Fill', 'Telescopic Suspension'],
  },
];

/**
 * Factory / Object Instantiation
 * Instantiates concrete subclasses (Car, TwoWheeler, LuxuryCar) from raw data objects.
 */
export function instantiateVehicles(dataList = RAW_VEHICLES_DATA) {
  return dataList.map((item) => {
    if (item.category === 'Luxury') {
      return new LuxuryCar(item);
    }
    if (item.classification === 'Scooter' || item.classification === 'Motorcycle' || item.vehicleType) {
      return new TwoWheeler(item);
    }
    return new Car(item);
  });
}

// Pre-instantiated catalog ready for polymorphic manipulation
export const INITIAL_VEHICLES = instantiateVehicles(RAW_VEHICLES_DATA);
