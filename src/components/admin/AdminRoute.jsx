import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserList from './UserList';
import UserDetail from './UserDetail';
import CreateBlogPost from './BlogPost/CreateBlogPost';
import BlogPostList from './BlogPost/BlogPostList';
import EditBlogPost from './BlogPost/EditBlogPost';
import ViewBlogPost from './BlogPost/ViewBlogPost';
import AdminPanel from './AdminPanel';

export default function AdminRoute() {
  const { authState, setAuthState } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (token) {
          // Verify token with backend
          const response = await fetch('https://tdc-backend-1.vercel.app/api/admin/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();
          if (data.success) {
            setAuthState({
              isAuthenticated: true,
              isAdmin: true,
              user: data.admin,
              token
            });
          } else {
            localStorage.removeItem('adminToken');
            setAuthState({
              isAuthenticated: false,
              isAdmin: false,
              user: null,
              token: null
            });
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('adminToken');
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          user: null,
          token: null
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setAuthState]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated || !authState.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<UserList />} />
      <Route path="users/:userId" element={<UserDetail />} />
      <Route path="create-post" element={<CreateBlogPost />} />
      <Route path="posts" element={<BlogPostList />} />
      <Route path="posts/:postId" element={<ViewBlogPost />} />
      <Route path="edit-post/:postId" element={<EditBlogPost />} />
      <Route path="panel" element={<AdminPanel />} />
    </Routes>
  );
} 