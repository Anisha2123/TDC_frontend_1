import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Pencil, MapPin, Globe, Mail, Phone, Calendar, BookOpen, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const defaultAvatar = 'https://res.cloudinary.com/dqt4zammn/image/upload/v1736175847/Pngtree_man_avatar_image_for_profile_13001882_blg3md.png';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);
  
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const [formData, setFormData] = useState({
    dob: '',
    city: '',
    country: '',
    education: '',
    department: '',
    occupation: '',
    pincode: '',
    address: ''
  });

  useEffect(() => {
    fetchUserDataAndProfile();
  }, []);

  const fetchUserDataAndProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch user data
      const userResponse = await fetch('http://localhost:3000/api/user-profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const userData = await userResponse.json();
      if (userData.success && userData.user) {
        setUserData({
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          email: userData.user.email,
          phoneNumber: userData.user.phoneNumber
        });
      }

      // Fetch profile data
      const profileResponse = await fetch('http://localhost:3000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const profileData = await profileResponse.json();
      if (profileData.success && profileData.profile) {
        setFormData({
          dob: new Date(profileData.profile.dob).toISOString().split('T')[0],
          city: profileData.profile.city || '',
          country: profileData.profile.country || '',
          education: profileData.profile.education || '',
          department: profileData.profile.department || '',
          occupation: profileData.profile.occupation || '',
          pincode: profileData.profile.pincode || '',
          address: profileData.profile.address || ''
        });
      }
    } catch (error) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phoneNumber,
          ...formData
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Profile updated successfully!');
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('An error occurred while updating profile');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image Section */}
      <div className="relative h-80 w-full">
        <img
          src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card - Positioned to overlap the background */}
        <div className="relative -mt-24">
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Profile Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  {/* Read-only user information */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-xl font-semibold text-gray-900">
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                {success}
              </div>
            )}

            {/* Editable Fields */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={userData.phoneNumber}
                  disabled
                  className="w-full p-2 border text-black border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 mr-2" />
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your pincode"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-3">
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-4 py-2 text-#333333 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 