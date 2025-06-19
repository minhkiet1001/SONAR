import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ManagerSettingsPage = () => {
  const [settings, setSettings] = useState({
    fullName: 'Nguyễn Quản Lý',
    email: 'manager@example.com',
    phone: '(123) 456-7896',
    language: 'vi',
    notifications: {
      email: true,
      browser: true,
      reports: true,
      staff: true,
      system: true
    },
    theme: 'light',
    fontSize: 'medium',
    managementSettings: {
      autoApproveReports: false,
      requireApprovalForSchedule: true,
      enableStaffNotifications: true
    },
    reportSettings: {
      defaultReportPeriod: 'monthly',
      autoGenerateReports: true,
      emailReports: true
    }
  });

  // Handle settings changes
  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setSettings({
        ...settings,
        [parentKey]: {
          ...settings[parentKey],
          [childKey]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setSettings({
        ...settings,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Manager settings updated:', settings);
    alert('Cài đặt đã được cập nhật!');
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName={settings.fullName}>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt quản lý</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý thông tin cá nhân, báo cáo và tùy chọn quản lý
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
                    value={settings.fullName}
                    onChange={handleSettingsChange}
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
                    value={settings.email}
                    onChange={handleSettingsChange}
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
                    value={settings.phone}
                    onChange={handleSettingsChange}
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
                    value={settings.language}
                    onChange={handleSettingsChange}
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

          {/* Management Settings */}
          <Card title="Cài đặt quản lý">
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="managementSettings.autoApproveReports"
                    name="managementSettings.autoApproveReports"
                    type="checkbox"
                    checked={settings.managementSettings.autoApproveReports}
                    onChange={handleSettingsChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="managementSettings.autoApproveReports" className="ml-2 block text-sm text-gray-700">
                    Tự động phê duyệt báo cáo
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="managementSettings.requireApprovalForSchedule"
                    name="managementSettings.requireApprovalForSchedule"
                    type="checkbox"
                    checked={settings.managementSettings.requireApprovalForSchedule}
                    onChange={handleSettingsChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="managementSettings.requireApprovalForSchedule" className="ml-2 block text-sm text-gray-700">
                    Yêu cầu phê duyệt lịch trình
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="managementSettings.enableStaffNotifications"
                    name="managementSettings.enableStaffNotifications"
                    type="checkbox"
                    checked={settings.managementSettings.enableStaffNotifications}
                    onChange={handleSettingsChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="managementSettings.enableStaffNotifications" className="ml-2 block text-sm text-gray-700">
                    Bật thông báo cho nhân viên
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Report Settings */}
          <Card title="Cài đặt báo cáo">
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="reportSettings.defaultReportPeriod">
                    Chu kỳ báo cáo mặc định
                  </label>
                  <select
                    id="reportSettings.defaultReportPeriod"
                    name="reportSettings.defaultReportPeriod"
                    value={settings.reportSettings.defaultReportPeriod}
                    onChange={handleSettingsChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="weekly">Hàng tuần</option>
                    <option value="monthly">Hàng tháng</option>
                    <option value="quarterly">Hàng quý</option>
                    <option value="yearly">Hàng năm</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="reportSettings.autoGenerateReports"
                    name="reportSettings.autoGenerateReports"
                    type="checkbox"
                    checked={settings.reportSettings.autoGenerateReports}
                    onChange={handleSettingsChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="reportSettings.autoGenerateReports" className="ml-2 block text-sm text-gray-700">
                    Tự động tạo báo cáo
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="reportSettings.emailReports"
                    name="reportSettings.emailReports"
                    type="checkbox"
                    checked={settings.reportSettings.emailReports}
                    onChange={handleSettingsChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="reportSettings.emailReports" className="ml-2 block text-sm text-gray-700">
                    Gửi báo cáo qua email
                  </label>
                </div>
              </div>
            </div>
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
                        id="notifications.email"
                        name="notifications.email"
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={handleSettingsChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications.email" className="ml-2 block text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="notifications.browser"
                        name="notifications.browser"
                        type="checkbox"
                        checked={settings.notifications.browser}
                        onChange={handleSettingsChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications.browser" className="ml-2 block text-sm text-gray-700">
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
                        id="notifications.reports"
                        name="notifications.reports"
                        type="checkbox"
                        checked={settings.notifications.reports}
                        onChange={handleSettingsChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications.reports" className="ml-2 block text-sm text-gray-700">
                        Báo cáo mới
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="notifications.staff"
                        name="notifications.staff"
                        type="checkbox"
                        checked={settings.notifications.staff}
                        onChange={handleSettingsChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications.staff" className="ml-2 block text-sm text-gray-700">
                        Hoạt động nhân viên
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="notifications.system"
                        name="notifications.system"
                        type="checkbox"
                        checked={settings.notifications.system}
                        onChange={handleSettingsChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications.system" className="ml-2 block text-sm text-gray-700">
                        Thông báo hệ thống
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Display Preferences */}
          <Card title="Tùy chọn hiển thị">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="theme">
                    Giao diện
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleSettingsChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="light">Sáng</option>
                    <option value="dark">Tối</option>
                    <option value="auto">Tự động</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fontSize">
                    Kích thước chữ
                  </label>
                  <select
                    id="fontSize"
                    name="fontSize"
                    value={settings.fontSize}
                    onChange={handleSettingsChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="small">Nhỏ</option>
                    <option value="medium">Vừa</option>
                    <option value="large">Lớn</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerSettingsPage; 