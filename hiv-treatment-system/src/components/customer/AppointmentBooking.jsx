import React, { useState, useEffect } from 'react';
import { 
  UserIcon, 
  CalendarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  HeartIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Calendar from '../common/Calendar';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

// Mock services data
const mockServices = [
  {
    id: 'hiv-consultation',
    name: 'Tư vấn HIV',
    description: 'Tư vấn về tình trạng nhiễm HIV, điều trị và chăm sóc',
    icon: ChatBubbleLeftRightIcon,
    duration: '30 phút'
  },
  {
    id: 'routine-checkup',
    name: 'Khám định kỳ',
    description: 'Khám sức khỏe định kỳ cho người nhiễm HIV',
    icon: HeartIcon,
    duration: '45 phút'
  },
  {
    id: 'lab-tests',
    name: 'Xét nghiệm và tư vấn kết quả',
    description: 'Đăng ký xét nghiệm và nhận tư vấn kết quả từ bác sĩ',
    icon: BeakerIcon,
    duration: '60 phút',
    testTypes: [
      {
        id: 'cd4',
        name: 'Xét nghiệm CD4',
        description: 'Đánh giá số lượng tế bào CD4 trong máu'
      },
      {
        id: 'viral-load',
        name: 'Xét nghiệm tải lượng virus',
        description: 'Đo lường số lượng HIV trong máu'
      },
      {
        id: 'resistance',
        name: 'Xét nghiệm kháng thuốc',
        description: 'Kiểm tra khả năng kháng thuốc của virus'
      },
      {
        id: 'nat',
        name: 'Xét nghiệm axit nucleic (NAT)',
        description: 'Phát hiện sớm nhiễm HIV bằng kỹ thuật khuếch đại axit nucleic'
      },
      {
        id: 'ag-ab',
        name: 'Xét nghiệm kháng nguyên/kháng thể',
        description: 'Phát hiện đồng thời kháng nguyên p24 và kháng thể HIV'
      },
      {
        id: 'antigen',
        name: 'Xét nghiệm kháng nguyên',
        description: 'Phát hiện kháng nguyên p24 của HIV'
      }
    ]
  },
  {
    id: 'medication-review',
    name: 'Tư vấn thuốc ARV',
    description: 'Tư vấn về thuốc điều trị, tác dụng phụ và cách sử dụng',
    icon: DocumentTextIcon,
    duration: '30 phút'
  },
  {
    id: 'psychological-support',
    name: 'Hỗ trợ tâm lý',
    description: 'Tư vấn tâm lý, hỗ trợ tinh thần cho người nhiễm HIV',
    icon: ChatBubbleLeftRightIcon,
    duration: '60 phút'
  }
];

// Mock doctors data with specializations
const mockDoctors = [
  {
    id: '1',
    name: 'BS. Nguyễn Văn Minh',
    specialization: 'Bác sĩ Nhiễm trùng',
    department: 'Khoa Điều trị HIV',
    avatar: null,
    experience: '15 năm kinh nghiệm',
    rating: 4.9,
    services: ['hiv-consultation', 'routine-checkup', 'lab-tests', 'medication-review'],
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    shifts: [
      { type: 'morning', startTime: '08:00', endTime: '12:00' },
      { type: 'afternoon', startTime: '13:30', endTime: '17:30' }
    ]
  },
  {
    id: '2',
    name: 'BS. Trần Thị Hương',
    specialization: 'Bác sĩ Xét nghiệm',
    department: 'Khoa Xét nghiệm & Chẩn đoán',
    avatar: null,
    experience: '12 năm kinh nghiệm',
    rating: 4.8,
    services: ['lab-tests', 'routine-checkup'],
    workingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
    shifts: [
      { type: 'morning', startTime: '08:00', endTime: '12:00' },
      { type: 'afternoon', startTime: '14:00', endTime: '18:00' }
    ]
  },
  {
    id: '3',
    name: 'BS. Lê Văn Đức',
    specialization: 'Bác sĩ Tâm lý',
    department: 'Khoa Tâm lý',
    avatar: null,
    experience: '10 năm kinh nghiệm',
    rating: 4.7,
    services: ['psychological-support', 'hiv-consultation'],
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    shifts: [
      { type: 'morning', startTime: '08:30', endTime: '12:30' },
      { type: 'afternoon', startTime: '13:30', endTime: '17:30' }
    ]
  },
  {
    id: '4',
    name: 'BS. Phạm Thị Lan',
    specialization: 'Dược sĩ lâm sàng',
    department: 'Khoa Dược',
    avatar: null,
    experience: '8 năm kinh nghiệm',
    rating: 4.6,
    services: ['medication-review', 'hiv-consultation'],
    workingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
    shifts: [
      { type: 'morning', startTime: '08:00', endTime: '12:00' },
      { type: 'afternoon', startTime: '13:00', endTime: '17:00' }
    ]
  },
  {
    id: '5',
    name: 'BS. Hoàng Minh Tuấn',
    specialization: 'Bác sĩ Xét nghiệm',
    department: 'Khoa Xét nghiệm & Chẩn đoán',
    avatar: null,
    experience: '10 năm kinh nghiệm',
    rating: 4.8,
    services: ['lab-tests', 'routine-checkup'],
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    shifts: [
      { type: 'morning', startTime: '07:30', endTime: '11:30' },
      { type: 'afternoon', startTime: '13:30', endTime: '17:30' }
    ]
  },
  {
    id: '6',
    name: 'BS. Nguyễn Thu Hà',
    specialization: 'Bác sĩ Xét nghiệm',
    department: 'Khoa Xét nghiệm & Chẩn đoán',
    avatar: null,
    experience: '9 năm kinh nghiệm',
    rating: 4.7,
    services: ['lab-tests'],
    workingDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
    shifts: [
      { type: 'morning', startTime: '08:00', endTime: '12:00' },
      { type: 'afternoon', startTime: '14:00', endTime: '18:00' }
    ]
  }
];

// Generate available time slots for a doctor on a specific date
const generateTimeSlots = (doctor, date) => {
  const dayOfWeek = new Date(date).getDay();
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
          patientName: isAvailable ? null : `Bệnh nhân ${Math.floor(Math.random() * 100)}`
        });
      }
      currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
    }
  });

  return slots;
};

