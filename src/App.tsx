import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import NetworkCanvas from './components/NetworkCanvas';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import JourneyPage from './pages/JourneyPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

// ─── Theme Context Provider ───────────────────────────────────────────────────
function AppContent() {
  const location = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  const [menuOpen, setMenuOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const navLinks = [
    { to: '/', label: 'hub', end: true },
    { to: '/journey', label: 'journey' },
    { to: '/skills', label: 'skills' },
    { to: '/contact', label: 'contact' },
  ];

  return (
    <>
      {/* Reset scroll position on every route change */}
      <ScrollToTop />

      {/* 3D Interactive Background Canvas */}
      <NetworkCanvas theme={theme} />

      {/* ── Sticky Navbar ─────────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo">
            <span style={{ color: 'var(--color-cyan)' }}>NAMEET</span>
            <span style={{ color: 'var(--color-purple)' }}>.AHIRE()</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `navbar-link ${isActive ? 'active-route' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="toggle-label" style={{ fontSize: '11px', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </span>
          </button>

          {/* Hamburger (Mobile) */}
          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active-route' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-glass)' }}>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-display)' }}>
                {theme === 'dark' ? 'SWITCH TO LIGHT MODE' : 'SWITCH TO DARK MODE'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <main className="app-container" style={{ paddingTop: '80px' }}>
        <div key={location.pathname} className="page-transition-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Nameet Ahire — M.Tech Student @ SPIT • AI/ML • DevOps • Cloud Security</p>
          <p className="footer-status">
            system.status = <span style={{ color: 'var(--color-teal)' }}>SECURE_OK</span>
            {'  '}•{'  '}
            theme = <span style={{ color: 'var(--color-cyan)' }}>{theme.toUpperCase()}_MODE</span>
          </p>
        </footer>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
