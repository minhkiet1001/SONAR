import React from 'react';
import { Link } from 'react-router-dom';

const TestNavPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Test Navigation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/login" 
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 text-center"
          >
            Login Page
          </Link>
          
          <Link 
            to="/register" 
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 text-center"
          >
            Register Page
          </Link>
          
          <Link 
            to="/debug-auth" 
            className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 text-center"
          >
            Debug Auth
          </Link>
          
          <Link 
            to="/" 
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 text-center"
          >
            Home Page
          </Link>
          
          <button 
            onClick={() => {
              localStorage.clear();
              alert('LocalStorage cleared!');
              window.location.reload();
            }}
            className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 text-center"
          >
            Clear Storage & Reload
          </button>
          
          <button 
            onClick={() => {
              console.log('Current localStorage:', {
                authToken: localStorage.getItem('authToken'),
                user: localStorage.getItem('user')
              });
            }}
            className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 text-center"
          >
            Log Storage to Console
          </button>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current State</h2>
          <div className="space-y-2 text-sm">
            <div><strong>URL:</strong> {window.location.href}</div>
            <div><strong>AuthToken:</strong> {localStorage.getItem('authToken') ? 'exists' : 'null'}</div>
            <div><strong>User:</strong> {localStorage.getItem('user') ? 'exists' : 'null'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestNavPage; 