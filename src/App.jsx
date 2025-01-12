import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './components/admin/AdminLogin';
import AppContent from './AppContent';
import BlogList from './Pages/BlogList';
import BlogDetail from './Pages/BlogDetail';
import { API_URL } from './config/config';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    {/* The API_URL is handled within AdminLogin.jsx */}
                    
                    {/* Admin Routes */}
                    <Route path="/admin/*" element={<AdminRoute />} />
                    
                    {/* Other Routes */}
                    <Route path="/*" element={<AppContent />} />
                    
                    {/* Public Blog Routes */}
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
