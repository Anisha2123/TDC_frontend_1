import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, ArrowRight, Mail, Lock, User, Phone, Check } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { FaFacebook } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import { API_URL } from '../config/config';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectUri = `http://localhost:5173${location.pathname}`;
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    password: ''
  });
  const [googleUserData, setGoogleUserData] = useState(null);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [tempUserData, setTempUserData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      handleGoogleSuccess({ code });
    }
  }, []);

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '614379440989576',
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `${formData.countryCode}${formData.phoneNumber}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (googleUserData) {
        await handleCompleteGoogleSignup(
          `${formData.countryCode}${formData.phoneNumber}`,
          otp
        );
      } else {
        const response = await fetch(`${API_URL}/api/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
            otp
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to verify OTP');
        }

        const data = await response.json();

        if (data.success) {
          setStep(3);
        } else {
          setError(data.message || 'Invalid OTP');
        }
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(typeof err === 'string' ? err : err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Credential Response:', credentialResponse);
      
      // Show verification popup immediately after Google response
      setShowVerificationPopup(true);
      setTempUserData(credentialResponse);

      // Don't make the API call yet - wait for user confirmation in handleVerificationConfirm
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to process Google login: ' + error.message);
    }
  };

  const handleVerificationConfirm = async () => {
    try {
      setShowVerificationPopup(false);
      
      // Determine which API endpoint to call based on login type
      const endpoint = tempUserData.type === 'facebook' 
        ? 'https://tdc-backend-1.vercel.app/api/auth/facebook/signup'
        : 'https://tdc-backend-1.vercel.app/api/auth/google/signup';

      const payload = tempUserData.type === 'facebook'
        ? { accessToken: tempUserData.accessToken }
        : { credential: tempUserData.credential };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.tempUser) {
        // Store user data in sessionStorage
        sessionStorage.setItem('tempUser', JSON.stringify(data.tempUser));
        
        setGoogleUserData(data.tempUser); // We can use the same state for both
        setFormData(prev => ({
          ...prev,
          firstName: data.tempUser.firstName || '',
          lastName: data.tempUser.lastName || '',
          email: data.tempUser.email,
        }));
        setStep(1); // Move to phone number input step
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process login: ' + error.message);
    }
  };

  const handleCompleteGoogleSignup = async (phoneNumber, verificationCode) => {
    try {
      const tempUser = JSON.parse(sessionStorage.getItem('tempUser'));
      if (!tempUser) {
        throw new Error('Temporary user data not found');
      }

      const response = await fetch(`${API_URL}/api/auth/google/complete-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tempUser,
          phoneNumber,
          verificationCode
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to complete signup');
      }

      const data = await response.json();

      if (data.success) {
        // Clear temporary data
        sessionStorage.removeItem('tempUser');
        
        // Store the token
        localStorage.setItem('token', data.token);
        
        // Clear any existing errors
        setError('');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'Failed to complete signup');
      }
    } catch (error) {
      console.error('Complete signup error:', error);
      throw error; // Re-throw to be caught by the calling function
    }
  };

  const handlePhoneVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://tdc-backend-1.vercel.app/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
          userId: googleUserData?.id
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email,public_profile' });
      });

      // Show verification popup immediately after Facebook response
      setShowVerificationPopup(true);
      setTempUserData({
        type: 'facebook',
        accessToken: response.authResponse.accessToken
      });

    } catch (error) {
      console.error('Facebook login error:', error);
      setError(error.message || 'Failed to authenticate with Facebook');
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
      >
        <div>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto h-12 w-12 relative"
          >
            <UserPlus className="w-12 h-12 text-[#333333]" strokeWidth={1.5} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-3xl font-bold text-gray-900"
          >
            Create Your Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-center text-sm text-gray-600"
          >
            Join our learning community today
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Google Login Failed');
              setError('Failed to sign in with Google');
            }}
            useOneTap={false}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
          />
          
          <button
            onClick={handleFacebookLogin}
            className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-[#1877F2] hover:bg-[#166fe5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]"
          >
            <FaFacebook className="w-5 h-5 mr-2" />
            Sign up with Facebook
          </button>

          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 bg-red-50 p-3 rounded-lg text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
            className="mt-8"
          >
            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-6">
                {!googleUserData && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="px-3 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                  >
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 text-white bg-[#333333] rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333333] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 text-white bg-[#333333] rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333333] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full text-[#333333] hover:text-gray-700"
                >
                  Resend OTP
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleCreateAccount} className="space-y-6">
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create Password"
                    className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 text-white bg-[#333333] rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333333] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <Link to="/login" className="text-[#333333] hover:text-gray-700">
            Already have an account? Sign in
          </Link>
        </div>
      </motion.div>

      {/* Verification Popup */}
      <AnimatePresence>
        {showVerificationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-[#333333]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Phone Verification Required
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6 text-center">
                To complete your registration and secure your account, we need to verify your phone number. This is a one-time process.
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowVerificationPopup(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerificationConfirm}
                  className="px-6 py-2 bg-[#333333] text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-lg p-8 flex flex-col items-center max-w-sm mx-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Aboard!
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Your account has been created successfully. Redirecting to login...
              </p>
              <div className="w-8 h-8 border-t-2 border-b-2 border-green-500 rounded-full animate-spin">
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
