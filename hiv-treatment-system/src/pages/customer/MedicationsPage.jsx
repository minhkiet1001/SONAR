import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CalendarIcon,
  BellIcon,
  DocumentTextIcon,
  HeartIcon,
  ShieldCheckIcon,
  XMarkIcon,
  EyeIcon,
  BeakerIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const MedicationsPage = () => {
  const [selectedMedicationId, setSelectedMedicationId] = useState(null);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Updated medications data aligned with doctor's prescription
  const medications = [
    {
      id: 1,
      name: 'Biktarvy®',
      genericName: 'Bictegravir/Tenofovir alafenamide/Emtricitabine',
      dosage: '50mg/25mg/200mg',
      frequency: 'Một lần mỗi ngày',
      timing: '8:00 Sáng',
      startDate: new Date('2023-01-15'),
      purpose: 'Điều trị HIV - Phác đồ một viên mỗi ngày (STR)',
      prescribedBy: 'BS. Nguyễn Thị Lan',
      instructions: 'Uống cùng giờ mỗi ngày, có thể uống với hoặc không có thức ăn. Không bỏ liều để tránh kháng thuốc.',
      sideEffects: ['Buồn nôn nhẹ (hiếm gặp)', 'Đau đầu (hiếm gặp)', 'Mệt mỏi (hiếm gặp)'],
      isActive: true,
      category: 'ARV - Thuốc kháng HIV',
      components: [
        {
          name: 'Bictegravir',
          dose: '50mg',
          class: 'INSTI',
          mechanism: 'Ngăn chặn enzyme integrase của HIV'
        },
        {
          name: 'Tenofovir alafenamidee',
          dose: '25mg', 
          class: 'NRTI',
          mechanism: 'Ngăn chặn enzyme reverse transcriptase'
        },
        {
          name: 'Emtricitabine',
          dose: '200mg',
          class: 'NRTI', 
          mechanism: 'Tăng cường hiệu quả với TAF'
        }
      ],
      effectiveness: 'Rất cao (>95%)',
      adherenceRate: 98,
      nextRefill: new Date('2024-04-15'),
      remainingDays: 25
    },
    {
      id: 2,
      name: 'Vitamin D3',
      genericName: 'Cholecalciferol',
      dosage: '1000 IU',
      frequency: 'Một lần mỗi ngày',
      timing: '8:00 Sáng (cùng với Biktarvy)',
      startDate: new Date('2023-02-01'),
      purpose: 'Bổ sung vitamin D - Hỗ trợ sức khỏe xương',
      prescribedBy: 'BS. Nguyễn Thị Lan',
      instructions: 'Uống cùng với bữa ăn để hấp thụ tốt hơn.',
      sideEffects: ['Hiếm khi có tác dụng phụ khi dùng đúng liều'],
      isActive: true,
      category: 'Vitamin & Khoáng chất',
      nextRefill: new Date('2024-05-01'),
      remainingDays: 41
    },
    {
      id: 3,
      name: 'Atripla',
      genericName: 'Efavirenz/Emtricitabine/Tenofovir disoproxil',
      dosage: '600mg/200mg/300mg',
      frequency: 'Một lần mỗi ngày',
      timing: '10:00 Tối',
      startDate: new Date('2022-06-10'),
      endDate: new Date('2023-01-14'),
      purpose: 'Điều trị HIV - Phác đồ trước đây',
      prescribedBy: 'BS. Nguyễn Thị Lan',
      instructions: 'Đã ngừng sử dụng và chuyển sang Biktarvy để giảm tác dụng phụ.',
      sideEffects: ['Mất ngủ', 'Ác mộng', 'Chóng mặt', 'Phát ban'],
      isActive: false,
      category: 'ARV - Thuốc kháng HIV (Đã ngừng)',
      reasonStopped: 'Chuyển sang phác đồ mới có ít tác dụng phụ hơn'
    }
  ];

  // Filter active medications
  const activeMedications = medications.filter(med => med.isActive);
  const inactiveMedications = medications.filter(med => !med.isActive);

  // Selected medication details
  const selectedMedication = selectedMedicationId
    ? medications.find(med => med.id === selectedMedicationId)
    : null;

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Generate medication schedule for the week
  const generateWeeklySchedule = () => {
    const schedule = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      const daySchedule = {
        date,
        medications: activeMedications.map(med => ({
          ...med,
          taken: i < 0, // Past days are marked as taken
          time: med.timing
        }))
      };
      
      schedule.push(daySchedule);
    }
    
    return schedule;
  };

  const weeklySchedule = generateWeeklySchedule();

  // Modal Component for Medication Details
  const MedicationModal = ({ medication, isOpen, onClose }) => {
    if (!isOpen || !medication) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{medication.name}</h2>
                  <p className="text-gray-600">{medication.genericName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Liều lượng:</span>
                      <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded">{medication.dosage}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Tần suất:</span>
                      <span className="font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded">{medication.frequency}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded">{medication.timing}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block mb-1">Mục đích:</span>
                      <span className="text-gray-900 font-medium">{medication.purpose}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Bác sĩ kê đơn:</span>
                      <span className="text-gray-900 font-medium">{medication.prescribedBy}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Danh mục:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{medication.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Components (for medications with components) */}
            {medication.components && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BeakerIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Thành phần hoạt chất
                </h3>
                <div className="space-y-4">
                  {medication.components.map((component, idx) => (
                    <div key={idx} className="border-l-4 border-blue-300 pl-4 bg-blue-50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{component.name}</h4>
                        <span className="text-blue-600 font-bold text-lg">{component.dose}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                          {component.class}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{component.mechanism}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions and Side Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  Hướng dẫn sử dụng
                </h3>
                <p className="text-sm text-yellow-700 leading-relaxed">{medication.instructions}</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  Tác dụng phụ có thể gặp
                </h3>
                <div className="space-y-2">
                  {medication.sideEffects.map((effect, idx) => (
                    <div key={idx} className="flex items-start bg-white p-3 rounded-lg">
                      <span className="text-red-500 mr-3 mt-0.5 font-bold">•</span>
                      <span className="text-sm text-red-700">{effect}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Refill and Statistics */}
            {medication.isActive && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Lịch tái khám & nhận thuốc
                  </h3>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-purple-700">Ngày tái khám:</span>
                      <span className="font-semibold text-purple-900">{formatDate(medication.nextRefill)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-700">Còn lại:</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded font-medium">
                        {medication.remainingDays} ngày
                      </span>
                    </div>
                  </div>
                </div>

                {medication.adherenceRate && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 mr-2" />
                      Thống kê tuân thủ
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{medication.adherenceRate}%</div>
                        <div className="text-sm text-green-700">Tỷ lệ tuân thủ điều trị</div>
                        <div className="mt-3 text-xs text-green-600">
                          Hiệu quả: {medication.effectiveness}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Modal Component for Weekly Schedule
  const ScheduleModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <ClockIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lịch trình uống thuốc tuần này</h2>
                  <p className="text-gray-600">Theo dõi và quản lý lịch uống thuốc hàng ngày</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklySchedule.map((day, index) => (
                <div key={index} className={`p-5 rounded-xl border-2 ${
                  index === 0 
                    ? 'bg-blue-50 border-blue-300 shadow-md' 
                    : 'bg-gray-50 border-gray-200 hover:border-blue-200 hover:shadow-sm'
                } transition-all`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {day.date.toLocaleDateString('vi-VN', { weekday: 'long' })}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {day.date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                    {index === 0 && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        Hôm nay
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {day.medications.map((med) => (
                      <div key={med.id} className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{med.name}</h4>
                          <div className="flex items-center space-x-2">
                            {day.taken ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{med.dosage}</span>
                          <span className="bg-gray-100 px-2 py-1 rounded">{med.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal Component for Medication History
  const HistoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gray-100 rounded-full mr-4">
                  <ClockIcon className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lịch sử thuốc điều trị</h2>
                  <p className="text-gray-600">Các thuốc đã sử dụng trong quá trình điều trị</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {inactiveMedications.length > 0 ? (
              <div className="space-y-4">
                {inactiveMedications.map((medication) => (
                  <div key={medication.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-200 rounded-lg">
                          <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
                          <p className="text-sm text-gray-600">{medication.genericName}</p>
                        </div>
                      </div>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        Đã ngừng
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Thời gian sử dụng:</div>
                        <div className="font-medium text-gray-900">
                          {medication.startDate.toLocaleDateString('vi-VN')} - {medication.endDate.toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Liều lượng:</div>
                        <div className="font-medium text-gray-900">{medication.dosage}</div>
                      </div>
                    </div>
                    
                    {medication.reasonStopped && (
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                        <div className="text-sm text-blue-600 font-medium mb-1">Lý do ngừng thuốc:</div>
                        <div className="text-sm text-blue-800">{medication.reasonStopped}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4">
                  <ClockIcon className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có lịch sử thuốc</h3>
                <p className="text-gray-500">Không có thuốc nào đã ngừng sử dụng.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thuốc điều trị của tôi</h1>
              <p className="text-gray-600 mt-1">Quản lý thuốc và lịch trình điều trị HIV do bác sĩ chỉ định</p>
            </div>
            <div className="flex space-x-3">
          
              <Button variant="primary" className="flex items-center" onClick={() => setShowReminderModal(true)}>
                <BellIcon className="h-4 w-4 mr-2" />
                Đặt lời nhắc
              </Button>
            </div>
          </div>
        </div>

        {/* Current Medications - Horizontal Layout */}
        <Card className="mb-6">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Thuốc điều trị hiện tại theo phác đồ</h2>
                  <p className="text-gray-600 mt-1">Phác đồ điều trị do BS. Nguyễn Thị Lan chỉ định</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {activeMedications.length} thuốc đang dùng
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeMedications.map((medication) => (
                <div 
                  key={medication.id}
                  className="border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md border-gray-200 hover:border-green-200"
                  onClick={() => {
                    setSelectedMedicationId(medication.id);
                    setShowMedicationModal(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
                        <p className="text-sm text-gray-600">{medication.dosage}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                          {medication.timing}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{medication.frequency}</p>
                      </div>
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <div className="text-sm font-bold text-blue-600">{medication.remainingDays}</div>
                      <div className="text-xs text-gray-600">Ngày còn lại</div>
                    </div>
                    {medication.adherenceRate && (
                      <div className="text-center p-2 bg-white rounded-lg border">
                        <div className="text-sm font-bold text-purple-600">{medication.adherenceRate}%</div>
                        <div className="text-xs text-gray-600">Tuân thủ</div>
                      </div>
                    )}
                    <div className="text-center p-2 bg-white rounded-lg border">
                      <div className="text-sm font-bold text-green-600">Hiệu quả</div>
                      <div className="text-xs text-gray-600">Rất cao</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {medication.category}
                    </span>
                    <span className="text-gray-600">
                      Bắt đầu: {medication.startDate.toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Main Content - Simplified Layout with Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule Summary */}
          <Card>
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Lịch hôm nay</h3>
                    <p className="text-gray-600 mt-1">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  </div>
                </div>
                <Button 
                  variant="primary" 
                  className="flex items-center"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Xem lịch tuần
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activeMedications.map((medication) => (
                  <div key={medication.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                          <p className="text-sm text-gray-600">{medication.dosage}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                            {medication.timing}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{medication.frequency}</p>
                        </div>
                        <div className="h-6 w-6 border-2 border-gray-300 rounded-full hover:border-green-500 cursor-pointer transition-colors"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {medication.category}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedMedicationId(medication.id);
                          setShowMedicationModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Medication History & Actions */}
          <Card>
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <ClockIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Quản lý & Lịch sử</h3>
                    <p className="text-gray-600 mt-1">Theo dõi và quản lý thuốc điều trị</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={() => setShowReminderModal(true)}
                >
                  <BellIcon className="h-4 w-4 mr-2" />
                  Đặt lời nhắc
                </Button>
              
              </div>

              {/* Medication History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Lịch sử thuốc</h4>
                  {inactiveMedications.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => setShowHistoryModal(true)}
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Xem tất cả
                    </Button>
                  )}
                </div>
                
                {inactiveMedications.length > 0 ? (
                  <div className="space-y-3">
                    {inactiveMedications.slice(0, 3).map((medication) => (
                      <div key={medication.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="p-1 bg-gray-200 rounded">
                              <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                              </svg>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{medication.name}</h5>
                              <p className="text-xs text-gray-600">{medication.dosage}</p>
                            </div>
                          </div>
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                            Đã ngừng
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p className="mb-1">
                            {medication.startDate.toLocaleDateString('vi-VN')} - {medication.endDate.toLocaleDateString('vi-VN')}
                          </p>
                          {medication.reasonStopped && (
                            <p className="text-blue-600 font-medium">Lý do: {medication.reasonStopped}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <ClockIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h5 className="text-sm font-medium text-gray-900 mb-1">Chưa có lịch sử thuốc</h5>
                    <p className="text-xs text-gray-500">Không có thuốc nào đã ngừng sử dụng</p>
                  </div>
                )}
              </div>

              {/* Additional Actions */}
              <div className="pt-4 border-t border-gray-200">
                {/* <Button variant="outline" className="w-full flex items-center justify-center text-sm">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                  Báo cáo tác dụng phụ
                </Button> */}
              </div>
            </div>
          </Card>
        </div>

        {/* Educational Content - Simplified */}
        <div className="mt-8">
          <Card>
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <HeartIcon className="h-6 w-6 mr-2 text-indigo-600" />
                Thông tin quan trọng về điều trị HIV
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                    Tầm quan trọng của việc tuân thủ
                  </h4>
                  <p className="text-sm text-green-800 leading-relaxed">
                    Uống thuốc đúng giờ, đúng liều là chìa khóa thành công trong điều trị HIV. 
                    Tuân thủ tốt giúp duy trì tải lượng virus ở mức không phát hiện được, 
                    bảo vệ hệ miễn dịch và ngăn ngừa kháng thuốc.
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <InformationCircleIcon className="h-5 w-5 mr-2" />
                    U=U: Undetectable = Untransmittable
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Khi tải lượng virus không phát hiện được (dưới 50 copies/mL), 
                    bạn không thể lây truyền HIV cho người khác qua đường tình dục. 
                    Đây là một trong những thành tựu y học quan trọng nhất.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal Components */}
      {selectedMedication && (
        <MedicationModal
          medication={selectedMedication}
          isOpen={showMedicationModal}
          onClose={() => setShowMedicationModal(false)}
        />
      )}

      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />

      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </Layout>
  );
};

export default MedicationsPage;