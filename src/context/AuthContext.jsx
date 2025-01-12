import { API_URL } from '../config/config';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        token: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally verify token by making an API call
            fetch(`${API_URL}/api/verify-token`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setAuthState({
                            isAuthenticated: true,
                            isAdmin: data.user.isAdmin,
                            user: data.user,
                            token: token
                        });
                    }
                })
                .catch(err => {
                    console.error('Token verification failed:', err);
                    localStorage.removeItem('token');
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 