import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO, isToday, isTomorrow, isThisWeek, isAfter, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import { UserRole } from '../../types/index.js';
import { 
  CalendarIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PlusIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  PhoneIcon,
  MapPinIcon,
  DocumentTextIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ViewColumnsIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 5 appointments per page
  
  // Current date for demo purposes
  const currentDate = new Date(2024, 5, 26); // June 26, 2024

  // Enhanced mock appointments data
  const appointmentsData = [
    {
      id: 'APT-1001',
      patientId: 'PT10045',
      patientName: 'Nguyễn Văn A',
      patientPhone: '0901234567',
      patientAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      dateTime: '2024-06-26T09:00:00',
      duration: 30,
      type: 'Khám định kỳ',
      reason: 'Tái khám theo lịch',
      status: 'confirmed',
      priority: 'normal',
      doctor: 'BS. Trần Minh',
      location: 'Phòng 101, Lầu 1',
      notes: 'Bệnh nhân cần mang theo tất cả kết quả xét nghiệm gần nhất.',
      createdBy: 'Trần Văn Nhân Viên',
      createdAt: '2024-06-15T14:30:00',
      reminderSent: true,
      lastTestResults: {
        viralLoad: '< 20 copies/mL',
        cd4Count: '650 cells/mm³'
      }
    },
    {
      id: 'APT-1002',
      patientId: 'PT10046',
      patientName: 'Trần Thị B',
      patientPhone: '0912345678',
      patientAvatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      dateTime: '2024-06-26T10:30:00',
      duration: 45,
      type: 'Nhận kết quả xét nghiệm',
      reason: 'Lấy kết quả xét nghiệm CD4 và tải lượng virus',
      status: 'checked-in',
      priority: 'normal',
      doctor: 'BS. Lê Hà',
      location: 'Phòng 102, Lầu 1',
      notes: 'Bệnh nhân đã đến.',
      checkedInAt: '2024-06-26T10:25:00',
      reminderSent: true
    },
    {
      id: 'APT-1003',
      patientId: 'PT10047',
      patientName: 'Lê Văn C',
      patientPhone: '0923456789',
      patientAvatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      dateTime: '2024-06-26T14:00:00',
      duration: 60,
      type: 'Tư vấn điều trị',
      reason: 'Thảo luận về tác dụng phụ của thuốc mới',
      status: 'pending',
      priority: 'high',
      doctor: 'BS. Nguyễn Thành',
      location: 'Phòng 205, Lầu 2',
      notes: 'Cần chuẩn bị hồ sơ tác dụng phụ.',
      reminderSent: false
    },
    {
      id: 'APT-1004',
      patientId: 'PT10048',
      patientName: 'Phạm Thị D',
      patientPhone: '0934567890',
      patientAvatar: 'https://randomuser.me/api/portraits/women/35.jpg',
      dateTime: '2024-06-27T09:30:00',
      duration: 30,
      type: 'Khám định kỳ',
      reason: 'Tái khám theo lịch',
      status: 'confirmed',
      priority: 'normal',
      doctor: 'BS. Trần Minh',
      location: 'Phòng 101, Lầu 1',
      reminderSent: true
    },
    {
      id: 'APT-1005',
      patientId: 'PT10049',
      patientName: 'Hoàng Văn E',
      patientPhone: '0945678901',
      patientAvatar: 'https://randomuser.me/api/portraits/men/40.jpg',
      dateTime: '2024-06-28T11:00:00',
      duration: 60,
      type: 'Xét nghiệm và khám',
      reason: 'Triệu chứng mới',
      status: 'confirmed',
      priority: 'high',
      doctor: 'BS. Lê Hà',
      location: 'Phòng 102, Lầu 1',
      reminderSent: true
    },
    {
      id: 'APT-1006',
      patientId: 'PT10050',
      patientName: 'Trịnh Văn F',
      patientPhone: '0956789012',
      patientAvatar: 'https://randomuser.me/api/portraits/men/50.jpg',
      dateTime: '2024-06-25T15:30:00',
      duration: 30,
      type: 'Khám định kỳ',
      reason: 'Tái khám theo lịch',
      status: 'completed',
      priority: 'normal',
      doctor: 'BS. Nguyễn Thành',
      location: 'Phòng 205, Lầu 2',
      notes: 'Bệnh nhân ổn định. Hẹn tái khám sau 1 tháng.',
      completedAt: '2024-06-25T16:00:00'
    },
    {
      id: 'APT-1007',
      patientId: 'PT10051',
      patientName: 'Đặng Thị G',
      patientPhone: '0967890123',
      patientAvatar: 'https://randomuser.me/api/portraits/women/25.jpg',
      dateTime: '2024-06-25T10:00:00',
      duration: 45,
      type: 'Tư vấn dinh dưỡng',
      reason: 'Thiếu cân',
      status: 'cancelled',
      priority: 'normal',
      cancellationReason: 'Bệnh nhân xin dời lịch vì lý do cá nhân',
      doctor: 'BS. Hoàng Linh',
      location: 'Phòng 103, Lầu 1',
      cancelledAt: '2024-06-24T16:30:00'
    },
    // Add more mock data for pagination demo
    {
      id: 'APT-1008',
      patientId: 'PT10052',
      patientName: 'Nguyễn Thị H',
      patientPhone: '0978901234',
      patientAvatar: 'https://randomuser.me/api/portraits/women/30.jpg',
      dateTime: '2024-06-29T08:30:00',
      duration: 30,
      type: 'Khám định kỳ',
      reason: 'Tái khám theo lịch',
      status: 'confirmed',
      priority: 'normal',
      doctor: 'BS. Trần Minh',
      location: 'Phòng 101, Lầu 1',
      reminderSent: true
    },
    {
      id: 'APT-1009',
      patientId: 'PT10053',
      patientName: 'Võ Văn I',
      patientPhone: '0989012345',
      patientAvatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      dateTime: '2024-06-29T10:00:00',
      duration: 45,
      type: 'Tư vấn điều trị',
      reason: 'Điều chỉnh liệu pháp',
      status: 'pending',
      priority: 'high',
      doctor: 'BS. Lê Hà',
      location: 'Phòng 102, Lầu 1',
      reminderSent: false
    },
    {
      id: 'APT-1010',
      patientId: 'PT10054',
      patientName: 'Đỗ Thị K',
      patientPhone: '0990123456',
      patientAvatar: 'https://randomuser.me/api/portraits/women/40.jpg',
      dateTime: '2024-06-30T14:30:00',
      duration: 30,
      type: 'Nhận kết quả xét nghiệm',
      reason: 'Lấy kết quả xét nghiệm định kỳ',
      status: 'confirmed',
      priority: 'normal',
      doctor: 'BS. Nguyễn Thành',
      location: 'Phòng 205, Lầu 2',
      reminderSent: true
    }
  ];

  // Date formatting helpers
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'HH:mm');
    } catch (error) {
      return 'Invalid time';
    }
  };

  const formatDateTime = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Filter and sort appointments
  const filteredAppointments = appointmentsData.filter(appointment => {
    const appointmentDate = parseISO(appointment.dateTime);
    
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientPhone.includes(searchTerm) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = isToday(appointmentDate);
    } else if (dateFilter === 'tomorrow') {
      matchesDate = isTomorrow(appointmentDate);
    } else if (dateFilter === 'this-week') {
      matchesDate = isThisWeek(appointmentDate);
    } else if (dateFilter === 'upcoming') {
      matchesDate = isAfter(appointmentDate, currentDate);
    }
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    return new Date(a.dateTime) - new Date(b.dateTime);
  });

  // Pagination logic
  const totalItems = sortedAppointments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = viewMode === 'list' ? sortedAppointments.slice(startIndex, endIndex) : sortedAppointments;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, statusFilter, viewMode]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case 'confirmed':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          label: 'Đã xác nhận',
          icon: CheckCircleIcon
        };
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          label: 'Chờ xác nhận',
          icon: ClockIcon
        };
      case 'checked-in':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          label: 'Đã check-in',
          icon: CheckCircleIcon
        };
      case 'completed':
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          label: 'Hoàn thành',
          icon: CheckCircleIcon
        };
      case 'cancelled':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          label: 'Đã hủy',
          icon: XCircleIcon
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          label: 'Không xác định',
          icon: ExclamationCircleIcon
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'normal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calendar view helpers
  const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getAppointmentsForDay = (day) => {
    return sortedAppointments.filter(appointment => 
      isSameDay(parseISO(appointment.dateTime), day)
    );
  };

  // Action handlers
  const handleStatusChange = (appointmentId, newStatus) => {
    // Update appointment status logic here
    console.log(`Changing appointment ${appointmentId} to ${newStatus}`);
  };

  const handleSendReminder = (appointmentId) => {
    // Send reminder logic here
    console.log(`Sending reminder for appointment ${appointmentId}`);
  };

  // Appointment Detail Modal
  const AppointmentDetailModal = ({ appointment, isOpen, onClose }) => {
    if (!isOpen || !appointment) return null;

    const statusInfo = getStatusInfo(appointment.status);

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={appointment.patientAvatar}
                    alt={appointment.patientName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{appointment.patientName}</h2>
                    <p className="text-gray-600">Mã lịch hẹn: {appointment.id}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      {appointment.priority === 'high' && (
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(appointment.priority)}`}>
                          Ưu tiên cao
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Thông tin lịch hẹn</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Ngày giờ:</span>
                          <span className="ml-auto font-medium">{formatDateTime(appointment.dateTime)}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Thời gian:</span>
                          <span className="ml-auto font-medium">{appointment.duration} phút</span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Bác sĩ:</span>
                          <span className="ml-auto font-medium">{appointment.doctor}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Địa điểm:</span>
                          <span className="ml-auto font-medium text-xs">{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Thông tin bệnh nhân</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Mã BN:</span>
                          <span className="ml-auto font-medium">{appointment.patientId}</span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Điện thoại:</span>
                          <span className="ml-auto font-medium">{appointment.patientPhone}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Chi tiết khám</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Loại khám:</span>
                          <p className="font-medium text-gray-900">{appointment.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Lý do khám:</span>
                          <p className="font-medium text-gray-900">{appointment.reason}</p>
                        </div>
                        {appointment.notes && (
                          <div>
                            <span className="text-gray-600">Ghi chú:</span>
                            <p className="font-medium text-gray-900">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  {appointment.lastTestResults && (
                    <Card>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Kết quả XN gần nhất</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Viral Load:</span>
                            <span className="font-medium">{appointment.lastTestResults.viralLoad}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CD4 Count:</span>
                            <span className="font-medium">{appointment.lastTestResults.cd4Count}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Thông tin khác</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tạo bởi:</span>
                          <span className="font-medium">{appointment.createdBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ngày tạo:</span>
                          <span className="font-medium">{formatDateTime(appointment.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nhắc nhở:</span>
                          <span className={`font-medium ${appointment.reminderSent ? 'text-green-600' : 'text-red-600'}`}>
                            {appointment.reminderSent ? 'Đã gửi' : 'Chưa gửi'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-2">
                {appointment.status === 'pending' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                  >
                    Xác nhận
                  </Button>
                )}
                {appointment.status === 'confirmed' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStatusChange(appointment.id, 'checked-in')}
                  >
                    Check-in
                  </Button>
                )}
                {appointment.status === 'checked-in' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleStatusChange(appointment.id, 'completed')}
                  >
                    Hoàn thành
                  </Button>
                )}
                {!appointment.reminderSent && ['confirmed', 'pending'].includes(appointment.status) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendReminder(appointment.id)}
                  >
                    Gửi nhắc nhở
                  </Button>
                )}
                {/* <Link to={`/staff/appointments/${appointment.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Chỉnh sửa
                  </Button>
                </Link> */}
                {/* <Link to={`/staff/patients/${appointment.patientId}`}>
                  <Button variant="outline" size="sm">
                    <UserIcon className="h-4 w-4 mr-1" />
                    Xem BN
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout currentRole={UserRole.STAFF} userName="Trần Văn Nhân Viên" pageTitle="Quản lý lịch hẹn">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quản lý lịch hẹn</h1>
              <p className="text-primary-100">Theo dõi và quản lý lịch hẹn khám bệnh</p>
            </div>
            <Link to="/staff/appointments/new">
              <Button variant="white" className="flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Tạo lịch hẹn mới
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên BN, mã lịch hẹn, SĐT, bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả ngày</option>
                  <option value="today">Hôm nay</option>
                  <option value="tomorrow">Ngày mai</option>
                  <option value="this-week">Tuần này</option>
                  <option value="upcoming">Sắp tới</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="checked-in">Đã check-in</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>

                <Button
                  variant="outline"
                  onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                >
                  {viewMode === 'list' ? (
                    <>
                      <ViewColumnsIcon className="h-4 w-4 mr-2" />
                      Xem lịch
                    </>
                  ) : (
                    <>
                      <ListBulletIcon className="h-4 w-4 mr-2" />
                      Xem danh sách
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{sortedAppointments.length}</div>
                <div className="text-sm text-blue-600">Tổng số lịch hẹn</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {sortedAppointments.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-sm text-yellow-600">Chờ xác nhận</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {sortedAppointments.filter(a => a.status === 'confirmed').length}
                </div>
                <div className="text-sm text-green-600">Đã xác nhận</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {sortedAppointments.filter(a => a.status === 'checked-in').length}
                </div>
                <div className="text-sm text-purple-600">Đã check-in</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {sortedAppointments.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Hoàn thành</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Appointments List/Calendar */}
        {viewMode === 'list' ? (
          <>
            <div className="space-y-4">
              {currentAppointments.map((appointment) => {
                const statusInfo = getStatusInfo(appointment.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            src={appointment.patientAvatar}
                            alt={appointment.patientName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                              <span className="text-sm text-gray-500">({appointment.patientId})</span>
                              {appointment.priority === 'high' && (
                                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                  Ưu tiên cao
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center text-gray-600">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>{formatDateTime(appointment.dateTime)}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <ClockIcon className="h-4 w-4 mr-2" />
                                <span>{appointment.duration} phút</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <UserIcon className="h-4 w-4 mr-2" />
                                <span>{appointment.doctor}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPinIcon className="h-4 w-4 mr-2" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">{appointment.type}:</span> {appointment.reason}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 text-xs rounded-full border ${statusInfo.color} flex items-center`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedAppointment(appointment)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                       
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination for list view */}
            {viewMode === 'list' && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          // Calendar View
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Lịch tuần</h2>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {format(startOfWeek(currentWeek, { weekStartsOn: 1 }), 'dd/MM', { locale: vi })} - {format(endOfWeek(currentWeek, { weekStartsOn: 1 }), 'dd/MM/yyyy', { locale: vi })}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4">
                {getWeekDays(currentWeek).map((day, index) => {
                  const dayAppointments = getAppointmentsForDay(day);
                  const isToday = isSameDay(day, currentDate);

                  return (
                    <div key={index} className={`border rounded-lg p-3 min-h-[200px] ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                      <div className="text-center mb-3">
                        <div className="text-xs text-gray-500 uppercase">
                          {format(day, 'EEE', { locale: vi })}
                        </div>
                        <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                          {format(day, 'd')}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {dayAppointments.map((appointment) => {
                          const statusInfo = getStatusInfo(appointment.status);
                          return (
                            <div
                              key={appointment.id}
                              className={`p-2 rounded text-xs cursor-pointer hover:shadow-sm transition-shadow ${statusInfo.color}`}
                              onClick={() => setSelectedAppointment(appointment)}
                            >
                              <div className="font-medium">{formatTime(appointment.dateTime)}</div>
                              <div className="truncate">{appointment.patientName}</div>
                              <div className="truncate text-xs opacity-75">{appointment.type}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {currentAppointments.length === 0 && (
          <Card>
            <div className="p-8 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Không tìm thấy lịch hẹn nào phù hợp</p>
            </div>
          </Card>
        )}

        {/* Appointment Detail Modal */}
        <AppointmentDetailModal
          appointment={selectedAppointment}
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      </div>
    </Layout>
  );
};

export default AppointmentsPage; 