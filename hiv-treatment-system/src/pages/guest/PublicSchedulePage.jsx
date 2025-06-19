import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Calendar from '../../components/common/Calendar';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const PublicSchedulePage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('doctors'); // 'doctors' | 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock doctors data
  const [doctors] = useState([
    {
      id: 1,
      name: 'BS. Nguyễn Văn Minh',
      specialty: 'Bác sĩ Nhiễm trùng',
      specialtyCode: 'infectious',
      experience: '15 năm kinh nghiệm',
      education: 'Tiến sĩ Y khoa - Đại học Y Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      reviewCount: 124,
      location: 'Phòng khám 101, Tầng 2',
      phone: '(024) 3123-4567',
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      shifts: [
        { type: 'morning', startTime: '08:00', endTime: '12:00', maxPatients: 8 },
        { type: 'afternoon', startTime: '13:00', endTime: '17:00', maxPatients: 8 }
      ],
      bio: 'Chuyên gia hàng đầu về điều trị HIV/AIDS với hơn 15 năm kinh nghiệm. Đã điều trị thành công cho hơn 2000 bệnh nhân.',
      achievements: [
        'Giải thưởng Bác sĩ xuất sắc năm 2023',
        'Chứng chỉ điều trị HIV quốc tế',
        'Thành viên Hội Nhiễm trùng Việt Nam'
      ]
    },
    {
      id: 2,
      name: 'BS. Trần Thị Hương',
      specialty: 'Bác sĩ Nội khoa',
      specialtyCode: 'internal',
      experience: '12 năm kinh nghiệm',
      education: 'Thạc sĩ Y khoa - Đại học Y TP.HCM',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 4.9,
      reviewCount: 98,
      location: 'Phòng khám 205, Tầng 2',
      phone: '(024) 3123-4568',
      workingDays: ['monday', 'tuesday', 'thursday', 'friday', 'saturday'],
      shifts: [
        { type: 'morning', startTime: '08:30', endTime: '12:30', maxPatients: 6 },
        { type: 'afternoon', startTime: '14:00', endTime: '18:00', maxPatients: 6 }
      ],
      bio: 'Bác sĩ nội khoa giàu kinh nghiệm, chuyên về chăm sóc toàn diện cho bệnh nhân HIV.',
      achievements: [
        'Chứng chỉ tư vấn HIV/AIDS',
        'Đào tạo tại Bệnh viện Johns Hopkins',
        'Nghiên cứu sinh xuất sắc'
      ]
    },
    {
      id: 3,
      name: 'BS. Lê Văn Đức',
      specialty: 'Bác sĩ Tâm lý',
      specialtyCode: 'psychology',
      experience: '8 năm kinh nghiệm',
      education: 'Thạc sĩ Tâm lý học - Đại học Quốc gia Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      rating: 4.7,
      reviewCount: 76,
      location: 'Phòng tư vấn 301, Tầng 3',
      phone: '(024) 3123-4569',
      workingDays: ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      shifts: [
        { type: 'morning', startTime: '09:00', endTime: '12:00', maxPatients: 4 },
        { type: 'afternoon', startTime: '13:30', endTime: '17:30', maxPatients: 4 }
      ],
      bio: 'Chuyên gia tâm lý với kinh nghiệm hỗ trợ tâm lý cho bệnh nhân HIV và gia đình.',
      achievements: [
        'Chứng chỉ tư vấn tâm lý HIV',
        'Thành viên Hội Tâm lý học Việt Nam',
        'Chuyên gia tư vấn gia đình'
      ]
    }
  ]);

  const specialties = [
    { code: 'all', name: 'Tất cả chuyên khoa' },
    { code: 'infectious', name: 'Bác sĩ Nhiễm trùng' },
    { code: 'internal', name: 'Bác sĩ Nội khoa' },
    { code: 'psychology', name: 'Bác sĩ Tâm lý' }
  ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialtyCode === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  // Generate time slots for a doctor on a specific date
  const generateTimeSlots = (doctor, date) => {
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date(date).getDay()];
    
    if (!doctor.workingDays.includes(dayOfWeek)) {
      return [];
    }

    const slots = [];
    doctor.shifts.forEach(shift => {
      const startTime = new Date(`${date}T${shift.startTime}`);
      const endTime = new Date(`${date}T${shift.endTime}`);
      const slotDuration = 30; // 30 minutes per slot
      
      let currentTime = new Date(startTime);
      while (currentTime < endTime) {
        const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
        if (slotEnd <= endTime) {
          // Random availability (70% chance of being available)
          const isAvailable = Math.random() > 0.3;
          slots.push({
            id: `${shift.type}-${currentTime.getHours()}-${currentTime.getMinutes()}`,
            startTime: currentTime.toTimeString().slice(0, 5),
            endTime: slotEnd.toTimeString().slice(0, 5),
            shift: shift.type,
            isAvailable,
            shiftName: shift.type === 'morning' ? 'Buổi sáng' : 'Buổi chiều'
          });
        }
        currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
      }
    });

    return slots;
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setViewMode('calendar');
  };

  const handleSlotSelect = (date, slot) => {
    // Redirect to login page with appointment info
    const appointmentData = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: date,
      timeSlot: slot,
      returnUrl: '/customer/appointments/new'
    };
    
    // Store appointment data in sessionStorage for after login
    sessionStorage.setItem('pendingAppointment', JSON.stringify(appointmentData));
    
    // Redirect to login
    window.location.href = `/login?redirect=${encodeURIComponent('/customer/appointments/new')}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeekDates = (startDate) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <Layout currentRole={UserRole.GUEST} pageTitle="Lịch khám - Đặt lịch hẹn">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Đặt lịch khám với bác sĩ chuyên khoa</h1>
          <p className="text-primary-100">
            Xem lịch làm việc của các bác sĩ và đặt lịch hẹn một cách dễ dàng
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Button
            variant={viewMode === 'doctors' ? 'primary' : 'outline'}
            onClick={() => setViewMode('doctors')}
          >
            <UserIcon className="h-4 w-4 mr-2" />
            Danh sách bác sĩ
          </Button>
          {selectedDoctor && (
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'outline'}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Lịch khám - {selectedDoctor.name}
            </Button>
          )}
        </div>

        {viewMode === 'doctors' ? (
          <>
            {/* Search and Filter */}
            <Card>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm bác sĩ theo tên hoặc chuyên khoa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <select
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty.code} value={specialty.code}>
                        {specialty.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Doctors List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDoctors.map(doctor => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600">{doctor.experience}</p>
                        
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {doctor.rating} ({doctor.reviewCount} đánh giá)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {doctor.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        {doctor.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <AcademicCapIcon className="h-4 w-4 mr-2" />
                        {doctor.education}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-700 line-clamp-2">{doctor.bio}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Ngày làm việc:</span>
                        <div className="flex space-x-1 mt-1">
                          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => {
                            const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                            const isWorking = doctor.workingDays.includes(dayNames[index]);
                            return (
                              <span
                                key={day}
                                className={`px-2 py-1 text-xs rounded ${
                                  isWorking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {day}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => handleDoctorSelect(doctor)}
                      >
                        Xem lịch khám
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <Card>
                <div className="p-8 text-center">
                  <UserIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Không tìm thấy bác sĩ nào phù hợp</p>
                </div>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Calendar View */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedDoctor.avatar}
                      alt={selectedDoctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedDoctor.name}</h3>
                      <p className="text-primary-600">{selectedDoctor.specialty}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setViewMode('doctors')}
                  >
                    Chọn bác sĩ khác
                  </Button>
                </div>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newWeek = new Date(currentWeek);
                      newWeek.setDate(newWeek.getDate() - 7);
                      setCurrentWeek(newWeek);
                    }}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  
                  <h4 className="text-lg font-medium">
                    {weekDates[0].toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                  </h4>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newWeek = new Date(currentWeek);
                      newWeek.setDate(newWeek.getDate() + 7);
                      setCurrentWeek(newWeek);
                    }}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Weekly Calendar */}
                <div className="grid grid-cols-7 gap-4">
                  {weekDates.map((date, index) => {
                    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
                    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
                    const isWorkingDay = selectedDoctor.workingDays.includes(dayOfWeek);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isPast = date < new Date().setHours(0, 0, 0, 0);
                    const timeSlots = isWorkingDay ? generateTimeSlots(selectedDoctor, date.toISOString().split('T')[0]) : [];

                    return (
                      <div key={index} className="border rounded-lg p-3">
                        <div className={`text-center mb-3 ${isToday ? 'text-primary-600 font-bold' : 'text-gray-700'}`}>
                          <div className="text-sm font-medium">{dayNames[date.getDay()]}</div>
                          <div className="text-lg">{date.getDate()}</div>
                        </div>

                        {isPast ? (
                          <div className="text-center text-gray-400 text-sm">Đã qua</div>
                        ) : !isWorkingDay ? (
                          <div className="text-center text-gray-400 text-sm">Không làm việc</div>
                        ) : (
                          <div className="space-y-1">
                            {timeSlots.map(slot => (
                              <button
                                key={slot.id}
                                className={`w-full text-xs p-1 rounded transition-colors ${
                                  slot.isAvailable
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-red-100 text-red-700 cursor-not-allowed'
                                }`}
                                disabled={!slot.isAvailable}
                                onClick={() => slot.isAvailable && handleSlotSelect(date.toISOString().split('T')[0], slot)}
                              >
                                {slot.startTime}
                                {slot.isAvailable ? '' : ' (Đã đặt)'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
                    <span>Có thể đặt</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-100 rounded mr-2"></div>
                    <span>Đã đặt</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
                    <span>Không làm việc</span>
                  </div>
                </div>

                {/* Login Notice */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-700">
                        <strong>Lưu ý:</strong> Bạn cần đăng nhập để có thể đặt lịch hẹn. 
                        <Link to="/login" className="ml-1 underline hover:text-blue-800">
                          Đăng nhập ngay
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PublicSchedulePage; 