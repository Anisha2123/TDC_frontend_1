import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContentLayout({ title, children }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {title}
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 