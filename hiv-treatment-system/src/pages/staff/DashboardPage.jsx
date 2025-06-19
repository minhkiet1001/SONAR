import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { UserRole } from '../../types/index.js';
import { 
  UserIcon, 
  CalendarIcon, 
  ExclamationCircleIcon,
  ClockIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  PlusIcon,
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for staff info
  const staffInfo = {
    id: 'ST001',
    fullName: 'Trần Văn Nhân Viên',
    role: 'Nhân viên y tế',
    department: 'Khoa Điều trị HIV',
    email: 'tranvan.nhanvien@hivcare.vn',
    phone: '(024) 3123-4567',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    workingHours: '8:00 - 17:00',
    location: 'Tầng 2, Phòng 201'
  };

  // Enhanced metrics with trends
  const metrics = {
    appointmentsToday: { value: 18, trend: +2, percentage: +12.5 },
    appointmentsThisWeek: { value: 74, trend: -3, percentage: -3.9 },
    patientsAssigned: { value: 126, trend: +8, percentage: +6.8 },
    pendingTasks: { value: 7, trend: -2, percentage: -22.2 },
    testResultsPending: { value: 5, trend: +1, percentage: +25.0 },
    chatMessages: { value: 23, trend: +5, percentage: +27.8 }
  };

  // Today's schedule
  const todaySchedule = [
    {
      id: 1,
      time: '09:00',
      type: 'appointment',
      title: 'Khám định kỳ - Nguyễn Văn A',
      status: 'confirmed',
      room: 'Phòng 101'
    },
    {
      id: 2,
      time: '10:30',
      type: 'test',
      title: 'Nhập kết quả xét nghiệm CD4',
      status: 'pending',
      patient: 'Trần Thị B'
    },
    {
      id: 3,
      time: '14:00',
      type: 'appointment',
      title: 'Tư vấn điều trị - Lê Văn C',
      status: 'confirmed',
      room: 'Phòng 103'
    },
    {
      id: 4,
      time: '15:30',
      type: 'meeting',
      title: 'Họp nhóm điều trị',
      status: 'upcoming',
      location: 'Phòng họp A'
    }
  ];

  // Recent activities with more details
  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'Đăng ký lịch hẹn mới',
      description: 'Đã đăng ký lịch hẹn khám định kỳ cho bệnh nhân Nguyễn Văn A - 27/06/2024',
      timestamp: new Date(2024, 5, 26, 10, 30),
      priority: 'normal',
      patientId: 'BN001'
    },
    {
      id: 2,
      type: 'test_result',
      title: 'Cập nhật kết quả xét nghiệm',
      description: 'Đã nhập kết quả xét nghiệm CD4: 450 cells/μL cho bệnh nhân Trần Thị B',
      timestamp: new Date(2024, 5, 26, 9, 15),
      priority: 'high',
      patientId: 'BN002'
    },
    {
      id: 3,
      type: 'chat',
      title: 'Phản hồi chat hỗ trợ',
      description: 'Đã trả lời 3 tin nhắn tư vấn từ bệnh nhân về tác dụng phụ thuốc ARV',
      timestamp: new Date(2024, 5, 26, 8, 45),
      priority: 'normal'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Xác nhận lịch hẹn',
      description: 'Đã xác nhận và gửi nhắc nhở lịch hẹn cho 5 bệnh nhân ngày mai',
      timestamp: new Date(2024, 5, 25, 16, 45),
      priority: 'normal'
    }
  ];

  // Alerts with different types
  const alerts = [
    {
      id: 1,
      type: 'urgent',
      title: 'Cần xử lý khẩn cấp',
      message: 'Bệnh nhân Phạm Văn D cần tư vấn khẩn về tác dụng phụ thuốc',
      time: '10 phút trước',
      action: 'Xem chi tiết',
      link: '/staff/patients/BN004'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Thiết bị bảo trì',
      message: 'Máy xét nghiệm CD4 tại phòng lab 2 đang bảo trì đến 15:00',
      time: '1 giờ trước',
      action: 'Xem thông báo',
      link: '/staff/notifications'
    },
    {
      id: 3,
      type: 'info',
      title: 'Cuộc họp sắp tới',
      message: 'Cuộc họp nhóm điều trị lúc 15:30 tại phòng họp A',
      time: '2 giờ trước',
      action: 'Tham gia',
      link: '/staff/schedule'
    }
  ];

  // Quick actions for staff
  const quickActions = [
    {
      title: 'Thêm bệnh nhân',
      description: 'Đăng ký bệnh nhân mới',
      icon: <UserIcon className="h-6 w-6" />,
      link: '/staff/patients/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Đặt lịch hẹn',
      description: 'Tạo lịch hẹn mới',
      icon: <CalendarIcon className="h-6 w-6" />,
      link: '/staff/appointments/new',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Nhập kết quả XN',
      description: 'Cập nhật kết quả xét nghiệm',
      icon: <BeakerIcon className="h-6 w-6" />,
      link: '/staff/test-results',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Chat hỗ trợ',
      description: 'Quản lý tin nhắn hỗ trợ',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      link: '/staff/chat',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <CalendarIcon className="h-5 w-5" />;
      case 'test_result':
        return <BeakerIcon className="h-5 w-5" />;
      case 'chat':
        return <ChatBubbleLeftRightIcon className="h-5 w-5" />;
      default:
        return <DocumentTextIcon className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-600';
      case 'test_result':
        return 'bg-purple-100 text-purple-600';
      case 'chat':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <Layout currentRole={UserRole.STAFF} userName={staffInfo.fullName} pageTitle="Bảng điều khiển">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={staffInfo.avatar}
                alt={staffInfo.fullName}
                className="w-16 h-16 rounded-full border-2 border-white/20"
              />
              <div>
                <h1 className="text-2xl font-bold">Chào mừng, {staffInfo.fullName}!</h1>
                <p className="text-primary-100">{staffInfo.role} - {staffInfo.department}</p>
                <p className="text-primary-200 text-sm">{formatDate(currentTime)}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{formatTime(currentTime)}</div>
              <div className="text-primary-200 text-sm">Ca làm việc: {staffInfo.workingHours}</div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getAlertStyle(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <BellIcon className="h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm mt-1">{alert.message}</p>
                      <p className="text-xs mt-2 opacity-75">{alert.time}</p>
                    </div>
                  </div>
                  <Link to={alert.link}>
                    <Button size="sm" variant="outline" className="text-xs">
                      {alert.action}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <div className={`${action.color} text-white p-4 rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer`}>
                    <div className="flex items-center space-x-3">
                      {action.icon}
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lịch hẹn hôm nay</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.appointmentsToday.value}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metrics.appointmentsToday.trend > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${metrics.appointmentsToday.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.appointmentsToday.percentage > 0 ? '+' : ''}{metrics.appointmentsToday.percentage}%
                </span>
                <span className="text-sm text-gray-500 ml-1">so với hôm qua</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bệnh nhân được phân công</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.patientsAssigned.value}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <UserIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{metrics.patientsAssigned.percentage}%</span>
                <span className="text-sm text-gray-500 ml-1">so với tuần trước</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nhiệm vụ chờ xử lý</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.pendingTasks.value}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowTrendingDownIcon className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{metrics.pendingTasks.percentage}%</span>
                <span className="text-sm text-gray-500 ml-1">giảm so với hôm qua</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Kết quả XN chờ xử lý</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.testResultsPending.value}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <BeakerIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/staff/test-results" className="text-sm text-primary-600 hover:text-primary-800">
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tin nhắn hỗ trợ</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.chatMessages.value}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-full">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/staff/chat" className="text-sm text-primary-600 hover:text-primary-800">
                  Quản lý chat →
                </Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lịch hẹn tuần này</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.appointmentsThisWeek.value}</p>
                </div>
                <div className="p-3 bg-teal-100 rounded-full">
                  <ChartBarIcon className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/staff/appointments" className="text-sm text-primary-600 hover:text-primary-800">
                  Xem lịch →
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Schedule and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Lịch trình hôm nay</h2>
                <Link to="/staff/schedule">
                  <Button size="sm" variant="outline">Xem tất cả</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {todaySchedule.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{item.time}</div>
                      <div className={`w-2 h-2 rounded-full mt-1 mx-auto ${
                        item.status === 'confirmed' ? 'bg-green-500' :
                        item.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.room || item.location || item.patient}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status === 'confirmed' ? 'Đã xác nhận' :
                       item.status === 'pending' ? 'Chờ xử lý' : 'Sắp tới'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
                <Link to="/staff/reports">
                  <Button size="sm" variant="outline">Xem báo cáo</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        {activity.priority === 'high' && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                            Ưu tiên cao
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.timestamp.toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Staff Info Card */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin nhân viên</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{staffInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Điện thoại</p>
                  <p className="text-sm font-medium text-gray-900">{staffInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Vị trí</p>
                  <p className="text-sm font-medium text-gray-900">{staffInfo.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Giờ làm việc</p>
                  <p className="text-sm font-medium text-gray-900">{staffInfo.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage; 