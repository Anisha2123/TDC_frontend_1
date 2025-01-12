import { API_URL } from '../../config/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Plus, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { setAuthState } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setAuthState({
            isAuthenticated: false,
            isAdmin: false,
            user: null,
            token: null
        });
        navigate('/admin/login');
    };

    const dashboardCards = [
        {
            title: 'Manage Users',
            icon: <Users className="w-8 h-8" />,
            description: 'View and manage user accounts',
            onClick: () => navigate('/admin/users'),
            bgColor: 'bg-blue-500'
        },
        {
            title: 'Create Blog Post',
            icon: <Plus className="w-8 h-8" />,
            description: 'Write and publish new blog posts',
            onClick: () => navigate('/admin/create-post'),
            bgColor: 'bg-green-500'
        },
        {
            title: 'View Posts',
            icon: <FileText className="w-8 h-8" />,
            description: 'Manage existing blog posts',
            onClick: () => navigate('/admin/posts'),
            bgColor: 'bg-purple-500'
        },
        {
            title: 'Settings',
            icon: <Settings className="w-8 h-8" />,
            description: 'Configure admin settings',
            onClick: () => navigate('/admin/settings'),
            bgColor: 'bg-gray-700'
        }
    ];

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // ...
        } catch (error) {
            // ...
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardCards.map((card, index) => (
                        <div
                            key={index}
                            onClick={card.onClick}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:bg-gray-700 transition-all cursor-pointer"
                        >
                            <div className={`p-4 text-white`}>
                                {card.icon}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                                <p className="text-gray-400 mt-1">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 