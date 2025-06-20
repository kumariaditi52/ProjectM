import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Analytics.css';

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    revenue: 0,
    orders: 0,
    growth: 0
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    totalUsers: '',
    revenue: '',
    orders: '',
    growth: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/analytics', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched analytics:', data);
        setAnalytics(data);
        setFormData({
          totalUsers: data.totalUsers.toString(),
          revenue: data.revenue.toString(),
          orders: data.orders.toString(),
          growth: data.growth.toString()
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Fetch analytics error:', error);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      totalUsers: analytics.totalUsers.toString(),
      revenue: analytics.revenue.toString(),
      orders: analytics.orders.toString(),
      growth: analytics.growth.toString()
    });
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    try {
      setError('');
      
      const dataToSave = {
        totalUsers: parseInt(formData.totalUsers) || 0,
        revenue: parseFloat(formData.revenue) || 0,
        orders: parseInt(formData.orders) || 0,
        growth: parseFloat(formData.growth) || 0
      };

      console.log('Saving analytics:', dataToSave);

      const response = await fetch('http://localhost:5000/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dataToSave)
      });

      const responseData = await response.json();
      console.log('Save response:', responseData);

      if (response.ok) {
        setAnalytics(dataToSave);
        setIsEditing(false);
        setSuccess('Analytics data saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(responseData.message || 'Failed to save analytics data');
      }
    } catch (error) {
      console.error('Save analytics error:', error);
      setError('Error saving data');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num) => {
    return `${num >= 0 ? '+' : ''}${num}%`;
  };

  if (loading && !isEditing) {
    return (
      <div className="analytics-container">
        <Navbar title="Analytics" />
        <div className="analytics-content">
          <div className="loading">Loading analytics data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <Navbar title="Analytics" />

      <div className="analytics-content">
        <div className="analytics-header">
          <h1>Analytics Dashboard</h1>
          <div className="analytics-actions">
            {!isEditing ? (
              <button className="btn-edit" onClick={handleEdit}>
                Edit Analytics
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Total Users</h3>
            {isEditing ? (
              <input
                type="number"
                name="totalUsers"
                value={formData.totalUsers}
                onChange={handleInputChange}
                className="analytics-input"
                placeholder="Enter total users"
              />
            ) : (
              <p className="analytics-number">{formatNumber(analytics.totalUsers)}</p>
            )}
          </div>

          <div className="analytics-card">
            <h3>Revenue</h3>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                name="revenue"
                value={formData.revenue}
                onChange={handleInputChange}
                className="analytics-input"
                placeholder="Enter revenue"
              />
            ) : (
              <p className="analytics-number revenue">{formatCurrency(analytics.revenue)}</p>
            )}
          </div>

          <div className="analytics-card">
            <h3>Orders</h3>
            {isEditing ? (
              <input
                type="number"
                name="orders"
                value={formData.orders}
                onChange={handleInputChange}
                className="analytics-input"
                placeholder="Enter orders"
              />
            ) : (
              <p className="analytics-number">{formatNumber(analytics.orders)}</p>
            )}
          </div>

          <div className="analytics-card">
            <h3>Growth</h3>
            {isEditing ? (
              <input
                type="number"
                step="0.1"
                name="growth"
                value={formData.growth}
                onChange={handleInputChange}
                className="analytics-input"
                placeholder="Enter growth %"
              />
            ) : (
              <p className={`analytics-number growth ${analytics.growth >= 0 ? 'positive' : 'negative'}`}>
                {formatPercentage(analytics.growth)}
              </p>
            )}
          </div>
        </div>

        {/* Additional Analytics Charts/Data */}
        <div className="analytics-charts">
          <div className="chart-container">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-time">2 hours ago</span>
                <span className="activity-text">Analytics data updated</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">1 day ago</span>
                <span className="activity-text">New user registered</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">2 days ago</span>
                <span className="activity-text">Revenue milestone reached</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}