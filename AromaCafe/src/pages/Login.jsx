import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Animate from '../components/Animate';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('All fields are required.'); return; }
    const demoUsers = {
      'admin@aromacafe.com': { role: 'admin', name: 'Admin' },
      'staff@aromacafe.com': { role: 'staff', name: 'Staff' },
      'guest@aromacafe.com': { role: 'customer', name: 'Guest' },
    };
    const user = demoUsers[form.email];
    if (user && form.password === 'coffee123') {
      login({ ...user, email: form.email });
      navigate(user.role === 'admin' ? '/dashboard/admin' : user.role === 'staff' ? '/dashboard/staff' : '/dashboard/customer');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <section className="form-section">
      <Animate variant="scaleUp">
        <div className="form-wrap">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Sign in to your AromaCafe account.</p>
          {error && <div className="form-feedback error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-submit">Sign In</button>
          </form>
          <div className="auth-links">
            <p>New here? <Link to="/register">Create an account</Link></p>
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg3)', borderLeft: '3px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--fl)', fontSize: '.7rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.5rem' }}>Demo Credentials</p>
            <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.8 }}>
              admin@aromacafe.com<br />staff@aromacafe.com<br />guest@aromacafe.com<br />
              <span style={{ color: 'var(--text)' }}>Password: coffee123</span>
            </p>
          </div>
        </div>
      </Animate>
    </section>
  );
}
