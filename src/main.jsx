import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root');

if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <GoogleOAuthProvider clientId="860236340511-50m5cq2vv6tb1lhhhmttt3v65a6hklki.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
  }
}
