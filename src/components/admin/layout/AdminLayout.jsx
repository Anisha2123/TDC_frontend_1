import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Users, Home } from 'lucide-react';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <Home className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </button>
              <button 
                onClick={() => navigate('/admin/users')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 