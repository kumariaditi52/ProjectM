const db = require('../db');

// For authentication (registration/login)
const createUser = (username, email, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

// For user management
const getAllUsers = (callback) => {
  const sql = 'SELECT id, username as name, email, role, created_at FROM users ORDER BY created_at DESC';
  db.query(sql, callback);
};

const createUserProfile = (userData, callback) => {
  const sql = 'INSERT INTO users (username, email, role) VALUES (?, ?, ?)';
  db.query(sql, [userData.name, userData.email, userData.role], callback);
};

const updateUser = (userId, userData, callback) => {
  const sql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?';
  db.query(sql, [userData.name, userData.email, userData.role, userId], callback);
};

const deleteUser = (userId, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], callback);
};

module.exports = { 
  createUser, 
  getUserByEmail, 
  getAllUsers, 
  createUserProfile, 
  updateUser, 
  deleteUser 
};
