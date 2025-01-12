import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        token: null,
    });

    const value = {
        authState,
        setAuthState,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            // Call the logout endpoint
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        
        // Clear local storage and state
        localStorage.removeItem('token');
        setAuthState({
            isAuthenticated: false,
            user: null,
            token: null
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
}; 