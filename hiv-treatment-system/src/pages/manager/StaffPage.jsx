import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StaffDetailModal from '../../components/manager/StaffDetailModal';
import AddStaffModal from '../../components/manager/AddStaffModal';

// Define staff member interface
// Staff has id, name, role, department, email, phone, status, joinDate

// Define department interface
// Department has id, name

const StaffPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showStaffDetailModal, setShowStaffDetailModal] = useState(false);
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: 'BS. Sarah Johnson',
      role: 'Bác sĩ',
      department: 'Khoa Bệnh truyền nhiễm',
      email: 'sarah.johnson@example.com',
      phone: '(123) 456-7890',
      status: 'active',
      joinDate: new Date('2020-03-15'),
    },
    {
      id: 2,
      name: 'BS. Robert Chen',
      role: 'Bác sĩ',
      department: 'Khoa Đa khoa',
      email: 'robert.chen@example.com',
      phone: '(123) 456-7891',
      status: 'active',
      joinDate: new Date('2018-05-20'),
    },
    {
      id: 3,
      name: 'BS. Michael Brown',
      role: 'Bác sĩ',
      department: 'Khoa Bệnh truyền nhiễm',
      email: 'michael.brown@example.com',
      phone: '(123) 456-7892',
      status: 'on-leave',
      joinDate: new Date('2019-11-10'),
    },
    {
      id: 4,
      name: 'YT. Emma Wilson',
      role: 'Y tá',
      department: 'Khoa Chăm sóc bệnh nhân',
      email: 'emma.wilson@example.com',
      phone: '(123) 456-7893',
      status: 'on-leave',
      joinDate: new Date('2017-08-05'),
    },
    {
      id: 5,
      name: 'John Smith',
      role: 'Cố vấn',
      department: 'Phòng Tư vấn',
      email: 'john.smith@example.com',
      phone: '(123) 456-7894',
      status: 'active',
      joinDate: new Date('2021-01-15'),
    },
    {
      id: 6,
      name: 'Lisa Rodriguez',
      role: 'Kỹ thuật viên phòng xét nghiệm',
      department: 'Phòng xét nghiệm',
      email: 'lisa.rodriguez@example.com',
      phone: '(123) 456-7895',
      status: 'active',
      joinDate: new Date('2020-07-22'),
    },
    {
      id: 7,
      name: 'David Kim',
      role: 'Dược sĩ',
      department: 'Khoa Dược',
      email: 'david.kim@example.com',
      phone: '(123) 456-7896',
      status: 'inactive',
      joinDate: new Date('2019-04-12'),
    },
    {
      id: 8,
      name: 'Sandra Carter',
      role: 'Quản trị viên',
      department: 'Phòng Hành chính',
      email: 'sandra.carter@example.com',
      phone: '(123) 456-7897',
      status: 'active',
      joinDate: new Date('2022-02-10'),
    },
  ]);

  // Mock departments data
  const departments = [
    { id: 1, name: 'Khoa Đa khoa' },
    { id: 2, name: 'Khoa Bệnh truyền nhiễm' },
    { id: 3, name: 'Khoa Chăm sóc bệnh nhân' },
    { id: 4, name: 'Khoa Dược' },
    { id: 5, name: 'Phòng xét nghiệm' },
    { id: 6, name: 'Phòng Tư vấn' },
    { id: 7, name: 'Phòng Hành chính' },
  ];

  // Handle save staff
  const handleSaveStaff = (updatedStaff) => {
    setStaffData(prev => prev.map(staff => 
      staff.id === updatedStaff.id ? updatedStaff : staff
    ));
    console.log('Staff updated:', updatedStaff);
  };

  // Filter staff based on search term and filters
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || staff.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesRole;
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

  // Handle view staff details
  const handleViewStaff = (staff) => {
    setSelectedStaff(staff);
    setShowStaffDetailModal(true);
  };

  // Handle close staff details
  const handleCloseStaffDetails = () => {
    setSelectedStaff(null);
    setShowStaffDetailModal(false);
  };

  // Handle save new staff
  const handleSaveNewStaff = (newStaff) => {
    setStaffData(prev => [...prev, newStaff]);
    console.log('New staff added:', newStaff);
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Admin">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Nhân viên</h1>
          <Button
            variant="primary"
            onClick={() => setShowAddStaffModal(true)}
          >
            Thêm nhân viên mới
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
              <option value="active">Đang làm việc</option>
              <option value="on-leave">Nghỉ phép</option>
              <option value="inactive">Không hoạt động</option>
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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Vai trò
            </label>
            <select
              id="role"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Bác sĩ">Bác sĩ</option>
              <option value="Y tá">Y tá</option>
              <option value="Cố vấn">Cố vấn</option>
              <option value="Kỹ thuật viên phòng xét nghiệm">Kỹ thuật viên phòng xét nghiệm</option>
              <option value="Dược sĩ">Dược sĩ</option>
              <option value="Quản trị viên">Quản trị viên</option>
            </select>
          </div>
        </div>

        {/* Staff list */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhân viên
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phòng ban
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tham gia
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium">{staff.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-500">{staff.email}</div>
                          <div className="text-sm text-gray-500">{staff.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{staff.department}</div>
                      <div className="text-sm text-gray-500">{staff.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(staff.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(staff.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewStaff(staff)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        Xem chi tiết
                      </button>
                      <button 
                        onClick={() => handleViewStaff(staff)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStaff.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Không tìm thấy nhân viên nào phù hợp với bộ lọc.</p>
            </div>
          )}
        </Card>

        {/* Staff Detail Modal */}
        <StaffDetailModal
          isOpen={showStaffDetailModal}
          onClose={handleCloseStaffDetails}
          staff={selectedStaff}
          onSave={handleSaveStaff}
        />

        {/* Add Staff Modal */}
        <AddStaffModal
          isOpen={showAddStaffModal}
          onClose={() => setShowAddStaffModal(false)}
          onSave={handleSaveNewStaff}
        />
      </div>
    </Layout>
  );
};

export default StaffPage; 