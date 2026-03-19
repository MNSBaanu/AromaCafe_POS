import { Link } from 'react-router-dom';
import TestimonialSlider from '../components/TestimonialSlider';
import Countdown from '../components/Countdown';
import Animate from '../components/Animate';
import { img } from '../utils/img';

const offerings = [
  { img: img('/images/espresso.jpg'), tag: 'Signature', title: 'Artisan Espresso', desc: 'Single-origin beans, precision-pulled shots. Every cup is a craft — bold, balanced, and beautifully aromatic.', link: '/menu' },
  { img: img('/images/pastries.jpg'), tag: 'Freshly Baked', title: 'House Pastries', desc: 'Baked in-house every morning. Croissants, tarts, and seasonal specials that pair perfectly with your brew.', link: '/menu' },
  { img: img('/images/specialty.jpg'), tag: 'Seasonal', title: 'Specialty Drinks', desc: 'From cardamom rose lattes to cold brew tonics — our rotating seasonal menu keeps every visit exciting.', link: '/menu' },
];

const stats = [
  { num: '200+', label: 'Daily Guests' },
  { num: '15+', label: 'Signature Drinks' },
  { num: '8+', label: 'Expert Baristas' },
  { num: '5+', label: 'Years of Craft' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img src={img('/images/hero.jpg')} className="hero-layer" alt="" aria-hidden="true" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">Welcome to AromaCafe</div>
          <h1>Where Every<br /><em>Sip Matters</em></h1>
          <p className="hero-sub">
            Specialty coffee, artisan pastries, and a space that feels like home. Come as you are — stay as long as you like.
          </p>
          <div className="hero-btns">
            <Link to="/menu" className="btn btn-amber">Explore Menu</Link>
            <Link to="/loyalty" className="btn btn-outline">Join Loyalty</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          {stats.map(s => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFERINGS */}
      <section className="section">
        <div className="container">
          <Animate variant="fadeUp">
            <div className="sec-head">
              <div className="sec-label">What We Serve</div>
              <h2 className="sec-title">Crafted with <em>Passion</em></h2>
              <p className="sec-sub">Every item on our menu is made with intention — from the first grind to the final garnish.</p>
            </div>
          </Animate>
          <div className="grid-3">
            {offerings.map((o, i) => (
              <Animate key={o.title} variant="fadeUp" delay={`${i * 120}ms`}>
                <div className="card">
                  <img src={o.img} alt={o.title} className="card-img" />
                  <div className="card-body">
                    <div className="card-tag">{o.tag}</div>
                    <h3 className="card-title">{o.title}</h3>
                    <p className="card-text">{o.desc}</p>
                    <Link to={o.link} className="card-link">Discover More →</Link>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-alt section-bg1" style={{ backgroundImage: `url(${img('/images/cafe-bg.jpg')})` }}>
        <div className="container">
          <Animate variant="fadeUp">
            <div className="sec-head sec-head-center">
              <div className="sec-label">Guest Stories</div>
              <h2 className="sec-title">Real People.<br /><em>Real Moments.</em></h2>
              <p className="sec-sub">Don't take our word for it — hear from the guests who've made AromaCafe their second home.</p>
            </div>
          </Animate>
          <Animate variant="scaleUp" delay="150ms">
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <TestimonialSlider />
            </div>
          </Animate>
        </div>
      </section>

      {/* PROMO COUNTDOWN */}
      <section className="promo-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Animate variant="fadeUp">
            <div className="sec-label" style={{ justifyContent: 'center' }}>Limited Time Offer</div>
            <h2 className="sec-title" style={{ color: 'var(--white)', textAlign: 'center', marginBottom: '.75rem' }}>
              GET <em>FREE COFFEE</em> FOR YOUR FIRST WEEK
            </h2>
            <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '.95rem', fontFamily: 'var(--fm)' }}>
              Join our loyalty program before the offer ends. Your first 7 days of coffee — on us.
            </p>
          </Animate>
          <Animate variant="scaleUp" delay="200ms">
            <Countdown />
          </Animate>
          <Animate variant="fadeUp" delay="300ms">
            <div style={{ textAlign: 'center' }}>
              <Link to="/register" className="btn btn-gold">Claim Your Offer</Link>
            </div>
          </Animate>
        </div>
      </section>
    </>
  );
}
