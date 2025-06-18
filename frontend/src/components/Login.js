import React, { useState } from 'react';
import axios from 'axios';
import './styling.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, form);
      setMessage(res.data.message);
      // localStorage.setItem('token', res.data.token); // uncomment if needed
    } catch (err) {
      setMessage(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
