import { useState, useEffect } from 'react';

export default function Countdown() {
  const [endDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });
  const [time, setTime] = useState({});

  useEffect(() => {
    const calc = () => {
      const diff = endDate - new Date();
      if (diff <= 0) return setTime({ ended: true });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [endDate]);

  if (time.ended) return <p>Offer has ended!</p>;

  return (
    <div className="countdown-grid">
      {['days', 'hours', 'minutes', 'seconds'].map(unit => (
        <div className="countdown-box" key={unit}>
          <span className="countdown-num">{time[unit] ?? 0}</span>
          <span className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
        </div>
      ))}
    </div>
  );
}
