import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-brand">Aroma<span>Cafe</span></div>
          <p className="footer-tagline">Where every sip tells a story. Crafted with love, served with warmth.</p>
        </div>
        <div className="footer-col">
          <h4>Discover</h4>
          <Link to="/about">Our Story</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/baristas">Baristas</Link>
          <Link to="/events">Events</Link>
        </div>
        <div className="footer-col">
          <h4>Loyalty</h4>
          <Link to="/loyalty">Loyalty Plans</Link>
          <Link to="/register">Join Now</Link>
          <Link to="/login">Member Login</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="footer-col">
          <h4>Visit Us</h4>
          <a href="tel:+94112345678">+94 11 234 5678</a>
          <a href="mailto:hello@aromacafe.com">hello@aromacafe.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 AromaCafe — All Rights Reserved
      </div>
    </footer>
  );
}
