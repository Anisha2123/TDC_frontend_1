import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkTokenExpiration } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const valid = checkTokenExpiration();
      setIsValid(valid);
      setIsValidating(false);
    };

    validateSession();
  }, []);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
} 