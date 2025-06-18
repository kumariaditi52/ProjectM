import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, form);
      setMessage(res.data); // server sends 'User registered successfully'
    } catch (err) {
      setMessage(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
