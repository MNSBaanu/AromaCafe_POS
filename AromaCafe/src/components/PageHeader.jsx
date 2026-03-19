import { img } from '../utils/img';
import Animate from './Animate';

export default function PageHeader({ label, title, subtitle }) {
  return (
    <div
      className="page-header"
      style={{ backgroundImage: `url(${img('/images/cafe-bg.jpg')})` }}
    >
      <div className="page-header-overlay" />
      <div className="page-header-content">
        <Animate variant="fadeIn">
          <div className="page-header-label">{label}</div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </Animate>
      </div>
    </div>
  );
}
