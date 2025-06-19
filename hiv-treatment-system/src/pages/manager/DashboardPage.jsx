import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import CreateReportModal from '../../components/manager/CreateReportModal';
import {
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  BookOpenIcon,
  CalendarIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  PlusIcon,
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Mock statistics


// Mock staff data


// Mock educational content


const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);

  // Quick actions for manager
  const quickActions = [
    {
      title: 'Thêm nhân viên',
      description: 'Tuyển dụng nhân viên mới',
      icon: <UserGroupIcon className="h-6 w-6" />,
      link: '/manager/staff',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Tạo báo cáo',
      description: 'Tạo báo cáo mới',
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      link: '/manager/reports',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Xem phân tích',
      description: 'Phân tích dữ liệu chi tiết',
      icon: <ChartBarIcon className="h-6 w-6" />,
      link: '/manager/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Quản lý nội dung',
      description: 'Cập nhật tài liệu giáo dục',
      icon: <BookOpenIcon className="h-6 w-6" />,
      link: '/manager/content',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  // Enhanced statistics with trends
  const statistics = [
    {
      id: 1,
      title: 'Tổng số bệnh nhân',
      value: '2,845',
      change: 12.5,
      changeType: 'increase',
      icon: UserIcon,
      color: 'bg-blue-100 text-blue-800',
      description: 'So với tháng trước'
    },
    {
      id: 2,
      title: 'Lịch hẹn tháng này',
      value: '362',
      change: 8.2,
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-green-100 text-green-800',
      description: 'Đã xác nhận'
    },
    {
      id: 3,
      title: 'Kết quả xét nghiệm',
      value: '126',
      change: -3.8,
      changeType: 'decrease',
      icon: ClipboardDocumentListIcon,
      color: 'bg-purple-100 text-purple-800',
      description: 'Chờ xử lý'
    },
    {
      id: 4,
      title: 'Lượt xem tài liệu',
      value: '12.5K',
      change: 18.3,
      changeType: 'increase',
      icon: EyeIcon,
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Trong tuần'
    }
  ];

  // Staff status data
  const staffStatus = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn A',
      role: 'Bác sĩ',
      department: 'Điều trị HIV',
      status: 'active',
      patients: 45
    },
    {
      id: 2,
      name: 'YT. Trần Thị B',
      role: 'Y tá',
      department: 'Chăm sóc bệnh nhân',
      status: 'active',
      patients: 28
    },
    {
      id: 3,
      name: 'BS. Lê Văn C',
      role: 'Bác sĩ',
      department: 'Miễn dịch học',
      status: 'on-leave',
      patients: 0
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      title: 'Báo cáo tháng 6 đã hoàn thành',
      description: 'Báo cáo điều trị HIV tháng 6/2024 đã được tạo và gửi',
      timestamp: '2 giờ trước',
      type: 'report',
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Nhân viên mới được thêm',
      description: 'Y tá Phạm Thị D đã được thêm vào hệ thống',
      timestamp: '4 giờ trước',
      type: 'staff',
      priority: 'normal'
    },
    {
      id: 3,
      title: 'Cập nhật tài liệu giáo dục',
      description: 'Tài liệu "Sống khỏe với HIV" đã được cập nhật',
      timestamp: '1 ngày trước',
      type: 'content',
      priority: 'low'
    }
  ];

  // System alerts
  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Cần xem xét lịch làm việc tuần tới',
      action: 'Xem chi tiết',
      link: '/manager/staff-schedule'
    },
    {
      id: 2,
      type: 'info',
      message: '3 báo cáo đang chờ phê duyệt',
      action: 'Xem báo cáo',
      link: '/manager/reports'
    }
  ];

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Đang làm việc</span>;
      case 'on-leave':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Nghỉ phép</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Không hoạt động</span>;
      default:
        return null;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'report':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-blue-500" />;
      case 'staff':
        return <UserGroupIcon className="h-5 w-5 text-green-500" />;
      case 'content':
        return <BookOpenIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'info':
        return <BellIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Handle save new report
  const handleSaveReport = (reportData) => {
    console.log('New report created from dashboard:', reportData);
    alert(`Báo cáo "${reportData.name}" đã được tạo thành công!`);
    setShowCreateReportModal(false);
  };
  
  return (
    <Layout currentRole={UserRole.MANAGER} userName="Nguyễn Quản Lý">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bảng điều khiển Quản lý</h1>
              <p className="mt-2 text-gray-600">
                Chào mừng trở lại! Dưới đây là tổng quan hoạt động hệ thống.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <select 
                className="rounded-md border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:ring-primary-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm nay</option>
              </select>
              <Button 
                variant="primary" 
                className="flex items-center"
                onClick={() => setShowCreateReportModal(true)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Tạo báo cáo
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1">
                  <div className="p-6">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                      {action.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê tổng quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat) => (
              <Card key={stat.id} className="bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center">
                      {stat.changeType === 'increase' ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'increase' ? '+' : ''}{stat.change}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">{stat.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staff Status */}
          <div className="lg:col-span-2">
            <Card title="Tình trạng nhân viên" className="h-full">
              <div className="space-y-4">
                {staffStatus.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{staff.name}</h4>
                        <p className="text-sm text-gray-600">{staff.role} - {staff.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{staff.patients} bệnh nhân</span>
                      {getStatusBadge(staff.status)}
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/manager/staff" className="flex items-center text-primary-600 hover:text-primary-700">
                    Xem tất cả nhân viên
                    <ArrowRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activities & Alerts */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card title="Cảnh báo hệ thống">
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <Link to={alert.link} className="text-xs text-primary-600 hover:text-primary-700">
                        {alert.action}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activities */}
            <Card title="Hoạt động gần đây">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Create Report Modal */}
        <CreateReportModal
          isOpen={showCreateReportModal}
          onClose={() => setShowCreateReportModal(false)}
          onSave={handleSaveReport}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage; 