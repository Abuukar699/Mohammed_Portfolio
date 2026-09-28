import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function App() {
  return (
    <Router basename={routerBasename}>
      <AuthProvider>
        <ProjectsProvider>
          <ScrollToTop />
          <Routes>
            {/* ── Public routes (with Navbar + Footer) ── */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* ── Admin routes (standalone — no Navbar/Footer) ── */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
