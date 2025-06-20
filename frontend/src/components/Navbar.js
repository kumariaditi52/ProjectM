import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ title = "Dashboard" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/register';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>{title}</h2>
        </div>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="/home" className={`nav-link ${isActive('/home')}`} onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <a href="/analytics" className={`nav-link ${isActive('/analytics')}`} onClick={() => setIsMenuOpen(false)}>
            Analytics
          </a>
          <a href="/users" className={`nav-link ${isActive('/users')}`} onClick={() => setIsMenuOpen(false)}>
            Users
          </a>
          <a href="/settings" className={`nav-link ${isActive('/settings')}`} onClick={() => setIsMenuOpen(false)}>
            Settings
          </a>
          <a href="/reports" className={`nav-link ${isActive('/reports')}`} onClick={() => setIsMenuOpen(false)}>
            Reports
          </a>
          <button className="nav-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}