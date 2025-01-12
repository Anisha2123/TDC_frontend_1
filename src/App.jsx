import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/admin/AdminRoute';
import AdminLogin from './components/admin/AdminLogin';
import AppContent from './AppContent';
import BlogList from './Pages/BlogList';
import BlogDetail from './Pages/BlogDetail';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    
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
