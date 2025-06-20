const express = require('express');
const router = express.Router();
const db = require('../db');

// GET analytics data
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM analytics ORDER BY updated_at DESC LIMIT 1';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching analytics:', err);
      return res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
    }
    
    if (results.length === 0) {
      // Return default values if no data exists
      return res.json({
        totalUsers: 0,
        revenue: 0,
        orders: 0,
        growth: 0
      });
    }
    
    // Map database columns to frontend format
    const analytics = results[0];
    res.json({
      totalUsers: analytics.total_users,
      revenue: analytics.revenue,
      orders: analytics.orders,
      growth: analytics.growth
    });
  });
});

// POST analytics data
router.post('/', (req, res) => {
  const { totalUsers, revenue, orders, growth } = req.body;
  
  console.log('Saving analytics data:', { totalUsers, revenue, orders, growth });

  // First check if analytics record exists
  const checkSql = 'SELECT id FROM analytics LIMIT 1';
  
  db.query(checkSql, (err, results) => {
    if (err) {
      console.error('Error checking analytics:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    
    if (results.length === 0) {
      // Create new record
      const insertSql = 'INSERT INTO analytics (total_users, revenue, orders, growth) VALUES (?, ?, ?, ?)';
      const values = [totalUsers || 0, revenue || 0, orders || 0, growth || 0];
      
      db.query(insertSql, values, (err, result) => {
        if (err) {
          console.error('Error creating analytics:', err);
          return res.status(500).json({ message: 'Failed to create analytics', error: err.message });
        }
        
        console.log('Analytics created successfully:', result);
        res.json({
          message: 'Analytics data saved successfully',
          totalUsers: totalUsers || 0,
          revenue: revenue || 0,
          orders: orders || 0,
          growth: growth || 0
        });
      });
    } else {
      // Update existing record
      const updateSql = 'UPDATE analytics SET total_users = ?, revenue = ?, orders = ?, growth = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
      const values = [totalUsers || 0, revenue || 0, orders || 0, growth || 0, results[0].id];
      
      db.query(updateSql, values, (err, result) => {
        if (err) {
          console.error('Error updating analytics:', err);
          return res.status(500).json({ message: 'Failed to update analytics', error: err.message });
        }
        
        console.log('Analytics updated successfully:', result);
        res.json({
          message: 'Analytics data updated successfully',
          totalUsers: totalUsers || 0,
          revenue: revenue || 0,
          orders: orders || 0,
          growth: growth || 0
        });
      });
    }
  });
});

module.exports = router;