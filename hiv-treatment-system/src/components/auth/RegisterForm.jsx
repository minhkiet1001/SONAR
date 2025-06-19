import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import authService from '../../services/authService';

const RegisterForm = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    otp: '',
  });

  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: '',
    email: '',
    birthdate: '',
  });

  const [step, setStep] = useState(1); // 1: Email OTP, 2: Registration form
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }

    // Validate password
    if (name === 'password') {
      if (value.length < 8) {
        setFormErrors({ ...formErrors, password: 'Mật khẩu phải có ít nhất 8 ký tự' });
      } else {
        setFormErrors({ ...formErrors, password: '' });
      }
    }

    // Validate confirm password
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setFormErrors({ ...formErrors, confirmPassword: 'Mật khẩu không khớp' });
      } else {
        setFormErrors({ ...formErrors, confirmPassword: '' });
      }
    }

    // Validate birthdate
    if (name === 'dateOfBirth' && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      
      if (selectedDate > today) {
        setFormErrors({ ...formErrors, birthdate: 'Ngày sinh không được ở trong tương lai' });
      } else if (selectedDate < oneYearAgo) {
        setFormErrors({ ...formErrors, birthdate: 'Ngày sinh phải từ 1 năm trước đến hiện tại' });
      } else {
        setFormErrors({ ...formErrors, birthdate: '' });
      }
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setFormErrors({ ...formErrors, email: 'Email không được để trống' });
      return;
    }

    setOtpLoading(true);
    try {
      await authService.sendOtp(formData.email);
      setOtpSent(true);
      setStep(2);
    } catch (err) {
      setFormErrors({ ...formErrors, email: err.message });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const errors = {};
    
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    if (!formData.phone) {
      errors.phone = 'Số điện thoại không được để trống';
    }
    
    if (!formData.gender) {
      errors.gender = 'Vui lòng chọn giới tính';
    }
    
    if (!formData.password || formData.password.length < 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu không khớp';
    }
    
    if (!formData.otp) {
      errors.otp = 'Mã OTP không được để trống';
    }

    // Check birthdate validation
    if (!formData.dateOfBirth) {
      errors.birthdate = 'Ngày sinh không được để trống';
    } else {
      const selectedDate = new Date(formData.dateOfBirth);
      const today = new Date();
      
      if (selectedDate > today) {
        errors.birthdate = 'Ngày sinh không được ở tương lai';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Đăng nhập
            </Link>
          </p>
        </div>

        {step === 1 ? (
          // Step 1: Email and OTP
          <form className="space-y-6" onSubmit={handleSendOtp}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                {error}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded relative">
              <p className="text-sm">
                <strong>Bước 1:</strong> Nhập email để nhận mã OTP xác thực
              </p>
            </div>

            <Input
              id="email"
              name="email"
              type="email"
              label="Địa chỉ email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              error={formErrors.email}
              placeholder="Nhập email của bạn"
            />

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={otpLoading}
              >
                {otpLoading ? 'Đang gửi OTP...' : 'Gửi mã OTP'}
              </Button>
            </div>
          </form>
        ) : (
          // Step 2: Registration form
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

            {otpSent && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                <p className="text-sm">
                  <strong>Bước 2:</strong> Mã OTP đã được gửi đến email <strong>{formData.email}</strong>. Vui lòng kiểm tra email và điền thông tin bên dưới.
                </p>
              </div>
            )}

          <Input
            id="fullName"
            name="fullName"
            label="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            required
              error={formErrors.fullName}
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Địa chỉ email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
              disabled
          />

          <Input
            id="phone"
            name="phone"
            label="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
              error={formErrors.phone}
              placeholder="0xxxxxxxxx hoặc 84xxxxxxxxx"
          />

          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            label="Ngày sinh"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
              error={formErrors.birthdate}
              max={new Date().toISOString().split('T')[0]}
          />

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <select
              id="gender"
              name="gender"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn giới tính</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
            </select>
              {formErrors.gender && (
                <p className="mt-1 text-sm text-red-600">{formErrors.gender}</p>
              )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Địa chỉ (tùy chọn)
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={formData.address}
              onChange={handleChange}
                placeholder="Nhập địa chỉ của bạn"
            />
          </div>

          <div>
            <Input
              id="password"
              name="password"
              type="password"
              label="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
              error={formErrors.password}
                placeholder="Ít nhất 8 ký tự"
            />
            {!formErrors.password && (
              <p className="mt-1 text-sm text-gray-500">
                Mật khẩu phải có ít nhất 8 ký tự
              </p>
            )}
          </div>

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={formErrors.confirmPassword}
              placeholder="Nhập lại mật khẩu"
            />

            <Input
              id="otp"
              name="otp"
              label="Mã OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              error={formErrors.otp}
              placeholder="Nhập mã OTP từ email"
          />

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Tôi đồng ý với{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Điều khoản dịch vụ
              </a>{' '}
              và{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Chính sách bảo mật
              </a>
            </label>
          </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Quay lại
              </Button>
          <Button
            type="submit"
                variant="primary"
            disabled={isLoading}
                className="flex-1"
          >
            {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
          </Button>
            </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm; 