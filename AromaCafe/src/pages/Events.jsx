import { Link } from 'react-router-dom';
import { img } from '../utils/img';
import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';

const events = [
  { tag: 'Workshop', title: 'Latte Art Masterclass', host: 'Kavya Mendis', schedule: 'Every Saturday — 10:00 AM', desc: 'Learn the art of milk steaming and latte art from our head barista. Suitable for beginners and coffee enthusiasts alike.', img: img('/images/espresso.jpg') },
  { tag: 'Tasting', title: 'Single-Origin Coffee Tasting', host: 'Nadia Perera', schedule: 'First Sunday of the Month — 3:00 PM', desc: 'Explore the flavor profiles of coffees from different regions. A guided sensory journey through our curated bean selection.', img: img('/images/specialty.jpg') },
  { tag: 'Social', title: 'Cafe Open Mic Night', host: 'AromaCafe Team', schedule: 'Last Friday of the Month — 7:00 PM', desc: 'An intimate evening of live music, poetry, and storytelling. Grab a drink, find a cozy seat, and enjoy the talent.', img: img('/images/pastries.jpg') },
];

export default function Events() {
  return (
    <>
      <PageHeader label="Gather With Us" title="Cafe Events" subtitle="More than coffee — a place for experiences" />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {events.map((e, i) => (
              <Animate key={e.title} variant="fadeUp" delay={`${i * 120}ms`}>
                <div className="card">
                  <img src={e.img} alt={e.title} className="card-img" />
                  <div className="card-body">
                    <div className="card-tag">{e.tag}</div>
                    <h3 className="card-title">{e.title}</h3>
                    <p className="card-text">{e.desc}</p>
                    <p className="card-meta">Host: {e.host}</p>
                    <p className="card-schedule">{e.schedule}</p>
                    <Link to="/register" className="btn btn-ghost btn-sm">Reserve a Spot</Link>
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
