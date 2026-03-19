import { Link } from 'react-router-dom';
import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';

const plans = [
  {
    name: 'Brew',
    price: 'Free',
    period: 'forever',
    desc: 'Start collecting points from your very first visit. Perfect for casual coffee lovers.',
    features: ['Earn 1 point per $1 spent', 'Birthday free drink', 'Early access to seasonal menu', 'Member-only discounts'],
  },
  {
    name: 'Reserve',
    price: '$12',
    period: 'per month',
    desc: 'For the regulars who want more. Perks, priority, and a little extra love in every cup.',
    features: ['All Brew benefits', 'Earn 2x points on every visit', 'Free drink every month', 'Priority event booking', 'Exclusive Reserve blends'],
    featured: true,
  },
  {
    name: 'Prestige',
    price: '$29',
    period: 'per month',
    desc: 'The ultimate AromaCafe experience. Unlimited perks, personal service, and curated surprises.',
    features: ['All Reserve benefits', 'Unlimited free filter coffee', 'Monthly curated bean box', 'Private tasting invitations', 'Dedicated barista requests', 'Free guest passes (2/month)'],
  },
];

export default function Loyalty() {
  return (
    <>
      <PageHeader label="Join the Family" title="Loyalty Plans" subtitle="The more you visit, the more you're rewarded" />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {plans.map((p, i) => (
              <Animate key={p.name} variant="scaleUp" delay={`${i * 120}ms`}>
                <div className={`plan-card${p.featured ? ' featured' : ''}`}>
                  {p.featured && <div className="plan-badge">Most Popular</div>}
                  <div className="plan-name">{p.name}</div>
                  <div className="plan-price">{p.price}</div>
                  <div className="plan-period">{p.period}</div>
                  <p className="plan-desc">{p.desc}</p>
                  <ul className="plan-features">
                    {p.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <Link to="/register" className={`btn ${p.featured ? 'btn-amber' : 'btn-ghost'}`} style={{ display: 'block', textAlign: 'center' }}>
                    Get Started
                  </Link>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
