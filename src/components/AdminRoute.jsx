import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AdminRoute() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const adminToken = localStorage.getItem('adminToken');

    useEffect(() => {
        const verifyAdmin = async () => {
            if (!adminToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/admin/verify', {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Verification failed');
                }

                const data = await response.json();
                setIsAuthorized(data.success);
            } catch (error) {
                console.error('Admin verification failed:', error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAdmin();
    }, [adminToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default AdminRoute; 