const AppointmentBooking = ({ onBookingComplete = null }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    fullName: 'Nguyễn Văn An', // Mock patient data
    phone: '0123456789',
    email: 'nguyenvanan@email.com',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    notes: '',
    isUrgent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add doctor specializations
  const doctorSpecializations = {
    'cd4': ['BS. Trần Thị Hương', 'BS. Hoàng Minh Tuấn'],
    'viral-load': ['BS. Trần Thị Hương', 'BS. Nguyễn Thu Hà'],
    'resistance': ['BS. Nguyễn Văn Minh', 'BS. Hoàng Minh Tuấn'],
    'nat': ['BS. Nguyễn Thu Hà', 'BS. Hoàng Minh Tuấn'],
    'ag-ab': ['BS. Trần Thị Hương', 'BS. Nguyễn Thu Hà'],
    'antigen': ['BS. Trần Thị Hương', 'BS. Nguyễn Thu Hà', 'BS. Hoàng Minh Tuấn']
  };

  // Update doctor filtering based on selected tests
  useEffect(() => {
    if (selectedService?.id === 'lab-tests' && selectedTests.length > 0) {
      // Get all doctors who can perform the selected tests
      const eligibleDoctors = new Set();
      selectedTests.forEach(testId => {
        doctorSpecializations[testId]?.forEach(doctorName => {
          eligibleDoctors.add(doctorName);
        });
      });

      // Filter doctors based on eligibility
      const filtered = mockDoctors.filter(doctor => 
        doctor.services.includes('lab-tests') && 
        eligibleDoctors.has(doctor.name)
      );
      
      setAvailableDoctors(filtered);
      // Reset selected doctor if they can't perform the selected tests
      if (selectedDoctor && !eligibleDoctors.has(selectedDoctor.name)) {
        setSelectedDoctor(null);
      }
    } else if (selectedService) {
      const filtered = mockDoctors.filter(doctor => 
        doctor.services.includes(selectedService.id)
      );
      setAvailableDoctors(filtered);
    }
  }, [selectedService, selectedTests]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedTests([]);
    if (service.id === 'lab-tests') {
      setStep(1.5); // New step for test selection
    } else {
      setStep(2);
    }
  };

  const handleTestSelection = (testId) => {
    setSelectedTests(prev => {
      const newTests = prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId];
      return newTests;
    });
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    if (slot.isAvailable) {
      setSelectedSlot(slot);
      setStep(3);
    }
  };

  const handlePatientInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatientInfo({
      ...patientInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bookingData = {
      service: selectedService,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      patientInfo,
      bookingId: `APT-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setIsSubmitting(false);
    
    if (onBookingComplete) {
      onBookingComplete(bookingData);
    }

    // Reset form
    setStep(4); // Success step
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedTests([]);
    setPatientInfo({
      ...patientInfo,
      notes: '',
      isUrgent: false
    });
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

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) { // Next 2 weeks
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 1.5, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {stepNumber === 1.5 ? '2' : Math.ceil(stepNumber)}
            </div>
            {stepNumber < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-center space-x-8 mb-6">
        <div className="text-center">
          <p className={`text-sm font-medium ${step >= 1 ? 'text-primary-600' : 'text-gray-500'}`}>
            Chọn dịch vụ
          </p>
        </div>
        <div className="text-center">
          <p className={`text-sm font-medium ${step >= 1.5 ? 'text-primary-600' : 'text-gray-500'}`}>
            Chọn loại xét nghiệm
          </p>
        </div>
        <div className="text-center">
          <p className={`text-sm font-medium ${step >= 2 ? 'text-primary-600' : 'text-gray-500'}`}>
            Chọn bác sĩ & thời gian
          </p>
        </div>
        <div className="text-center">
          <p className={`text-sm font-medium ${step >= 3 ? 'text-primary-600' : 'text-gray-500'}`}>
            Xác nhận thông tin
          </p>
        </div>
      </div>

      {/* Step 1: Select Service */}
      {step === 1 && (
        <Card title="Chọn dịch vụ khám">
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {mockServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="border rounded-lg p-6 hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">⏱️ {service.duration}</span>
                        </div>
                      </div>
                      <div className="text-primary-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Step 1.5: Select Test Types */}
      {step === 1.5 && selectedService?.id === 'lab-tests' && (
        <Card title="Chọn loại xét nghiệm">
          <div className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="test-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Loại xét nghiệm
                </label>
                <select
                  id="test-type"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={selectedTests[0] || ''}
                  onChange={(e) => setSelectedTests(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">-- Chọn loại xét nghiệm --</option>
                  {selectedService.testTypes.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display selected test details */}
              {selectedTests[0] && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Chi tiết xét nghiệm</h4>
                  {(() => {
                    const selectedTest = selectedService.testTypes.find(t => t.id === selectedTests[0]);
                    return (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">{selectedTest.description}</p>
                        <div className="text-sm text-gray-600">
                          <p>Bác sĩ chuyên môn:</p>
                          <ul className="list-disc list-inside mt-1">
                            {doctorSpecializations[selectedTest.id]?.map((doctor, index) => (
                              <li key={index}>{doctor}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Quay lại
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                disabled={selectedTests.length === 0}
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Select Doctor & Time */}
      {step === 2 && selectedService && (
        <div className="space-y-6">
          <Card title={`Chọn bác sĩ cho dịch vụ: ${selectedService.name}`}>
            <div className="p-6">
              {selectedService.id === 'lab-tests' && selectedTests.length > 0 && (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Xét nghiệm đã chọn:</h4>
                  {(() => {
                    const test = selectedService.testTypes.find(t => t.id === selectedTests[0]);
                    return (
                      <div>
                        <p className="text-blue-700">{test.name}</p>
                        <p className="text-sm text-blue-600">{test.description}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
              
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Doctors List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Các bác sĩ</h3>
                  {availableDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                          <p className="text-sm text-gray-500">{doctor.department}</p>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                            <span>{doctor.experience}</span>
                            <span>⭐ {doctor.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {selectedDoctor ? `Lịch làm việc - ${selectedDoctor.name}` : 'Chọn bác sĩ để xem lịch'}
                  </h3>
                  
                  {selectedDoctor ? (
                    <div className="space-y-4">
                      {/* Date Selection */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Chọn ngày khám</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {getNextWeekDates().slice(0, 8).map((date) => {
                            const dateObj = new Date(date);
                            const dayOfWeek = dateObj.getDay();
                            const isWorkingDay = selectedDoctor.workingDays.includes(dayOfWeek);
                            
                            return (
                              <button
                                key={date}
                                onClick={() => isWorkingDay && handleDateSelect(date)}
                                disabled={!isWorkingDay}
                                className={`p-3 text-sm rounded-lg border transition-colors ${
                                  selectedDate === date
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : isWorkingDay
                                    ? 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                                    : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                <div className="font-medium">
                                  {dateObj.toLocaleDateString('vi-VN', { weekday: 'short' })}
                                </div>
                                <div>
                                  {dateObj.getDate()}/{dateObj.getMonth() + 1}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      {selectedDate && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Chọn giờ khám</h4>
                          <div className="space-y-3">
                            {selectedDoctor.shifts.map((shift) => {
                              const slots = generateTimeSlots(selectedDoctor, selectedDate)
                                .filter(slot => slot.shift === shift.type);
                              
                              if (slots.length === 0) return null;

                              return (
                                <div key={shift.type} className="border rounded-lg p-4">
                                  <h5 className="font-medium text-gray-900 mb-3">
                                    {shift.type === 'morning' ? 'Ca sáng ' : 'Ca chiều '} 
                                    ({shift.startTime} - {shift.endTime})
                                  </h5>
                                  <div className="grid grid-cols-3 gap-2">
                                    {slots.map((slot) => (
                                      <button
                                        key={slot.id}
                                        onClick={() => handleSlotSelect(slot)}
                                        disabled={!slot.isAvailable}
                                        className={`p-2 text-sm rounded border transition-colors ${
                                          slot.isAvailable
                                            ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                                            : 'border-red-200 bg-red-50 text-red-700 cursor-not-allowed'
                                        }`}
                                      >
                                        <div className="font-medium">{slot.startTime}</div>
                                        <div className="text-xs">
                                          {slot.isAvailable ? 'Trống' : 'Đã đặt'}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>Vui lòng chọn bác sĩ để xem lịch làm việc</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setStep(selectedService.id === 'lab-tests' ? 1.5 : 1)}
            >
              Quay lại
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm Details */}
      {step === 3 && selectedService && selectedDoctor && selectedDate && selectedSlot && (
        <Card title="Xác nhận thông tin đặt lịch">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Appointment Summary */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">📋 Thông tin lịch hẹn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dịch vụ:</span>
                    <span className="font-medium">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bác sĩ:</span>
                    <span className="font-medium">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chuyên khoa:</span>
                    <span className="font-medium">{selectedDoctor.specialization}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày khám:</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">{selectedSlot.startTime} - {selectedSlot.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời lượng:</span>
                    <span className="font-medium">{selectedService.duration}</span>
                  </div>
                </div>
              </div>

              {/* Display Selected Test */}
              {selectedService.id === 'lab-tests' && selectedTests.length > 0 && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">🧪 Xét nghiệm đã chọn</h4>
                  {(() => {
                    const test = selectedService.testTypes.find(t => t.id === selectedTests[0]);
                    return (
                      <div>
                        <p className="font-medium text-gray-900">{test.name}</p>
                        <p className="text-sm text-gray-500">{test.description}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Patient Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">👤 Thông tin bệnh nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={patientInfo.fullName}
                    onChange={handlePatientInfoChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={patientInfo.phone}
                    onChange={handlePatientInfoChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={patientInfo.email}
                    onChange={handlePatientInfoChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={patientInfo.address}
                    onChange={handlePatientInfoChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú thêm
              </label>
              <textarea
                name="notes"
                rows={3}
                value={patientInfo.notes}
                onChange={handlePatientInfoChange}
                placeholder="Mô tả triệu chứng, vấn đề cần tư vấn hoặc yêu cầu đặc biệt..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="isUrgent"
                name="isUrgent"
                type="checkbox"
                checked={patientInfo.isUrgent}
                onChange={handlePatientInfoChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-700">
                🚨 Đây là trường hợp khẩn cấp
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={() => setStep(2)}>
                Quay lại
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting || !patientInfo.fullName || !patientInfo.phone}
                className="px-8"
              >
                {isSubmitting ? 'Đang đặt lịch...' : '✅ Xác nhận đặt lịch'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <Card>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Đặt lịch thành công!
            </h2>
            <p className="text-gray-600 mb-6">
              Lịch hẹn của bạn đã được xác nhận. Bạn sẽ nhận được tin nhắn xác nhận trong vài phút tới.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-medium text-green-800 mb-3">📄 Chi tiết lịch hẹn</h3>
              <div className="text-sm text-green-700 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p><strong>Dịch vụ:</strong> {selectedService?.name}</p>
                    <p><strong>Bác sĩ:</strong> {selectedDoctor?.name}</p>
                    <p><strong>Ngày:</strong> {selectedDate && formatDate(selectedDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Thời gian:</strong> {selectedSlot?.startTime} - {selectedSlot?.endTime}</p>
                    <p><strong>Bệnh nhân:</strong> {patientInfo.fullName}</p>
                    <p><strong>Mã lịch hẹn:</strong> APT-{Date.now()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="primary" onClick={resetBooking} className="w-full">
                <PlusIcon className="h-5 w-5 mr-2" />
                Đặt lịch hẹn mới
              </Button>
              <Button variant="outline" className="w-full">
                Xem lịch hẹn của tôi
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AppointmentBooking; 