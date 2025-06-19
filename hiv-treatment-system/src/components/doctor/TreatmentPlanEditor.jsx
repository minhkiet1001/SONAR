import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  TrashIcon,
  ClockIcon,
  BeakerIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PencilIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import TreatmentPlanPatientInfo from './TreatmentPlanPatientInfo';

const TreatmentPlanEditor = ({ 
  patientId, 
  patient = null,
  patientTestResults = [],
  patientCurrentMedications = [],
  existingPlan = null, 
  onSave, 
  onCancel 
}) => {
  const [planData, setPlanData] = useState({
    patientId: patientId,
    planName: '',
    startDate: '',
    endDate: '',
    status: 'active',
    medications: [],
    monitoring: [],
    notes: '',
    goals: [],
    warnings: []
  });

  const [activeTab, setActiveTab] = useState('patient-info');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock medication database
  const availableMedications = [
    {
      id: 'biktarvy',
      name: 'Biktarvy',
      genericName: 'Bictegravir/Tenofovir alafenamide/Emtricitabine',
      dosages: ['50mg/25mg/200mg'],
      frequencies: ['Một lần mỗi ngày', 'Hai lần mỗi ngày'],
      sideEffects: ['Buồn nôn', 'Đau đầu', 'Mệt mỏi'],
      contraindications: ['Suy thận nặng', 'Dị ứng thành phần'],
      interactions: ['Rifampin', 'Carbamazepine']
    },
    {
      id: 'descovy',
      name: 'Descovy',
      genericName: 'Tenofovir alafenamide/Emtricitabine',
      dosages: ['25mg/200mg'],
      frequencies: ['Một lần mỗi ngày'],
      sideEffects: ['Buồn nôn', 'Đau đầu'],
      contraindications: ['Suy thận nặng'],
      interactions: ['Rifampin']
    },
    {
      id: 'isentress',
      name: 'Isentress',
      genericName: 'Raltegravir',
      dosages: ['400mg', '600mg'],
      frequencies: ['Hai lần mỗi ngày', 'Một lần mỗi ngày'],
      sideEffects: ['Mất ngủ', 'Đau đầu', 'Chóng mặt'],
      contraindications: ['Dị ứng thành phần'],
      interactions: ['Rifampin', 'Phenytoin']
    }
  ];

  // Mock monitoring tests
  const availableTests = [
    {
      id: 'viral-load',
      name: 'Tải lượng virus HIV',
      frequency: 'Mỗi 3 tháng',
      normalRange: '<50 bản sao/mL'
    },
    {
      id: 'cd4-count',
      name: 'Số lượng CD4',
      frequency: 'Mỗi 3-6 tháng',
      normalRange: '500-1500 tế bào/mm³'
    },
    {
      id: 'liver-function',
      name: 'Chức năng gan',
      frequency: 'Mỗi 6 tháng',
      normalRange: 'ALT: 7-55 U/L, AST: 8-48 U/L'
    },
    {
      id: 'kidney-function',
      name: 'Chức năng thận',
      frequency: 'Mỗi 6 tháng',
      normalRange: 'Creatinine: 0.7-1.3 mg/dL'
    }
  ];

  useEffect(() => {
    if (existingPlan) {
      setPlanData(existingPlan);
    } else if (patient) {
      // Initialize with patient data
      setPlanData(prev => ({
        ...prev,
        planName: `Kế hoạch điều trị HIV - ${patient.name}`,
        startDate: new Date().toISOString().split('T')[0],
        notes: `Bệnh nhân: ${patient.name}, ${patient.age} tuổi, ${patient.gender}\n` +
               `Chẩn đoán: ${patient.diagnosisDate}\n` +
               (patient.allergies.length > 0 ? `Dị ứng: ${patient.allergies.join(', ')}\n` : '') +
               (patient.comorbidities.length > 0 ? `Bệnh kèm theo: ${patient.comorbidities.join(', ')}\n` : ''),
        warnings: [
          ...patient.allergies.map(allergy => `Dị ứng ${allergy}`),
          ...patient.comorbidities.map(condition => `Bệnh kèm theo: ${condition}`)
        ]
      }));
    }
  }, [existingPlan, patient]);

  // Check for drug interactions and contraindications
  const checkMedicationSafety = (medicationId) => {
    const medication = availableMedications.find(med => med.id === medicationId);
    if (!medication || !patient) return { warnings: [], contraindications: [] };

    const warnings = [];
    const contraindications = [];

    // Check allergies
    patient.allergies.forEach(allergy => {
      if (medication.contraindications.some(contra => 
        contra.toLowerCase().includes(allergy.toLowerCase())
      )) {
        contraindications.push(`Dị ứng ${allergy}`);
      }
    });

    // Check comorbidities
    patient.comorbidities.forEach(condition => {
      if (condition.includes('thận') && medication.contraindications.includes('Suy thận nặng')) {
        warnings.push('Cần theo dõi chức năng thận');
      }
      if (condition.includes('gan') && medication.sideEffects.includes('Độc tính gan')) {
        warnings.push('Cần theo dõi chức năng gan');
      }
    });

    // Check interactions with current medications
    patientCurrentMedications.forEach(currentMed => {
      if (medication.interactions.includes(currentMed.name)) {
        warnings.push(`Tương tác với ${currentMed.name}`);
      }
    });

    return { warnings, contraindications };
  };

  // Get latest test result for a specific test type
  const getLatestTestResult = (testType) => {
    return patientTestResults.find(result => result.testType === testType);
  };

  const addMedication = () => {
    const newMedication = {
      id: Date.now(),
      medicationId: '',
      dosage: '',
      frequency: '',
      instructions: '',
      startDate: '',
      endDate: '',
      isActive: true,
      sideEffects: [],
      warnings: []
    };
    
    setPlanData({
      ...planData,
      medications: [...planData.medications, newMedication]
    });
  };

  const updateMedication = (index, field, value) => {
    const updatedMedications = [...planData.medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    
    // If medication is changed, update safety information
    if (field === 'medicationId') {
      const selectedMed = availableMedications.find(med => med.id === value);
      const safety = checkMedicationSafety(value);
      
      updatedMedications[index] = {
        ...updatedMedications[index],
        name: selectedMed?.name || '',
        genericName: selectedMed?.genericName || '',
        sideEffects: selectedMed?.sideEffects || [],
        warnings: safety.warnings,
        contraindications: safety.contraindications
      };
    }
    
    setPlanData({ ...planData, medications: updatedMedications });
  };

  const removeMedication = (index) => {
    const updatedMedications = planData.medications.filter((_, i) => i !== index);
    setPlanData({
      ...planData,
      medications: updatedMedications
    });
  };

  const addMonitoring = () => {
    const newMonitoring = {
      id: Date.now(),
      testId: '',
      frequency: '',
      nextDue: '',
      notes: '',
      isActive: true
    };
    
    setPlanData({
      ...planData,
      monitoring: [...planData.monitoring, newMonitoring]
    });
  };

  const updateMonitoring = (index, field, value) => {
    const updatedMonitoring = [...planData.monitoring];
    updatedMonitoring[index] = {
      ...updatedMonitoring[index],
      [field]: value
    };

    // Auto-populate test details when test is selected
    if (field === 'testId') {
      const selectedTest = availableTests.find(test => test.id === value);
      if (selectedTest) {
        updatedMonitoring[index] = {
          ...updatedMonitoring[index],
          name: selectedTest.name,
          frequency: selectedTest.frequency,
          normalRange: selectedTest.normalRange
        };
      }
    }

    setPlanData({
      ...planData,
      monitoring: updatedMonitoring
    });
  };

  const removeMonitoring = (index) => {
    const updatedMonitoring = planData.monitoring.filter((_, i) => i !== index);
    setPlanData({
      ...planData,
      monitoring: updatedMonitoring
    });
  };

  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      description: '',
      targetDate: '',
      status: 'pending',
      priority: 'medium'
    };
    
    setPlanData({
      ...planData,
      goals: [...planData.goals, newGoal]
    });
  };

  const updateGoal = (index, field, value) => {
    const updatedGoals = [...planData.goals];
    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value
    };

    setPlanData({
      ...planData,
      goals: updatedGoals
    });
  };

  const removeGoal = (index) => {
    const updatedGoals = planData.goals.filter((_, i) => i !== index);
    setPlanData({
      ...planData,
      goals: updatedGoals
    });
  };

  const validatePlan = () => {
    const newErrors = {};

    if (!planData.planName.trim()) {
      newErrors.planName = 'Tên kế hoạch là bắt buộc';
    }

    if (!planData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu là bắt buộc';
    }

    if (planData.medications.length === 0) {
      newErrors.medications = 'Phải có ít nhất một loại thuốc';
    }

    planData.medications.forEach((med, index) => {
      if (!med.medicationId) {
        newErrors[`medication_${index}`] = 'Phải chọn thuốc';
      }
      if (!med.dosage) {
        newErrors[`dosage_${index}`] = 'Phải nhập liều lượng';
      }
      if (!med.frequency) {
        newErrors[`frequency_${index}`] = 'Phải nhập tần suất';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validatePlan()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const planToSave = {
        ...planData,
        lastModified: new Date(),
        modifiedBy: 'BS. Nguyễn Văn Minh'
      };

      onSave(planToSave);
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'patient-info', name: 'Thông tin bệnh nhân', icon: CalendarIcon },
    { id: 'medications', name: 'Thuốc điều trị', icon: BeakerIcon },
    { id: 'monitoring', name: 'Theo dõi', icon: ClockIcon },
    { id: 'goals', name: 'Mục tiêu', icon: CheckCircleIcon },
    { id: 'notes', name: 'Ghi chú', icon: DocumentTextIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên kế hoạch điều trị *
              </label>
              <Input
                value={planData.planName}
                onChange={(e) => setPlanData({...planData, planName: e.target.value})}
                placeholder="VD: Kế hoạch điều trị HIV - Giai đoạn 1"
                error={errors.planName}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày bắt đầu *
              </label>
              <Input
                type="date"
                value={planData.startDate}
                onChange={(e) => setPlanData({...planData, startDate: e.target.value})}
                error={errors.startDate}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày kết thúc (dự kiến)
              </label>
              <Input
                type="date"
                value={planData.endDate}
                onChange={(e) => setPlanData({...planData, endDate: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={planData.status}
                onChange={(e) => setPlanData({...planData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="active">Đang hoạt động</option>
                <option value="paused">Tạm dừng</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'patient-info' && (
        <Card>
          <div className="p-6">
            <TreatmentPlanPatientInfo 
              patientData={{
                name: patient?.name || '',
                age: patient?.age || '',
                gender: patient?.gender || '',
                diagnosisDate: patient?.diagnosisDate || '',
                allergies: patient?.allergies || '',
                comorbidities: patient?.comorbidities || ''
              }}
              onUpdateAllergies={(allergies) => {
                setPlanData({
                  ...planData,
                  patientAllergies: allergies
                });
              }}
              onUpdateComorbidities={(comorbidities) => {
                setPlanData({
                  ...planData,
                  patientComorbidities: comorbidities
                });
              }}
            />
          </div>
        </Card>
      )}

      {activeTab === 'medications' && (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Thuốc điều trị</h3>
              <Button variant="outline" onClick={addMedication}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Thêm thuốc
              </Button>
            </div>

            {errors.medications && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.medications}</p>
              </div>
            )}

            <div className="space-y-4">
              {planData.medications.map((medication, index) => (
                <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Thuốc #{index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMedication(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thuốc *
                      </label>
                      <select
                        value={medication.medicationId}
                        onChange={(e) => updateMedication(index, 'medicationId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Chọn thuốc</option>
                        {availableMedications.map((med) => (
                          <option key={med.id} value={med.id}>
                            {med.name} ({med.genericName})
                          </option>
                        ))}
                      </select>
                      {errors[`medication_${index}`] && (
                        <p className="text-sm text-red-600 mt-1">{errors[`medication_${index}`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Liều lượng *
                      </label>
                      <select
                        value={medication.dosage}
                        onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={!medication.medicationId}
                      >
                        <option value="">Chọn liều lượng</option>
                        {medication.medicationId && 
                          availableMedications
                            .find(med => med.id === medication.medicationId)
                            ?.dosages.map((dosage) => (
                              <option key={dosage} value={dosage}>
                                {dosage}
                              </option>
                            ))
                        }
                      </select>
                      {errors[`dosage_${index}`] && (
                        <p className="text-sm text-red-600 mt-1">{errors[`dosage_${index}`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tần suất *
                      </label>
                      <select
                        value={medication.frequency}
                        onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={!medication.medicationId}
                      >
                        <option value="">Chọn tần suất</option>
                        {medication.medicationId && 
                          availableMedications
                            .find(med => med.id === medication.medicationId)
                            ?.frequencies.map((frequency) => (
                              <option key={frequency} value={frequency}>
                                {frequency}
                              </option>
                            ))
                        }
                      </select>
                      {errors[`frequency_${index}`] && (
                        <p className="text-sm text-red-600 mt-1">{errors[`frequency_${index}`]}</p>
                      )}
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hướng dẫn sử dụng
                      </label>
                      <textarea
                        value={medication.instructions}
                        onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                        placeholder="VD: Uống cùng với thức ăn, tránh uống cùng với sữa..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows="2"
                      />
                    </div>
                  </div>

                  {/* Safety Warnings */}
                  {(medication.contraindications?.length > 0 || medication.warnings?.length > 0) && (
                    <div className="mt-4 space-y-2">
                      {medication.contraindications?.length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800">Chống chỉ định:</p>
                              <ul className="text-sm text-red-700 mt-1">
                                {medication.contraindications.map((contra, idx) => (
                                  <li key={idx}>• {contra}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {medication.warnings?.length > 0 && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Cảnh báo:</p>
                              <ul className="text-sm text-yellow-700 mt-1">
                                {medication.warnings.map((warning, idx) => (
                                  <li key={idx}>• {warning}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {medication.sideEffects && medication.sideEffects.length > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <div className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-medium text-gray-800">Tác dụng phụ có thể gặp:</h5>
                          <p className="text-sm text-gray-700">{medication.sideEffects.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {planData.medications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BeakerIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Chưa có thuốc nào được thêm vào kế hoạch điều trị</p>
                  <Button variant="outline" onClick={addMedication} className="mt-4">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Thêm thuốc đầu tiên
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'monitoring' && (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Theo dõi và xét nghiệm</h3>
              <Button variant="outline" onClick={addMonitoring}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Thêm xét nghiệm
              </Button>
            </div>

            <div className="space-y-4">
              {planData.monitoring.map((test, index) => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Xét nghiệm #{index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMonitoring(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loại xét nghiệm
                      </label>
                      <select
                        value={test.testId}
                        onChange={(e) => {
                          const selectedTest = availableTests.find(t => t.id === e.target.value);
                          updateMonitoring(index, 'testId', e.target.value);
                          if (selectedTest) {
                            updateMonitoring(index, 'name', selectedTest.name);
                            updateMonitoring(index, 'frequency', selectedTest.frequency);
                            updateMonitoring(index, 'normalRange', selectedTest.normalRange);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Chọn xét nghiệm</option>
                        {availableTests.map((availableTest) => (
                          <option key={availableTest.id} value={availableTest.id}>
                            {availableTest.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tần suất
                      </label>
                      <Input
                        value={test.frequency}
                        onChange={(e) => updateMonitoring(index, 'frequency', e.target.value)}
                        placeholder="VD: Mỗi 3 tháng"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lần xét nghiệm tiếp theo
                      </label>
                      <Input
                        type="date"
                        value={test.nextDue}
                        onChange={(e) => updateMonitoring(index, 'nextDue', e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <textarea
                        value={test.notes}
                        onChange={(e) => updateMonitoring(index, 'notes', e.target.value)}
                        placeholder="VD: Theo dõi đáp ứng điều trị..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows="2"
                      />
                    </div>
                  </div>

                  {/* Show latest test result if available */}
                  {test.testId && (() => {
                    const testName = availableTests.find(t => t.id === test.testId)?.name;
                    const latestResult = testName ? getLatestTestResult(testName) : null;
                    
                    if (latestResult) {
                      return (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <BeakerIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-800">Kết quả gần nhất:</p>
                              <div className="mt-1 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-blue-600">Kết quả:</span>
                                  <span className={`ml-2 font-medium ${
                                    latestResult.status === 'normal' ? 'text-green-700' :
                                    latestResult.status === 'abnormal' || latestResult.status === 'high' ? 'text-red-700' :
                                    'text-yellow-700'
                                  }`}>
                                    {latestResult.result} {latestResult.unit}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-blue-600">Ngày XN:</span>
                                  <span className="ml-2">{latestResult.testDate}</span>
                                </div>
                              </div>
                              <div className="mt-1 text-sm">
                                <span className="text-blue-600">Giá trị bình thường:</span>
                                <span className="ml-2">{latestResult.normalRange}</span>
                              </div>
                              {latestResult.notes && (
                                <div className="mt-2 text-sm text-blue-700 italic">
                                  {latestResult.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              ))}

              {planData.monitoring.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Chưa có xét nghiệm theo dõi nào</p>
                  <Button variant="outline" onClick={addMonitoring} className="mt-4">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Thêm xét nghiệm đầu tiên
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'goals' && (
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Mục tiêu điều trị</h3>
              <Button variant="outline" onClick={addGoal}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Thêm mục tiêu
              </Button>
            </div>

            <div className="space-y-4">
              {planData.goals.map((goal, index) => (
                <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Mục tiêu #{index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeGoal(index)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mô tả mục tiêu
                      </label>
                      <textarea
                        value={goal.description}
                        onChange={(e) => updateGoal(index, 'description', e.target.value)}
                        placeholder="VD: Đạt tải lượng virus không phát hiện được"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows="3"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ngày mục tiêu
                        </label>
                        <Input
                          type="date"
                          value={goal.targetDate}
                          onChange={(e) => updateGoal(index, 'targetDate', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mức độ ưu tiên
                        </label>
                        <select
                          value={goal.priority}
                          onChange={(e) => updateGoal(index, 'priority', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="low">Thấp</option>
                          <option value="medium">Trung bình</option>
                          <option value="high">Cao</option>
                          <option value="critical">Khẩn cấp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Trạng thái
                        </label>
                        <select
                          value={goal.status}
                          onChange={(e) => updateGoal(index, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="pending">Đang thực hiện</option>
                          <option value="in-progress">Đang tiến triển</option>
                          <option value="achieved">Đã đạt được</option>
                          <option value="delayed">Bị trễ</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {planData.goals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircleIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Chưa có mục tiêu điều trị nào</p>
                  <Button variant="outline" onClick={addGoal} className="mt-4">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Thêm mục tiêu đầu tiên
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'notes' && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ghi chú và hướng dẫn</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú chung về kế hoạch điều trị
                </label>
                <textarea
                  value={planData.notes}
                  onChange={(e) => setPlanData({...planData, notes: e.target.value})}
                  placeholder="Nhập ghi chú, hướng dẫn đặc biệt, lưu ý quan trọng..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="6"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Lưu ý quan trọng</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tuân thủ đúng giờ uống thuốc</li>
                    <li>• Không bỏ sót liều thuốc</li>
                    <li>• Báo cáo tác dụng phụ ngay lập tức</li>
                    <li>• Thực hiện xét nghiệm theo lịch</li>
                    <li>• Duy trì lối sống lành mạnh</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Liên hệ khẩn cấp</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Đường dây nóng: 1900-1234</p>
                    <p>• Email: support@hivcare.vn</p>
                    <p>• Phòng khám: (028) 123-4567</p>
                    <p>• Cấp cứu: 115</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Đang lưu...' : 'Lưu kế hoạch điều trị'}
        </Button>
      </div>
    </div>
  );
};

export default TreatmentPlanEditor; 