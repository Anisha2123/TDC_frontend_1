import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../config/config';

export default function Signup() {
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [googleData, setGoogleData] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setGoogleData(decoded);

      const res = await fetch(`${API_URL}/api/auth/google/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleData: {
            email: decoded.email,
            firstName: decoded.given_name,
            lastName: decoded.family_name,
          },
          phoneNumber,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setUserId(data.userId);
        setOtpSent(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to process Google signup: ' + error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/google/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          otp,
          userId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect or show success message
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to verify OTP');
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h1>Create Your Account</h1>
        <p>Join our learning community today</p>
        
        {/* Google Signup Button */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google login failed')}
        />
        
        {/* Phone Number Input */}
        {otpSent ? (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        ) : (
          <div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              required
            />
            <button onClick={handlePhoneSubmit}>Send OTP</button>
          </div>
        )}
        
        {error && <p>{error}</p>}
      </div>
    </GoogleOAuthProvider>
  );
} 