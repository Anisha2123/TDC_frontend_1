import { API_URL } from './config/config';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import Home from './Pages/Home'
import ContactUs from './Pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileSetup from './Pages/ProfileSetup';
import ForgotPassword from './components/ForgotPassword';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserList from './components/admin/UserList';
import UserDetail from './components/admin/UserDetail';
import AdminPanel from './components/admin/AdminPanel';

function AppContent() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="w-full min-h-screen">
            {!isAdminRoute && <Navbar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfileSetup />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UserList />} />
                    <Route path="users/:userId" element={<UserDetail />} />
                    <Route path="panel" element={<AdminPanel />} />
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default AppContent; 