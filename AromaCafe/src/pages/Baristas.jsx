import { img } from '../utils/img';
import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';

const baristas = [
  { img: img('/images/barista1.jpg'), name: 'Kavya Mendis', role: 'Head Barista', bio: 'Champion-level latte artist with 7+ years of specialty coffee experience. Trained in Melbourne and passionate about single-origin espresso.', email: 'kavya@aromacafe.com' },
  { img: img('/images/barista2.jpg'), name: 'Roshan Fernando', role: 'Pastry Chef', bio: 'Classically trained in Paris, Roshan brings French technique to Sri Lankan flavors. Every pastry is a small masterpiece.', email: 'roshan@aromacafe.com' },
  { img: img('/images/barista3.jpg'), name: 'Nadia Perera', role: 'Brew Master', bio: 'Specializes in cold brew and pour-over methods. Nadia sources our beans directly from farms in Ella and Kandy.', email: 'nadia@aromacafe.com' },
  { img: img('/images/barista1.jpg'), name: 'Tharindu Silva', role: 'Barista & Host', bio: 'The warmest face in the cafe. Tharindu ensures every guest feels welcomed and every order is made with care.', email: 'tharindu@aromacafe.com' },
];

export default function Baristas() {
  return (
    <>
      <PageHeader label="The Craft Makers" title="Meet Your Baristas" subtitle="The passionate people behind every perfect cup" />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {baristas.map((b, i) => (
              <Animate key={b.name} variant="fadeUp" delay={`${i * 120}ms`}>
                <div className="barista-card">
                  <div className="barista-img-wrap">
                    <img src={b.img} alt={b.name} className="barista-img" />
                    <div className="barista-overlay" />
                  </div>
                  <div className="barista-body">
                    <p className="barista-name">{b.name}</p>
                    <p className="barista-role">{b.role}</p>
                    <p className="barista-bio">{b.bio}</p>
                    <a href={`mailto:${b.email}`} className="barista-contact">✉ Say Hello</a>
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
