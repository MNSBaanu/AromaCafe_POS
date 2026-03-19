import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Animate from '../../components/Animate';

const cards = [
  { title: 'Today\'s Events', desc: 'View and manage today\'s scheduled events and guest reservations.', link: '/events', linkText: 'View Events' },
  { title: 'Guest Inquiries', desc: 'Review and respond to incoming guest messages and requests.', link: '/contact', linkText: 'View Inquiries' },
  { title: 'Menu Updates', desc: 'Update daily specials, seasonal items, and availability.', link: '/menu', linkText: 'View Menu' },
  { title: 'Loyalty Check-ins', desc: 'Process guest loyalty points and manage member check-ins.', link: '/loyalty', linkText: 'Go to Loyalty' },
];

export default function StaffDashboard() {
  const { user } = useAuth();
  return (
    <div className="dashboard-section">
      <div className="container">
        <Animate variant="fadeUp">
          <h1 style={{ fontFamily: 'var(--fp)', fontSize: '2rem', color: 'var(--white)', fontStyle: 'italic', marginBottom: '.5rem' }}>Staff Dashboard</h1>
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--fm)', marginBottom: '0' }}>Good to see you, {user?.name || 'Staff'}. Here's what needs your attention today.</p>
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
