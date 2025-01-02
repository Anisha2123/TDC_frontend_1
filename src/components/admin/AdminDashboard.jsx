import { useNavigate } from 'react-router-dom';
import { 
    FileText, 
    Code, 
    Image, 
    Video, 
    Users, 
    LogOut 
} from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('adminData'));

    const menuItems = [
        // {
        //     title: 'Text Content',
        //     icon: <FileText className="w-6 h-6" />,
        //     path: '/admin/content/text'
        // },
        // {
        //     title: 'Code Content',
        //     icon: <Code className="w-6 h-6" />,
        //     path: '/admin/content/code'
        // },
        // {
        //     title: 'Image Content',
        //     icon: <Image className="w-6 h-6" />,
        //     path: '/admin/content/image'
        // },
        // {
        //     title: 'Video Content',
        //     icon: <Video className="w-6 h-6" />,
        //     path: '/admin/content/video'
        // },
        {
            title: 'User Management',
            icon: <Users className="w-6 h-6" />,
            path: '/admin/users'
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Welcome, {admin?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                        {item.icon}
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Manage {item.title.toLowerCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        View details →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
} 