import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Animate from '../../components/Animate';

const cards = [
  { title: 'Explore Menu', desc: 'Browse our full menu of specialty drinks, pastries, and seasonal specials.', link: '/menu', linkText: 'View Menu' },
  { title: 'Your Loyalty Plan', desc: 'Check your points, rewards, and loyalty tier status.', link: '/loyalty', linkText: 'Go to Loyalty' },
  { title: 'Upcoming Events', desc: 'Browse and reserve spots for our upcoming workshops and social events.', link: '/events', linkText: 'View Events' },
  { title: 'Meet the Baristas', desc: 'Get to know the talented people crafting your favorite drinks.', link: '/baristas', linkText: 'View Baristas' },
  { title: 'Read the Blog', desc: 'Coffee tips, sourcing stories, and lifestyle inspiration from our team.', link: '/blog', linkText: 'Go to Blog' },
  { title: 'Contact Us', desc: 'Have a question or special request? We\'re always happy to help.', link: '/contact', linkText: 'Get in Touch' },
];

export default function CustomerDashboard() {
  const { user } = useAuth();
  return (
    <div className="dashboard-section">
      <div className="container">
        <Animate variant="fadeUp">
          <h1 style={{ fontFamily: 'var(--fp)', fontSize: '2rem', color: 'var(--white)', fontStyle: 'italic', marginBottom: '.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--fm)', marginBottom: '0' }}>Hello, {user?.name || 'Guest'}! What would you like to explore today?</p>
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
