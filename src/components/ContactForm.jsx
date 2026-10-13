import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle, Clock } from 'lucide-react';

export default function ContactForm({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Corporate Fleet & Airport Transfer',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      if (showToast) showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    if (showToast) {
      showToast('Thank you! Your message has been sent to our concierge team.', 'success');
    }
  };

  return (
    <section className="section-padding" id="contact-section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">24/7 Concierge &amp; Inquiries</span>
          <h2 className="section-title">Get in Touch with AutoSphere</h2>
          <p className="section-subtitle">
            Have a custom travel requirement, corporate fleet inquiry, or questions about our luxury chauffeur service? Our concierge is on standby.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={48} color="var(--btn-primary)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Inquiry Dispatched Successfully
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. A dedicated AutoSphere concierge manager has received your message and will get in touch shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Corporate Fleet & Airport Transfer', message: '' });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactName">Your Name</label>
                      <input
                        id="contactName"
                        type="text"
                        placeholder="e.g. Vikram Malhotra"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactEmail">Your Email</label>
                      <input
                        id="contactEmail"
                        type="email"
                        placeholder="vikram@example.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactSubject">Subject / Request Type</label>
                    <input
                      id="contactSubject"
                      type="text"
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactMessage">Message or Itinerary Details</label>
                    <textarea
                      id="contactMessage"
                      rows={4}
                      placeholder="Share your travel itinerary, preferred vehicle model, or special chauffeur instructions..."
                      className="form-input"
                      style={{ resize: 'vertical' }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary" style={{ height: '44px' }}>
                      <Send size={16} />
                      <span>Send Inquiry</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Real Contact Details & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={20} color="var(--btn-primary)" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>Central Operations Terminal</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>AutoSphere Aviation Corridor, Kempegowda Int. Airport Road, Bengaluru, Karnataka 560300</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={20} color="var(--btn-primary)" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>Corporate &amp; Concierge Desk</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>concierge@autosphererentals.in | corporate@autosphererentals.in</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={20} color="var(--btn-primary)" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>24/7 Roadside &amp; Customer Care</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>+91 (080) 4920-8000 · Toll-Free: 1800-209-AUTO (2886)</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={20} color="var(--btn-primary)" />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' }}>Hours of Operation</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Fleet dispatches 24 hours a day, 7 days a week, 365 days a year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
