import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    fullName: 'Trần Văn Nhân Viên',
    email: 'tranvan@example.com',
    phone: '(123) 456-7890',
    role: 'Nhân viên y tế',
    department: 'Khoa Điều trị HIV',
    language: 'vi',
    notifications: {
      email: true,
      browser: true,
      appointments: true,
      results: true,
      system: false
    },
    theme: 'light',
    fontSize: 'medium'
  });

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle notifications changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [name]: checked
      }
    });
  };

  // Handle preference changes
  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the updated profile to an API
    alert('Thông tin cá nhân đã được cập nhật!');
  };

  return (
    <Layout currentRole={UserRole.STAFF} userName={profile.fullName}>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt tài khoản</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý thông tin cá nhân, thông báo và tùy chọn hiển thị
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card title="Thông tin cá nhân">
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="language">
                    Ngôn ngữ
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={profile.language}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">Tiếng Anh</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </Card>
          
          {/* Password Settings */}
          <Card title="Đổi mật khẩu">
            <form className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currentPassword">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="md:col-span-2"></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Cập nhật mật khẩu
                </Button>
              </div>
            </form>
          </Card>
          
          {/* Notification Settings */}
          <Card title="Cài đặt thông báo">
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Kênh thông báo</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        name="email"
                        type="checkbox"
                        checked={profile.notifications.email}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="browser-notifications"
                        name="browser"
                        type="checkbox"
                        checked={profile.notifications.browser}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="browser-notifications" className="ml-2 block text-sm text-gray-700">
                        Thông báo trong ứng dụng
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Loại thông báo</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="appointments-notifications"
                        name="appointments"
                        type="checkbox"
                        checked={profile.notifications.appointments}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="appointments-notifications" className="ml-2 block text-sm text-gray-700">
                        Lịch hẹn và cuộc họp
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="results-notifications"
                        name="results"
                        type="checkbox"
                        checked={profile.notifications.results}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="results-notifications" className="ml-2 block text-sm text-gray-700">
                        Kết quả xét nghiệm
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="system-notifications"
                        name="system"
                        type="checkbox"
                        checked={profile.notifications.system}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="system-notifications" className="ml-2 block text-sm text-gray-700">
                        Thông báo hệ thống
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant="primary">
                  Lưu cài đặt thông báo
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Display Settings */}
          <Card title="Tùy chọn hiển thị">
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="theme">
                  Giao diện
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={profile.theme}
                  onChange={handlePreferenceChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="light">Sáng</option>
                  <option value="dark">Tối</option>
                  <option value="system">Theo hệ thống</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fontSize">
                  Cỡ chữ
                </label>
                <select
                  id="fontSize"
                  name="fontSize"
                  value={profile.fontSize}
                  onChange={handlePreferenceChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="small">Nhỏ</option>
                  <option value="medium">Trung bình</option>
                  <option value="large">Lớn</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button variant="primary">
                  Lưu tùy chọn
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage; 