import { useState } from 'react';
import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';

const info = [
  { icon: '📞', label: 'Phone', value: '+94 11 234 5678' },
  { icon: '✉', label: 'Email', value: 'hello@aromacafe.com' },
  { icon: '📍', label: 'Location', value: 'No. 47, Galle Road, Colombo 03, Sri Lanka' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Fri: 7AM–9PM | Sat–Sun: 8AM–10PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFeedback({ type: 'error', msg: 'All fields are required.' });
      return;
    }
    setFeedback({ type: 'success', msg: "Message sent! We'll get back to you within 24 hours." });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageHeader label="Reach Out" title="Get in Touch" subtitle="Questions, reservations, or just a hello — we'd love to hear from you." />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <Animate variant="fadeLeft">
              <div className="contact-info">
                <h3>Visit or Contact Us</h3>
                {info.map(i => (
                  <div className="contact-row" key={i.label}>
                    <div className="contact-icon">{i.icon}</div>
                    <div>
                      <strong>{i.label}</strong>
                      <span>{i.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Animate>

            <Animate variant="fadeRight">
              <div className="form-wrap" style={{ maxWidth: '100%' }}>
                <h2 className="form-title">Send a Message</h2>
                {feedback && <div className={`form-feedback ${feedback.type}`}>{feedback.msg}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="btn-submit">Send Message</button>
                </form>
              </div>
            </Animate>
          </div>
        </div>
      </section>
    </>
  );
}
