import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { UserRole } from '../../types';
import {
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const DataManagementPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      message: 'Sao lưu dữ liệu thành công - 25/03/2024 15:30',
    },
    {
      id: 2,
      type: 'error',
      message: 'Không thể khôi phục dữ liệu từ file backup_20240324.json',
    },
    {
      id: 3,
      type: 'warning',
      message: 'Dung lượng lưu trữ còn 15% - Cần dọn dẹp dữ liệu',
    },
    {
      id: 4,
      type: 'info',
      message: 'Đang tiến hành đồng bộ dữ liệu...',
    }
  ]);

  const dataTypes = [
    { id: 'all', name: 'Tất cả dữ liệu' },
    { id: 'users', name: 'Người dùng' },
    { id: 'appointments', name: 'Lịch hẹn' },
    { id: 'treatments', name: 'Điều trị' },
    { id: 'prescriptions', name: 'Đơn thuốc' },
    { id: 'medical_records', name: 'Hồ sơ bệnh án' },
    { id: 'system_logs', name: 'Nhật ký hệ thống' }
  ];

  const timeRanges = [
    { id: 'all', name: 'Tất cả thời gian' },
    { id: 'today', name: 'Hôm nay' },
    { id: 'week', name: 'Tuần này' },
    { id: 'month', name: 'Tháng này' },
    { id: 'year', name: 'Năm nay' },
    { id: 'custom', name: 'Tùy chọn' }
  ];

  const exportFormats = [
    { id: 'json', name: 'JSON' },
    { id: 'csv', name: 'CSV' },
    { id: 'excel', name: 'Excel' },
    { id: 'pdf', name: 'PDF' }
  ];

  const backupHistory = [
    {
      id: 1,
      filename: 'backup_20240325_153000.json',
      size: '256MB',
      date: '25/03/2024 15:30:00',
      type: 'Tự động',
      status: 'success'
    },
    {
      id: 2,
      filename: 'backup_20240324_153000.json',
      size: '255MB',
      date: '24/03/2024 15:30:00',
      type: 'Tự động',
      status: 'success'
    },
    {
      id: 3,
      filename: 'backup_20240323_153000.json',
      size: '254MB',
      date: '23/03/2024 15:30:00',
      type: 'Thủ công',
      status: 'success'
    },
    {
      id: 4,
      filename: 'backup_20240322_153000.json',
      size: '253MB',
      date: '22/03/2024 15:30:00',
      type: 'Tự động',
      status: 'error'
    }
  ];

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      setNotifications(prev => [{
        id: Date.now(),
        type: 'success',
        message: `Xuất dữ liệu ${selectedDataType} thành công - ${new Date().toLocaleString()}`
      }, ...prev]);
    }, 2000);
  };

  const handleBackup = () => {
    setIsLoading(true);
    // Simulate backup process
    setTimeout(() => {
      setIsLoading(false);
      setNotifications(prev => [{
        id: Date.now(),
        type: 'success',
        message: `Sao lưu dữ liệu thành công - ${new Date().toLocaleString()}`
      }, ...prev]);
    }, 2000);
  };

  const handleRestore = (backup) => {
    setIsLoading(true);
    // Simulate restore process
    setTimeout(() => {
      setIsLoading(false);
      setNotifications(prev => [{
        id: Date.now(),
        type: 'success',
        message: `Khôi phục dữ liệu từ ${backup.filename} thành công`
      }, ...prev]);
    }, 2000);
  };

  const handleDeleteBackup = (backup) => {
    setShowDeleteConfirm(true);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout currentRole={UserRole.ADMIN}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý dữ liệu</h1>
          <p className="mt-2 text-gray-600">
            Quản lý, sao lưu và khôi phục dữ liệu hệ thống
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Export Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Export Card */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Xuất dữ liệu</h2>
                
                <div className="space-y-4">
                  {/* Data Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại dữ liệu
                    </label>
                    <select
                      value={selectedDataType}
                      onChange={(e) => setSelectedDataType(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      {dataTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Time Range Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thời gian
                    </label>
                    <select
                      value={selectedTimeRange}
                      onChange={(e) => setSelectedTimeRange(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      {timeRanges.map(range => (
                        <option key={range.id} value={range.id}>{range.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Format Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Định dạng
                    </label>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      {exportFormats.map(format => (
                        <option key={format.id} value={format.id}>{format.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleExport}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-sm"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                      <span>{isLoading ? 'Đang xuất...' : 'Xuất dữ liệu'}</span>
                    </Button>
                    <Button
                      onClick={handleBackup}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
                    >
                      <DocumentDuplicateIcon className="h-5 w-5" />
                      <span>{isLoading ? 'Đang sao lưu...' : 'Sao lưu'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Backup History */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Lịch sử sao lưu</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên file
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kích thước
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {backupHistory.map((backup) => (
                        <tr key={backup.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {backup.filename}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {backup.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {backup.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {backup.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              backup.status === 'success' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {backup.status === 'success' ? 'Thành công' : 'Thất bại'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => handleRestore(backup)}
                                className="text-primary-600 hover:text-primary-900"
                                title="Khôi phục"
                              >
                                <ArrowPathIcon className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBackup(backup)}
                                className="text-red-600 hover:text-red-900"
                                title="Xóa"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Notifications & Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Thống kê nhanh</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TableCellsIcon className="h-6 w-6 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">Tổng dữ liệu</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">1.2 GB</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <DocumentDuplicateIcon className="h-6 w-6 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">Sao lưu gần nhất</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">25/03/2024 15:30</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ChartBarIcon className="h-6 w-6 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">Dung lượng trống</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">15%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* System Notifications */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông báo hệ thống</h2>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-3 p-4 rounded-lg ${
                        notification.type === 'success' ? 'bg-green-50' :
                        notification.type === 'error' ? 'bg-red-50' :
                        notification.type === 'warning' ? 'bg-yellow-50' :
                        'bg-blue-50'
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm text-gray-900">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Xác nhận xóa bản sao lưu
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Bạn có chắc chắn muốn xóa bản sao lưu này? Hành động này không thể hoàn tác.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Xác nhận xóa
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DataManagementPage; 