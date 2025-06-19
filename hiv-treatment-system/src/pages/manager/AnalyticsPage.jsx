import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DataAnalytics from '../../components/manager/DataAnalytics';
import {
  ChartBarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Quick stats for overview
  const quickStats = [
    {
      title: 'Tổng bệnh nhân',
      value: '1,256',
      change: '+12.5%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Tỷ lệ thành công',
      value: '89.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: ArrowTrendingUpIcon,
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Thời gian TB',
      value: '14.3 tháng',
      change: '-0.8 tháng',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Bệnh nhân mới',
      value: '28',
      change: '+18.3%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  // Mock statistics data
  const mockStatistics = {
    totalPatients: 1256,
    newPatients: 28,
    activePatients: 875,
    treatmentSuccess: 642,
    avgTreatmentDuration: 14.3,
    
    testResultsByMonth: [
      { 
        month: 'T1', 
        results: { positive: 12, negative: 145, undefined: 3 } 
      },
      { 
        month: 'T2', 
        results: { positive: 8, negative: 172, undefined: 5 } 
      },
      { 
        month: 'T3', 
        results: { positive: 15, negative: 163, undefined: 2 } 
      },
      { 
        month: 'T4', 
        results: { positive: 10, negative: 155, undefined: 8 } 
      },
      { 
        month: 'T5', 
        results: { positive: 13, negative: 168, undefined: 4 } 
      },
      { 
        month: 'T6', 
        results: { positive: 9, negative: 170, undefined: 3 } 
      },
    ],
    
    patientsByAgeGroup: [
      { ageGroup: '0-18', count: 86 },
      { ageGroup: '19-30', count: 354 },
      { ageGroup: '31-45', count: 490 },
      { ageGroup: '46-60', count: 256 },
      { ageGroup: '61+', count: 70 },
    ],
    
    patientsByGender: [
      { gender: 'Nam', count: 720 },
      { gender: 'Nữ', count: 526 },
      { gender: 'Khác', count: 10 },
    ],
    
    treatmentAdherence: [
      { level: 'Tuyệt đối', count: 425 },
      { level: 'Tốt', count: 210 },
      { level: 'Trung bình', count: 152 },
      { level: 'Kém', count: 88 },
    ],
  };

  const handleExportReport = () => {
    // Mock export functionality
    console.log('Exporting analytics report...');
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Nguyễn Quản Lý">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Phân tích dữ liệu</h1>
              <p className="mt-2 text-gray-600">
                Theo dõi và phân tích dữ liệu điều trị HIV chi tiết
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
                variant="outline" 
                className="flex items-center"
                onClick={handleExportReport}
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">{stat.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Analytics Component */}
        <div className="mb-8">
          <DataAnalytics statistics={mockStatistics} />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Insights */}
          <Card title="Thông tin quan trọng" className="h-full">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Xu hướng tích cực</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Tỷ lệ tuân thủ điều trị tăng 12.5% so với tháng trước
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <UsersIcon className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">Bệnh nhân mới</h4>
                    <p className="text-sm text-green-700 mt-1">
                      28 bệnh nhân mới đăng ký điều trị trong tháng này
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Cần chú ý</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      88 bệnh nhân có mức độ tuân thủ điều trị kém
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Reports */}
          <Card title="Báo cáo gần đây" className="h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Báo cáo tháng 6/2024</h4>
                    <p className="text-xs text-gray-600">Tạo ngày 30/06/2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Xem</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ChartBarIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Phân tích quý 2/2024</h4>
                    <p className="text-xs text-gray-600">Tạo ngày 28/06/2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Xem</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Báo cáo hiệu quả điều trị</h4>
                    <p className="text-xs text-gray-600">Tạo ngày 25/06/2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Xem</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage; 