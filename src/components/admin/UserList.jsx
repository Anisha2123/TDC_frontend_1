import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Trash2, Edit, RefreshCw } from 'lucide-react';
import AdminLayout from './layout/AdminLayout';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const adminToken = localStorage.getItem('adminToken');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data.users);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // Refresh the user list
            fetchUsers();
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to delete user');
        }
    };

    const handleResetPassword = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/${userId}/reset-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to reset password');
            }

            alert('Password reset email sent successfully');
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to reset password');
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/admin/users/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editingUser)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            // Refresh the user list
            fetchUsers();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update user');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <AdminLayout>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <button
                        onClick={fetchUsers}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.phoneNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/admin/users/${user._id}`)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleResetPassword(user._id)}
                                                className="text-yellow-600 hover:text-yellow-900"
                                            >
                                                <RefreshCw className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isEditModalOpen && editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4 text-white">Edit User</h2>
                            <form onSubmit={handleUpdateUser}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm font-medium mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editingUser.firstName}
                                            onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
                                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                                        />
                                    </div>
                                    {/* Repeat for other fields */}
                                </div>
                                
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 text-gray-300 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
} 