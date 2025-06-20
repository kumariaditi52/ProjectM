const db = require('../db');

const getAnalytics = (callback) => {
  const sql = 'SELECT * FROM analytics ORDER BY updated_at DESC LIMIT 1';
  db.query(sql, callback);
};

const createOrUpdateAnalytics = (analyticsData, callback) => {
  // First check if analytics record exists
  const checkSql = 'SELECT id FROM analytics LIMIT 1';
  
  db.query(checkSql, (err, results) => {
    if (err) {
      return callback(err);
    }
    
    if (results.length === 0) {
      // Create new record
      const insertSql = 'INSERT INTO analytics (total_users, revenue, orders, growth) VALUES (?, ?, ?, ?)';
      db.query(insertSql, [
        analyticsData.totalUsers,
        analyticsData.revenue,
        analyticsData.orders,
        analyticsData.growth
      ], callback);
    } else {
      // Update existing record
      const updateSql = 'UPDATE analytics SET total_users = ?, revenue = ?, orders = ?, growth = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
      db.query(updateSql, [
        analyticsData.totalUsers,
        analyticsData.revenue,
        analyticsData.orders,
        analyticsData.growth,
        results[0].id
      ], callback);
    }
  });
};

module.exports = {
  getAnalytics,
  createOrUpdateAnalytics
};