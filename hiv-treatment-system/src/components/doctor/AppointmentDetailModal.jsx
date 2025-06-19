import React, { useState } from 'react';
import Button from '../common/Button';
import appointmentSyncService from '../../services/appointmentSyncService';
import {
  XMarkIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Predefined data for selections
const PREDEFINED_DIAGNOSES = [
  'HIV nhiễm trùng không triệu chứng',
  'HIV nhiễm trùng có triệu chứng',
  'AIDS với nhiễm trùng cơ hội',
  'HIV với bệnh lý thần kinh',
  'HIV với bệnh lý da',
  'HIV với suy giảm miễn dịch nặng',
  'HIV ổn định với điều trị ARV',
  'HIV kháng thuốc',
  'HIV với đồng nhiễm viêm gan B',
  'HIV với đồng nhiễm viêm gan C',
  'HIV với lao phổi',
  'HIV với nhiễm trùng nấm',
  'Theo dõi sau điều trị HIV',
  'Điều chỉnh phác đồ điều trị HIV'
];

const PREDEFINED_MEDICATIONS = [
  {
    id: 'biktarvy',
    name: 'Biktarvy',
    genericName: 'Bictegravir/Tenofovir alafenamide/Emtricitabine',
    dosages: ['50mg/25mg/200mg'],
    frequencies: ['Một lần mỗi ngày', 'Hai lần mỗi ngày'],
    instructions: ['Uống cùng với thức ăn', 'Uống khi đói', 'Uống vào buổi tối']
  },
  {
    id: 'descovy',
    name: 'Descovy',
    genericName: 'Tenofovir alafenamide/Emtricitabine',
    dosages: ['25mg/200mg'],
    frequencies: ['Một lần mỗi ngày'],
    instructions: ['Uống cùng với thức ăn', 'Uống vào buổi tối']
  },
  {
    id: 'isentress',
    name: 'Isentress',
    genericName: 'Raltegravir',
    dosages: ['400mg', '600mg'],
    frequencies: ['Hai lần mỗi ngày', 'Một lần mỗi ngày'],
    instructions: ['Uống trước bữa ăn 30 phút', 'Uống cùng với thức ăn']
  },
  {
    id: 'truvada',
    name: 'Truvada',
    genericName: 'Tenofovir disoproxil/Emtricitabine',
    dosages: ['300mg/200mg'],
    frequencies: ['Một lần mỗi ngày'],
    instructions: ['Uống cùng với thức ăn', 'Uống vào cùng giờ mỗi ngày']
  },
  {
    id: 'kaletra',
    name: 'Kaletra',
    genericName: 'Lopinavir/Ritonavir',
    dosages: ['200mg/50mg', '100mg/25mg'],
    frequencies: ['Hai lần mỗi ngày'],
    instructions: ['Uống cùng với thức ăn', 'Bảo quản trong tủ lạnh']
  }
];

const PREDEFINED_TREATMENTS = [
  'Tiếp tục phác đồ điều trị hiện tại',
  'Điều chỉnh liều thuốc',
  'Thay đổi phác đồ điều trị',
  'Tạm ngừng điều trị do tác dụng phụ',
  'Bổ sung thuốc hỗ trợ',
  'Theo dõi tác dụng phụ',
  'Tư vấn tuân thủ điều trị',
  'Điều trị nhiễm trùng cơ hội',
  'Hỗ trợ dinh dưỡng',
  'Tư vấn tâm lý',
  'Xét nghiệm theo dõi',
  'Chuyển tuyến chuyên khoa'
];

const AppointmentDetailModal = ({ 
  appointment, 
  isOpen, 
  onClose, 
  onEdit, 
  onCancel, 
  onComplete,
  onReschedule 
}) => {
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingResults, setIsSavingResults] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [resultsStatus, setResultsStatus] = useState(null);
  const [completionData, setCompletionData] = useState({
    diagnosis: '',
    customDiagnosis: '',
    medications: [],
    treatments: [],
    customTreatment: '',
    notes: '',
    nextAppointmentDate: '',
    followUpRequired: false,
    testOrders: []
  });

  // Debug logging
  console.log('AppointmentDetailModal render:', {
    isOpen,
    appointment: appointment ? {
      id: appointment.id,
      status: appointment.status,
      patientName: appointment.patientName
    } : null,
    showCompleteForm,
    isSubmitting,
    isSavingResults
  });

  if (!isOpen || !appointment) return null;

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

  const addMedication = () => {
    setCompletionData({
      ...completionData,
      medications: [
        ...completionData.medications,
        {
          id: Date.now(),
          medicationId: '',
          dosage: '',
          frequency: '',
          instructions: '',
          duration: ''
        }
      ]
    });
  };

  const removeMedication = (index) => {
    const newMedications = completionData.medications.filter((_, i) => i !== index);
    setCompletionData({ ...completionData, medications: newMedications });
  };

  const updateMedication = (index, field, value) => {
    const newMedications = [...completionData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    
    // Auto-fill medication details when medication is selected
    if (field === 'medicationId') {
      const selectedMed = PREDEFINED_MEDICATIONS.find(med => med.id === value);
      if (selectedMed) {
        newMedications[index] = {
          ...newMedications[index],
          name: selectedMed.name,
          genericName: selectedMed.genericName,
          dosage: selectedMed.dosages[0] || '',
          frequency: selectedMed.frequencies[0] || '',
          instructions: selectedMed.instructions[0] || ''
        };
      }
    }
    
    setCompletionData({ ...completionData, medications: newMedications });
  };

  const addTreatment = (treatment) => {
    if (!completionData.treatments.includes(treatment)) {
      setCompletionData({
        ...completionData,
        treatments: [...completionData.treatments, treatment]
      });
    }
  };

  const removeTreatment = (treatment) => {
    setCompletionData({
      ...completionData,
      treatments: completionData.treatments.filter(t => t !== treatment)
    });
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    setSyncStatus({ status: 'syncing', message: 'Đang hoàn thành cuộc hẹn và đồng bộ dữ liệu...' });

    try {
      const finalDiagnosis = completionData.diagnosis || completionData.customDiagnosis;
      const allTreatments = [
        ...completionData.treatments,
        ...(completionData.customTreatment ? [completionData.customTreatment] : [])
      ];

      const completedAppointment = {
        ...appointment,
        status: 'completed',
        completedAt: new Date().toISOString(),
        diagnosis: finalDiagnosis,
        medications: completionData.medications,
        treatments: allTreatments,
        prescription: generatePrescriptionText(),
        notes: completionData.notes,
        nextAppointmentDate: completionData.nextAppointmentDate,
        followUpRequired: completionData.followUpRequired,
        testOrders: completionData.testOrders
      };

      // Step 1: Update appointment status
      setSyncStatus({ status: 'syncing', message: 'Đang cập nhật trạng thái cuộc hẹn...' });
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Create follow-up appointment if required
      if (completionData.followUpRequired && completionData.nextAppointmentDate) {
        setSyncStatus({ status: 'syncing', message: 'Đang tạo lịch tái khám...' });
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Step 3: Send notifications
      setSyncStatus({ status: 'syncing', message: 'Đang gửi thông báo cho bệnh nhân và nhân viên...' });
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 4: Sync with all systems
      const syncResult = await appointmentSyncService.syncCompletedAppointment(completedAppointment);
      
      if (syncResult.success) {
        let successMessage = 'Hoàn thành cuộc hẹn thành công!';
        if (completionData.followUpRequired) {
          successMessage += ` Lịch tái khám ngày ${new Date(completionData.nextAppointmentDate).toLocaleDateString('vi-VN')} đã được tạo.`;
        }
        
        setSyncStatus({ 
          status: 'success', 
          message: successMessage
        });
        
        // Call the completion callback but don't auto-close
        onComplete(completedAppointment);
        
        // Reset form after a short delay to show success message
        setTimeout(() => {
          setShowCompleteForm(false);
          // Reset completion data for next use
          setCompletionData({
            diagnosis: '',
            customDiagnosis: '',
            medications: [],
            treatments: [],
            customTreatment: '',
            notes: '',
            nextAppointmentDate: '',
            followUpRequired: false,
            testOrders: []
          });
        }, 2000);
      } else {
        setSyncStatus({ 
          status: 'error', 
          message: `Lỗi đồng bộ: ${syncResult.message}` 
        });
      }
    } catch (error) {
      console.error('Error completing appointment:', error);
      setSyncStatus({ 
        status: 'error', 
        message: 'Có lỗi xảy ra khi hoàn thành lịch hẹn. Vui lòng thử lại.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveResults = async () => {
    setIsSavingResults(true);
    setResultsStatus({ status: 'saving', message: 'Đang lưu kết quả xét nghiệm...' });

    try {
      const finalDiagnosis = completionData.diagnosis || completionData.customDiagnosis;
      const allTreatments = [
        ...completionData.treatments,
        ...(completionData.customTreatment ? [completionData.customTreatment] : [])
      ];

      // Simulate saving results (in real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setResultsStatus({ 
        status: 'success', 
        message: 'Kết quả xét nghiệm đã được lưu thành công!' 
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setResultsStatus(null);
      }, 3000);

    } catch (error) {
      console.error('Error saving results:', error);
      setResultsStatus({ 
        status: 'error', 
        message: 'Có lỗi xảy ra khi lưu kết quả. Vui lòng thử lại.' 
      });
    } finally {
      setIsSavingResults(false);
    }
  };

  const generatePrescriptionText = () => {
    if (completionData.medications.length === 0) return '';
    
    return completionData.medications.map(med => {
      const medication = PREDEFINED_MEDICATIONS.find(m => m.id === med.medicationId);
      return `${medication?.name || med.name} ${med.dosage} - ${med.frequency} - ${med.instructions}${med.duration ? ` (${med.duration})` : ''}`;
    }).join('; ');
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden z-[10000]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Chi tiết lịch hẹn</h3>
                <p className="text-sm text-gray-500">{appointment.patientName}</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {!showCompleteForm ? (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin cơ bản</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Bệnh nhân:</span>
                          <span className="text-sm font-medium">{appointment.patientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">ID:</span>
                          <span className="text-sm font-medium">{appointment.patientId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Loại khám:</span>
                          <span className="text-sm font-medium">
                            {appointment.type === 'initial' ? 'Khám lần đầu' :
                             appointment.type === 'follow_up' ? 'Tái khám' :
                             appointment.type === 'urgent' ? 'Khẩn cấp' : 'Khác'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Hình thức:</span>
                          <span className="text-sm font-medium">
                            {appointment.isVirtual ? 'Trực tuyến' : 'Trực tiếp'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Trạng thái</h4>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(appointment.priority)}`}>
                          Ưu tiên: {appointment.priority === 'high' ? 'Cao' :
                                   appointment.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Thời gian</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{formatTime(appointment.time)} ({appointment.duration} phút)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Tạo bởi</h4>
                      <span className="text-sm text-gray-600">
                        {appointment.createdBy === 'system' ? 'Hệ thống tự động' :
                         appointment.createdBy === 'doctor' ? 'Bác sĩ' : 'Nhân viên'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reason and Notes */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Lý do khám</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {appointment.reason}
                  </p>
                </div>

                {appointment.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Ghi chú</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {appointment.notes}
                    </p>
                  </div>
                )}

                {/* Test Results Information */}
                {(appointment.lastTestDate || appointment.nextTestDue) && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Thông tin xét nghiệm</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {appointment.lastTestDate && (
                          <div>
                            <span className="text-blue-600">Lần cuối:</span>
                            <span className="ml-2">{appointment.lastTestDate}</span>
                          </div>
                        )}
                        {appointment.nextTestDue && (
                          <div>
                            <span className="text-blue-600">Tiếp theo:</span>
                            <span className="ml-2">{appointment.nextTestDue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Completion Results (if completed) */}
                {appointment.status === 'completed' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Kết quả khám</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="space-y-3">
                        {appointment.diagnosis && (
                          <div>
                            <span className="text-sm font-medium text-green-800">Chẩn đoán:</span>
                            <p className="text-sm text-green-700 mt-1">{appointment.diagnosis}</p>
                          </div>
                        )}
                        {appointment.medications && appointment.medications.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-green-800">Đơn thuốc:</span>
                            <div className="mt-1 space-y-1">
                              {appointment.medications.map((med, index) => (
                                <p key={index} className="text-sm text-green-700">
                                  • {med.name} {med.dosage} - {med.frequency} - {med.instructions}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        {appointment.treatments && appointment.treatments.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-green-800">Điều trị:</span>
                            <div className="mt-1 space-y-1">
                              {appointment.treatments.map((treatment, index) => (
                                <p key={index} className="text-sm text-green-700">• {treatment}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {appointment.nextAppointment && (
                          <div>
                            <span className="text-sm font-medium text-green-800">Hẹn tiếp theo:</span>
                            <p className="text-sm text-green-700 mt-1">{appointment.nextAppointment}</p>
                          </div>
                        )}
                        {appointment.completedAt && (
                          <div>
                            <span className="text-sm font-medium text-green-800">Hoàn thành lúc:</span>
                            <p className="text-sm text-green-700 mt-1">
                              {new Date(appointment.completedAt).toLocaleString('vi-VN')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reminder Status */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Nhắc nhở</h4>
                  <div className="flex items-center space-x-2">
                    {appointment.reminderSent ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-sm text-gray-600">
                      {appointment.reminderSent ? 'Đã gửi nhắc nhở' : 'Chưa gửi nhắc nhở'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Complete Appointment Form */
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Hoàn thành cuộc hẹn</h4>
                  <p className="text-sm text-blue-800">
                    <strong>Quy trình:</strong> 1) Nhập chẩn đoán và kê đơn thuốc → 2) Nhấn "Lưu kết quả" để lưu thông tin → 3) Nhấn "Hoàn thành & Đồng bộ" để kết thúc cuộc hẹn và thông báo cho bệnh nhân/nhân viên
                  </p>
                </div>
                
                {/* Diagnosis Section */}
                <div className="space-y-4">
                  <h5 className="text-md font-medium text-gray-800">Chẩn đoán</h5>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chọn chẩn đoán có sẵn
                    </label>
                    <select
                      value={completionData.diagnosis}
                      onChange={(e) => setCompletionData({...completionData, diagnosis: e.target.value, customDiagnosis: ''})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Chọn chẩn đoán...</option>
                      {PREDEFINED_DIAGNOSES.map((diagnosis, index) => (
                        <option key={index} value={diagnosis}>{diagnosis}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hoặc nhập chẩn đoán khác
                    </label>
                    <textarea
                      value={completionData.customDiagnosis}
                      onChange={(e) => setCompletionData({...completionData, customDiagnosis: e.target.value, diagnosis: ''})}
                      placeholder="Nhập chẩn đoán tùy chỉnh..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="2"
                      disabled={!!completionData.diagnosis}
                    />
                  </div>
                </div>

                {/* Medications Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-md font-medium text-gray-800">Đơn thuốc</h5>
                    <Button variant="outline" size="sm" onClick={addMedication}>
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Thêm thuốc
                    </Button>
                  </div>

                  {completionData.medications.map((medication, index) => (
                    <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h6 className="text-sm font-medium text-gray-700">Thuốc {index + 1}</h6>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeMedication(index)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên thuốc *
                          </label>
                          <select
                            value={medication.medicationId}
                            onChange={(e) => updateMedication(index, 'medicationId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                          >
                            <option value="">Chọn thuốc...</option>
                            {PREDEFINED_MEDICATIONS.map((med) => (
                              <option key={med.id} value={med.id}>
                                {med.name} ({med.genericName})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Liều lượng
                          </label>
                          <select
                            value={medication.dosage}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            disabled={!medication.medicationId}
                          >
                            <option value="">Chọn liều lượng...</option>
                            {medication.medicationId && 
                             PREDEFINED_MEDICATIONS.find(m => m.id === medication.medicationId)?.dosages.map((dosage, i) => (
                              <option key={i} value={dosage}>{dosage}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tần suất
                          </label>
                          <select
                            value={medication.frequency}
                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            disabled={!medication.medicationId}
                          >
                            <option value="">Chọn tần suất...</option>
                            {medication.medicationId && 
                             PREDEFINED_MEDICATIONS.find(m => m.id === medication.medicationId)?.frequencies.map((freq, i) => (
                              <option key={i} value={freq}>{freq}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hướng dẫn sử dụng
                          </label>
                          <select
                            value={medication.instructions}
                            onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            disabled={!medication.medicationId}
                          >
                            <option value="">Chọn hướng dẫn...</option>
                            {medication.medicationId && 
                             PREDEFINED_MEDICATIONS.find(m => m.id === medication.medicationId)?.instructions.map((inst, i) => (
                              <option key={i} value={inst}>{inst}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thời gian điều trị
                          </label>
                          <input
                            type="text"
                            value={medication.duration}
                            onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                            placeholder="VD: 3 tháng, 6 tháng, dài hạn..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Treatments Section */}
                <div className="space-y-4">
                  <h5 className="text-md font-medium text-gray-800">Phương pháp điều trị</h5>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chọn phương pháp điều trị
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {PREDEFINED_TREATMENTS.map((treatment, index) => (
                        <label key={index} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={completionData.treatments.includes(treatment)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                addTreatment(treatment);
                              } else {
                                removeTreatment(treatment);
                              }
                            }}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span>{treatment}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phương pháp điều trị khác
                    </label>
                    <textarea
                      value={completionData.customTreatment}
                      onChange={(e) => setCompletionData({...completionData, customTreatment: e.target.value})}
                      placeholder="Nhập phương pháp điều trị khác..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows="2"
                    />
                  </div>

                  {/* Selected treatments display */}
                  {completionData.treatments.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phương pháp đã chọn:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {completionData.treatments.map((treatment, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {treatment}
                            <button
                              type="button"
                              onClick={() => removeTreatment(treatment)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <XMarkIcon className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú thêm
                  </label>
                  <textarea
                    value={completionData.notes}
                    onChange={(e) => setCompletionData({...completionData, notes: e.target.value})}
                    placeholder="Ghi chú thêm về cuộc khám, tình trạng bệnh nhân, khuyến nghị..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows="3"
                  />
                </div>

                {/* Follow-up Section */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="followUpRequired"
                      checked={completionData.followUpRequired}
                      onChange={(e) => setCompletionData({...completionData, followUpRequired: e.target.checked})}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="followUpRequired" className="ml-2 block text-sm font-medium text-gray-900">
                      Cần tái khám
                    </label>
                  </div>

                  {completionData.followUpRequired && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày tái khám đề xuất *
                      </label>
                      <input
                        type="date"
                        value={completionData.nextAppointmentDate}
                        onChange={(e) => setCompletionData({...completionData, nextAppointmentDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Lịch tái khám sẽ được tự động tạo và thông báo cho bệnh nhân và nhân viên
                      </p>
                    </div>
                  )}
                </div>

                {/* Results Status Display */}
                {resultsStatus && (
                  <div className={`p-4 rounded-lg border ${
                    resultsStatus.status === 'success' ? 'bg-green-50 border-green-200' :
                    resultsStatus.status === 'error' ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {resultsStatus.status === 'saving' && (
                        <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
                      )}
                      {resultsStatus.status === 'success' && (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      )}
                      {resultsStatus.status === 'error' && (
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        resultsStatus.status === 'success' ? 'text-green-800' :
                        resultsStatus.status === 'error' ? 'text-red-800' :
                        'text-blue-800'
                      }`}>
                        {resultsStatus.message}
                      </span>
                    </div>
                  </div>
                )}

                {/* Sync Status Display */}
                {syncStatus && (
                  <div className={`p-4 rounded-lg border ${
                    syncStatus.status === 'success' ? 'bg-green-50 border-green-200' :
                    syncStatus.status === 'error' ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {syncStatus.status === 'syncing' && (
                        <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
                      )}
                      {syncStatus.status === 'success' && (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      )}
                      {syncStatus.status === 'error' && (
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        syncStatus.status === 'success' ? 'text-green-800' :
                        syncStatus.status === 'error' ? 'text-red-800' :
                        'text-blue-800'
                      }`}>
                        {syncStatus.message}
                      </span>
                    </div>
                    
                    {syncStatus.status === 'success' && (
                      <div className="mt-2">
                        <div className="text-xs text-green-700">
                          <ul className="list-disc list-inside space-y-1">
                            <li>✅ Cuộc hẹn đã được đánh dấu hoàn thành</li>
                            <li>✅ Kết quả khám đã được lưu vào hồ sơ bệnh nhân</li>
                            <li>✅ Hệ thống nhân viên đã được cập nhật</li>
                            {completionData.followUpRequired && (
                              <li>✅ Lịch tái khám ngày {new Date(completionData.nextAppointmentDate).toLocaleDateString('vi-VN')} đã được tạo tự động</li>
                            )}
                            {completionData.medications.length > 0 && (
                              <li>✅ Đơn thuốc ({completionData.medications.length} loại) đã được ghi nhận</li>
                            )}
                            <li>✅ Thông báo đã được gửi cho bệnh nhân qua SMS/Email</li>
                            {completionData.followUpRequired && (
                              <li>✅ Nhân viên đã được thông báo về lịch tái khám mới</li>
                            )}
                          </ul>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={onClose}
                          >
                            Đóng cửa sổ
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 min-h-[80px]">
            <div className="flex items-center space-x-2">
              {/* Debug info */}
              <span className="text-xs text-gray-500">
                Form: {showCompleteForm ? 'Complete' : 'View'} | Status: {appointment.status} | Submitting: {isSubmitting ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {!showCompleteForm ? (
                <>
                  <Button variant="outline" onClick={onClose}>
                    Đóng
                  </Button>
                  
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => onReschedule && onReschedule(appointment)}
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Đổi lịch
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => onCancel && onCancel(appointment)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
                        Hủy hẹn
                      </Button>
                      
                      <Button 
                        variant="primary" 
                        onClick={() => {
                          console.log('Hoàn thành button clicked - setting showCompleteForm to true');
                          setShowCompleteForm(true);
                        }}
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Hoàn thành
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Show different buttons based on completion status */}
                  {syncStatus?.status === 'success' ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowCompleteForm(false);
                          setSyncStatus(null);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                      
                      <Button 
                        variant="primary" 
                        onClick={onClose}
                      >
                        Đóng
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          console.log('Quay lại button clicked - setting showCompleteForm to false');
                          setShowCompleteForm(false);
                        }}
                        disabled={isSubmitting || isSavingResults}
                      >
                        Quay lại
                      </Button>
                      
                      <Button 
                        variant="secondary" 
                        onClick={() => {
                          console.log('Lưu kết quả button clicked');
                          handleSaveResults();
                        }}
                        disabled={
                          !(completionData.diagnosis || completionData.customDiagnosis) || 
                          isSavingResults ||
                          isSubmitting
                        }
                      >
                        {isSavingResults ? (
                          <>
                            <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                            Đang lưu...
                          </>
                        ) : (
                          <>
                            <DocumentTextIcon className="h-4 w-4 mr-1" />
                            Lưu kết quả
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="primary" 
                        onClick={() => {
                          console.log('Hoàn thành & Đồng bộ button clicked');
                          handleComplete();
                        }}
                        disabled={
                          !(completionData.diagnosis || completionData.customDiagnosis) || 
                          isSubmitting ||
                          isSavingResults ||
                          (completionData.followUpRequired && !completionData.nextAppointmentDate)
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <ArrowPathIcon className="h-4 w-4 mr-1 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          <>
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Hoàn thành & Đồng bộ
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal; 