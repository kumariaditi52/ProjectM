import React, { useState } from 'react';
import './Home.css';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/register';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Dashboard</h2>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#analytics" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Analytics
            </a>
            <a href="#users" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Users
            </a>
            <a href="#settings" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Settings
            </a>
            <a href="#reports" className="nav-link" onClick={() => setIsMenuOpen(false)}>
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

      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome to Dashboard</h1>
          <p>You have successfully logged in!</p>
        </div>
      </header>

      {/* Cards Section */}
      <main className="home-main">
        <div className="cards-container">
          <div className="card" id="analytics">
            <div className="card-icon">
              <i className="icon">📊</i>
            </div>
            <div className="card-content">
              <h3>Analytics</h3>
              <p>View your performance metrics and detailed analytics dashboard.</p>
              <button className="card-btn">View Details</button>
            </div>
          </div>

          <div className="card" id="users">
            <div className="card-icon">
              <i className="icon">👥</i>
            </div>
            <div className="card-content">
              <h3>Users</h3>
              <p>Manage user accounts, permissions and user activity logs.</p>
              <button className="card-btn">Manage Users</button>
            </div>
          </div>

          <div className="card" id="settings">
            <div className="card-icon">
              <i className="icon">⚙️</i>
            </div>
            <div className="card-content">
              <h3>Settings</h3>
              <p>Configure your application settings and preferences.</p>
              <button className="card-btn">Open Settings</button>
            </div>
          </div>

          <div className="card" id="reports">
            <div className="card-icon">
              <i className="icon">📈</i>
            </div>
            <div className="card-content">
              <h3>Reports</h3>
              <p>Generate and download comprehensive business reports.</p>
              <button className="card-btn">View Reports</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
