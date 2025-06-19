import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';
import { UserRole } from '../../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  fullName: z.string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được vượt quá 50 ký tự'),
  username: z.string()
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(20, 'Tên đăng nhập không được vượt quá 20 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới'),
  email: z.string()
    .email('Email không hợp lệ'),
  password: z.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
    .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt'),
  confirmPassword: z.string(),
  role: z.enum([UserRole.ADMIN, UserRole.MANAGER, UserRole.DOCTOR, UserRole.STAFF, UserRole.CUSTOMER]),
  phoneNumber: z.string()
    .regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
  address: z.string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
  dateOfBirth: z.string()
    .refine((date) => {
      const today = new Date();
      const dob = new Date(date);
      const age = today.getFullYear() - dob.getFullYear();
      return age >= 18;
    }, 'Người dùng phải từ 18 tuổi trở lên'),
  department: z.string()
    .min(2, 'Tên khoa/phòng ban phải có ít nhất 2 ký tự')
    .max(100, 'Tên khoa/phòng ban không được vượt quá 100 ký tự')
    .optional()
    .superRefine((val, ctx) => {
      if (!val && [UserRole.DOCTOR, UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN].includes(ctx.parent.role)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Khoa/Phòng ban là bắt buộc cho vai trò này'
        });
      }
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

const UserFormModal = ({ isOpen, onClose, onSave, editingUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: UserRole.CUSTOMER,
      department: ''
    }
  });

  const selectedRole = watch('role');
  const showDepartment = ['DOCTOR', 'STAFF', 'MANAGER', 'ADMIN'].includes(selectedRole);
  console.log('showDepartment:', showDepartment, 'selectedRole:', selectedRole);

  const medicalDepartments = [
    'Khoa Nội',
    'Khoa Ngoại', 
    'Khoa Cấp cứu',
    'Khoa Bệnh truyền nhiễm',
    'Khoa Xét nghiệm'
  ];

  const adminDepartments = [
    'Phòng Kế hoạch',
    'Phòng Tài chính',
    'Phòng Hành chính',
    'Phòng IT'
  ];

  useEffect(() => {
    if (editingUser) {
      Object.keys(editingUser).forEach(key => {
        if (key !== 'password' && key !== 'confirmPassword') {
          setValue(key, editingUser[key]);
        }
      });
    } else {
      reset();
    }
  }, [editingUser, setValue, reset]);

  // Reset department when role changes to CUSTOMER
  useEffect(() => {
    console.log('Selected role:', selectedRole);
    if (selectedRole === 'CUSTOMER') {
      setValue('department', '');
    }
  }, [selectedRole, setValue]);

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    try {
      const userData = {
        ...data,
        id: editingUser?.id || Date.now(),
        createdAt: editingUser?.createdAt || new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=random`,
      };
      
      if (!editingUser) {
        delete userData.confirmPassword;
      } else {
        delete userData.password;
        delete userData.confirmPassword;
      }

      await onSave(userData);
      onClose();
      reset();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg w-full max-w-2xl mx-4 p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-900">
              {editingUser ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ tên
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              {/* Tên đăng nhập */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  {...register('username')}
                  disabled={editingUser}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.username ? 'border-red-300' : 'border-gray-300'
                  } ${editingUser ? 'bg-gray-100' : ''}`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>

              {/* Địa chỉ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  {...register('address')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              {/* Vai trò */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò
                </label>
                <select
                  {...register('role')}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                    errors.role ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value={UserRole.CUSTOMER}>Bệnh nhân</option>
                  <option value={UserRole.STAFF}>Nhân viên</option>
                  <option value={UserRole.DOCTOR}>Bác sĩ</option>
                  <option value={UserRole.MANAGER}>Quản lý</option>
                  <option value={UserRole.ADMIN}>Admin</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              {/* Khoa/Phòng ban */}
              {showDepartment && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khoa/Phòng ban
                  </label>
                  <select
                    {...register('department')}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                      errors.department ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Chọn khoa/phòng ban</option>
                    <optgroup label="Khoa Y tế">
                      {medicalDepartments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Phòng ban Hành chính">
                      {adminDepartments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </optgroup>
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                  )}
                </div>
              )}

              {!editingUser && (
                <>
                  {/* Mật khẩu */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isSubmitting ? 'Đang lưu...' : editingUser ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default UserFormModal; 