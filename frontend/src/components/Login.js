import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styling.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, form);
      
      // Fix: Handle different response formats
      let successMessage = '';
      if (typeof res.data === 'string') {
        successMessage = res.data;
      } else if (res.data && res.data.message) {
        successMessage = res.data.message;
      } else {
        successMessage = 'Login successful';
      }
      
      setMessage(successMessage);
      
      // Store token if needed
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      // Add success class for styling
      setTimeout(() => {
        const messageElement = document.querySelector('.Login p');
        if (messageElement) {
          messageElement.classList.add('success');
        }
      }, 100);
      
      // Redirect to home page after successful login
      if (res.status === 200) {
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (err) {
      // Fix: Handle error response properly
      let errorMessage = 'Login failed';
      
      if (err.response) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Enter your email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Enter your password" 
          value={form.password} 
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Login'}
        </button>
        {message && <p>{String(message)}</p>}
      </form>
      
      <p>
        Don't have an account? 
        <Link to="/register"> Register here</Link>
      </p>
    </div>
  );
}
