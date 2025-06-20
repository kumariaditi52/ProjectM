const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
  const sql = 'SELECT id, username as name, email, role, created_at FROM users ORDER BY created_at DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
    res.json(results);
  });
});

// POST create new user
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  
  console.log('Creating user with data:', { name, email, role });

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const sql = 'INSERT INTO users (username, email, role) VALUES (?, ?, ?)';
  const values = [name, email, role || 'User'];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
    
    console.log('User created successfully:', result);
    res.status(201).json({ 
      message: 'User created successfully',
      userId: result.insertId 
    });
  });
});

// PUT update user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;
  
  console.log('Updating user:', userId, 'with data:', { name, email, role });

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const sql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?';
  const values = [name, email, role || 'User', userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User updated successfully:', result);
    res.json({ message: 'User updated successfully' });
  });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  
  console.log('Deleting user:', userId);

  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User deleted successfully:', result);
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;