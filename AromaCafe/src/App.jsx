import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Baristas from './pages/Baristas';
import Events from './pages/Events';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Loyalty from './pages/Loyalty';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/AromaCafe/">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/baristas" element={<Baristas />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/admin" element={
              <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/staff" element={
              <ProtectedRoute roles={['admin', 'staff']}><StaffDashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/customer" element={
              <ProtectedRoute roles={['admin', 'staff', 'customer']}><CustomerDashboard /></ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
