import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const TestResultsPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [patientFilter, setPatientFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock patients data
  const patients = [
    { id: 1, name: 'Nguyễn Văn A', patientId: 'BN10045' },
    { id: 2, name: 'Trần Thị B', patientId: 'BN10034' },
    { id: 3, name: 'Lê Văn C', patientId: 'BN10028' },
    { id: 4, name: 'Phạm Thị D', patientId: 'BN10061' },
    { id: 5, name: 'Hoàng Văn E', patientId: 'BN10073' }
  ];

  // Mock test categories
  const testCategories = [
    { id: 'viralLoad', name: 'Tải lượng Virus' },
    { id: 'cd4Count', name: 'Số lượng CD4' },
    { id: 'chemistry', name: 'Hóa sinh máu' },
    { id: 'hematology', name: 'Huyết học' },
    { id: 'urinalysis', name: 'Xét nghiệm nước tiểu' },
    { id: 'immunology', name: 'Miễn dịch học' }
  ];

  // Mock test results data
  const testResultsData = [
    {
      id: 1,
      patientName: 'Nguyễn Văn A',
      patientId: 'BN10045',
      testName: 'Tải lượng Virus HIV',
      category: 'viralLoad',
      date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      result: '<20',
      unit: 'bản sao/mL',
      referenceRange: '<200 bản sao/mL',
      status: 'normal',
      notes: 'Ức chế virus được duy trì',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    },
    {
      id: 2,
      patientName: 'Nguyễn Văn A',
      patientId: 'BN10045',
      testName: 'Số lượng CD4',
      category: 'cd4Count',
      date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      result: '750',
      unit: 'tế bào/mm³',
      referenceRange: '500-1.500 tế bào/mm³',
      status: 'normal',
      notes: 'Chức năng miễn dịch tốt',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    },
    {
      id: 3,
      patientName: 'Trần Thị B',
      patientId: 'BN10034',
      testName: 'Tải lượng Virus HIV',
      category: 'viralLoad',
      date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 ngày trước
      result: '5000',
      unit: 'bản sao/mL',
      referenceRange: '<200 bản sao/mL',
      status: 'abnormal',
      notes: 'Tải lượng virus tăng, cần điều chỉnh điều trị',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    },
    {
      id: 4,
      patientName: 'Trần Thị B',
      patientId: 'BN10034',
      testName: 'Số lượng CD4',
      category: 'cd4Count',
      date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 ngày trước
      result: '350',
      unit: 'tế bào/mm³',
      referenceRange: '500-1.500 tế bào/mm³',
      status: 'abnormal',
      notes: 'Dưới mức bình thường, cần theo dõi chặt chẽ',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    },
    {
      id: 5,
      patientName: 'Lê Văn C',
      patientId: 'BN10028',
      testName: 'Xét nghiệm sinh hóa tổng quát',
      category: 'chemistry',
      date: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), // 10 ngày trước
      result: 'Xem chi tiết',
      unit: 'Khác nhau',
      referenceRange: 'Khác nhau',
      status: 'normal',
      notes: 'Tất cả các giá trị trong phạm vi bình thường',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    },
    {
      id: 6,
      patientName: 'Phạm Thị D',
      patientId: 'BN10061',
      testName: 'Tải lượng Virus HIV',
      category: 'viralLoad',
      date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 ngày trước
      result: '120',
      unit: 'bản sao/mL',
      referenceRange: '<200 bản sao/mL',
      status: 'normal',
      notes: 'Ức chế virus được duy trì nhưng tăng nhẹ so với kết quả trước đó',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    },
    {
      id: 7,
      patientName: 'Phạm Thị D',
      patientId: 'BN10061',
      testName: 'Số lượng CD4',
      category: 'cd4Count',
      date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 ngày trước
      result: '550',
      unit: 'tế bào/mm³',
      referenceRange: '500-1.500 tế bào/mm³',
      status: 'normal',
      notes: 'Trong phạm vi bình thường',
      orderedBy: 'BS. Trần Minh',
      labName: 'Phòng xét nghiệm Trung tâm'
    }
  ];

  // Filter test results based on search term and filters
  const filteredTestResults = testResultsData.filter((test) => {
    const matchesSearch = 
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.result.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPatient = patientFilter === 'all' || test.patientId === patientFilter;
    const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
    
    return matchesSearch && matchesPatient && matchesCategory;
  });

  // Sort test results by date (newest first)
  const sortedTestResults = [...filteredTestResults].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'normal':
        return 'Bình thường';
      case 'abnormal':
        return 'Bất thường';
      case 'pending':
        return 'Đang chờ';
      default:
        return status;
    }
  };

  // Handle view test details
  const handleViewTest = (test) => {
    setSelectedTest(test);
  };

  // Handle close test details
  const handleCloseTestDetails = () => {
    setSelectedTest(null);
  };

  // Handle add form submission
  const handleAddTestSubmit = (e) => {
    e.preventDefault();
    // Implementation would go here in a real app
    setShowAddForm(false);
  };

  return (
    <Layout currentRole={UserRole.DOCTOR} userName="BS. Trần Minh">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Kết quả xét nghiệm</h1>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Tìm kiếm kết quả xét nghiệm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <Button
              variant="outline"
              className="flex items-center mr-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Bộ lọc
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowAddForm(true)}
            >
              Thêm kết quả xét nghiệm
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="patient-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Bệnh nhân
                </label>
                <select
                  id="patient-filter"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={patientFilter}
                  onChange={(e) => setPatientFilter(e.target.value)}
                >
                  <option value="all">Tất cả bệnh nhân</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.patientId}>
                      {patient.name} ({patient.patientId})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Loại xét nghiệm
                </label>
                <select
                  id="category-filter"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">Tất cả loại xét nghiệm</option>
                  {testCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh nhân
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Xét nghiệm
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kết quả
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
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
                {sortedTestResults.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">{test.patientName.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{test.patientName}</div>
                          <div className="text-sm text-gray-500">{test.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{test.testName}</div>
                      <div className="text-sm text-gray-500">
                        {testCategories.find(cat => cat.id === test.category)?.name || test.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{test.result} {test.unit}</div>
                      <div className="text-sm text-gray-500">Phạm vi: {test.referenceRange}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(test.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(test.status)}`}>
                        {getStatusText(test.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewTest(test)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sortedTestResults.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Không tìm thấy kết quả xét nghiệm nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          )}
        </Card>

        {/* Test Details Modal */}
        {selectedTest && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Chi tiết kết quả xét nghiệm
                </h3>
                <button
                  onClick={handleCloseTestDetails}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 text-xl font-medium">{selectedTest.patientName.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedTest.patientName}</h3>
                    <p className="text-sm text-gray-500">{selectedTest.patientId}</p>
                    <div className="mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTest.status)}`}>
                        {getStatusText(selectedTest.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin xét nghiệm</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Tên xét nghiệm</p>
                        <p className="text-sm font-medium">{selectedTest.testName}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Loại xét nghiệm</p>
                        <p className="text-sm font-medium">
                          {testCategories.find(cat => cat.id === selectedTest.category)?.name || selectedTest.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày thực hiện</p>
                        <p className="text-sm font-medium">{formatDate(selectedTest.date)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin kết quả</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Kết quả</p>
                        <p className="text-sm font-medium">{selectedTest.result} {selectedTest.unit}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Phạm vi tham chiếu</p>
                        <p className="text-sm font-medium">{selectedTest.referenceRange}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trạng thái</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTest.status)}`}>
                          {getStatusText(selectedTest.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin bổ sung</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Ghi chú</p>
                      <p className="text-sm">{selectedTest.notes}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Bác sĩ chỉ định</p>
                        <p className="text-sm font-medium">{selectedTest.orderedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phòng xét nghiệm</p>
                        <p className="text-sm font-medium">{selectedTest.labName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-end border-t border-gray-200">
                <Button 
                  variant="primary"
                  onClick={handleCloseTestDetails}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Test Result Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Thêm kết quả xét nghiệm mới
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddTestSubmit} className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1">
                      Bệnh nhân
                    </label>
                    <select
                      id="patient"
                      name="patient"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    >
                      <option value="">Chọn bệnh nhân</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.patientId})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Loại xét nghiệm
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    >
                      <option value="">Chọn loại xét nghiệm</option>
                      {testCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-1">
                      Tên xét nghiệm
                    </label>
                    <input
                      type="text"
                      id="testName"
                      name="testName"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày thực hiện
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
                      Kết quả
                    </label>
                    <input
                      type="text"
                      id="result"
                      name="result"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                      Đơn vị
                    </label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="referenceRange" className="block text-sm font-medium text-gray-700 mb-1">
                      Phạm vi tham chiếu
                    </label>
                    <input
                      type="text"
                      id="referenceRange"
                      name="referenceRange"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    >
                      <option value="normal">Bình thường</option>
                      <option value="abnormal">Bất thường</option>
                      <option value="pending">Đang chờ</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-3"
                    onClick={() => setShowAddForm(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Lưu kết quả
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TestResultsPage; 