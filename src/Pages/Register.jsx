import React from 'react';
import RegisterComponent from '../components/Register';
import Footer from '../components/Footer';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#333333] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Create Your Account</h1>
          <p className="text-center mt-2 text-gray-300">
            Join our community and start your learning journey today
          </p>
        </div>
      </div>

      {/* Registration Section */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <RegisterComponent />
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Professional Courses</h3>
            <p className="text-gray-600 text-sm">Access industry-relevant courses designed by experts</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600 text-sm">Join a community of learners and industry experts</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Certificate</h3>
            <p className="text-gray-600 text-sm">Earn recognized certificates upon course completion</p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Why Choose TDC?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Industry-Relevant Content</h3>
              <p className="text-gray-600">Our courses are designed and updated regularly to match industry requirements</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of practical experience</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">Study at your own pace with lifetime access to course content</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Career Support</h3>
              <p className="text-gray-600">Get guidance and support to help you achieve your career goals</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 