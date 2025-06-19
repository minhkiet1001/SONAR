import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import StaffSchedule from '../../components/manager/StaffSchedule';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const StaffSchedulePage = () => {
  // Mock staff data
  const staffMembers = [
    {
      id: '1',
      title: 'BS.',
      fullName: 'Sarah Johnson',
      role: 'Bác sĩ',
      department: 'Khoa Bệnh truyền nhiễm',
    },
    {
      id: '2',
      title: 'BS.',
      fullName: 'Robert Chen',
      role: 'Bác sĩ',
      department: 'Khoa Đa khoa',
    },
    {
      id: '3',
      title: 'BS.',
      fullName: 'Michael Brown',
      role: 'Bác sĩ',
      department: 'Khoa Bệnh truyền nhiễm',
    },
    {
      id: '4',
      title: 'YT.',
      fullName: 'Emma Wilson',
      role: 'Y tá',
      department: 'Khoa Chăm sóc bệnh nhân',
    },
    {
      id: '5',
      title: '',
      fullName: 'John Smith',
      role: 'Cố vấn',
      department: 'Phòng Tư vấn',
    },
    {
      id: '6',
      title: '',
      fullName: 'Lisa Rodriguez',
      role: 'Kỹ thuật viên phòng xét nghiệm',
      department: 'Phòng xét nghiệm',
    },
    {
      id: '7',
      title: '',
      fullName: 'David Kim',
      role: 'Dược sĩ',
      department: 'Khoa Dược',
    },
    {
      id: '8',
      title: '',
      fullName: 'Sandra Carter',
      role: 'Quản trị viên',
      department: 'Phòng Hành chính',
    },
  ];

  // Mock schedule data
  const schedules = [
    {
      id: '1',
      staffId: '1',
      day: '2023-06-26', // Monday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '2',
      staffId: '1',
      day: '2023-06-27', // Tuesday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '3',
      staffId: '1',
      day: '2023-06-28', // Wednesday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '4',
      staffId: '1',
      day: '2023-06-29', // Thursday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '5',
      staffId: '1',
      day: '2023-06-30', // Friday
      startTime: '08:00',
      endTime: '12:00',
    },
    {
      id: '6',
      staffId: '2',
      day: '2023-06-26', // Monday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '7',
      staffId: '2',
      day: '2023-06-27', // Tuesday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '8',
      staffId: '2',
      day: '2023-06-28', // Wednesday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '9',
      staffId: '3',
      day: '2023-06-26', // Monday
      startTime: '13:00',
      endTime: '21:00',
    },
    {
      id: '10',
      staffId: '3',
      day: '2023-06-27', // Tuesday
      startTime: '13:00',
      endTime: '21:00',
    },
    {
      id: '11',
      staffId: '3',
      day: '2023-06-28', // Wednesday
      startTime: '13:00',
      endTime: '21:00',
    },
    {
      id: '12',
      staffId: '4',
      day: '2023-06-26', // Monday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '13',
      staffId: '4',
      day: '2023-06-28', // Wednesday
      startTime: '08:00',
      endTime: '17:00',
    },
    {
      id: '14',
      staffId: '4',
      day: '2023-06-30', // Friday
      startTime: '08:00',
      endTime: '17:00',
    },
  ];

  const handleSaveSchedule = (scheduleData) => {
    console.log('Saving schedule:', scheduleData);
    // In a real app, this would send data to an API
    alert('Lịch làm việc đã được lưu thành công!');
  };

  const handleDeleteSchedule = (scheduleId) => {
    console.log('Deleting schedule:', scheduleId);
    // In a real app, this would send a delete request to an API
    alert('Đã xóa lịch làm việc!');
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Alex Manager">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch làm việc</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý thời gian biểu và lịch làm việc của nhân viên và bác sĩ
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="primary">Xuất lịch làm việc</Button>
          </div>
        </div>

        <StaffSchedule 
          staff={staffMembers}
          existingSchedules={schedules}
          onSaveSchedule={handleSaveSchedule}
          onDeleteSchedule={handleDeleteSchedule}
        />
      </div>
    </Layout>
  );
};

export default StaffSchedulePage; 