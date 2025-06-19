import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import UserFormModal from '../../components/admin/AddUserModal';
import { UserRole } from '../../types/index.js';
import {
  UserIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showUserFormModal, setShowUserFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      avatar: 'https://ui-avatars.com/api/?name=Nguyễn+Văn+Admin&background=random',
      fullName: 'Nguyễn Văn Admin',
      username: 'admin1',
      email: 'admin1@example.com',
      role: UserRole.ADMIN,
      status: 'active',
      createdAt: '2023-01-01T00:00:00.000Z',
      lastLogin: '2023-06-25T08:30:00.000Z'
    },
    {
      id: 2,
      fullName: 'Trần Thị Manager',
      username: 'manager1',
      email: 'manager1@example.com',
      role: UserRole.MANAGER,
      status: 'active',
      createdAt: '2023-01-15T00:00:00.000Z',
      lastLogin: '2023-06-24T14:20:00.000Z'
    },
    {
      id: 3,
      fullName: 'Lê Văn Doctor',
      username: 'doctor1',
      email: 'doctor1@example.com',
      role: UserRole.DOCTOR,
      status: 'active',
      createdAt: '2023-02-01T00:00:00.000Z',
      lastLogin: '2023-06-23T10:15:00.000Z'
    },
    {
      id: 4,
      fullName: 'Phạm Thị Staff',
      username: 'staff1',
      email: 'staff1@example.com',
      role: UserRole.STAFF,
      status: 'active',
      createdAt: '2023-02-15T00:00:00.000Z',
      lastLogin: '2023-06-25T09:45:00.000Z'
    },
    {
      id: 5,
      fullName: 'Hoàng Văn Patient',
      username: 'patient1',
      email: 'patient1@example.com',
      role: UserRole.CUSTOMER,
      status: 'active',
      createdAt: '2023-03-01T00:00:00.000Z',
      lastLogin: '2023-06-22T16:30:00.000Z'
    },
    {
      id: 6,
      fullName: 'Nguyễn Thị Admin',
      username: 'admin2',
      email: 'admin2@example.com',
      role: UserRole.ADMIN,
      status: 'inactive',
      createdAt: '2023-01-10T00:00:00.000Z',
      lastLogin: '2023-05-15T11:20:00.000Z'
    },
    {
      id: 7,
      fullName: 'Trần Văn Manager',
      username: 'manager2',
      email: 'manager2@example.com',
      role: UserRole.MANAGER,
      status: 'active',
      createdAt: '2023-01-20T00:00:00.000Z',
      lastLogin: '2023-06-24T13:10:00.000Z'
    },
    {
      id: 8,
      fullName: 'Lê Thị Doctor',
      username: 'doctor2',
      email: 'doctor2@example.com',
      role: UserRole.DOCTOR,
      status: 'active',
      createdAt: '2023-02-05T00:00:00.000Z',
      lastLogin: '2023-06-23T15:30:00.000Z'
    },
    {
      id: 9,
      fullName: 'Phạm Văn Staff',
      username: 'staff2',
      email: 'staff2@example.com',
      role: UserRole.STAFF,
      status: 'inactive',
      createdAt: '2023-02-20T00:00:00.000Z',
      lastLogin: '2023-05-10T08:45:00.000Z'
    },
    {
      id: 10,
      fullName: 'Hoàng Thị Patient',
      username: 'patient2',
      email: 'patient2@example.com',
      role: UserRole.CUSTOMER,
      status: 'active',
      createdAt: '2023-03-05T00:00:00.000Z',
      lastLogin: '2023-06-21T14:20:00.000Z'
    }
  ]);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserFormModal(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
    } else {
      setUsers([...users, userData]);
    }
    setShowUserFormModal(false);
    setEditingUser(null);
  };

  const handleAddNewUser = () => {
    setEditingUser(null);
    setShowUserFormModal(true);
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-purple-100 text-purple-800';
      case UserRole.MANAGER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.DOCTOR:
        return 'bg-green-100 text-green-800';
      case UserRole.STAFF:
        return 'bg-indigo-100 text-indigo-800';
      case UserRole.CUSTOMER:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;

      let matchesDate = true;
      if (dateFilter !== 'ALL') {
        const today = new Date();
        const userDate = new Date(user.createdAt);
        const diffDays = Math.floor((today - userDate) / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case 'today':
            matchesDate = diffDays === 0;
            break;
          case 'week':
            matchesDate = diffDays <= 7;
            break;
          case 'month':
            matchesDate = diffDays <= 30;
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesRole && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'name':
          valueA = a.fullName;
          valueB = b.fullName;
          break;
        case 'email':
          valueA = a.email;
          valueB = b.email;
          break;
        case 'role':
          valueA = a.role;
          valueB = b.role;
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'created':
          valueA = new Date(a.createdAt);
          valueB = new Date(b.createdAt);
          break;
        case 'lastLogin':
          valueA = new Date(a.lastLogin || 0);
          valueB = new Date(b.lastLogin || 0);
          break;
        default:
          valueA = a.fullName;
          valueB = b.fullName;
      }

      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout currentRole={UserRole.ADMIN} userName="Admin">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
            <p className="mt-2 text-gray-600">
              Quản lý và phân quyền người dùng trong hệ thống
            </p>
          </div>
          <div className="flex space-x-4">
            <Button 
              onClick={handleAddNewUser}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg shadow-sm"
            >
              <UserPlusIcon className="h-5 w-5" />
              <span>Thêm tài khoản</span>
            </Button>
            <Button
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg shadow-sm"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              <span>Xuất danh sách</span>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm theo tên, email..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>

              {/* Role Filter */}
              <div>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="ALL">Tất cả vai trò</option>
                  <option value={UserRole.ADMIN}>Admin</option>
                  <option value={UserRole.MANAGER}>Quản lý</option>
                  <option value={UserRole.DOCTOR}>Bác sĩ</option>
                  <option value={UserRole.STAFF}>Nhân viên</option>
                  <option value={UserRole.CUSTOMER}>Bệnh nhân</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="suspended">Tạm khóa</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="ALL">Tất cả thời gian</option>
                  <option value="today">Hôm nay</option>
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* User Table */}
        <Card className="mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        if (sortBy === 'name') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('name');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      <span>Tên</span>
                      {sortBy === 'name' && (
                        sortDirection === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        if (sortBy === 'email') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('email');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      <span>Email</span>
                      {sortBy === 'email' && (
                        sortDirection === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        if (sortBy === 'role') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('role');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      <span>Vai trò</span>
                      {sortBy === 'role' && (
                        sortDirection === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        if (sortBy === 'status') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('status');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      <span>Trạng thái</span>
                      {sortBy === 'status' && (
                        sortDirection === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        if (sortBy === 'created') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('created');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      <span>Ngày tạo</span>
                      {sortBy === 'created' && (
                        sortDirection === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1"
                      onClick={() => {
                        if (sortBy === 'lastLogin') {
                          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy('lastLogin');
                          setSortDirection('asc');
                        }
                      }}
                    >
                      <span>Đăng nhập cuối</span>
                      {sortBy === 'lastLogin' && (
                        sortDirection === 'asc' ? 
                        <ChevronUpIcon className="h-4 w-4" /> : 
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt={user.fullName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(user.status)}`}>
                        {user.status === 'active' ? 'Hoạt động' :
                         user.status === 'inactive' ? 'Không hoạt động' :
                         'Tạm khóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Chưa đăng nhập'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Chỉnh sửa"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Trước
              </Button>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sau
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">{indexOfFirstItem + 1}</span> đến{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredAndSortedUsers.length)}
                  </span>{' '}
                  trong số <span className="font-medium">{filteredAndSortedUsers.length}</span> kết quả
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Trang trước</span>
                    <ChevronUpIcon className="h-5 w-5 rotate-90" />
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === index + 1
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Trang sau</span>
                    <ChevronDownIcon className="h-5 w-5 -rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </Card>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Xác nhận xóa tài khoản
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Bạn có chắc chắn muốn xóa tài khoản của {userToDelete?.fullName}? 
                          Hành động này không thể hoàn tác.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={confirmDeleteUser}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Xác nhận xóa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setUserToDelete(null);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Form Modal */}
        <UserFormModal
          isOpen={showUserFormModal}
          onClose={() => {
            setShowUserFormModal(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
          editingUser={editingUser}
        />
      </div>
    </Layout>
  );
};

export default UsersPage; 