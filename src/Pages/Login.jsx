import React from 'react';
import LoginComponent from '../components/Login';
import Footer from '../components/Footer';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#333333] text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-center mt-2 text-gray-300">
            Log in to access your account and continue learning
          </p>
        </div>
      </div>

      {/* Login Section */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <LoginComponent />
        </div>

        {/* Additional Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Access Courses</h3>
            <p className="text-gray-600 text-sm">Get instant access to all your enrolled courses</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600 text-sm">Monitor your learning journey and achievements</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Resume</h3>
            <p className="text-gray-600 text-sm">Continue where you left off instantly</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 