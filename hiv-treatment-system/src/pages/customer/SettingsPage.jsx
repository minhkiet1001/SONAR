import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const SettingsPage = () => {
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState([
    {
      id: 'appointments',
      type: 'Nhắc nhở Lịch hẹn',
      description: 'Nhận thông báo về lịch hẹn sắp tới và thay đổi lịch trình',
      email: true,
      sms: true,
      push: true
    },
    {
      id: 'test-results',
      type: 'Kết quả Xét nghiệm',
      description: 'Nhận thông báo khi có kết quả xét nghiệm mới',
      email: true,
      sms: true,
      push: true
    },
    {
      id: 'medications',
      type: 'Nhắc nhở Thuốc',
      description: 'Nhận lời nhắc khi đến giờ uống thuốc',
      email: false,
      sms: true,
      push: true
    },
    {
      id: 'resources',
      type: 'Tài nguyên Mới',
      description: 'Được thông báo khi có tài liệu giáo dục mới',
      email: true,
      sms: false,
      push: true
    },
    {
      id: 'system',
      type: 'Cập nhật Hệ thống',
      description: 'Nhận thông báo về bảo trì hệ thống và cập nhật',
      email: true,
      sms: false,
      push: false
    }
  ]);

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState([
    {
      id: 'data-collection',
      label: 'Thu thập Dữ liệu',
      description: 'Cho phép thu thập dữ liệu sử dụng để cải thiện trải nghiệm của bạn',
      enabled: true
    },
    {
      id: 'third-party',
      label: 'Chia sẻ bên Thứ ba',
      description: 'Chia sẻ dữ liệu không định danh của bạn với các đối tác tin cậy cho mục đích nghiên cứu',
      enabled: false
    },
    {
      id: 'location',
      label: 'Dịch vụ Vị trí',
      description: 'Cho phép truy cập vị trí của bạn để tìm kiếm tài nguyên và dịch vụ gần đó',
      enabled: true
    },
    {
      id: 'cookies',
      label: 'Chấp nhận Cookies',
      description: 'Cho phép hệ thống lưu trữ cookie trên thiết bị của bạn để có hiệu suất tốt hơn',
      enabled: false
    }
  ]);

  // Display preferences
  const [displayPreferences, setDisplayPreferences] = useState({
    language: 'Tiếng Việt',
    theme: 'Sáng',
    fontSize: 'Trung bình',
    colorBlindMode: false
  });

  // Handle notification setting toggle
  const handleNotificationToggle = (id, channel) => {
    setNotificationSettings(notificationSettings.map(setting => {
      if (setting.id === id) {
        return {
          ...setting,
          [channel]: !setting[channel]
        };
      }
      return setting;
    }));
  };

  // Handle privacy setting toggle
  const handlePrivacyToggle = (id) => {
    setPrivacySettings(privacySettings.map(setting => {
      if (setting.id === id) {
        return {
          ...setting,
          enabled: !setting.enabled
        };
      }
      return setting;
    }));
  };

  // Handle display preference change
  const handleDisplayChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setDisplayPreferences({
      ...displayPreferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle save settings
  const handleSaveSettings = () => {
    // In a real app, this would call an API to save the settings
    console.log('Đang lưu cài đặt...');
    console.log('Cài đặt thông báo', notificationSettings);
    console.log('Cài đặt quyền riêng tư', privacySettings);
    console.log('Tùy chọn hiển thị', displayPreferences);
  };

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Minh">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <Button variant="primary" onClick={handleSaveSettings}>
            Lưu thay đổi
          </Button>
        </div>

        {/* Notification Settings */}
        <Card className="mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Cài đặt Thông báo</h2>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý cách bạn nhận thông báo từ Hệ thống Điều trị HIV.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại thông báo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SMS
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Push
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notificationSettings.map((setting) => (
                    <tr key={setting.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{setting.type}</div>
                          <div className="text-sm text-gray-500">{setting.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={setting.email}
                          onChange={() => handleNotificationToggle(setting.id, 'email')}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={setting.sms}
                          onChange={() => handleNotificationToggle(setting.id, 'sms')}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={setting.push}
                          onChange={() => handleNotificationToggle(setting.id, 'push')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Cài đặt Quyền riêng tư</h2>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý cách dữ liệu của bạn được sử dụng và chia sẻ.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {privacySettings.map((setting) => (
                <div key={setting.id} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={setting.id}
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={setting.enabled}
                      onChange={() => handlePrivacyToggle(setting.id)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={setting.id} className="font-medium text-gray-700">{setting.label}</label>
                    <p className="text-gray-500">{setting.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Display Preferences */}
        <Card className="mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Tùy chọn Hiển thị</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tùy chỉnh trải nghiệm người dùng của bạn.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Ngôn ngữ
                </label>
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={displayPreferences.language}
                  onChange={handleDisplayChange}
                >
                  <option>Tiếng Việt</option>
                  <option>English</option>
                </select>
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                  Giao diện
                </label>
                <select
                  id="theme"
                  name="theme"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={displayPreferences.theme}
                  onChange={handleDisplayChange}
                >
                  <option>Sáng</option>
                  <option>Tối</option>
                  <option>Tự động</option>
                </select>
              </div>

              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
                  Cỡ chữ
                </label>
                <select
                  id="fontSize"
                  name="fontSize"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={displayPreferences.fontSize}
                  onChange={handleDisplayChange}
                >
                  <option>Nhỏ</option>
                  <option>Trung bình</option>
                  <option>Lớn</option>
                </select>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="colorBlindMode"
                    name="colorBlindMode"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={displayPreferences.colorBlindMode}
                    onChange={handleDisplayChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="colorBlindMode" className="font-medium text-gray-700">Chế độ hỗ trợ người mù màu</label>
                  <p className="text-gray-500">Điều chỉnh màu sắc để dễ nhìn hơn cho người mù màu</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="mb-6">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Cài đặt Bảo mật</h2>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý các tùy chọn bảo mật cho tài khoản của bạn.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Thay đổi mật khẩu
                </Button>
              </div>

              <div>
                <label htmlFor="two-factor" className="block text-sm font-medium text-gray-700 mb-2">
                  Xác thực hai yếu tố
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200">
                      <span className="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity opacity-100 ease-in duration-200">
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </button>
                  <span className="ml-3 text-sm text-gray-500">Chưa được kích hoạt. Kích hoạt để thêm lớp bảo mật cho tài khoản của bạn.</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Thiết bị đã đăng nhập</h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Chrome trên Windows</p>
                      <p className="text-xs text-gray-500">Hà Nội, Việt Nam • Hoạt động gần đây</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hiện tại
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Safari trên iPhone</p>
                      <p className="text-xs text-gray-500">Hồ Chí Minh, Việt Nam • 2 ngày trước</p>
                    </div>
                    <Button variant="text" size="sm" className="text-red-600">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card>
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Quản lý Dữ liệu</h2>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý dữ liệu cá nhân của bạn trong hệ thống.
            </p>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <Button variant="outline" className="mr-3">
                  Tải xuống dữ liệu của tôi
                </Button>
                <Button variant="danger">
                  Xóa tài khoản
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                <p>Xóa tài khoản sẽ:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Loại bỏ vĩnh viễn thông tin cá nhân của bạn khỏi hệ thống</li>
                  <li>Hủy tất cả các lịch hẹn sắp tới</li>
                  <li>Xóa tất cả tùy chọn cài đặt và tùy chỉnh</li>
                  <li>Đăng xuất khỏi tất cả các thiết bị</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage; 