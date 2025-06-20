const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'auth_demo',
  port: 3306,
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('MySQL Connected!');
  }
});

module.exports = db;
