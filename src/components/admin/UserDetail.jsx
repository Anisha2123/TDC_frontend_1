import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';

export default function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.get(
        `http://localhost:3000/api/admin/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setEditValues(response.data.user);
      }
    } catch (error) {
      console.error('Error details:', error);
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field) => {
    setEditing(prev => ({ ...prev, [field]: false }));
    setEditValues(prev => ({ ...prev, [field]: user[field] }));
  };

  const handleSave = async (field) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.put(
        `http://localhost:3000/api/admin/users/${userId}`,
        { [field]: editValues[field] },
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );

      if (response.data.success) {
        setUser(prev => ({ ...prev, [field]: editValues[field] }));
        setEditing(prev => ({ ...prev, [field]: false }));
        alert('Updated successfully');
      }
    } catch (error) {
      console.error('Error updating:', error);
      alert('Failed to update');
    }
  };

  const renderEditableField = (label, field, type = 'text') => {
    return (
      <div className="mb-6">
        <label className="block text-gray-400 text-sm font-medium mb-2">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          {editing[field] ? (
            <>
              <input
                type={type}
                value={editValues[field] || ''}
                onChange={(e) => setEditValues(prev => ({ ...prev, [field]: e.target.value }))}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-indigo-500"
              />
              <button
                onClick={() => handleSave(field)}
                className="p-2 text-green-400 hover:text-green-300"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleCancel(field)}
                className="p-2 text-red-400 hover:text-red-300"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <span className="flex-1 text-white">{user[field]}</span>
              <button
                onClick={() => handleEdit(field)}
                className="p-2 text-blue-400 hover:text-blue-300"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-white text-lg">No user found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/admin/users')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Users
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">User Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {renderEditableField('First Name', 'firstName')}
              {renderEditableField('Last Name', 'lastName')}
              {renderEditableField('Email', 'email', 'email')}
              {renderEditableField('Phone Number', 'phoneNumber', 'tel')}
            </div>

            <div className="space-y-4">
              {renderEditableField('Status', 'status')}
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Created At
                </label>
                <span className="text-white">
                  {new Date(user.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Last Updated
                </label>
                <span className="text-white">
                  {new Date(user.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 