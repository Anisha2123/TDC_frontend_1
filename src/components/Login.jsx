import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { API_URL } from '../config/config';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      console.log('Credential Response:', credentialResponse); // Debug log
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      console.log('Logged in user:', decoded);
      
      // Send the credential to your backend
      handleGoogleResponse({ credential: credentialResponse.credential });
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to process Google login: ' + error.message);
    }
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    setError('Failed to login with Google');
  };

  const handleGoogleResponse = async (response) => {
    try {
      console.log('Sending credential to backend:', response.credential);
      
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Backend response:', data); // Debug log

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process Google login: ' + error.message);
    }
  };

  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '614379440989576',
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Load Facebook SDK script
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleFacebookLogin = async () => {
    try {
      // Wait for FB SDK to be ready
      if (!window.FB) {
        throw new Error('Facebook SDK not loaded');
      }

      const response = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email,public_profile' });
      });

      // Get user data from Facebook
      const userDataResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${response.authResponse.accessToken}`
      );
      const userData = await userDataResponse.json();

      // Send to backend for authentication
      const res = await fetch('https://tdc-backend-1.vercel.app/api/auth/facebook/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          accessToken: response.authResponse.accessToken,
          userData: userData
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to login with Facebook');
      }

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      setError(typeof error === 'string' ? error : 'Failed to login with Facebook');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log('Login Response:', data);

        if (data.success) {
            const userData = {
                ...data.user,
                isAdmin: data.user.isAdmin
            };
            
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(userData));

            // Verify admin status immediately after login
            const verifyResponse = await fetch(`${API_URL}/api/admin/verify`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
                navigate('/admin/users');
            } else {
                navigate('/');
            }
        } else {
            setError(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        setError('Failed to login. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider 
      clientId="860236340511-50m5cq2vv6tb1lhhhmttt3v65a6hklki.apps.googleusercontent.com"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-md w-full space-y-8">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto h-12 w-12 relative"
              >
                <LogIn className="w-12 h-12 text-[#333333]" strokeWidth={1.5} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center text-3xl font-bold text-gray-900"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-center text-sm text-gray-600"
              >
                Sign in to continue your learning journey
              </motion.p>
            </div>

            <div className="rounded-md shadow-sm space-y-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center mt-5 py-2.5 px-4 border border-transparent rounded-lg text-white bg-[#333333] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333333] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-gray-300 group-hover:text-gray-400" />
                </span>
                {loading ? 'Signing in...' : 'Sign in'}
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="ml-2"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between"
            >
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#333333] hover:text-gray-800">
                  Forgot your password?
                </Link>
              </div>
              <div className="text-sm">
                <Link to="/signup" className="font-medium text-[#333333] hover:text-gray-800">
                  Create an account
                </Link>
              </div>
            </motion.div>

            {/* Social Login Buttons */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {!user ? (
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                  />
                ) : (
                  <div>
                    <p>Welcome, {user.name}!</p>
                    <img
                      src={user.picture}
                      alt="profile"
                      style={{ borderRadius: '50%', width: '50px' }}
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleFacebookLogin}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                  <span className="ml-2">Facebook</span>
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </GoogleOAuthProvider>
  );
}
  