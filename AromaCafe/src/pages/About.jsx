import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';
import { img } from '../utils/img';

const baristas = [
  { img: img('/images/barista1.jpg'), name: 'Kavya Mendis', role: 'Head Barista', spec: 'Espresso & Latte Art' },
  { img: img('/images/barista2.jpg'), name: 'Roshan Fernando', role: 'Pastry Chef', spec: 'Artisan Baking & Desserts' },
  { img: img('/images/barista3.jpg'), name: 'Nadia Perera', role: 'Brew Master', spec: 'Cold Brew & Pour-Over' },
];

const values = [
  { icon: '☕', title: 'Craft', desc: 'Every cup is made with precision, care, and a deep respect for the bean.' },
  { icon: '🌿', title: 'Sustainability', desc: 'We source ethically, reduce waste, and partner with responsible farms.' },
  { icon: '🤝', title: 'Community', desc: 'AromaCafe is a gathering place — for conversations, creativity, and connection.' },
  { icon: '✨', title: 'Warmth', desc: 'We believe hospitality is an art. Every guest deserves to feel at home.' },
];

export default function About() {
  return (
    <>
      <PageHeader label="Our Story" title="About AromaCafe" subtitle="Born from a love of coffee and community." />

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <Animate variant="fadeLeft">
              <div>
                <div className="sec-label">Our Purpose</div>
                <h2 className="sec-title">Our <em>Mission</em></h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '2rem', fontSize: '.95rem', fontFamily: 'var(--fm)' }}>
                  At AromaCafe, we believe a great cup of coffee can change the tone of your entire day. Our mission is to craft exceptional coffee experiences in a space that feels warm, welcoming, and wonderfully unhurried.
                </p>
                <div className="sec-label">Why Choose Us</div>
                <ul style={{ listStyle: 'none', marginTop: '.5rem' }}>
                  {['Single-origin, ethically sourced beans', 'In-house roasting & fresh daily bakes', 'Seasonal & rotating specialty menu', 'Cozy, work-friendly atmosphere', 'Passionate, trained baristas'].map((item, i) => (
                    <Animate key={item} variant="fadeLeft" delay={`${i * 80}ms`}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.6rem 0', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontSize: '.9rem' }}>
                        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>→</span> {item}
                      </li>
                    </Animate>
                  ))}
                </ul>
              </div>
            </Animate>

            <Animate variant="fadeRight" delay="150ms">
              <div>
                <div className="sec-label">What We Stand For</div>
                <h2 className="sec-title">Our <em>Values</em></h2>
                <div style={{ marginTop: '1.5rem' }}>
                  {values.map((v, i) => (
                    <Animate key={v.title} variant="fadeUp" delay={`${i * 100}ms`}>
                      <div className="about-value">
                        <div className="about-value-icon">{v.icon}</div>
                        <div>
                          <h4>{v.title}</h4>
                          <p>{v.desc}</p>
                        </div>
                      </div>
                    </Animate>
                  ))}
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Animate variant="fadeUp">
            <div className="sec-head sec-head-center">
              <div className="sec-label">The Team</div>
              <h2 className="sec-title">Meet the <em>Makers</em></h2>
              <p className="sec-sub">The talented people behind every perfect cup and every warm smile.</p>
            </div>
          </Animate>
          <div className="grid-3">
            {baristas.map((b, i) => (
              <Animate key={b.name} variant="scaleUp" delay={`${i * 130}ms`}>
                <div className="barista-card">
                  <div className="barista-img-wrap">
                    <img src={b.img} alt={b.name} className="barista-img" />
                    <div className="barista-overlay" />
                  </div>
                  <div className="barista-body">
                    <p className="barista-name">{b.name}</p>
                    <p className="barista-role">{b.role}</p>
                    <p className="barista-bio">{b.spec}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
