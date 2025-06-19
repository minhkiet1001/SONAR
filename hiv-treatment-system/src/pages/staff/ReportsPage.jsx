import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { UserRole } from '../../types/index.js';
import { 
  ChartBarIcon, 
  DocumentChartBarIcon,
  CalendarIcon,
  UsersIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

const ReportsPage = () => {
  const [reportPeriod, setReportPeriod] = useState('month');
  
  // Mock statistics data
  const statistics = {
    newPatients: {
      current: 32,
      previous: 28,
      change: '+14.3%',
      trend: 'increase'
    },
    appointments: {
      current: 245,
      previous: 230,
      change: '+6.5%',
      trend: 'increase'
    },
    completedTests: {
      current: 187,
      previous: 175,
      change: '+6.9%',
      trend: 'increase'
    },
    noShows: {
      current: 15,
      previous: 18,
      change: '-16.7%',
      trend: 'decrease'
    }
  };

  // Mock chart data
  const appointmentsByDay = [
    { day: 'Thứ Hai', count: 42 },
    { day: 'Thứ Ba', count: 38 },
    { day: 'Thứ Tư', count: 45 },
    { day: 'Thứ Năm', count: 40 },
    { day: 'Thứ Sáu', count: 50 },
    { day: 'Thứ Bảy', count: 30 },
    { day: 'Chủ Nhật', count: 0 }
  ];

  // Mock report types
  const reportTypes = [
    {
      id: 'patient-visits',
      name: 'Báo cáo lượt khám bệnh',
      description: 'Thống kê số lượt khám bệnh theo thời gian',
      icon: UsersIcon
    },
    {
      id: 'test-results',
      name: 'Báo cáo kết quả xét nghiệm',
      description: 'Thống kê kết quả xét nghiệm theo loại xét nghiệm',
      icon: DocumentChartBarIcon
    },
    {
      id: 'appointments',
      name: 'Báo cáo lịch hẹn',
      description: 'Thống kê lịch hẹn theo trạng thái',
      icon: CalendarIcon
    },
    {
      id: 'patient-demographics',
      name: 'Báo cáo nhân khẩu học bệnh nhân',
      description: 'Thống kê bệnh nhân theo độ tuổi, giới tính',
      icon: ChartBarIcon
    }
  ];

  // Generate bar chart for appointments by day (simplified version)
  const renderBarChart = () => {
    const maxCount = Math.max(...appointmentsByDay.map(day => day.count));
    
    return (
      <div className="mt-4">
        <div className="relative">
          {appointmentsByDay.map((day, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-20 text-sm text-gray-600">{day.day}</div>
              <div className="flex-1">
                <div 
                  className="bg-primary-500 h-6 rounded"
                  style={{ width: `${(day.count / maxCount) * 100}%` }}
                >
                  <div className="px-2 text-xs text-white font-medium h-full flex items-center">
                    {day.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout currentRole={UserRole.STAFF} userName="Trần Văn Nhân Viên">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo</h1>
          <div className="mt-3 sm:mt-0 flex space-x-3">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
            <Button variant="outline" className="flex items-center">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* New Patients */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 p-3 rounded-md">
                <UsersIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Bệnh nhân mới</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{statistics.newPatients.current}</p>
                  <p className={`ml-2 text-sm font-medium ${statistics.newPatients.trend === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {statistics.newPatients.change}
                  </p>
                </div>
                <p className="text-sm text-gray-500">so với {reportPeriod === 'month' ? 'tháng' : reportPeriod === 'week' ? 'tuần' : reportPeriod === 'quarter' ? 'quý' : 'năm'} trước</p>
              </div>
            </div>
          </Card>

          {/* Appointments */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Lịch hẹn</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{statistics.appointments.current}</p>
                  <p className={`ml-2 text-sm font-medium ${statistics.appointments.trend === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {statistics.appointments.change}
                  </p>
                </div>
                <p className="text-sm text-gray-500">so với {reportPeriod === 'month' ? 'tháng' : reportPeriod === 'week' ? 'tuần' : reportPeriod === 'quarter' ? 'quý' : 'năm'} trước</p>
              </div>
            </div>
          </Card>

          {/* Tests Completed */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-md">
                <DocumentChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Xét nghiệm hoàn thành</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{statistics.completedTests.current}</p>
                  <p className={`ml-2 text-sm font-medium ${statistics.completedTests.trend === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {statistics.completedTests.change}
                  </p>
                </div>
                <p className="text-sm text-gray-500">so với {reportPeriod === 'month' ? 'tháng' : reportPeriod === 'week' ? 'tuần' : reportPeriod === 'quarter' ? 'quý' : 'năm'} trước</p>
              </div>
            </div>
          </Card>

          {/* No Shows */}
          <Card>
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Bệnh nhân không đến</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{statistics.noShows.current}</p>
                  <p className={`ml-2 text-sm font-medium ${statistics.noShows.trend === 'decrease' ? 'text-green-600' : 'text-red-600'}`}>
                    {statistics.noShows.change}
                  </p>
                </div>
                <p className="text-sm text-gray-500">so với {reportPeriod === 'month' ? 'tháng' : reportPeriod === 'week' ? 'tuần' : reportPeriod === 'quarter' ? 'quý' : 'năm'} trước</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Appointments Chart */}
          <div className="lg:col-span-2">
            <Card title="Lịch hẹn theo ngày trong tuần">
              {renderBarChart()}
            </Card>
          </div>

          {/* Quick Reports */}
          <div>
            <Card title="Báo cáo nhanh">
              <div className="divide-y divide-gray-200">
                {reportTypes.map((report) => (
                  <div key={report.id} className="py-3 first:pt-0 last:pb-0">
                    <button 
                      className="w-full text-left flex items-start hover:bg-gray-50 p-2 rounded-md transition-colors"
                      onClick={() => {}}
                    >
                      <report.icon className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.description}</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Reports */}
        <Card title="Báo cáo gần đây">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên báo cáo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người tạo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại báo cáo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tải xuống
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Báo cáo hoạt động tháng 6/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    22/06/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Trần Văn Nhân Viên
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Tổng hợp
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Báo cáo khám bệnh tuần 3 tháng 6/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    20/06/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Nguyễn Thị Quản Lý
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Lượt khám
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Báo cáo xét nghiệm tháng 5/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    05/06/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Trần Văn Nhân Viên
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Xét nghiệm
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ReportsPage; 