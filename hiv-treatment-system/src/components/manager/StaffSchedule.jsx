import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const StaffSchedule = ({
  staff = [],
  existingSchedules = [],
  onSaveSchedule,
  onDeleteSchedule,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStaff, setSelectedStaff] = useState('');
  const [editScheduleId, setEditScheduleId] = useState(null);
  const [formData, setFormData] = useState({
    staffId: '',
    day: '',
    startTime: '',
    endTime: '',
    isRecurring: false,
    recurrencePattern: 'weekly',
  });

  // Get days of the week based on current date
  const getDaysOfWeek = () => {
    const days = [];
    const today = new Date(currentDate);
    today.setDate(today.getDate() - today.getDay()); // Set to the first day (Sunday) of the week
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const daysOfWeek = getDaysOfWeek();

  // Format date in YYYY-MM-DD for input fields
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // Filter schedules based on selected staff and current week
  const filteredSchedules = existingSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.day);
    const startOfWeek = new Date(daysOfWeek[0]);
    const endOfWeek = new Date(daysOfWeek[6]);
    endOfWeek.setHours(23, 59, 59, 999);
    
    return (
      (!selectedStaff || schedule.staffId === selectedStaff) &&
      scheduleDate >= startOfWeek &&
      scheduleDate <= endOfWeek
    );
  });

  // Go to previous week
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  // Go to next week
  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  // Go to current week
  const goToCurrentWeek = () => {
    setCurrentDate(new Date());
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle staff selection
  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  // Handle schedule edit
  const handleEditSchedule = (schedule) => {
    setEditScheduleId(schedule.id);
    setFormData({
      staffId: schedule.staffId,
      day: formatDateForInput(new Date(schedule.day)),
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      isRecurring: schedule.isRecurring || false,
      recurrencePattern: schedule.recurrencePattern || 'weekly',
    });
  };

  // Handle schedule deletion
  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch làm việc này?')) {
      onDeleteSchedule(scheduleId);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const scheduleData = {
      ...formData,
      id: editScheduleId,
    };
    
    onSaveSchedule(scheduleData);
    
    // Reset form after submission
    setEditScheduleId(null);
    setFormData({
      staffId: '',
      day: '',
      startTime: '',
      endTime: '',
      isRecurring: false,
      recurrencePattern: 'weekly',
    });
  };

  // Get schedule for a specific day and staff member
  const getScheduleForDay = (day, staffId) => {
    return filteredSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.day);
      return (
        schedule.staffId === staffId &&
        scheduleDate.getDate() === day.getDate() &&
        scheduleDate.getMonth() === day.getMonth() &&
        scheduleDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <div className="space-y-6">
      <Card title="Lịch làm việc nhân viên">
        <div className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="w-full md:w-1/3">
              <label htmlFor="staff-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Nhân viên
              </label>
              <select
                id="staff-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={selectedStaff}
                onChange={handleStaffChange}
              >
                <option value="">Tất cả nhân viên</option>
                {staff.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.title ? `${member.title} ` : ''}{member.fullName}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                &lt; Tuần trước
              </Button>
              <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
                Tuần này
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextWeek}>
                Tuần sau &gt;
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhân viên
                  </th>
                  {daysOfWeek.map((day) => (
                    <th 
                      key={day.toISOString()} 
                      scope="col" 
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {formatDateForDisplay(day)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff
                  .filter(member => !selectedStaff || member.id === selectedStaff)
                  .map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.title ? `${member.title} ` : ''}{member.fullName}
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </td>
                      {daysOfWeek.map((day) => {
                        const schedules = getScheduleForDay(day, member.id);
                        return (
                          <td 
                            key={day.toISOString()} 
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                          >
                            {schedules.length > 0 ? (
                              <div className="space-y-2">
                                {schedules.map((schedule) => (
                                  <div 
                                    key={schedule.id} 
                                    className="bg-green-50 p-2 rounded text-left border border-green-200"
                                  >
                                    <div className="font-medium">{schedule.startTime} - {schedule.endTime}</div>
                                    <div className="flex justify-between mt-1">
                                      <button
                                        onClick={() => handleEditSchedule(schedule)}
                                        className="text-blue-600 hover:text-blue-800 text-xs"
                                      >
                                        Sửa
                                      </button>
                                      <button
                                        onClick={() => handleDeleteSchedule(schedule.id)}
                                        className="text-red-600 hover:text-red-800 text-xs"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">Trống</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      
      <Card title={editScheduleId ? 'Chỉnh sửa lịch làm việc' : 'Thêm lịch làm việc mới'}>
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="staffId">
                Nhân viên <span className="text-red-500">*</span>
              </label>
              <select
                id="staffId"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              >
                <option value="">Chọn nhân viên</option>
                {staff.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.title ? `${member.title} ` : ''}{member.fullName}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="day">
                Ngày <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="day"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startTime">
                Thời gian bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endTime">
                Thời gian kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isRecurring"
                  name="isRecurring"
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isRecurring" className="font-medium text-gray-700">
                  Lịch lặp lại
                </label>
                <p className="text-gray-500">
                  Chọn nếu lịch này sẽ được lặp lại theo định kỳ.
                </p>
              </div>
            </div>
            
            {formData.isRecurring && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="recurrencePattern">
                  Kiểu lặp lại
                </label>
                <select
                  id="recurrencePattern"
                  name="recurrencePattern"
                  value={formData.recurrencePattern}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="daily">Hàng ngày</option>
                  <option value="weekly">Hàng tuần</option>
                  <option value="biweekly">Hai tuần một lần</option>
                  <option value="monthly">Hàng tháng</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            {editScheduleId && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setEditScheduleId(null);
                  setFormData({
                    staffId: '',
                    day: '',
                    startTime: '',
                    endTime: '',
                    isRecurring: false,
                    recurrencePattern: 'weekly',
                  });
                }}
              >
                Hủy
              </Button>
            )}
            <Button type="submit" variant="primary">
              {editScheduleId ? 'Cập nhật' : 'Thêm lịch'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StaffSchedule; 