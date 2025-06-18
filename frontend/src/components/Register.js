import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styling.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, form);
      
      // Fix: Handle different response formats
      let successMessage = '';
      if (typeof res.data === 'string') {
        successMessage = res.data;
      } else if (res.data && res.data.message) {
        successMessage = res.data.message;
      } else {
        successMessage = 'Registration successful';
      }
      
      setMessage(successMessage);
      
      // Add success class for styling
      setTimeout(() => {
        const messageElement = document.querySelector('.Register p');
        if (messageElement) {
          messageElement.classList.add('success');
        }
      }, 100);
      
      // Redirect to login page after successful registration
      if (res.status === 201) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      // Fix: Handle error response properly
      let errorMessage = 'Registration failed';
      
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
    <div className="Register">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="username" 
          placeholder="Enter your username" 
          value={form.username} 
          onChange={handleChange} 
          required 
          disabled={isLoading}
        />
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
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
        {message && <p>{String(message)}</p>}
      </form>
      
      <p>
        Already have an account? 
        <Link to="/login"> Login here</Link>
      </p>
    </div>
  );
}
