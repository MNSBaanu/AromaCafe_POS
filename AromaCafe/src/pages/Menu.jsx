import { Link } from 'react-router-dom';
import Animate from '../components/Animate';
import PageHeader from '../components/PageHeader';

const menuItems = [
  { num: '01', title: 'Signature Espresso', desc: 'A double shot of our house-blend espresso — rich, velvety, and perfectly balanced with notes of dark chocolate and citrus.', price: '$4.50' },
  { num: '02', title: 'Cardamom Rose Latte', desc: 'Our most-loved seasonal creation. Silky steamed milk infused with cardamom and rose water, topped with a delicate foam art.', price: '$6.00' },
  { num: '03', title: 'Cold Brew Tonic', desc: 'Slow-steeped cold brew over sparkling tonic water with a hint of orange peel. Refreshing, complex, and utterly addictive.', price: '$5.50' },
  { num: '04', title: 'Matcha Oat Latte', desc: 'Ceremonial-grade matcha whisked with creamy oat milk. Earthy, smooth, and a beautiful alternative to coffee.', price: '$5.75' },
  { num: '05', title: 'Butter Croissant', desc: 'Baked fresh every morning with imported French butter. Flaky, golden, and best enjoyed warm with a side of jam.', price: '$3.50' },
  { num: '06', title: 'Seasonal Tart', desc: 'Our pastry chef crafts a new tart each week using seasonal fruits and house-made custard. Ask your barista for today\'s special.', price: '$4.25' },
];

export default function Menu() {
  return (
    <>
      <PageHeader label="What We Serve" title="Our Menu" subtitle="Crafted with intention, served with love" />
      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          {menuItems.map((item, i) => (
            <Animate key={item.title} variant="fadeLeft" delay={`${i * 100}ms`}>
              <div className="menu-item">
                <div className="menu-num">{item.num}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="menu-item-price">{item.price}</div>
              </div>
            </Animate>
          ))}
        </div>
      </section>
    </>
  );
}
