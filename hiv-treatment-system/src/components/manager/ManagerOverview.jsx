import React from 'react';
import Card from '../common/Card';
import {
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const ManagerOverview = () => {
  const overviewStats = [
    {
      title: 'Tổng nhân viên',
      value: '48',
      change: '+3',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-blue-100 text-blue-800',
      description: 'Nhân viên đang hoạt động'
    },
    {
      title: 'Bác sĩ',
      value: '12',
      change: '+1',
      changeType: 'increase',
      icon: UserIcon,
      color: 'bg-green-100 text-green-800',
      description: 'Bác sĩ chuyên khoa'
    },
    {
      title: 'Báo cáo tháng này',
      value: '24',
      change: '+6',
      changeType: 'increase',
      icon: ClipboardDocumentListIcon,
      color: 'bg-purple-100 text-purple-800',
      description: 'Báo cáo đã hoàn thành'
    },
    {
      title: 'Hiệu suất trung bình',
      value: '94%',
      change: '+2.1%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Hiệu suất làm việc'
    },
    {
      title: 'Lịch hẹn tuần này',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-indigo-100 text-indigo-800',
      description: 'Cuộc hẹn đã đặt'
    },
    {
      title: 'Nội dung đã xuất bản',
      value: '89',
      change: '+7',
      changeType: 'increase',
      icon: DocumentTextIcon,
      color: 'bg-pink-100 text-pink-800',
      description: 'Bài viết và tài liệu'
    }
  ];

  const departmentStats = [
    {
      name: 'Khoa Bệnh truyền nhiễm',
      staff: 15,
      efficiency: 96,
      color: 'bg-green-500'
    },
    {
      name: 'Khoa Đa khoa',
      staff: 12,
      efficiency: 94,
      color: 'bg-blue-500'
    },
    {
      name: 'Phòng Tư vấn',
      staff: 8,
      efficiency: 92,
      color: 'bg-purple-500'
    },
    {
      name: 'Phòng xét nghiệm',
      staff: 6,
      efficiency: 98,
      color: 'bg-yellow-500'
    },
    {
      name: 'Khoa Dược',
      staff: 4,
      efficiency: 95,
      color: 'bg-indigo-500'
    },
    {
      name: 'Phòng Hành chính',
      staff: 3,
      efficiency: 90,
      color: 'bg-gray-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'staff',
      message: 'BS. Sarah Johnson đã hoàn thành báo cáo tuần',
      time: '2 giờ trước',
      icon: UserIcon,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'content',
      message: 'Đã xuất bản bài viết "Điều trị HIV hiện đại"',
      time: '4 giờ trước',
      icon: DocumentTextIcon,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'schedule',
      message: 'Lịch làm việc tuần tới đã được cập nhật',
      time: '6 giờ trước',
      icon: CalendarIcon,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'report',
      message: 'Báo cáo hiệu suất tháng 3 đã sẵn sàng',
      time: '1 ngày trước',
      icon: ChartBarIcon,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hiệu suất theo khoa</h3>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm text-gray-500">{dept.staff} nhân viên</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${dept.color}`}
                      style={{ width: `${dept.efficiency}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Hiệu suất</span>
                    <span className="text-xs font-medium text-gray-900">{dept.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className={`p-2 rounded-lg bg-gray-100 mr-3 ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
              Xem tất cả hoạt động →
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => window.location.href = '/manager/staff'}
          >
            <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 block">Quản lý nhân viên</span>
          </button>
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => window.location.href = '/manager/doctor-schedule'}
          >
            <CalendarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 block">Lên lịch bác sĩ</span>
          </button>
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => window.location.href = '/manager/reports'}
          >
            <ClipboardDocumentListIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 block">Tạo báo cáo</span>
          </button>
          <button 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => window.location.href = '/manager/content'}
          >
            <DocumentTextIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 block">Thêm nội dung</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ManagerOverview; 