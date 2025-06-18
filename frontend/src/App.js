import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="app-container">
      <h1>{showLogin ? 'Login' : 'Register'}</h1>
      {showLogin ? <Login /> : <Register />}
      <p
        style={{ marginTop: 20, cursor: 'pointer', color: 'blue' }}
        onClick={() => setShowLogin(!showLogin)}
      >
        {showLogin
          ? 'Need an account? Register here'
          : 'Already have an account? Login here'}
      </p>
    </div>
  );
}
