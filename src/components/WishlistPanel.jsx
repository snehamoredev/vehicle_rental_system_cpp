import React, { useRef } from 'react';
import { X, Heart, Download, Upload, Trash2, Send, ExternalLink, AlertTriangle } from 'lucide-react';
import { exportToJsonFile, importFromJsonFile } from '../services/fileStorage.js';
import { formatCurrency } from '../services/rentalCalculator.js';

export default function WishlistPanel(props) {
  const {
    isOpen,
    onClose,
    wishlistVehicles = [],
    onRemoveItem,
    onClearWishlist,
    onImportWishlist,
    onOpenDetails,
    onOpenEnquiry,
    showToast,
  } = props;
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Export JSON handler
  const handleExport = () => {
    try {
      if (wishlistVehicles.length === 0) {
        showToast('Your wishlist is empty. Add vehicles before exporting.', 'info');
        return;
      }
      const payload = {
        exportedAt: new Date().toISOString(),
        system: 'AutoSphere Vehicle Rental Fleet Backup',
        wishlist: wishlistVehicles.map((v) => ({
          id: v.id,
          name: v.getFullName(),
          category: v.category,
        })),
      };
      exportToJsonFile(payload, `autosphere_wishlist_${Date.now()}.json`);
      showToast('Wishlist exported successfully as JSON file.', 'success');
    } catch (err) {
      showToast(`Export failed: ${err.message}`, 'error');
    }
  };

  // Import JSON handler with Exception Handling
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsedData = await importFromJsonFile(file);
      if (Array.isArray(parsedData.wishlist)) {
        const importedIds = parsedData.wishlist.map((item) => (typeof item === 'string' ? item : item.id));
        onImportWishlist(importedIds);
        showToast(`Imported ${importedIds.length} vehicle(s) into your wishlist.`, 'success');
      } else {
        throw new Error('Imported JSON does not have a "wishlist" array.');
      }
    } catch (err) {
      showToast(`Import Error: ${err.message}`, 'error');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Saved Vehicles Wishlist">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} color="#F87171" fill="#F87171" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>Saved Vehicles</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({wishlistVehicles.length})</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {wishlistVehicles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Heart size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <p style={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '0.25rem' }}>Your wishlist is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Click the heart icon on any vehicle card to save it for quick review.</p>
            </div>
          ) : (
            wishlistVehicles.map((vehicle) => {
              const isLuxury = vehicle.category === 'Luxury';
              return (
                <div key={vehicle.id} className="drawer-item">
                  <img
                    src={vehicle.image || '/images/hero/hero_fleet.jpg'}
                    alt={vehicle.getFullName()}
                    className="drawer-item-img"
                    onError={(e) => {
                      e.currentTarget.src = '/images/hero/hero_fleet.jpg';
                    }}
                  />
                  <div className="drawer-item-info">
                    <div className="drawer-item-title">{vehicle.getFullName()}</div>
                    <div className="drawer-item-sub">
                      {isLuxury
                        ? `From ${formatCurrency(vehicle.pkg4hRate)} (4h pkg)`
                        : `${formatCurrency(vehicle.hourlyRate)}/hr · ${formatCurrency(vehicle.dailyRate)}/day`}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.35rem 0.5rem' }}
                      title="Enquire"
                      onClick={() => {
                        onClose();
                        onOpenEnquiry(vehicle);
                      }}
                    >
                      <Send size={13} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.35rem 0.5rem', color: '#F87171' }}
                      title="Remove"
                      onClick={() => onRemoveItem(vehicle.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with File I/O Actions */}
        <div className="drawer-footer">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
              onClick={handleExport}
              title="Download browser JSON export"
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
              onClick={() => fileInputRef.current?.click()}
              title="Upload JSON file to restore wishlist"
            >
              <Upload size={14} />
              <span>Import JSON</span>
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {wishlistVehicles.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}
              onClick={onClearWishlist}
            >
              <Trash2 size={13} />
              <span>Clear Wishlist</span>
            </button>
          )}

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
            Instant backup &amp; restore for your selected fleet preferences
          </div>
        </div>
      </div>
    </div>
  );
}
