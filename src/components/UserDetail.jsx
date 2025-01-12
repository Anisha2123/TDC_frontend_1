import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDetail = () => {
  const { userId } = useParams(); // Assuming route is /admin/users/:userId
  const { authState } = useAuth();
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    isAdmin: false,
    status: '',
    // Note: Password should NOT be displayed. Instead, provide a reset option.
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = authState.token;
        const response = await axios.get(`/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setEditableUser({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          phoneNumber: response.data.user.phoneNumber,
          isAdmin: response.data.user.isAdmin,
          status: response.data.user.status,
          // Password field remains empty
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setMessage('Failed to fetch user details.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, authState.token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditableUser((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission to update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = authState.token;
      // Prepare data to send; exclude password if not being changed
      const updateData = { ...editableUser };
      // If implementing password reset, handle it separately

      const response = await axios.put(`/api/admin/users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('User updated successfully.');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user.');
    }
  };

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (!user) {
    return <div>{message || 'User not found.'}</div>;
  }

  return (
    <div className="user-detail-container">
      <h2>User Details</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={editableUser.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={editableUser.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editableUser.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={editableUser.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Admin Status */}
        <div>
          <label>Is Admin:</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={editableUser.isAdmin}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={editableUser.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            {/* Add more statuses as needed */}
          </select>
        </div>

        {/* Password Reset (Optional) */}
        <div>
          <label>Reset Password:</label>
          <button
            type="button"
            onClick={() => {
              // Implement password reset functionality
              // For example, trigger a password reset email
            }}
          >
            Reset Password
          </button>
        </div>

        {/* Save Button */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserDetail; 