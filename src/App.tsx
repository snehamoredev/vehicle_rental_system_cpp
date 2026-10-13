import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import BookingPanel from './components/BookingPanel.jsx';
import CategorySection from './components/CategorySection.jsx';
import VehicleCard from './components/VehicleCard.jsx';
import VehicleDetailModal from './components/VehicleDetailModal.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import WishlistPanel from './components/WishlistPanel.jsx';
import FAQ from './components/FAQ.jsx';
import AboutUs from './components/AboutUs.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import CppEngineModal from './components/CppEngineModal.jsx';

import { INITIAL_VEHICLES } from './data/vehicles.js';
import { filterVehicles } from './services/vehicleFilter.js';
import {
  getStoredWishlist,
  saveStoredWishlist,
  getStoredUser,
  saveStoredUser,
  getStoredBookings,
  saveStoredBookings,
} from './services/fileStorage.js';
import { Search, RotateCcw, AlertTriangle } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface DemoUser {
  name: string;
  email: string;
  isDemoAccount?: boolean;
}

interface BookingRecord {
  reference: string;
  vehicleId: string;
  vehicleName: string;
  category: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  createdAt: string;
  status: string;
}

export default function App() {
  // Vehicle Fleet Catalog (Pre-instantiated OOP Subclasses)
  const [vehicles] = useState<any[]>(INITIAL_VEHICLES);

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedClassification, setSelectedClassification] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number>(0);

  // Booking Context from Search Panel
  const [bookingContext, setBookingContext] = useState<any>({
    pickupLocation: 'Kempegowda Int. Airport (BLR), Bengaluru',
    dropoffLocation: 'Kempegowda Int. Airport (BLR), Bengaluru',
    pickupDate: '',
    pickupTime: '10:00',
    dropoffDate: '',
    dropoffTime: '18:00',
    durationHours: 8,
    category: 'Everyday',
  });

  // Modal States
  const [detailModalVehicle, setDetailModalVehicle] = useState<any | null>(null);
  const [enquiryModalVehicle, setEnquiryModalVehicle] = useState<any | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isCppEngineOpen, setIsCppEngineOpen] = useState<boolean>(false);

  // User Authentication State (Demo only)
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);

  // Wishlist state (persisted in localStorage for session)
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Bookings state (persisted in localStorage)
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  // Notification Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialize from storage on mount
  useEffect(() => {
    const storedWishlist = getStoredWishlist();
    if (Array.isArray(storedWishlist)) {
      setWishlistIds(storedWishlist);
    }

    const storedUser = getStoredUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }

    const storedBookings = getStoredBookings();
    if (Array.isArray(storedBookings)) {
      setBookings(storedBookings);
    }
  }, []);

  // Sync wishlist to storage
  const handleToggleWishlist = (vehicleId: string) => {
    setWishlistIds((prev) => {
      let updated: string[];
      if (prev.includes(vehicleId)) {
        updated = prev.filter((id) => id !== vehicleId);
        addToast('Removed from wishlist.', 'info');
      } else {
        updated = [...prev, vehicleId];
        addToast('Saved to wishlist.', 'success');
      }
      saveStoredWishlist(updated);
      return updated;
    });
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
    saveStoredWishlist([]);
    addToast('Wishlist cleared.', 'info');
  };

  const handleImportWishlist = (importedIds: string[]) => {
    const validIds = importedIds.filter((id: string) => vehicles.some((v) => v.id === id));
    const merged = Array.from(new Set([...wishlistIds, ...validIds]));
    setWishlistIds(merged);
    saveStoredWishlist(merged);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: DemoUser) => {
    setCurrentUser(user);
    saveStoredUser(user);
    addToast(`Welcome back, ${user.name}!`, 'success');
  };

  const handleRegisterSuccess = (user: DemoUser) => {
    setCurrentUser(user);
    saveStoredUser(user);
    addToast(`Account successfully created for ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveStoredUser(null);
    addToast('Signed out successfully.', 'info');
  };

  // Handle Enquiry Confirmed
  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveStoredBookings(updated);
    addToast(`Enquiry registered with reference ${newBooking.reference}!`, 'success');
  };

  // Filtered vehicle computation using pure service function
  const filteredVehicles = useMemo(() => {
    return filterVehicles(vehicles, {
      category: selectedCategory,
      classification: selectedClassification,
      availableOnly,
      maxBudget: maxBudget > 0 ? maxBudget : null,
      searchQuery,
    });
  }, [vehicles, selectedCategory, selectedClassification, availableOnly, maxBudget, searchQuery]);

  // Wishlisted vehicles objects
  const wishlistVehicles = useMemo(() => {
    return vehicles.filter((v) => wishlistIds.includes(v.id));
  }, [vehicles, wishlistIds]);

  // Search Submit from BookingPanel
  const handleSearchSubmit = (searchParams: any) => {
    setBookingContext(searchParams);
    setSelectedCategory(searchParams.category);

    const listingsEl = document.getElementById('fleet-listings');
    if (listingsEl) {
      listingsEl.scrollIntoView({ behavior: 'smooth' });
    }
    addToast(`Showing ${searchParams.category} fleet for your selected trip.`, 'info');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedClassification('All');
    setSearchQuery('');
    setAvailableOnly(false);
    setMaxBudget(0);
    addToast('Filters reset to default view.', 'info');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Navigation Top Bar */}
      <Navbar
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsLoginOpen(true)}
        onOpenCppEngine={() => setIsCppEngineOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateSection={(id: string) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('booking-panel');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onLuxuryClick={() => {
          setSelectedCategory('Luxury');
          const el = document.getElementById('fleet-listings');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Booking Panel */}
      <BookingPanel
        onSearchSubmit={handleSearchSubmit}
        currentCategory={selectedCategory === 'All' ? 'Everyday' : selectedCategory}
        onCategoryChange={(cat: string) => setSelectedCategory(cat)}
      />

      {/* 4. Category Overview Cards */}
      <CategorySection
        onSelectCategory={(cat: string) => {
          setSelectedCategory(cat);
          const el = document.getElementById('fleet-listings');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Vehicle Fleet Showcase & Listings */}
      <section className="section-padding" id="fleet-listings" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Verified Fleet</span>
            <h2 className="section-title">Explore Our Premier Collection</h2>
            <p className="section-subtitle">
              Choose from our impeccably maintained hatchbacks, executive sedans, spacious SUVs, city two-wheelers, and luxury chauffeur flagships.
            </p>
          </div>

          {/* Listings Filter Bar */}
          <div className="listings-filter-bar">
            {/* Category Filter Segments */}
            <div className="filter-segments">
              {['All', 'Everyday', 'Luxury'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'All' ? 'All Vehicles' : cat === 'Everyday' ? 'Everyday Fleet' : 'Luxury Chauffeur'}
                </button>
              ))}
            </div>

            {/* Classification & Search Dropdowns */}
            <div className="filter-dropdowns">
              {/* Classification */}
              <select
                className="filter-select"
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                aria-label="Filter by vehicle body style"
              >
                <option value="All">All Body Styles</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Scooter">Scooter</option>
                <option value="Super Luxury Sedan">Super Luxury Sedan</option>
              </select>

              {/* Search Box */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={14} style={{ position: 'absolute', left: 10, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search brand or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.45rem 0.75rem 0.45rem 2rem',
                    fontSize: '0.825rem',
                    width: '180px',
                  }}
                />
              </div>

              {/* Available Only Toggle */}
              <label className="toggle-switch-label">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  style={{ accentColor: 'var(--btn-primary)' }}
                />
                <span>Available Only</span>
              </label>

              {/* Reset Button */}
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleResetFilters}
                title="Reset all search filters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Vehicles Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="vehicles-grid">
              {filteredVehicles.map((vehicle: any) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isWishlisted={wishlistIds.includes(vehicle.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onOpenDetails={(v: any) => setDetailModalVehicle(v)}
                  onOpenEnquiry={(v: any) => setEnquiryModalVehicle(v)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
              <AlertTriangle size={36} color="var(--gold-accent)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                No vehicles matching your criteria
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Try relaxing the body style or search keywords to view the broader fleet.
              </p>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleResetFilters}>
                View All Vehicles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Why Choose AutoSphere */}
      <AboutUs />

      {/* 7. FAQ */}
      <FAQ />

      {/* 8. Contact Form */}
      <ContactForm showToast={addToast} />

      {/* 9. Footer */}
      <Footer
        onNavigateSection={(id: string) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 10. Modals & Drawers */}
      <VehicleDetailModal
        vehicle={detailModalVehicle}
        isOpen={Boolean(detailModalVehicle)}
        onClose={() => setDetailModalVehicle(null)}
        onOpenEnquiry={(v: any) => {
          setDetailModalVehicle(null);
          setEnquiryModalVehicle(v);
        }}
        initialDurationHours={bookingContext.durationHours || 4}
      />

      <EnquiryModal
        vehicle={enquiryModalVehicle}
        bookingContext={bookingContext}
        isOpen={Boolean(enquiryModalVehicle)}
        onClose={() => setEnquiryModalVehicle(null)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <WishlistPanel
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistVehicles={wishlistVehicles}
        onRemoveItem={handleToggleWishlist}
        onClearWishlist={handleClearWishlist}
        onImportWishlist={handleImportWishlist}
        onOpenDetails={(v: any) => {
          setIsWishlistOpen(false);
          setDetailModalVehicle(v);
        }}
        onOpenEnquiry={(v: any) => {
          setIsWishlistOpen(false);
          setEnquiryModalVehicle(v);
        }}
        showToast={addToast}
      />

      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      {/* C++ Core Engine Interactive Inspector */}
      <CppEngineModal
        isOpen={isCppEngineOpen}
        onClose={() => setIsCppEngineOpen(false)}
      />

      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
