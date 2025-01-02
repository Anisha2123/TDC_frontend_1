export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      
      // If token is expired, clear storage and return false
      if (timeUntilExpiration < 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }

      // If token will expire in less than 1 day, try to refresh it
      if (timeUntilExpiration < 24 * 60 * 60 * 1000) {
        refreshToken();
      }
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  }
  return false;
};

// Add a refresh token function
const refreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
    }
  } catch (error) {
    console.error('Token refresh error:', error);
  }
}; 