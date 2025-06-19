import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import { UserRole } from '../../types/index.js';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ChevronDownIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const TestResultsPage = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // 8 test results per page
  
  // Mock test results data
  const testResultsData = [
    {
      id: 'TR10022',
      patientId: 'PT10032',
      patientName: 'Nguyễn Thị F',
      testType: 'Viral Load',
      orderedDate: '20/06/2023',
      completedDate: null,
      result: null,
      status: 'pending',
      orderedBy: 'Dr. Trần Minh',
      notes: 'Kiểm tra tải lượng virus định kỳ'
    },
    {
      id: 'TR10023',
      patientId: 'PT10036',
      patientName: 'Trần Văn G',
      testType: 'CD4 Count',
      orderedDate: '21/06/2023',
      completedDate: null,
      result: null,
      status: 'processing',
      orderedBy: 'Dr. Lê Hà',
      notes: 'Theo dõi số lượng tế bào CD4'
    },
    {
      id: 'TR10024',
      patientId: 'PT10039',
      patientName: 'Lê Thị H',
      testType: 'Resistance Testing',
      orderedDate: '22/06/2023',
      completedDate: null,
      result: null,
      status: 'pending',
      orderedBy: 'Dr. Nguyễn Thành',
      notes: 'Kiểm tra khả năng kháng thuốc'
    },
    {
      id: 'TR10025',
      patientId: 'PT10045',
      patientName: 'Nguyễn Văn A',
      testType: 'Viral Load',
      orderedDate: '15/06/2023',
      completedDate: '18/06/2023',
      result: '< 20 copies/mL',
      status: 'completed',
      orderedBy: 'Dr. Trần Minh',
      resultNotes: 'Tải lượng virus không phát hiện, kết quả tốt',
      interpretation: 'normal'
    },
    {
      id: 'TR10026',
      patientId: 'PT10045',
      patientName: 'Nguyễn Văn A',
      testType: 'CD4 Count',
      orderedDate: '15/06/2023',
      completedDate: '18/06/2023',
      result: '650 cells/mm³',
      status: 'completed',
      orderedBy: 'Dr. Trần Minh',
      resultNotes: 'Số lượng tế bào CD4 trong mức bình thường',
      interpretation: 'normal'
    },
    {
      id: 'TR10027',
      patientId: 'PT10046',
      patientName: 'Trần Thị B',
      testType: 'Viral Load',
      orderedDate: '16/06/2023',
      completedDate: '19/06/2023',
      result: '< 20 copies/mL',
      status: 'completed',
      orderedBy: 'Dr. Lê Hà',
      resultNotes: 'Tải lượng virus không phát hiện, kết quả tốt',
      interpretation: 'normal'
    },
    {
      id: 'TR10028',
      patientId: 'PT10049',
      patientName: 'Hoàng Văn E',
      testType: 'Viral Load',
      orderedDate: '19/06/2023',
      completedDate: '22/06/2023',
      result: '500 copies/mL',
      status: 'completed',
      orderedBy: 'Dr. Nguyễn Thành',
      resultNotes: 'Tải lượng virus tăng so với lần xét nghiệm trước',
      interpretation: 'attention'
    },
    // Add more mock data for pagination demo
    {
      id: 'TR10029',
      patientId: 'PT10050',
      patientName: 'Nguyễn Thị I',
      testType: 'CD4 Count',
      orderedDate: '23/06/2023',
      completedDate: '25/06/2023',
      result: '580 cells/mm³',
      status: 'completed',
      orderedBy: 'Dr. Trần Minh',
      resultNotes: 'Số lượng tế bào CD4 ổn định',
      interpretation: 'normal'
    },
    {
      id: 'TR10030',
      patientId: 'PT10051',
      patientName: 'Võ Văn K',
      testType: 'Viral Load',
      orderedDate: '24/06/2023',
      completedDate: null,
      result: null,
      status: 'processing',
      orderedBy: 'Dr. Lê Hà',
      notes: 'Xét nghiệm định kỳ'
    },
    {
      id: 'TR10031',
      patientId: 'PT10052',
      patientName: 'Đặng Thị L',
      testType: 'Resistance Testing',
      orderedDate: '25/06/2023',
      completedDate: null,
      result: null,
      status: 'pending',
      orderedBy: 'Dr. Nguyễn Thành',
      notes: 'Kiểm tra kháng thuốc do thay đổi liệu pháp'
    },
    {
      id: 'TR10032',
      patientId: 'PT10053',
      patientName: 'Trịnh Văn M',
      testType: 'CD4 Count',
      orderedDate: '26/06/2023',
      completedDate: '28/06/2023',
      result: '420 cells/mm³',
      status: 'completed',
      orderedBy: 'Dr. Trần Minh',
      resultNotes: 'Số lượng tế bào CD4 thấp hơn bình thường',
      interpretation: 'attention'
    }
  ];

  // Filter test results based on search term and filters
  const filteredResults = testResultsData.filter(result => {
    const matchesSearch = 
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || result.testType === typeFilter;
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort results by ordered date, most recent first
  const sortedResults = [...filteredResults].sort((a, b) => {
    // Convert date strings to Date objects for comparison
    const dateA = new Date(a.orderedDate.split('/').reverse().join('-'));
    const dateB = new Date(b.orderedDate.split('/').reverse().join('-'));
    return dateB - dateA; // Descending order
  });

  // Pagination logic
  const totalItems = sortedResults.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = sortedResults.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get status color and label for badges
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Chờ xử lý'
        };
      case 'processing':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Đang xử lý'
        };
      case 'completed':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Hoàn thành'
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Đã hủy'
        };
      case 'normal':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Bình thường'
        };
      case 'attention':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Cần chú ý'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: status
        };
    }
  };

  // Handle test result selection
  const handleResultSelect = (result) => {
    setSelectedResult(result);
  };

  // Get unique test types for filter dropdown
  const testTypes = ['all', ...new Set(testResultsData.map(result => result.testType))];

  return (
    <Layout currentRole={UserRole.STAFF} userName="Trần Văn Nhân Viên">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Kết quả xét nghiệm</h1>
          <div className="mt-3 sm:mt-0">
            <div className="flex space-x-3">
              <Link to="/staff/test-results/new">
                <Button variant="primary" className="flex items-center">
                  <ArrowUpTrayIcon className="h-5 w-5 mr-2" /> Nhập kết quả mới
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Card>
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm xét nghiệm..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Toggle Button */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FunnelIcon className="h-4 w-4 mr-1" /> Lọc
                  <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <Button variant="outline" className="flex items-center">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> Xuất
                </Button>
                <Button variant="outline" className="flex items-center">
                  <ArrowPathIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Loại xét nghiệm
                    </label>
                    <select
                      id="type-filter"
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      {testTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type === 'all' ? 'Tất cả' : type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      id="status-filter"
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Tất cả</option>
                      <option value="pending">Chờ xử lý</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Test Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh nhân
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại xét nghiệm
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày chỉ định
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày hoàn thành
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kết quả
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentResults.map((result) => (
                  <tr 
                    key={result.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedResult?.id === result.id ? 'bg-primary-50' : ''}`}
                    onClick={() => handleResultSelect(result)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {result.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.patientId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.testType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.orderedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.completedDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.result || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusInfo(result.status).color}`}>
                        {getStatusInfo(result.status).label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}

        {/* Selected Test Result Detail */}
        {selectedResult && (
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Chi tiết kết quả xét nghiệm</h2>
              <div className="flex space-x-2">
                {selectedResult.status === 'pending' && (
                  <Link to={`/staff/test-results/${selectedResult.id}/input`}>
                    <Button variant="primary" size="sm">Nhập kết quả</Button>
                  </Link>
                )}
                {selectedResult.status === 'completed' && (
                  <Button variant="outline" size="sm" className="flex items-center">
                    <DocumentTextIcon className="h-4 w-4 mr-1" /> In kết quả
                  </Button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Thông tin xét nghiệm</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">ID xét nghiệm</p>
                        <p className="text-sm font-medium">{selectedResult.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Loại xét nghiệm</p>
                        <p className="text-sm font-medium">{selectedResult.testType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày chỉ định</p>
                        <p className="text-sm font-medium">{selectedResult.orderedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bác sĩ chỉ định</p>
                        <p className="text-sm font-medium">{selectedResult.orderedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày hoàn thành</p>
                        <p className="text-sm font-medium">{selectedResult.completedDate || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trạng thái</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusInfo(selectedResult.status).color}`}>
                          {getStatusInfo(selectedResult.status).label}
                        </span>
                      </div>
                    </div>
                    {selectedResult.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Ghi chú</p>
                        <p className="text-sm">{selectedResult.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Thông tin bệnh nhân</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                        {selectedResult.patientName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {selectedResult.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {selectedResult.patientId}
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/staff/patients/${selectedResult.patientId}`} 
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mt-2"
                    >
                      Xem hồ sơ bệnh nhân
                    </Link>
                  </div>

                  {selectedResult.status === 'completed' && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Kết quả xét nghiệm</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-3">
                          <BeakerIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium">{selectedResult.result}</span>
                          {selectedResult.interpretation && (
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(selectedResult.interpretation).color}`}>
                              {selectedResult.interpretation === 'normal' ? 'Bình thường' : 'Cần chú ý'}
                            </span>
                          )}
                        </div>
                        {selectedResult.resultNotes && (
                          <div className="text-sm text-gray-700 mt-2">
                            {selectedResult.resultNotes}
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Thống kê qua thời gian</p>
                          <div className="flex items-center">
                            <ChartBarIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <Link to={`/staff/patients/${selectedResult.patientId}/history`} className="text-primary-600 text-sm hover:text-primary-800">
                              Xem lịch sử xét nghiệm
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TestResultsPage; 