import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How do I book a vehicle on AutoSphere?',
    a: 'Select your preferred pick-up and drop-off locations, travel dates, and times in the search panel. Choose between Everyday Rides (self-drive hatchbacks, sedans, SUVs, and two-wheelers) or Luxury Chauffeur rides. Select any vehicle to inspect real-time pricing and submit your reservation enquiry. Our concierge team will immediately coordinate vehicle handover or airport delivery.',
  },
  {
    q: 'What documents are required for self-drive car and bike rentals?',
    a: 'For self-drive bookings, the primary driver must be at least 21 years of age and hold a valid, original Indian Driving License (or an International Driving Permit with passport for overseas travelers) and government photo ID (Aadhaar or Passport). For Luxury Chauffeur rentals, no driving credentials are required since our vetted professional chauffeur operates the car.',
  },
  {
    q: 'What is included in the Luxury Chauffeur packages?',
    a: 'Our executive chauffeur fleet (including BMW 7 Series, Mercedes GLS, and Audi A6) is hired under curated 4 Hours / 40 km or 8 Hours / 80 km packages. Fuel, executive chauffeur services, vehicle sanitization, and passenger comforts are included in the package. Any additional hours or distance are billed at clear, predetermined hourly and kilometer rates.',
  },
  {
    q: 'How does the pricing work for everyday hourly and multi-day rentals?',
    a: 'For trips under 24 hours, rentals are billed strictly on an hourly basis, rounded up to the nearest full hour. For rentals of 24 hours or more, the pricing transitions automatically into daily billing cycles (rounded up to the next full day), ensuring the most cost-effective rates for extended journeys and multi-day business travel.',
  },
  {
    q: 'Can I pick up a car at the airport and return it at another city hub?',
    a: 'Yes! AutoSphere offers flexible point-to-point and inter-hub travel across major metropolitan terminals in Bengaluru, Mumbai, and New Delhi. Simply choose differing pick-up and drop-off hubs in the reservation panel, and our ground operations team will arrange seamless handover.',
  },
  {
    q: 'What is your cancellation and schedule modification policy?',
    a: 'Reservations can be modified or cancelled free of charge up to 6 hours before scheduled pick-up for everyday self-drive rides. For luxury chauffeur fleet allocations, we recommend giving at least 12 hours notice to allow our logistics team to reassign executive chauffeurs without delay.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section-padding" id="faq-section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Help &amp; Customer Support</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about booking, fleet options, chauffeur services, and pickup guidelines.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-card">
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} color="var(--btn-primary)" style={{ flexShrink: 0 }} />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
