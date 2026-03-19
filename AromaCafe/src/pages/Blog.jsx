import { img } from '../utils/img';
import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';

const posts = [
  { title: 'The Art of the Perfect Espresso Pull', date: 'March 12, 2025', category: 'Craft', desc: 'From grind size to extraction time — we break down the science and soul behind pulling a flawless espresso shot.', img: img('/images/espresso.jpg') },
  { title: 'Why We Chose Single-Origin Beans', date: 'February 20, 2025', category: 'Sourcing', desc: 'Our brew master Nadia shares the story of how we found our farmers and why traceability matters in every cup we serve.', img: img('/images/specialty.jpg') },
  { title: 'Creating a Cozy Cafe Corner at Home', date: 'February 5, 2025', category: 'Lifestyle', desc: 'You don\'t need a full espresso machine to recreate the AromaCafe vibe. Here are our tips for a beautiful home coffee ritual.', img: img('/images/pastries.jpg') },
];

export default function Blog() {
  return (
    <>
      <PageHeader label="Stories & Craft" title="The Aroma Blog" subtitle="Thoughts on coffee, community, and the good life" />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {posts.map((p, i) => (
              <Animate key={p.title} variant="fadeUp" delay={`${i * 120}ms`}>
                <div className="card">
                  <img src={p.img} alt={p.title} className="card-img" />
                  <div className="card-body">
                    <div className="card-tag">{p.category}</div>
                    <p className="blog-date">{p.date}</p>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-text">{p.desc}</p>
                    <a href="#" className="card-link">Read Article →</a>
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
