import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import authService from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      navigate(authService.getDashboardPath());
    }
  }, [navigate]);

  const handleRegister = async (userData) => {
    // Reset error state
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await authService.register(userData);
      
      console.log('Đăng ký thành công!', response);
      
      // Navigate to appropriate dashboard based on user role
      navigate(authService.getDashboardPath());
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.');
      console.error('Lỗi đăng ký', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tạo tài khoản mới
        </h2>
        <RegisterForm 
          onSubmit={handleRegister} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default RegisterPage; 