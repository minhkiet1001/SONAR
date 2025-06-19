import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DoctorDetailModal from '../../components/manager/DoctorDetailModal';
import AddDoctorModal from '../../components/manager/AddDoctorModal';

// Define doctor interface
// Doctor has id, name, specialty, department, email, phone, status, patients, joinDate

// Define specialty interface
// Specialty has id, name

const DoctorsPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorDetailModal, setShowDoctorDetailModal] = useState(false);
  const [doctorsState, setDoctorsState] = useState([
    {
      id: 1,
      name: 'BS. Sarah Johnson',
      specialty: 'Bệnh truyền nhiễm',
      department: 'Bệnh truyền nhiễm',
      email: 'sarah.johnson@example.com',
      phone: '(123) 456-7890',
      status: 'active',
      patients: 42,
      joinDate: new Date('2020-03-15'),
      experience: '8',
      languages: ['Tiếng Việt', 'English'],
      bio: 'Bác sĩ chuyên khoa bệnh truyền nhiễm với 8 năm kinh nghiệm trong điều trị HIV/AIDS.'
    },
    {
      id: 2,
      name: 'BS. Robert Chen',
      specialty: 'Nội khoa',
      department: 'Đa khoa',
      email: 'robert.chen@example.com',
      phone: '(123) 456-7891',
      status: 'active',
      patients: 38,
      joinDate: new Date('2018-05-20'),
      experience: '12',
      languages: ['Tiếng Việt', 'English', '中文'],
      bio: 'Bác sĩ đa khoa với kinh nghiệm phong phú trong chăm sóc sức khỏe tổng quát.'
    },
    {
      id: 3,
      name: 'BS. Emma Wilson',
      specialty: 'Miễn dịch học',
      department: 'Bệnh truyền nhiễm',
      email: 'emma.wilson@example.com',
      phone: '(123) 456-7893',
      status: 'on-leave',
      patients: 27,
      joinDate: new Date('2017-08-05'),
      experience: '10',
      languages: ['Tiếng Việt', 'English'],
      bio: 'Chuyên gia miễn dịch học với focus vào HIV và các bệnh miễn dịch.'
    },
    {
      id: 4,
      name: 'BS. James Rodriguez',
      specialty: 'Y học gia đình',
      department: 'Đa khoa',
      email: 'james.rodriguez@example.com',
      phone: '(123) 456-7894',
      status: 'active',
      patients: 45,
      joinDate: new Date('2019-11-12'),
      experience: '6',
      languages: ['Tiếng Việt', 'English', 'Español'],
      bio: 'Bác sĩ y học gia đình chuyên về chăm sóc sức khỏe toàn diện.'
    }
  ]);

  // Mock specialties data
  const specialties = [
    { id: 1, name: 'Bệnh truyền nhiễm' },
    { id: 2, name: 'Nội khoa' },
    { id: 3, name: 'Y học gia đình' },
    { id: 4, name: 'Miễn dịch học' },
    { id: 5, name: 'Tâm thần học' },
    { id: 6, name: 'Nhi khoa' },
  ];

  // Mock departments data
  const departments = [
    { id: 1, name: 'Đa khoa' },
    { id: 2, name: 'Bệnh truyền nhiễm' },
    { id: 3, name: 'Chăm sóc bệnh nhân' },
    { id: 4, name: 'Tư vấn' },
    { id: 5, name: 'Nghiên cứu' },
  ];

  // Mock doctors data
  const doctorsData = [
    {
      id: 1,
      name: 'BS. Sarah Johnson',
      specialty: 'Bệnh truyền nhiễm',
      department: 'Bệnh truyền nhiễm',
      email: 'sarah.johnson@example.com',
      phone: '(123) 456-7890',
      status: 'available',
      patients: 42,
      joinDate: new Date('2020-03-15'),
    },
    {
      id: 2,
      name: 'BS. Robert Chen',
      specialty: 'Nội khoa',
      department: 'Đa khoa',
      email: 'robert.chen@example.com',
      phone: '(123) 456-7891',
      status: 'available',
      patients: 38,
      joinDate: new Date('2018-05-20'),
    },
    {
      id: 3,
      name: 'BS. Emma Wilson',
      specialty: 'Miễn dịch học',
      department: 'Bệnh truyền nhiễm',
      email: 'emma.wilson@example.com',
      phone: '(123) 456-7893',
      status: 'on-leave',
      patients: 27,
      joinDate: new Date('2017-08-05'),
    },
    {
      id: 4,
      name: 'BS. James Rodriguez',
      specialty: 'Y học gia đình',
      department: 'Đa khoa',
      email: 'james.rodriguez@example.com',
      phone: '(123) 456-7894',
      status: 'available',
      patients: 45,
      joinDate: new Date('2019-11-12'),
    },
    {
      id: 5,
      name: 'BS. Maria Sanchez',
      specialty: 'Tâm thần học',
      department: 'Tư vấn',
      email: 'maria.sanchez@example.com',
      phone: '(123) 456-7895',
      status: 'available',
      patients: 31,
      joinDate: new Date('2016-04-20'),
    },
    {
      id: 6,
      name: 'BS. Daniel Kim',
      specialty: 'Bệnh truyền nhiễm',
      department: 'Nghiên cứu',
      email: 'daniel.kim@example.com',
      phone: '(123) 456-7896',
      status: 'unavailable',
      patients: 15,
      joinDate: new Date('2021-02-15'),
    },
    {
      id: 7,
      name: 'BS. Jennifer Lewis',
      specialty: 'Nhi khoa',
      department: 'Chăm sóc bệnh nhân',
      email: 'jennifer.lewis@example.com',
      phone: '(123) 456-7897',
      status: 'available',
      patients: 36,
      joinDate: new Date('2019-07-08'),
    },
  ];

  // Handle save doctor
  const handleSaveDoctor = (updatedDoctor) => {
    setDoctorsState(prev => prev.map(doctor => 
      doctor.id === updatedDoctor.id ? updatedDoctor : doctor
    ));
    console.log('Doctor updated:', updatedDoctor);
  };

  // Handle save new doctor
  const handleSaveNewDoctor = (newDoctor) => {
    setDoctorsState(prev => [...prev, newDoctor]);
    console.log('New doctor added:', newDoctor);
  };

  // Filter doctors based on search term and filters
  const filteredDoctors = doctorsState.filter((doctor) => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
    const matchesDepartment = departmentFilter === 'all' || doctor.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialty && matchesDepartment;
  });

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status badge based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Đang làm việc</span>;
      case 'on-leave':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Nghỉ phép</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Không hoạt động</span>;
      default:
        return null;
    }
  };

  // Handle view doctor details
  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorDetailModal(true);
  };

  // Handle close doctor details
  const handleCloseDoctorDetails = () => {
    setSelectedDoctor(null);
    setShowDoctorDetailModal(false);
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Admin">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Bác sĩ</h1>
          <Button
            variant="primary"
            onClick={() => setShowAddDoctorModal(true)}
          >
            Thêm Bác sĩ Mới
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm
            </label>
            <input
              type="text"
              id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Tìm theo tên, email hoặc điện thoại"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              id="status"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="available">Đang làm việc</option>
              <option value="on-leave">Nghỉ phép</option>
              <option value="unavailable">Không có mặt</option>
            </select>
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Chuyên khoa
            </label>
            <select
              id="specialty"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="all">Tất cả chuyên khoa</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Phòng ban
            </label>
            <select
              id="department"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">Tất cả phòng ban</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors List */}
        <Card className="overflow-hidden mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Danh sách Bác sĩ ({filteredDoctors.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chuyên khoa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phòng ban
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bệnh nhân
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-blue-500 text-white rounded-full flex items-center justify-center">
                          {doctor.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(doctor.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doctor.patients}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewDoctor(doctor)} 
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Xem
                      </button>
                      <button 
                        onClick={() => handleViewDoctor(doctor)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      Không tìm thấy bác sĩ nào phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Doctor Detail Modal */}
        <DoctorDetailModal
          isOpen={showDoctorDetailModal}
          onClose={handleCloseDoctorDetails}
          doctor={selectedDoctor}
          onSave={handleSaveDoctor}
        />

        {/* Add Doctor Modal */}
        <AddDoctorModal
          isOpen={showAddDoctorModal}
          onClose={() => setShowAddDoctorModal(false)}
          onSave={handleSaveNewDoctor}
        />
      </div>
    </Layout>
  );
};

export default DoctorsPage; 