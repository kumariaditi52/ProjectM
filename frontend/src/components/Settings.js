import React, { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'English',
    timezone: 'UTC'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="settings-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Settings</h2>
          </div>
          
          <div className="nav-menu">
            <a href="/home" className="nav-link">Home</a>
            <a href="/analytics" className="nav-link">Analytics</a>
            <a href="/users" className="nav-link">Users</a>
            <a href="/settings" className="nav-link active">Settings</a>
            <a href="/reports" className="nav-link">Reports</a>
            <button className="nav-logout-btn" onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/register';
            }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="settings-content">
        <h1>Application Settings</h1>
        <div className="settings-form">
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              Enable Notifications
            </label>
          </div>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
              Dark Mode
            </label>
          </div>
          
          <div className="setting-item">
            <label>Language:</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label>Timezone:</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </div>
          
          <button className="save-btn">Save Settings</button>
        </div>
      </div>
    </div>
  );
}