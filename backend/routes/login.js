const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/userModel');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send('Please fill all fields');

  getUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(401).send('Invalid email or password');

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).send('Invalid email or password');

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token, username: user.username });
  });
});

module.exports = router;
