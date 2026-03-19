import { useState, useEffect } from 'react';

const testimonials = [
  { text: 'AromaCafe is my morning ritual. The espresso is perfectly balanced — rich, smooth, and never bitter. I come here every single day.', author: 'Priya Nair', since: 'Guest since 2023' },
  { text: 'The atmosphere is magical. Warm lighting, the smell of fresh coffee, and the kindest baristas. It feels like home every time.', author: 'Daniel Perera', since: 'Guest since 2022' },
  { text: 'Their seasonal lattes are absolutely divine. The cardamom rose latte changed my life. I bring all my friends here now.', author: 'Amara Silva', since: 'Guest since 2024' },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="testimonials-wrapper">
      <div className="testimonial-card">
        <p className="testimonial-text">"{testimonials[current].text}"</p>
        <p className="testimonial-author">{testimonials[current].author}</p>
        <p className="testimonial-since">{testimonials[current].since}</p>
      </div>
      <div className="slider-controls">
        <button className="slider-btn" onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)}>‹</button>
        <button className="slider-btn" onClick={() => setCurrent(c => (c + 1) % testimonials.length)}>›</button>
      </div>
      <div className="slider-dots">
        {testimonials.map((_, i) => (
          <span key={i} className={`dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
