import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import AppointmentDetailModal from '../../components/doctor/AppointmentDetailModal';
import { Link } from 'react-router-dom';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BeakerIcon,
  DocumentTextIcon,
  PhoneIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [treatmentPlans, setTreatmentPlans] = useState([
    {
      id: 'TP001',
      patientId: 'P001',
      status: 'active',
      medications: [
        { name: 'Biktarvy', dosage: '50/200/25mg', frequency: 'Ngày 1 lần' }
      ],
      createdDate: '2024-01-01',
      lastModified: '2024-01-15'
    },
    {
      id: 'TP002',
      patientId: 'P002',
      status: 'active',
      medications: [
        { name: 'Descovy', dosage: '200/25mg', frequency: 'Ngày 1 lần' }
      ],
      createdDate: '2024-01-01',
      lastModified: '2024-01-10'
    },
    {
      id: 'TP003',
      patientId: 'P003',
      status: 'active',
      medications: [
        { name: 'Truvada', dosage: '300/200mg', frequency: 'Ngày 1 lần' }
      ],
      createdDate: '2024-01-15',
      lastModified: '2024-01-22'
    }
  ]);
  const [testResults, setTestResults] = useState([
    {
      id: 'TR001',
      patientId: 'P002',
      testType: 'Tải lượng virus HIV',
      result: '50000',
      unit: 'copies/mL',
      status: 'high',
      testDate: '2024-01-10',
      normalRange: '< 50',
      orderedBy: 'DOC001'
    },
    {
      id: 'TR002',
      patientId: 'P004',
      testType: 'Số lượng CD4',
      result: '180',
      unit: 'cells/μL',
      status: 'low',
      testDate: '2024-01-08',
      normalRange: '500-1600',
      orderedBy: 'DOC001'
    },
    {
      id: 'TR003',
      patientId: 'P003',
      testType: 'Chức năng gan',
      result: '85',
      unit: 'U/L',
      status: 'abnormal',
      testDate: '2024-01-05',
      normalRange: '< 40',
      orderedBy: 'DOC001'
    },
    {
      id: 'TR004',
      patientId: 'P001',
      testType: 'Tải lượng virus HIV',
      result: '25',
      unit: 'copies/mL',
      status: 'normal',
      testDate: '2024-01-20',
      normalRange: '< 50',
      orderedBy: 'DOC001'
    },
    {
      id: 'TR005',
      patientId: 'P001',
      testType: 'Số lượng CD4',
      result: '650',
      unit: 'cells/μL',
      status: 'normal',
      testDate: '2024-01-20',
      normalRange: '500-1600',
      orderedBy: 'DOC001'
    },
    {
      id: 'TR006',
      patientId: 'P002',
      testType: 'Số lượng CD4',
      result: '250',
      unit: 'cells/μL',
      status: 'low',
      testDate: '2024-01-10',
      normalRange: '500-1600',
      orderedBy: 'DOC001'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  useEffect(() => {
    const mockPatients = [
      {
        id: 'P001',
        name: 'Nguyễn Văn An',
        age: 35,
        phone: '0901234567',
        email: 'nguyenvanan@email.com',
        lastVisit: '2024-01-20',
        nextDue: '2024-04-20',
        riskLevel: 'medium',
        treatmentStatus: 'stable',
        adherence: 95
      },
      {
        id: 'P002',
        name: 'Trần Thị Bình',
        age: 42,
        phone: '0907654321',
        email: 'tranthib@email.com',
        lastVisit: '2024-01-18',
        nextDue: '2024-02-18',
        riskLevel: 'high',
        treatmentStatus: 'needs_adjustment',
        adherence: 88
      },
      {
        id: 'P003',
        name: 'Lê Văn Cường',
        age: 28,
        phone: '0912345678',
        email: 'levanc@email.com',
        lastVisit: '2024-01-22',
        nextDue: '2024-04-22',
        riskLevel: 'low',
        treatmentStatus: 'new_patient',
        adherence: 98
      },
      {
        id: 'P004',
        name: 'Phạm Thị Dung',
        age: 38,
        phone: '0923456789',
        email: 'phamthid@email.com',
        lastVisit: null,
        nextDue: '2024-02-01',
        riskLevel: 'high',
        treatmentStatus: 'new_patient',
        adherence: 0
      }
    ];

    const mockAppointments = [
    {
      id: 1,
        patientId: 'P001',
        patientName: 'Nguyễn Văn An',
        type: 'follow_up',
        date: '2024-02-15',
        time: '09:00',
        duration: 30,
      status: 'scheduled',
        reason: 'Tái khám định kỳ',
        notes: 'Kiểm tra kết quả xét nghiệm và điều chỉnh thuốc',
        priority: 'medium',
        isVirtual: false,
        reminderSent: true,
        createdBy: 'system', // Auto-generated
        lastTestDate: '2024-01-20',
        nextTestDue: '2024-04-20'
    },
    {
      id: 2,
        patientId: 'P002',
        patientName: 'Trần Thị Bình',
        type: 'urgent',
        date: '2024-02-10',
        time: '14:30',
        duration: 45,
      status: 'scheduled',
        reason: 'Tải lượng virus tăng',
        notes: 'Cần điều chỉnh phác đồ điều trị, tải lượng virus 150 copies/mL',
        priority: 'high',
        isVirtual: false,
        reminderSent: true,
        createdBy: 'doctor',
        lastTestDate: '2024-01-18',
        nextTestDue: '2024-02-18'
    },
    {
      id: 3,
        patientId: 'P003',
        patientName: 'Lê Văn Cường',
        type: 'follow_up',
        date: '2024-02-20',
        time: '10:15',
        duration: 30,
      status: 'scheduled',
        reason: 'Theo dõi bệnh nhân mới',
        notes: 'Đánh giá đáp ứng điều trị sau 1 tháng',
        priority: 'medium',
        isVirtual: true,
        reminderSent: false,
        createdBy: 'system',
        lastTestDate: '2024-01-22',
        nextTestDue: '2024-04-22'
    },
    {
      id: 4,
        patientId: 'P004',
        patientName: 'Phạm Thị Dung',
        type: 'initial',
        date: '2024-02-05',
        time: '08:30',
        duration: 60,
        status: 'scheduled',
        reason: 'Khám lần đầu',
        notes: 'Bệnh nhân mới, cần đánh giá toàn diện và lập kế hoạch điều trị',
        priority: 'high',
        isVirtual: false,
        reminderSent: true,
        createdBy: 'staff',
        lastTestDate: '2024-01-25',
        nextTestDue: '2024-02-25'
    },
    {
      id: 5,
        patientId: 'P001',
        patientName: 'Nguyễn Văn An',
        type: 'follow_up',
        date: '2024-01-20',
        time: '09:00',
        duration: 30,
      status: 'completed',
        reason: 'Tái khám định kỳ',
        notes: 'Bệnh nhân ổn định, tiếp tục phác đồ hiện tại',
        priority: 'medium',
        isVirtual: false,
        reminderSent: true,
        createdBy: 'system',
        lastTestDate: '2024-01-20',
        nextTestDue: '2024-04-20',
        completedAt: '2024-01-20T09:30:00',
        diagnosis: 'Ổn định',
        prescription: 'Tiếp tục Biktarvy',
        nextAppointment: '2024-04-20'
      }
    ];

    setTimeout(() => {
      setPatients(mockPatients);
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter appointments
  useEffect(() => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(apt =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      const aptDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(apt => {
            const date = new Date(apt.date);
            return date.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(apt => {
            const date = new Date(apt.date);
            return date >= today && date <= weekFromNow;
          });
          break;
        case 'month':
          const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
          filtered = filtered.filter(apt => {
            const date = new Date(apt.date);
            return date >= today && date <= monthFromNow;
          });
          break;
      }
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const handleCreateAppointment = (patientId, type = 'follow_up', suggestedDate = null) => {
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
    setShowCreateModal(true);
  };

  const handleSaveAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'scheduled',
      reminderSent: false,
      createdBy: 'doctor'
    };

    setAppointments([...appointments, newAppointment]);
    setShowCreateModal(false);
    setSelectedPatient(null);
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailModal(true);
  };

  const handleCompleteAppointment = (completedAppointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === completedAppointment.id ? completedAppointment : apt
    ));
    
    // Auto-schedule follow-up if required
    if (completedAppointment.followUpRequired && completedAppointment.nextAppointmentDate) {
      const followUpAppointment = {
        id: Date.now() + 1,
        patientId: completedAppointment.patientId,
        patientName: completedAppointment.patientName,
        type: 'follow_up',
        date: completedAppointment.nextAppointmentDate,
        time: '09:00',
        duration: 30,
        status: 'scheduled',
        reason: 'Tái khám theo lịch hẹn',
        notes: `Tái khám sau cuộc hẹn ngày ${completedAppointment.date}`,
        priority: 'medium',
        isVirtual: false,
        reminderSent: false,
        createdBy: 'system',
        lastTestDate: completedAppointment.date,
        nextTestDue: null
      };
      
      setAppointments(prev => [...prev, followUpAppointment]);
    }
  };

  const handleCancelAppointment = (appointment) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
      setAppointments(appointments.map(apt => 
        apt.id === appointment.id ? { ...apt, status: 'cancelled' } : apt
      ));
      setShowDetailModal(false);
    }
  };

  const handleRescheduleAppointment = (appointment) => {
    // For now, just close the modal and show edit form
    setShowDetailModal(false);
    setSelectedAppointment(appointment);
    setShowCreateModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no_show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Đã lên lịch';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      case 'no_show':
        return 'Không đến';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <Layout currentRole={UserRole.DOCTOR} pageTitle="Quản lý lịch hẹn">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Hôm nay</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {appointments.filter(apt => {
                      const today = new Date().toDateString();
                      const aptDate = new Date(apt.date).toDateString();
                      return aptDate === today && apt.status === 'scheduled';
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đã lên lịch</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {appointments.filter(apt => apt.status === 'scheduled').length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Hoàn thành</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Cần theo dõi</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {patients.filter(p => p.treatmentStatus === 'needs_adjustment' || p.adherence < 90).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bệnh nhân, lý do khám..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
        </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="scheduled">Đã lên lịch</option>
              <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
              <option value="no_show">Không đến</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả thời gian</option>
                  <option value="today">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
                </select>
          </div>

          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Đặt lịch hẹn mới
          </Button>
        </div>

        {/* Appointments List */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Danh sách lịch hẹn ({filteredAppointments.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy lịch hẹn nào</p>
                <Button variant="outline" onClick={() => setShowCreateModal(true)} className="mt-4">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Đặt lịch hẹn đầu tiên
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-primary-600" />
            </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                            <p className="text-sm text-gray-500">ID: {appointment.patientId}</p>
          </div>
                          
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          
                          <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(appointment.priority)}`}>
                            {appointment.priority === 'high' ? 'Cao' :
                             appointment.priority === 'medium' ? 'TB' : 'Thấp'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Thời gian</p>
                            <p className="font-medium">{formatDate(appointment.date)}</p>
                            <p className="text-sm text-gray-600">{formatTime(appointment.time)} ({appointment.duration} phút)</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Loại khám</p>
                            <p className="font-medium">
                              {appointment.type === 'initial' ? 'Khám lần đầu' :
                               appointment.type === 'follow_up' ? 'Tái khám' :
                               appointment.type === 'urgent' ? 'Khẩn cấp' : 'Khác'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.isVirtual ? 'Trực tuyến' : 'Trực tiếp'}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Lý do khám</p>
                            <p className="font-medium">{appointment.reason}</p>
                            <p className="text-sm text-gray-600">
                              Tạo bởi: {appointment.createdBy === 'system' ? 'Hệ thống' :
                                       appointment.createdBy === 'doctor' ? 'Bác sĩ' : 'Nhân viên'}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Xét nghiệm</p>
                            <p className="text-sm text-gray-600">
                              Lần cuối: {appointment.lastTestDate || 'Chưa có'}
                            </p>
                            <p className="text-sm text-gray-600">
                              Tiếp theo: {appointment.nextTestDue || 'Chưa định'}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-500 mb-1">Ghi chú:</p>
                          <p className="text-sm text-gray-700">{appointment.notes}</p>
                        </div>

                        {appointment.status === 'completed' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm font-medium text-green-800 mb-1">Kết quả khám:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-green-600">Chẩn đoán:</span>
                                <span className="ml-2">{appointment.diagnosis}</span>
                              </div>
                              <div>
                                <span className="text-green-600">Đơn thuốc:</span>
                                <span className="ml-2">{appointment.prescription}</span>
                              </div>
                              <div>
                                <span className="text-green-600">Hẹn tiếp:</span>
                                <span className="ml-2">{appointment.nextAppointment}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleViewAppointment(appointment)}>
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        
                        {appointment.status === 'scheduled' && (
                          <Button variant="outline" size="sm">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>



        {/* Create Appointment Modal */}
        {showCreateModal && (
          <AppointmentModal
            isOpen={showCreateModal}
            onClose={() => {
              setShowCreateModal(false);
              setSelectedPatient(null);
            }}
            onSave={handleSaveAppointment}
            patients={patients}
            selectedPatient={selectedPatient}
          />
        )}

        {/* Appointment Detail Modal */}
        {showDetailModal && (
          <AppointmentDetailModal
            appointment={selectedAppointment}
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedAppointment(null);
            }}
            onComplete={handleCompleteAppointment}
            onCancel={handleCancelAppointment}
            onReschedule={handleRescheduleAppointment}
          />
        )}
      </div>
    </Layout>
  );
};

// Appointment Modal Component
const AppointmentModal = ({ isOpen, onClose, onSave, patients, selectedPatient }) => {
  const [formData, setFormData] = useState({
    patientId: selectedPatient?.id || '',
    patientName: selectedPatient?.name || '',
    type: 'follow_up',
    date: '',
    time: '',
    duration: 30,
    reason: '',
    notes: '',
    priority: 'medium',
    isVirtual: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Đặt lịch hẹn mới</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bệnh nhân *
                    </label>
                    <select
                    value={formData.patientId}
                    onChange={(e) => {
                      const patient = patients.find(p => p.id === e.target.value);
                      setFormData({
                        ...formData,
                        patientId: e.target.value,
                        patientName: patient?.name || ''
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Chọn bệnh nhân</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} (ID: {patient.id})
                        </option>
                      ))}
                    </select>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại khám *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="follow_up">Tái khám</option>
                    <option value="initial">Khám lần đầu</option>
                    <option value="urgent">Khẩn cấp</option>
                    <option value="consultation">Tư vấn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày khám *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ khám *
                    </label>
                    <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian (phút)
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={15}>15 phút</option>
                    <option value={30}>30 phút</option>
                    <option value={45}>45 phút</option>
                    <option value={60}>60 phút</option>
                  </select>
                </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mức độ ưu tiên
                    </label>
                    <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lý do khám *
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="VD: Tái khám định kỳ, kiểm tra kết quả xét nghiệm..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

                  <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú
                    </label>
                    <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Ghi chú thêm về cuộc hẹn..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="3"
                />
                  </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVirtual"
                  checked={formData.isVirtual}
                  onChange={(e) => setFormData({...formData, isVirtual: e.target.checked})}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-900">
                  Khám trực tuyến
                </label>
                </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Hủy bỏ
                  </Button>
                <Button variant="primary" type="submit">
                    Đặt lịch hẹn
                  </Button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AppointmentsPage; 