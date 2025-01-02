import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user details');

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError('Failed to load user details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!user) return <div className="text-center">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Users
      </button>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">User Details</h1>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <div className="mt-1 text-sm text-gray-900">
                  {user.firstName} {user.lastName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-sm text-gray-900">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                <div className="mt-1 text-sm text-gray-900">{user.phoneNumber || 'Not provided'}</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Account Created</label>
                <div className="mt-1 text-sm text-gray-900">
                  {new Date(user.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Login</label>
                <div className="mt-1 text-sm text-gray-900">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Account Status</label>
                <div className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 