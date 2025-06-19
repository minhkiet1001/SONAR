import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { UserRole } from '../../types/index.js';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const NewAppointmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  
  const [formData, setFormData] = useState({
    patientId: patientId || '',
    patientName: patientId ? 'Nguyễn Văn A' : '', // Giả định tên bệnh nhân nếu có ID
    appointmentDate: '',
    appointmentTime: '',
    duration: '30',
    appointmentType: 'regular',
    doctor: '',
    reason: '',
    notes: ''
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Dữ liệu giả cho danh sách bệnh nhân và bác sĩ
  const patients = [
    { id: 'PT10045', name: 'Nguyễn Văn A' },
    { id: 'PT10046', name: 'Trần Thị B' },
    { id: 'PT10047', name: 'Lê Văn C' },
    { id: 'PT10048', name: 'Phạm Thị D' },
    { id: 'PT10049', name: 'Hoàng Văn E' }
  ];
  
  const doctors = [
    { id: 'DR001', name: 'BS. Trần Minh' },
    { id: 'DR002', name: 'BS. Lê Hà' },
    { id: 'DR003', name: 'BS. Nguyễn Thành' },
    { id: 'DR004', name: 'BS. Hoàng Linh' }
  ];
  
  const appointmentTypes = [
    { id: 'regular', name: 'Khám định kỳ' },
    { id: 'test-results', name: 'Nhận kết quả xét nghiệm' },
    { id: 'counseling', name: 'Tư vấn điều trị' },
    { id: 'initial', name: 'Khám lần đầu' },
    { id: 'emergency', name: 'Khám khẩn cấp' }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Nếu người dùng chọn bệnh nhân từ dropdown, cập nhật tên
    if (name === 'patientId') {
      const selectedPatient = patients.find(patient => patient.id === value);
      if (selectedPatient) {
        setFormData(prev => ({
          ...prev,
          patientId: value,
          patientName: selectedPatient.name
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          patientId: value,
          patientName: ''
        }));
      }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ở đây sẽ gửi dữ liệu đến server
    console.log('Thông tin lịch hẹn:', formData);
    
    // Hiển thị thông báo thành công (demo)
    setShowSuccessMessage(true);
    
    // Sau 2 giây, chuyển về trang danh sách lịch hẹn
    setTimeout(() => {
      navigate('/staff/appointments');
    }, 2000);
  };

  return (
    <Layout currentRole={UserRole.STAFF} userName="Trần Văn Nhân Viên">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            <Link to="/staff/appointments" className="mr-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeftIcon className="h-4 w-4 mr-1" /> Quay lại
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Đặt lịch hẹn mới</h1>
          </div>
        </div>

        {showSuccessMessage ? (
          <Card>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Đặt lịch hẹn thành công!</h2>
              <p className="text-gray-600 mb-4">Lịch hẹn mới đã được tạo trong hệ thống.</p>
              <p className="text-gray-500">Đang chuyển hướng đến trang danh sách lịch hẹn...</p>
            </div>
          </Card>
        ) : (
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thông tin bệnh nhân */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Thông tin bệnh nhân
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                      Mã bệnh nhân <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="patientId"
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                      disabled={!!patientId}
                    >
                      <option value="">-- Chọn bệnh nhân --</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.id} - {patient.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                      Tên bệnh nhân
                    </label>
                    <Input
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin lịch hẹn */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Thông tin lịch hẹn
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày hẹn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="appointmentDate"
                        name="appointmentDate"
                        type="date"
                        className="pl-10"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Giờ hẹn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="appointmentTime"
                        name="appointmentTime"
                        type="time"
                        className="pl-10"
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Thời gian (phút) <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    >
                      <option value="15">15 phút</option>
                      <option value="30">30 phút</option>
                      <option value="45">45 phút</option>
                      <option value="60">60 phút</option>
                      <option value="90">90 phút</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                      Loại hẹn <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="appointmentType"
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    >
                      {appointmentTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                      Bác sĩ <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                    >
                      <option value="">-- Chọn bác sĩ --</option>
                      {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                      Lý do hẹn <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Ghi chú bổ sung */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Ghi chú bổ sung
                </h2>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Nhập thông tin hoặc yêu cầu đặc biệt cho lịch hẹn này"
                  />
                </div>
              </div>

              {/* Nút hành động */}
              <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                <Link to="/staff/appointments">
                  <Button variant="outline" type="button">Hủy</Button>
                </Link>
                <Button variant="primary" type="submit">Đặt lịch hẹn</Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default NewAppointmentPage; 