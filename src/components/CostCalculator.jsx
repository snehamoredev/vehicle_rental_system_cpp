import React, { useState } from 'react';
import { Calculator, Clock, Navigation, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { formatCurrency, computeVehicleCost } from '../services/rentalCalculator.js';
import { LUXURY_PACKAGES, TAX_NOTE } from '../config/bookingRules.js';

export default function CostCalculator({ vehicle, initialDurationHours = 4 }) {
  const isLuxury = vehicle.category === 'Luxury';

  // Everyday state
  const [durationHours, setDurationHours] = useState(initialDurationHours || 4);

  // Luxury state
  const [packageId, setPackageId] = useState('4h_40km');
  const [extraHours, setExtraHours] = useState(0);
  const [extraKm, setExtraKm] = useState(0);

  // Errors from validation
  const [calcError, setCalcError] = useState(null);

  // Polymorphic calculation execution using try/catch
  let calculation = null;
  try {
    if (isLuxury) {
      calculation = computeVehicleCost(vehicle, {
        packageId,
        extraHours: Number(extraHours),
        extraKm: Number(extraKm),
      });
    } else {
      calculation = computeVehicleCost(vehicle, {
        durationHours: Number(durationHours),
      });
    }
  } catch (err) {
    calculation = null;
    if (!calcError) {
      setCalcError(err.message);
    }
  }

  const handleDurationChange = (val) => {
    setCalcError(null);
    const parsed = parseFloat(val);
    if (isNaN(parsed) || parsed <= 0) {
      setCalcError('Duration must be a positive number.');
      setDurationHours(val);
    } else {
      setDurationHours(parsed);
    }
  };

  const handleExtraHoursChange = (val) => {
    setCalcError(null);
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0) {
      setCalcError('Extra hours must be a whole positive integer.');
      setExtraHours(val);
    } else {
      setExtraHours(num);
    }
  };

  const handleExtraKmChange = (val) => {
    setCalcError(null);
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 0) {
      setCalcError('Extra kilometers must be a whole positive integer.');
      setExtraKm(val);
    } else {
      setExtraKm(num);
    }
  };

  return (
    <div className="calculator-box" aria-label="Interactive Cost Estimator">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#FFFFFF', fontSize: '1.05rem' }}>
          <Calculator size={18} color="var(--btn-primary)" />
          <span>Instant Trip Fare Estimator</span>
        </div>
        {isLuxury ? (
          <span className="badge badge-chauffeur">Chauffeur-driven only</span>
        ) : (
          <span className="badge badge-selfdrive">Self-drive</span>
        )}
      </div>

      {/* Input Controls */}
      {isLuxury ? (
        <div className="calculator-controls-grid">
          {/* Luxury Package Selector */}
          <div className="form-group">
            <label className="form-label" htmlFor="calcPackage">
              <Clock size={14} />
              <span>Select Base Package</span>
            </label>
            <select
              id="calcPackage"
              className="form-select"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
            >
              {LUXURY_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.label}
                </option>
              ))}
            </select>
          </div>

          {/* Extra Hours */}
          <div className="form-group">
            <label className="form-label" htmlFor="calcExtraHours">
              <Clock size={14} />
              <span>Extra Hours ({formatCurrency(vehicle.extraHourRate)}/hr)</span>
            </label>
            <input
              id="calcExtraHours"
              type="number"
              min="0"
              step="1"
              className="form-input"
              value={extraHours}
              onChange={(e) => handleExtraHoursChange(e.target.value)}
            />
          </div>

          {/* Extra KM */}
          <div className="form-group">
            <label className="form-label" htmlFor="calcExtraKm">
              <Navigation size={14} />
              <span>Extra Kilometers ({formatCurrency(vehicle.extraKmRate)}/km)</span>
            </label>
            <input
              id="calcExtraKm"
              type="number"
              min="0"
              step="1"
              className="form-input"
              value={extraKm}
              onChange={(e) => handleExtraKmChange(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="calculator-controls-grid">
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="calcDurationHours">
                <Clock size={14} />
                <span>Rental Duration</span>
              </label>
              <span style={{ fontSize: '0.85rem', color: 'var(--btn-primary)', fontWeight: 700 }}>
                {durationHours} {durationHours === 1 ? 'Hour' : 'Hours'} ({ (durationHours / 24).toFixed(1) } Days)
              </span>
            </div>

            <input
              id="calcDurationHours"
              type="range"
              min="1"
              max="720"
              step="1"
              style={{ width: '100%', margin: '0.5rem 0', accentColor: 'var(--btn-primary)' }}
              value={durationHours}
              onChange={(e) => handleDurationChange(e.target.value)}
            />

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              {[2, 6, 12, 24, 48, 72].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                  onClick={() => handleDurationChange(preset)}
                >
                  {preset < 24 ? `${preset}h` : `${preset / 24}d`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exception Feedback */}
      {calcError && (
        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', color: '#F87171', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} />
          <span>{calcError}</span>
        </div>
      )}

      {/* Cost Breakdown Result Card */}
      {calculation && !calcError && (
        <div className="cost-result-card">
          {isLuxury ? (
            <>
              <div className="cost-breakdown-row">
                <span>{calculation.packageLabel} (Base)</span>
                <span className="tabular-nums" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {formatCurrency(calculation.packagePrice)}
                </span>
              </div>

              {calculation.extraHours > 0 && (
                <div className="cost-breakdown-row">
                  <span>
                    Extra Hours ({calculation.extraHours} × {formatCurrency(calculation.extraHourRate)})
                  </span>
                  <span className="tabular-nums" style={{ color: '#FFFFFF' }}>
                    +{formatCurrency(calculation.extraHoursCharge)}
                  </span>
                </div>
              )}

              {calculation.extraKm > 0 && (
                <div className="cost-breakdown-row">
                  <span>
                    Extra Distance ({calculation.extraKm} km × {formatCurrency(calculation.extraKmRate)})
                  </span>
                  <span className="tabular-nums" style={{ color: '#FFFFFF' }}>
                    +{formatCurrency(calculation.extraKmCharge)}
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="cost-breakdown-row">
                <span>Billing Rate Mode</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600, textTransform: 'capitalize' }}>
                  {calculation.mode === 'hourly'
                    ? `${formatCurrency(calculation.rate)} / hour`
                    : `${formatCurrency(calculation.rate)} / day`}
                </span>
              </div>

              <div className="cost-breakdown-row">
                <span>Billed Duration</span>
                <span style={{ color: '#FFFFFF' }}>
                  {calculation.unitsBilled} {calculation.unitName}
                </span>
              </div>

              {calculation.wasClamped && (
                <div className="cost-breakdown-row" style={{ color: 'var(--gold-accent)' }}>
                  <span>Price Range Policy Guardrail</span>
                  <span>Clamped (Min: ₹100, Max: ₹1,000)</span>
                </div>
              )}
            </>
          )}

          <div className="cost-total-row">
            <div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'block' }}>
                Estimated Total:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Estimated Trip Fare
              </span>
            </div>
            <div className="cost-total-amount tabular-nums">
              {formatCurrency(calculation.estimatedTotal)}
            </div>
          </div>

          <div className="prototype-tag-disclaimer">
            <Info size={12} style={{ display: 'inline', marginRight: 4 }} />
            <span>{TAX_NOTE}</span>
          </div>
        </div>
      )}
    </div>
  );
}
