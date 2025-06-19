import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const PatientsPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock patient data
  const patientsData = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      patientId: 'BN10045',
      age: 35,
      gender: 'Nam',
      status: 'stable',
      enrollmentDate: new Date('2020-05-10'),
      lastVisit: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 ngày trước
      contactNumber: '0901 234 567',
      email: 'nguyenvana@example.com',
      viralLoad: '<20 bản sao/mL',
      cd4Count: '750 tế bào/mm³',
      currentMedications: [
        { name: 'Tenofovir', dosage: '300mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Lamivudine', dosage: '300mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Dolutegravir', dosage: '50mg', frequency: 'Mỗi ngày một lần' }
      ],
      notes: 'Bệnh nhân đáp ứng tốt với điều trị. Không có tác dụng phụ đáng kể nào được báo cáo.'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      patientId: 'BN10034',
      age: 42,
      gender: 'Nữ',
      status: 'critical',
      enrollmentDate: new Date('2018-08-20'),
      lastVisit: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7 ngày trước
      contactNumber: '0912 345 678',
      email: 'tranthib@example.com',
      viralLoad: '5000 bản sao/mL',
      cd4Count: '350 tế bào/mm³',
      currentMedications: [
        { name: 'Bictegravir', dosage: '50mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Emtricitabine', dosage: '200mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Tenofovir alafenamide', dosage: '25mg', frequency: 'Mỗi ngày một lần' }
      ],
      notes: 'Bệnh nhân có biểu hiện kháng với phác đồ trước đó. Đã chuyển sang liệu pháp điều trị thứ hai. Theo dõi tải lượng virus chặt chẽ.'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      patientId: 'BN10028',
      age: 29,
      gender: 'Nam',
      status: 'stable',
      enrollmentDate: new Date('2021-02-15'),
      lastVisit: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      contactNumber: '0923 456 789',
      email: 'levanc@example.com',
      viralLoad: '<20 bản sao/mL',
      cd4Count: '820 tế bào/mm³',
      currentMedications: [
        { name: 'Dolutegravir', dosage: '50mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Tenofovir', dosage: '300mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Lamivudine', dosage: '300mg', frequency: 'Mỗi ngày một lần' }
      ],
      notes: 'Bệnh nhân đáp ứng rất tốt với liệu pháp. Không có tác dụng phụ nào được báo cáo.'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      patientId: 'BN10061',
      age: 31,
      gender: 'Nữ',
      status: 'attention',
      enrollmentDate: new Date('2019-11-05'),
      lastVisit: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 ngày trước
      contactNumber: '0934 567 890',
      email: 'phamthid@example.com',
      viralLoad: '120 bản sao/mL',
      cd4Count: '550 tế bào/mm³',
      currentMedications: [
        { name: 'Raltegravir', dosage: '400mg', frequency: 'Ngày hai lần' },
        { name: 'Tenofovir', dosage: '300mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Emtricitabine', dosage: '200mg', frequency: 'Mỗi ngày một lần' }
      ],
      notes: 'Bệnh nhân báo cáo các cơn đau đầu vừa phải như tác dụng phụ. Cân nhắc các thuốc ARV thay thế nếu triệu chứng kéo dài.'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      patientId: 'BN10073',
      age: 47,
      gender: 'Nam',
      status: 'stable',
      enrollmentDate: new Date('2017-06-22'),
      lastVisit: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000), // 14 ngày trước
      contactNumber: '0945 678 901',
      email: 'hoangvane@example.com',
      viralLoad: '<20 bản sao/mL',
      cd4Count: '680 tế bào/mm³',
      currentMedications: [
        { name: 'Bictegravir', dosage: '50mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Emtricitabine', dosage: '200mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Tenofovir alafenamide', dosage: '25mg', frequency: 'Mỗi ngày một lần' }
      ],
      notes: 'Bệnh nhân dài hạn với sự tuân thủ điều trị tuyệt vời. Tất cả các mục tiêu điều trị đều đạt được một cách nhất quán.'
    },
    {
      id: 6,
      name: 'Nguyễn Thị F',
      patientId: 'BN10085',
      age: 26,
      gender: 'Nữ',
      status: 'new',
      enrollmentDate: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước
      lastVisit: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 ngày trước (lần khám đầu tiên)
      contactNumber: '0956 789 012',
      email: 'nguyenthif@example.com',
      viralLoad: '15000 bản sao/mL',
      cd4Count: '320 tế bào/mm³',
      currentMedications: [
        { name: 'Dolutegravir', dosage: '50mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Tenofovir', dosage: '300mg', frequency: 'Mỗi ngày một lần' },
        { name: 'Lamivudine', dosage: '300mg', frequency: 'Mỗi ngày một lần' }
      ],
      notes: 'Bệnh nhân mới được chẩn đoán. Đánh giá ban đầu đã hoàn thành. Bắt đầu liệu pháp điều trị đầu tiên.'
    },
    {
      id: 7,
      name: 'Trần Văn G',
      patientId: 'BN10097',
      age: 38,
      gender: 'Nam',
      status: 'inactive',
      enrollmentDate: new Date('2019-03-18'),
      lastVisit: new Date(new Date().getTime() - 120 * 24 * 60 * 60 * 1000), // 120 ngày trước
      contactNumber: '0967 890 123',
      email: 'tranvang@example.com',
      viralLoad: 'Không rõ',
      cd4Count: 'Không rõ',
      currentMedications: [
        { name: 'Không rõ', dosage: '', frequency: '' }
      ],
      notes: 'Bệnh nhân đã bỏ lỡ nhiều cuộc hẹn. Các nỗ lực liên hệ không thành công. Xem xét mất dấu theo dõi.'
    }
  ];

  // Filter patients based on search term and filters
  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort patients by lastVisit (most recent first)
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    return new Date(b.lastVisit) - new Date(a.lastVisit);
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
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'new':
        return 'bg-primary-100 text-primary-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'stable':
        return 'Ổn định';
      case 'attention':
        return 'Cần chú ý';
      case 'critical':
        return 'Nguy hiểm';
      case 'new':
        return 'Mới';
      case 'inactive':
        return 'Không hoạt động';
      default:
        return status;
    }
  };

  // Handle view patient details
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
  };

  // Handle close patient details
  const handleClosePatientDetails = () => {
    setSelectedPatient(null);
  };

  return (
    <Layout currentRole={UserRole.DOCTOR} userName="BS. Trần Minh">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Danh sách bệnh nhân</h1>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Tìm kiếm bệnh nhân..."
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
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Bộ lọc
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  id="status-filter"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="stable">Ổn định</option>
                  <option value="attention">Cần chú ý</option>
                  <option value="critical">Nguy hiểm</option>
                  <option value="new">Bệnh nhân mới</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
              {/* More filters can be added here */}
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
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chỉ số
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lần khám gần nhất
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">{patient.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{patient.patientId}</span> • {patient.age} tuổi, {patient.gender}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                        {getStatusText(patient.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Tải lượng Virus: {patient.viralLoad}
                      </div>
                      <div className="text-sm text-gray-500">
                        CD4: {patient.cd4Count}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.lastVisit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewPatient(patient)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        Chi tiết
                      </button>
                      <Link 
                        to={`/doctor/patients/${patient.id}`} 
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Hồ sơ đầy đủ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sortedPatients.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Không tìm thấy bệnh nhân nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          )}
        </Card>

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-full overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Chi tiết bệnh nhân
                </h3>
                <button
                  onClick={handleClosePatientDetails}
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
                    <span className="text-primary-600 text-xl font-medium">{selectedPatient.name.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedPatient.patientId} • {selectedPatient.age} tuổi, {selectedPatient.gender}
                    </p>
                    <div className="mt-1">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedPatient.status)}`}>
                        {getStatusText(selectedPatient.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin liên hệ</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Điện thoại</p>
                        <p className="text-sm font-medium">{selectedPatient.contactNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium">{selectedPatient.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin điều trị</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Ngày đăng ký</p>
                        <p className="text-sm font-medium">{formatDate(selectedPatient.enrollmentDate)}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Lần khám gần nhất</p>
                        <p className="text-sm font-medium">{formatDate(selectedPatient.lastVisit)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Chỉ số xét nghiệm</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Tải lượng Virus HIV</p>
                        <p className="text-sm font-medium">{selectedPatient.viralLoad}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Số lượng tế bào CD4</p>
                        <p className="text-sm font-medium">{selectedPatient.cd4Count}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Thuốc hiện tại</h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tên thuốc</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Liều lượng</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tần suất</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedPatient.currentMedications.map((med, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm">{med.name}</td>
                            <td className="px-4 py-2 text-sm">{med.dosage}</td>
                            <td className="px-4 py-2 text-sm">{med.frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Ghi chú</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">{selectedPatient.notes}</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-end space-x-3 border-t border-gray-200">
                <Button variant="outline" onClick={handleClosePatientDetails}>
                  Đóng
                </Button>
                <Link to={`/doctor/patients/${selectedPatient.id}`}>
                  <Button variant="primary">
                    Xem hồ sơ đầy đủ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatientsPage; 