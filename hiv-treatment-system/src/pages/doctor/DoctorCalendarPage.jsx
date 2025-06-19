import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  CalendarIcon, 
  ClockIcon, 
  PlusIcon,
  PencilIcon,
  CheckCircleIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// Generate doctor's work schedule for the month
const generateDoctorWorkSchedule = () => {
  const schedule = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Get first day of month and number of days in month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    let workStatus = 'off'; // 'off', 'morning', 'afternoon', 'full'
    let shifts = [];
    let notes = '';
    
    // Weekend logic
    if (dayOfWeek === 0) { // Sunday
      workStatus = 'off';
      notes = 'Nghỉ Chủ nhật';
    } else if (dayOfWeek === 6) { // Saturday
      // 30% chance to work on Saturday morning
      if (Math.random() > 0.7) {
        workStatus = 'morning';
        shifts = [{ type: 'morning', start: '08:00', end: '12:00' }];
        notes = 'Ca sáng thứ 7';
      } else {
        workStatus = 'off';
        notes = 'Nghỉ thứ 7';
      }
    } else {
      // Weekdays (Monday to Friday)
      const randomValue = Math.random();
      
      if (randomValue > 0.9) {
        // 10% chance of day off
        workStatus = 'off';
        notes = 'Nghỉ phép';
      } else if (randomValue > 0.7) {
        // 20% chance of morning only
        workStatus = 'morning';
        shifts = [{ type: 'morning', start: '08:00', end: '12:00' }];
        notes = 'Chỉ ca sáng';
      } else if (randomValue > 0.5) {
        // 20% chance of afternoon only
        workStatus = 'afternoon';
        shifts = [{ type: 'afternoon', start: '13:30', end: '17:30' }];
        notes = 'Chỉ ca chiều';
      } else {
        // 50% chance of full day
        workStatus = 'full';
        shifts = [
          { type: 'morning', start: '08:00', end: '12:00' },
          { type: 'afternoon', start: '13:30', end: '17:30' }
        ];
        notes = 'Ca đầy đủ';
      }
    }
    
    schedule.push({
      date: date.toISOString().split('T')[0],
      dayOfWeek,
      workStatus,
      shifts,
      notes,
      location: workStatus !== 'off' ? 'Phòng khám số 3' : '',
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  return schedule;
};

// Generate monthly statistics
const generateMonthlyStats = (schedule) => {
  const totalDays = schedule.length;
  const workingDays = schedule.filter(day => day.workStatus !== 'off').length;
  const offDays = totalDays - workingDays;
  const fullDays = schedule.filter(day => day.workStatus === 'full').length;
  const partialDays = schedule.filter(day => 
    day.workStatus === 'morning' || day.workStatus === 'afternoon'
  ).length;
  
  // Calculate total working hours
  const totalHours = schedule.reduce((total, day) => {
    return total + day.shifts.reduce((dayTotal, shift) => {
      const start = new Date(`2000-01-01T${shift.start}`);
      const end = new Date(`2000-01-01T${shift.end}`);
      return dayTotal + (end - start) / (1000 * 60 * 60); // Convert to hours
    }, 0);
  }, 0);
  
  return {
    totalDays,
    workingDays,
    offDays,
    fullDays,
    partialDays,
    totalHours: Math.round(totalHours)
  };
};

const DoctorCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workSchedule, setWorkSchedule] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'list'

  useEffect(() => {
    const schedule = generateDoctorWorkSchedule();
    setWorkSchedule(schedule);
    setMonthlyStats(generateMonthlyStats(schedule));
  }, [currentDate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'full':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'morning':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'afternoon':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'off':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'full':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'morning':
        return <SunIcon className="h-4 w-4" />;
      case 'afternoon':
        return <MoonIcon className="h-4 w-4" />;
      case 'off':
        return <HomeIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'full':
        return 'Cả ngày';
      case 'morning':
        return 'Ca sáng';
      case 'afternoon':
        return 'Ca chiều';
      case 'off':
        return 'Nghỉ';
      default:
        return status;
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

  const getDayName = (dayOfWeek) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return days[dayOfWeek];
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarView = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    // Generate 42 days (6 weeks) for calendar grid
    for (let i = 0; i < 42; i++) {
      const daySchedule = workSchedule.find(s => s.date === currentDateObj.toISOString().split('T')[0]);
      const isCurrentMonth = currentDateObj.getMonth() === currentDate.getMonth();
      
      days.push({
        date: new Date(currentDateObj),
        schedule: daySchedule,
        isCurrentMonth
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return (
      <div className="bg-white rounded-lg shadow">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              ←
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              →
            </Button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-2 border-r border-b last:border-r-0 cursor-pointer hover:bg-gray-50 ${
                !day.isCurrentMonth ? 'bg-gray-50' : ''
              } ${day.schedule?.isToday ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedDay(day.schedule)}
            >
              <div className={`text-sm ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'} ${
                day.schedule?.isToday ? 'font-bold text-blue-600' : ''
              }`}>
                {day.date.getDate()}
              </div>
              
              {day.schedule && day.isCurrentMonth && (
                <div className={`mt-1 px-2 py-1 rounded text-xs border ${getStatusColor(day.schedule.workStatus)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(day.schedule.workStatus)}
                    <span>{getStatusText(day.schedule.workStatus)}</span>
                  </div>
                  {day.schedule.shifts.length > 0 && (
                    <div className="mt-1 text-xs">
                      {day.schedule.shifts.map((shift, idx) => (
                        <div key={idx}>
                          {shift.start} - {shift.end}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const today = new Date();
    const upcomingDays = workSchedule.filter(day => new Date(day.date) >= today).slice(0, 14);

    return (
      <div className="space-y-4">
        {upcomingDays.map((day) => (
          <Card key={day.date}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {formatDate(day.date)}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(day.workStatus)}`}>
                      {getStatusIcon(day.workStatus)}
                      <span className="ml-1">{getStatusText(day.workStatus)}</span>
                    </span>
                  </div>
                  
                  {day.shifts.length > 0 ? (
                    <div className="space-y-2">
                      {day.shifts.map((shift, index) => (
                        <div key={index} className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            {shift.type === 'morning' ? (
                              <SunIcon className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <MoonIcon className="h-4 w-4 text-blue-500" />
                            )}
                            <span className="font-medium">
                              {shift.type === 'morning' ? 'Ca sáng' : 'Ca chiều'}:
                            </span>
                          </div>
                          <span>{shift.start} - {shift.end}</span>
                          <span>({((new Date(`2000-01-01T${shift.end}`) - new Date(`2000-01-01T${shift.start}`)) / (1000 * 60 * 60))} giờ)</span>
                        </div>
                      ))}
                      {day.location && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="font-medium">Địa điểm:</span>
                          <span>{day.location}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{day.notes}</p>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Layout currentRole={UserRole.DOCTOR} userName="BS. Lê Thị Minh">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch làm việc</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý lịch trình làm việc và ca trực của bạn
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex rounded-md shadow-sm">
              {/* <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  viewMode === 'calendar'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CalendarIcon className="h-4 w-4 mr-2 inline" />
                Lịch
              </button> */}
              {/* <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Danh sách
              </button> */}
            </div>
            {/* <Button variant="primary" className="flex items-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Thêm ca làm việc
            </Button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {viewMode === 'calendar' ? renderCalendarView() : renderListView()}
          </div>
          
          <div className="space-y-6">
            {/* Monthly Statistics */}
            <Card title="Thống kê tháng này">
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tổng số ngày:</span>
                    <span className="text-sm font-medium">{monthlyStats.totalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ngày làm việc:</span>
                    <span className="text-sm font-medium text-green-600">{monthlyStats.workingDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ngày nghỉ:</span>
                    <span className="text-sm font-medium text-gray-600">{monthlyStats.offDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ca đầy đủ:</span>
                    <span className="text-sm font-medium text-blue-600">{monthlyStats.fullDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Ca bán thời gian:</span>
                    <span className="text-sm font-medium text-orange-600">{monthlyStats.partialDays}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium text-gray-900">Tổng giờ làm:</span>
                    <span className="text-sm font-bold text-primary-600">{monthlyStats.totalHours}h</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Legend */}
            <Card title="Chú thích">
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Cả ngày</span>
                  </div>
                  <span className="text-xs text-gray-500">(8:00-12:00, 13:30-17:30)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <SunIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Ca sáng</span>
                  </div>
                  <span className="text-xs text-gray-500">(8:00-12:00)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <MoonIcon className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Ca chiều</span>
                  </div>
                  <span className="text-xs text-gray-500">(13:30-17:30)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <HomeIcon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">Nghỉ</span>
                  </div>
                  <span className="text-xs text-gray-500">(Không làm việc)</span>
                </div>
              </div>
            </Card>

            {/* Selected Day Details */}
            {selectedDay && (
              <Card title={`Chi tiết - ${formatDate(selectedDay.date)}`}>
                <div className="p-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-3 ${getStatusColor(selectedDay.workStatus)}`}>
                    {getStatusIcon(selectedDay.workStatus)}
                    <span className="ml-1">{getStatusText(selectedDay.workStatus)}</span>
                  </div>
                  
                  {selectedDay.shifts.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDay.shifts.map((shift, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            {shift.type === 'morning' ? (
                              <SunIcon className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <MoonIcon className="h-4 w-4 text-blue-500" />
                            )}
                            <span className="font-medium">
                              {shift.type === 'morning' ? 'Ca sáng' : 'Ca chiều'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>⏰ {shift.start} - {shift.end}</div>
                            <div>📍 {selectedDay.location}</div>
                            <div>⏱️ {((new Date(`2000-01-01T${shift.end}`) - new Date(`2000-01-01T${shift.start}`)) / (1000 * 60 * 60))} giờ</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <HomeIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">{selectedDay.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Chỉnh sửa ca làm việc
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            {/* <Card title="Thao tác nhanh">
              <div className="p-4 space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Đăng ký ca trực
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Xin nghỉ phép
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Đổi ca làm việc
                </Button>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorCalendarPage; 