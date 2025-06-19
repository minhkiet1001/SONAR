import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import CreateReportModal from '../../components/manager/CreateReportModal';
import {
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

// Chart component - this would typically be replaced with a chart library like Chart.js or Recharts
const ChartPlaceholder = ({ title, description, height = 240 }) => (
  <div className="flex items-center justify-center bg-gray-100 rounded-lg w-full overflow-hidden" style={{ height }}>
    <div className="text-center p-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Báo cáo nhân khẩu học bệnh nhân',
      description: 'Tổng quan về nhân khẩu học bệnh nhân bao gồm tuổi, giới tính và vị trí.',
      lastGenerated: new Date('2024-06-01'),
      frequency: 'Hàng tháng',
      format: 'pdf',
      category: 'patient',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Thống kê lịch hẹn',
      description: 'Tóm tắt các cuộc hẹn bao gồm khối lượng, loại và hủy bỏ.',
      lastGenerated: new Date('2024-06-10'),
      frequency: 'Hàng tuần',
      format: 'excel',
      category: 'appointment',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Chỉ số hiệu suất nhân viên',
      description: 'Chỉ số hiệu suất cho nhân viên y tế và hành chính.',
      lastGenerated: new Date('2024-05-30'),
      frequency: 'Hàng tháng',
      format: 'pdf',
      category: 'staff',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Phân tích kết quả điều trị',
      description: 'Phân tích kết quả điều trị bệnh nhân và tỷ lệ tuân thủ.',
      lastGenerated: new Date('2024-05-15'),
      frequency: 'Hàng quý',
      format: 'pdf',
      category: 'patient',
      status: 'completed'
    },
    {
      id: 5,
      name: 'Báo cáo hiệu suất tài chính',
      description: 'Tóm tắt hiệu suất tài chính bao gồm doanh thu và chi phí.',
      lastGenerated: new Date('2024-06-01'),
      frequency: 'Hàng tháng',
      format: 'excel',
      category: 'financial',
      status: 'completed'
    },
    {
      id: 6,
      name: 'Sử dụng tài nguyên giáo dục',
      description: 'Phân tích lượt xem và tải xuống tài nguyên giáo dục.',
      lastGenerated: new Date('2024-06-05'),
      frequency: 'Hàng tháng',
      format: 'csv',
      category: 'general',
      status: 'processing'
    }
  ]);
  
  // Quick actions for reports
  const quickActions = [
    {
      title: 'Tạo báo cáo mới',
      description: 'Tạo báo cáo tùy chỉnh',
      icon: <PlusIcon className="h-6 w-6" />,
      action: () => setShowCreateReportModal(true),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Xuất dữ liệu',
      description: 'Xuất dữ liệu thô',
      icon: <ArrowDownTrayIcon className="h-6 w-6" />,
      action: () => {
        // Simulate data export
        const csvData = "data:text/csv;charset=utf-8," + 
          "Tên báo cáo,Loại,Ngày tạo,Trạng thái\n" +
          reports.map(r => `${r.name},${r.category},${r.lastGenerated.toLocaleDateString()},${r.status}`).join("\n");
        const encodedUri = encodeURI(csvData);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "bao_cao_du_lieu.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Lên lịch báo cáo',
      description: 'Tự động tạo báo cáo',
      icon: <CalendarIcon className="h-6 w-6" />,
      action: () => {
        alert('Tính năng lên lịch báo cáo sẽ được triển khai trong phiên bản tiếp theo!');
      },
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Xem phân tích',
      description: 'Phân tích chi tiết',
      icon: <ChartBarIcon className="h-6 w-6" />,
      action: () => {
        window.location.href = '/manager/analytics';
      },
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  // Key metrics
  const keyMetrics = [
    {
      title: 'Tỷ lệ thành công điều trị',
      value: '89.2%',
      change: '+2.1%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Tổng số bệnh nhân',
      value: '1,256',
      change: '+12.5%',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Lịch hẹn tháng này',
      value: '362',
      change: '+8.2%',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Doanh thu',
      value: '2.4B VND',
      change: '+15.3%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  // Handle save new report
  const handleSaveReport = (reportData) => {
    setReports(prev => [reportData, ...prev]);
    console.log('New report created:', reportData);
  };

  // Handle view report
  const handleViewReport = (report) => {
    alert(`Đang mở báo cáo: ${report.name}\nTrạng thái: ${report.status}\nLoại: ${report.category}`);
  };

  // Handle download report
  const handleDownloadReport = (report) => {
    // Simulate file download
    const fileName = `${report.name.replace(/\s+/g, '_')}.${report.format}`;
    alert(`Đang tải xuống: ${fileName}\nĐịnh dạng: ${report.format.toUpperCase()}`);
    
    // In a real app, this would trigger actual file download
    console.log('Downloading report:', report);
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Tất cả', count: reports.length },
    { id: 'patient', name: 'Bệnh nhân', count: reports.filter(r => r.category === 'patient').length },
    { id: 'appointment', name: 'Lịch hẹn', count: reports.filter(r => r.category === 'appointment').length },
    { id: 'staff', name: 'Nhân viên', count: reports.filter(r => r.category === 'staff').length },
    { id: 'financial', name: 'Tài chính', count: reports.filter(r => r.category === 'financial').length },
    { id: 'general', name: 'Chung', count: reports.filter(r => r.category === 'general').length }
  ];

  // Filter reports based on active category
  const filteredReports = activeCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === activeCategory);

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get category badge
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'patient':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Bệnh nhân</span>;
      case 'appointment':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Lịch hẹn</span>;
      case 'staff':
        return <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Nhân viên</span>;
      case 'financial':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Tài chính</span>;
      case 'general':
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Chung</span>;
      default:
        return null;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Hoàn thành</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Đang xử lý</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Chờ xử lý</span>;
      default:
        return null;
    }
  };

  // Get format icon
  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf':
        return <DocumentTextIcon className="h-5 w-5 text-red-600" />;
      case 'excel':
        return <DocumentArrowDownIcon className="h-5 w-5 text-green-600" />;
      case 'csv':
        return <DocumentArrowDownIcon className="h-5 w-5 text-gray-600" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Nguyễn Quản Lý">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
              <p className="mt-2 text-gray-600">
                Tạo, quản lý và theo dõi các báo cáo hệ thống
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
              <Button variant="primary" className="flex items-center">
                <PlusIcon className="h-4 w-4 mr-2" />
                Tạo báo cáo mới
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1" onClick={action.action}>
                <div className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chỉ số chính</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      <metric.icon className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">{metric.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Overview */}
        <Card className="mb-8" title="Tổng quan bảng điều khiển">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder 
              title="Lượt khám bệnh" 
              description="Xu hướng lượt khám bệnh trong khoảng thời gian đã chọn"
            />
            <ChartPlaceholder 
              title="Kết quả điều trị" 
              description="Tỷ lệ thành công theo loại hình điều trị"
            />
            <ChartPlaceholder 
              title="Hiệu suất nhân viên" 
              description="Các chỉ số hiệu suất chính cho nhân viên y tế"
            />
            <ChartPlaceholder 
              title="Sử dụng tài nguyên" 
              description="Mức độ sử dụng tài nguyên cơ sở và tài liệu giáo dục"
            />
          </div>
        </Card>

        {/* Reports Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Báo cáo đã lưu</h2>
            
            {/* Category Filter */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeCategory === category.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="h-full hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getFormatIcon(report.format)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    {getCategoryBadge(report.category)}
                    {getStatusBadge(report.status)}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Cập nhật: {formatDate(report.lastGenerated)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{report.frequency}</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center"
                        onClick={() => handleViewReport(report)}
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Xem
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center"
                        onClick={() => handleDownloadReport(report)}
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Tải
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
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

export default ReportsPage; 