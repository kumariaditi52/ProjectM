const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Please fill all fields');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    createUser(username, email, hashedPassword, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).send('Email already exists');
        }
        return res.status(500).send('Server error');
      }
      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send('Error hashing password');
  }
});

module.exports = router;
