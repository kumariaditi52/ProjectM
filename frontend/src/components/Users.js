import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched users:', data);
        setUsers(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Fetch error:', error);
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

  const openAddModal = () => {
    setModalType('add');
    setFormData({ name: '', email: '', role: 'User' });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const openEditModal = (user) => {
    setModalType('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role || 'User'
    });
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({ name: '', email: '', role: 'User' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    try {
      setError('');
      
      const url = modalType === 'add' 
        ? 'http://localhost:5000/api/users'
        : `http://localhost:5000/api/users/${selectedUser.id}`;
      
      const method = modalType === 'add' ? 'POST' : 'PUT';
      
      console.log('Submitting:', method, url, formData);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        const message = modalType === 'add' ? 'User created successfully!' : 'User updated successfully!';
        setSuccess(message);
        closeModal();
        await fetchUsers(); // Refresh the users list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(responseData.message || `Failed to ${modalType} user`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError(`Error ${modalType === 'add' ? 'creating' : 'updating'} user`);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return;
    }

    try {
      setError('');
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess('User deleted successfully!');
        await fetchUsers(); // Refresh the users list
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(responseData.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Error deleting user');
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="users-container">
        <Navbar title="Users" />
        <div className="users-content">
          <div className="loading">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <Navbar title="Users" />

      <div className="users-content">
        <div className="users-header">
          <h1>User Management</h1>
          <button className="btn-add" onClick={openAddModal}>
            Add New User
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="users-table-container">
          {users.length === 0 ? (
            <div className="no-users">
              <p>No users found. Click "Add New User" to create your first user.</p>
            </div>
          ) : (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${(user.role || 'user').toLowerCase()}`}>
                          {user.role || 'User'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit" 
                            onClick={() => openEditModal(user)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-delete" 
                            onClick={() => handleDelete(user.id, user.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalType === 'add' ? 'Add New User' : 'Edit User'}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter user name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {modalType === 'add' ? 'Create User' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}