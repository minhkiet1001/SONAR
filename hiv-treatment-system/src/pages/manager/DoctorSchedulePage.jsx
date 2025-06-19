import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import AddScheduleModal from '../../components/manager/AddScheduleModal';
import DoctorDetailModal from '../../components/manager/DoctorDetailModal';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const DoctorSchedulePage = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showDoctorDetailModal, setShowDoctorDetailModal] = useState(false);
  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState(null);
  const [doctorsData, setDoctorsData] = useState([
    {
      id: '1',
      name: 'BS. Sarah Johnson',
      specialty: 'Bệnh truyền nhiễm',
      department: 'Khoa Bệnh truyền nhiễm',
      email: 'sarah.johnson@hospital.com',
      phone: '(123) 456-7890',
      status: 'active',
      workingHours: '08:00-17:00',
      maxPatientsPerDay: 20,
      experience: '8',
      languages: ['Tiếng Việt', 'English'],
      bio: 'Bác sĩ chuyên khoa bệnh truyền nhiễm với 8 năm kinh nghiệm trong điều trị HIV/AIDS.'
    },
    {
      id: '2',
      name: 'BS. Robert Chen',
      specialty: 'Đa khoa',
      department: 'Khoa Đa khoa',
      email: 'robert.chen@hospital.com',
      phone: '(123) 456-7891',
      status: 'active',
      workingHours: '08:00-17:00',
      maxPatientsPerDay: 25,
      experience: '12',
      languages: ['Tiếng Việt', 'English', '中文'],
      bio: 'Bác sĩ đa khoa với kinh nghiệm phong phú trong chăm sóc sức khỏe tổng quát.'
    },
    {
      id: '3',
      name: 'BS. Michael Brown',
      specialty: 'Bệnh truyền nhiễm',
      department: 'Khoa Bệnh truyền nhiễm',
      email: 'michael.brown@hospital.com',
      phone: '(123) 456-7892',
      status: 'active',
      workingHours: '13:00-21:00',
      maxPatientsPerDay: 18,
      experience: '6',
      languages: ['Tiếng Việt', 'English'],
      bio: 'Chuyên gia trẻ trong lĩnh vực bệnh truyền nhiễm và y học nhiệt đới.'
    }
  ]);
  const [schedules, setSchedules] = useState([
    {
      id: '1',
      doctorId: '1',
      date: '2024-03-25',
      startTime: '08:00',
      endTime: '17:00',
      type: 'regular',
      status: 'confirmed',
      bookedSlots: 15,
      maxSlots: 20,
      notes: 'Lịch khám thường xuyên'
    },
    {
      id: '2',
      doctorId: '2',
      date: '2024-03-25',
      startTime: '08:00',
      endTime: '17:00',
      type: 'regular',
      status: 'confirmed',
      bookedSlots: 22,
      maxSlots: 25,
      notes: 'Lịch khám thường xuyên'
    }
  ]);

  // Handle view doctor details
  const handleViewDoctorDetails = (doctor) => {
    setSelectedDoctorDetail(doctor);
    setShowDoctorDetailModal(true);
  };

  // Handle save doctor
  const handleSaveDoctor = (updatedDoctor) => {
    setDoctorsData(prev => prev.map(doctor => 
      doctor.id === updatedDoctor.id ? updatedDoctor : doctor
    ));
    console.log('Doctor updated:', updatedDoctor);
  };

  // Handle save schedule
  const handleSaveSchedule = (scheduleData) => {
    if (Array.isArray(scheduleData)) {
      // Multiple schedules from recurring
      setSchedules(prev => [...prev, ...scheduleData]);
      console.log('Multiple schedules saved:', scheduleData);
      alert(`Đã tạo ${scheduleData.length} lịch làm việc lặp lại thành công!`);
    } else {
      // Single schedule
      setSchedules(prev => [...prev, scheduleData]);
      console.log('Schedule saved:', scheduleData);
      alert('Lịch làm việc đã được tạo thành công!');
    }
  };

  // Quick stats
  const quickStats = [
    {
      title: 'Tổng bác sĩ',
      value: doctorsData.length.toString(),
      change: '+2',
      changeType: 'increase',
      icon: UserIcon,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Lịch tuần này',
      value: schedules.length.toString(),
      change: '+3',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Tỷ lệ đặt lịch',
      value: '78%',
      change: '+5%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Bệnh nhân/ngày',
      value: '85',
      change: '+12',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Alex Manager">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch làm việc bác sĩ</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý và lên lịch làm việc thông minh cho đội ngũ bác sĩ
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => setShowAddScheduleModal(true)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm lịch bác sĩ
            </Button>
            <Button variant="primary">
              Xuất lịch tuần
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div> */}

        {/* Doctor Schedule Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Danh sách bác sĩ</h3>
              <div className="space-y-4">
                {doctorsData.map((doctor) => (
                  <div key={doctor.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleViewDoctorDetails(doctor)}>
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <UserIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{doctor.name}</h4>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                      <p className="text-xs text-gray-400">{doctor.workingHours}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Hoạt động
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Schedule Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Lịch tuần</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">←</Button>
                  <span className="text-sm font-medium text-gray-900 px-4">
                    Tuần này
                  </span>
                  <Button variant="outline" size="sm">→</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Bác sĩ</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">T2</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">T3</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">T4</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">T5</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">T6</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">T7</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">CN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {doctorsData.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <UserIcon className="h-4 w-4 text-primary-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                              <div className="text-xs text-gray-500">{doctor.specialty}</div>
                            </div>
                          </div>
                        </td>
                        {[...Array(7)].map((_, dayIndex) => {
                          // Get current week dates
                          const today = new Date();
                          const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
                          const currentDate = new Date(startOfWeek);
                          currentDate.setDate(startOfWeek.getDate() + dayIndex);
                          const dateString = currentDate.toISOString().split('T')[0];
                          
                          // Filter schedules for this specific doctor and date
                          const daySchedules = schedules.filter(s => 
                            s.doctorId === doctor.id && s.date === dateString
                          );
                          
                          return (
                            <td key={dayIndex} className="py-4 px-2 text-center">
                              <div className="space-y-1">
                                {daySchedules.map((schedule) => (
                                  <div key={schedule.id} className={`text-xs px-2 py-1 rounded ${
                                    schedule.isRecurring 
                                      ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    <div className="font-medium">{schedule.startTime}-{schedule.endTime}</div>
                                    {schedule.isRecurring && (
                                      <div className="text-xs opacity-75">🔄 Lặp lại</div>
                                    )}
                                    <div className="text-xs opacity-75">{schedule.type}</div>
                                  </div>
                                ))}
                                <button 
                                  className="w-full h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-primary-400 hover:bg-primary-50"
                                  onClick={() => setShowAddScheduleModal(true)}
                                >
                                  <PlusIcon className="h-4 w-4 text-gray-400" />
                                </button>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        {/* Schedule Summary */}
        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tóm tắt lịch làm việc</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{schedules.length}</div>
                <div className="text-sm text-gray-500">Tổng ca làm việc</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {schedules.filter(s => s.status === 'confirmed').length}
                </div>
                <div className="text-sm text-gray-500">Ca đã xác nhận</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {schedules.filter(s => s.isRecurring).length}
                </div>
                <div className="text-sm text-gray-500">Ca lặp lại</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {schedules.reduce((total, s) => total + (s.maxSlots || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Tổng slot bệnh nhân</div>
              </div>
            </div>
            
            {/* Recent Schedules */}
            {schedules.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Lịch làm việc gần đây</h4>
                <div className="space-y-2">
                  {schedules.slice(-3).map((schedule) => {
                    const doctor = doctorsData.find(d => d.id === schedule.doctorId);
                    return (
                      <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-primary-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {doctor?.name || 'Unknown Doctor'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {schedule.date} • {schedule.startTime}-{schedule.endTime}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {schedule.isRecurring && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              🔄 Lặp lại
                            </span>
                          )}
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {schedule.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Add Schedule Modal */}
        <AddScheduleModal
          isOpen={showAddScheduleModal}
          onClose={() => setShowAddScheduleModal(false)}
          doctors={doctorsData}
          onSave={handleSaveSchedule}
        />

        {/* Doctor Detail Modal */}
        <DoctorDetailModal
          isOpen={showDoctorDetailModal}
          onClose={() => setShowDoctorDetailModal(false)}
          doctor={selectedDoctorDetail}
          onSave={handleSaveDoctor}
        />
      </div>
    </Layout>
  );
};

export default DoctorSchedulePage; 