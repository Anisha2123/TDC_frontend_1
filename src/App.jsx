import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Register'
import Home from './Pages/Home'
import ContactUs from './Pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileSetup from './Pages/ProfileSetup';
import ForgotPassword from './components/ForgotPassword';
import UserList from './components/admin/UserList';
import UserDetail from './components/admin/UserDetail';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import AdminDashboard from './components/admin/AdminDashboard';
import TextContent from './components/admin/content/TextContent';
import CodeContent from './components/admin/content/CodeContent';
import ImageContent from './components/admin/content/ImageContent';
import VideoContent from './components/admin/content/VideoContent';

function App() {
    return (
        <BrowserRouter>
            <div className="w-full min-h-screen">
                <Navbar />
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

                    {/* Admin Authentication Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/register" element={<AdminRegister />} />

                    {/* Protected Admin Routes */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/content/text" element={<TextContent />} />
                        <Route path="/admin/content/code" element={<CodeContent />} />
                        <Route path="/admin/content/image" element={<ImageContent />} />
                        <Route path="/admin/content/video" element={<VideoContent />} />
                        <Route path="/admin/users" element={<UserList />} />
                        <Route path="/admin/users/:userId" element={<UserDetail />} />
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
