const db = require('../db');

const createUser = (username, email, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

module.exports = { createUser, getUserByEmail };
