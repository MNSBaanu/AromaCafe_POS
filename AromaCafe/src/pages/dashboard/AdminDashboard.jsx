import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Animate from '../../components/Animate';

const cards = [
  { title: 'Manage Guests', desc: 'View and manage loyalty members, their plans, and visit history.', link: '/loyalty', linkText: 'Go to Members' },
  { title: 'Manage Events', desc: 'Create, edit, or cancel cafe events and manage reservations.', link: '/events', linkText: 'Go to Events' },
  { title: 'Handle Inquiries', desc: 'Review and respond to guest messages and support requests.', link: '/contact', linkText: 'Go to Inquiries' },
  { title: 'Manage Baristas', desc: 'Add, edit, or update barista profiles and their specialties.', link: '/baristas', linkText: 'Go to Baristas' },
  { title: 'Loyalty Plans', desc: 'Configure loyalty tiers, pricing, and member benefits.', link: '/loyalty', linkText: 'Go to Plans' },
  { title: 'Settings', desc: 'Configure promotions, seasonal menus, and site-wide preferences.', link: '/', linkText: 'Go to Settings' },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="dashboard-section">
      <div className="container">
        <Animate variant="fadeUp">
          <h1 style={{ fontFamily: 'var(--fp)', fontSize: '2rem', color: 'var(--white)', fontStyle: 'italic', marginBottom: '.5rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--fm)', marginBottom: '0' }}>Welcome, {user?.name || 'Admin'}. Manage AromaCafe from here.</p>
        </Animate>
        <div className="dashboard-grid">
          {cards.map((c, i) => (
            <Animate key={c.title} variant="fadeUp" delay={`${i * 80}ms`}>
              <div className="dashboard-card">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <Link to={c.link}>{c.linkText} →</Link>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </div>
  );
}
