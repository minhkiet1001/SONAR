import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import {
  UserGroupIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const DoctorDashboardPage = () => {
  const quickActions = [
    {
      name: 'Danh sách bệnh nhân',
      description: 'Xem và quản lý thông tin bệnh nhân',
      icon: UserGroupIcon,
      href: '/doctor/patients',
      color: 'bg-blue-500'
    },
    {
      name: 'Lịch khám hôm nay',
      description: 'Xem lịch hẹn và cuộc hẹn trong ngày',
      icon: CalendarIcon,
      href: '/doctor/appointments',
      color: 'bg-green-500'
    },
    {
      name: 'Kế hoạch điều trị',
      description: 'Quản lý kế hoạch điều trị cho bệnh nhân',
      icon: ClipboardDocumentListIcon,
      href: '/doctor/treatment-plans',
      color: 'bg-purple-500'
    },
    {
      name: 'Kết quả xét nghiệm',
      description: 'Xem và phân tích kết quả xét nghiệm',
      icon: ChartBarIcon,
      href: '/doctor/test-results',
      color: 'bg-orange-500'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'Nguyễn Văn A',
      time: '09:00',
      type: 'Khám định kỳ',
      status: 'confirmed'
    },
    {
      id: 2,
      patientName: 'Trần Thị B',
      time: '10:30',
      type: 'Tư vấn điều trị',
      status: 'confirmed'
    },
    {
      id: 3,
      patientName: 'Lê Văn C',
      time: '14:00',
      type: 'Khám theo dõi',
      status: 'pending'
    }
  ];

  return (
    <Layout currentRole={UserRole.DOCTOR}>
      <div className="container mx-auto px-4 py-8">
        {/* Tiêu đề trang */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trung tâm quản lý điều trị</h1>
          <p className="mt-2 text-gray-600">
            Chào mừng trở lại, Bác sĩ. Dưới đây là tổng quan các hoạt động và công việc cần xử lý.
          </p>
        </div>

        {/* Các chức năng chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="transform transition-all duration-200 hover:scale-105"
            >
              <Card className="h-full bg-white hover:shadow-xl">
                <div className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.name}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Lịch hẹn hôm nay */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Lịch hẹn hôm nay</h2>
              <p className="text-gray-600">Danh sách cuộc hẹn cần thực hiện</p>
            </div>
            <Link
              to="/doctor/appointments"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              Xem tất cả
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">Thời gian</th>
                  <th className="text-left py-3 px-4 text-gray-600">Bệnh nhân</th>
                  <th className="text-left py-3 px-4 text-gray-600">Loại khám</th>
                  <th className="text-left py-3 px-4 text-gray-600">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                        {appointment.time}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{appointment.patientName}</td>
                    <td className="py-3 px-4">{appointment.type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Tổng số bệnh nhân</h3>
              <p className="text-3xl font-bold">150</p>
              <p className="text-blue-100 mt-2">Đang điều trị tích cực</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Cuộc hẹn tuần này</h3>
              <p className="text-3xl font-bold">28</p>
              <p className="text-green-100 mt-2">Lịch hẹn đã xác nhận</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Kế hoạch điều trị</h3>
              <p className="text-3xl font-bold">45</p>
              <p className="text-purple-100 mt-2">Đang thực hiện</p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboardPage; 