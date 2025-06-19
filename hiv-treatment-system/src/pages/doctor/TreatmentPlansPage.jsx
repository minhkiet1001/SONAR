import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import TreatmentPlanEditor from '../../components/doctor/TreatmentPlanEditor';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  BeakerIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const TreatmentPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [patients, setPatients] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for doctor's patients
  useEffect(() => {
    const mockPatients = [
      {
        id: 'P001',
        name: 'Nguyễn Văn An',
        age: 35,
        gender: 'Nam',
        phone: '0901234567',
        email: 'nguyenvanan@email.com',
        address: 'Quận 1, TP.HCM',
        diagnosisDate: '2023-06-15',
        doctorId: 'DOC001', // Current doctor
        status: 'active',
        riskLevel: 'medium',
        currentMedications: [
          {
            id: 1,
            name: 'Biktarvy',
            dosage: '50mg/25mg/200mg',
            frequency: 'Một lần mỗi ngày',
            startDate: '2024-01-15',
            endDate: '2024-07-15'
          }
        ],
        allergies: ['Penicillin'],
        comorbidities: ['Cao huyết áp']
      },
      {
        id: 'P002',
        name: 'Trần Thị Bình',
        age: 42,
        gender: 'Nữ',
        phone: '0907654321',
        email: 'tranthib@email.com',
        address: 'Quận 3, TP.HCM',
        diagnosisDate: '2023-03-20',
        doctorId: 'DOC001',
        status: 'active',
        riskLevel: 'high',
        currentMedications: [
          {
            id: 1,
            name: 'Descovy',
            dosage: '25mg/200mg',
            frequency: 'Một lần mỗi ngày',
            startDate: '2023-11-01',
            endDate: '2024-05-01'
          },
          {
            id: 2,
            name: 'Isentress',
            dosage: '400mg',
            frequency: 'Hai lần mỗi ngày',
            startDate: '2023-11-01',
            endDate: '2024-05-01'
          }
        ],
        allergies: [],
        comorbidities: ['Tiểu đường type 2']
      },
      {
        id: 'P003',
        name: 'Lê Văn Cường',
        age: 28,
        gender: 'Nam',
        phone: '0912345678',
        email: 'levanc@email.com',
        address: 'Quận 7, TP.HCM',
        diagnosisDate: '2024-01-05',
        doctorId: 'DOC001',
        status: 'active',
        riskLevel: 'low',
        currentMedications: [
          {
            id: 1,
            name: 'Biktarvy',
            dosage: '50mg/25mg/200mg',
            frequency: 'Một lần mỗi ngày',
            startDate: '2024-01-10',
            endDate: '2024-12-10'
          }
        ],
        allergies: ['Sulfa'],
        comorbidities: []
      },
      {
        id: 'P004',
        name: 'Phạm Thị Dung',
        age: 38,
        gender: 'Nữ',
        phone: '0923456789',
        email: 'phamthid@email.com',
        address: 'Quận 5, TP.HCM',
        diagnosisDate: '2023-09-10',
        doctorId: 'DOC001',
        status: 'active',
        riskLevel: 'medium',
        currentMedications: [],
        allergies: [],
        comorbidities: ['Viêm gan B']
      }
    ];

    const mockTestResults = [
      // Patient P001 - Nguyễn Văn An
      {
        id: 'TR001',
        patientId: 'P001',
        testType: 'Tải lượng virus HIV',
        result: '<50',
        unit: 'copies/mL',
        normalRange: '<50',
        status: 'normal',
        testDate: '2024-01-20',
        orderedBy: 'DOC001',
        notes: 'Kết quả tốt, virus không phát hiện được'
      },
      {
        id: 'TR002',
        patientId: 'P001',
        testType: 'Số lượng CD4',
        result: '650',
        unit: 'cells/mm³',
        normalRange: '500-1500',
        status: 'normal',
        testDate: '2024-01-20',
        orderedBy: 'DOC001',
        notes: 'Hệ miễn dịch ổn định'
      },
      {
        id: 'TR003',
        patientId: 'P001',
        testType: 'Chức năng gan',
        result: 'ALT: 25, AST: 22',
        unit: 'U/L',
        normalRange: 'ALT: 7-55, AST: 8-48',
        status: 'normal',
        testDate: '2024-01-15',
        orderedBy: 'DOC001',
        notes: 'Chức năng gan bình thường'
      },
      // Patient P002 - Trần Thị Bình
      {
        id: 'TR004',
        patientId: 'P002',
        testType: 'Tải lượng virus HIV',
        result: '150',
        unit: 'copies/mL',
        normalRange: '<50',
        status: 'abnormal',
        testDate: '2024-01-18',
        orderedBy: 'DOC001',
        notes: 'Cần theo dõi và điều chỉnh phác đồ'
      },
      {
        id: 'TR005',
        patientId: 'P002',
        testType: 'Số lượng CD4',
        result: '420',
        unit: 'cells/mm³',
        normalRange: '500-1500',
        status: 'low',
        testDate: '2024-01-18',
        orderedBy: 'DOC001',
        notes: 'CD4 thấp, cần tăng cường điều trị'
      },
      {
        id: 'TR006',
        patientId: 'P002',
        testType: 'HbA1c',
        result: '7.2',
        unit: '%',
        normalRange: '<7.0',
        status: 'high',
        testDate: '2024-01-18',
        orderedBy: 'DOC001',
        notes: 'Kiểm soát đường huyết chưa tốt'
      },
      // Patient P003 - Lê Văn Cường
      {
        id: 'TR007',
        patientId: 'P003',
        testType: 'Tải lượng virus HIV',
        result: '2500',
        unit: 'copies/mL',
        normalRange: '<50',
        status: 'high',
        testDate: '2024-01-22',
        orderedBy: 'DOC001',
        notes: 'Bệnh nhân mới bắt đầu điều trị'
      },
      {
        id: 'TR008',
        patientId: 'P003',
        testType: 'Số lượng CD4',
        result: '380',
        unit: 'cells/mm³',
        normalRange: '500-1500',
        status: 'low',
        testDate: '2024-01-22',
        orderedBy: 'DOC001',
        notes: 'CD4 thấp, cần theo dõi sát'
      },
      // Patient P004 - Phạm Thị Dung
      {
        id: 'TR009',
        patientId: 'P004',
        testType: 'Tải lượng virus HIV',
        result: '8500',
        unit: 'copies/mL',
        normalRange: '<50',
        status: 'high',
        testDate: '2024-01-25',
        orderedBy: 'DOC001',
        notes: 'Cần bắt đầu điều trị ngay'
      },
      {
        id: 'TR010',
        patientId: 'P004',
        testType: 'Số lượng CD4',
        result: '280',
        unit: 'cells/mm³',
        normalRange: '500-1500',
        status: 'low',
        testDate: '2024-01-25',
        orderedBy: 'DOC001',
        notes: 'CD4 rất thấp, nguy cơ cao'
      },
      {
        id: 'TR011',
        patientId: 'P004',
        testType: 'HBsAg',
        result: 'Dương tính',
        unit: '',
        normalRange: 'Âm tính',
        status: 'abnormal',
        testDate: '2024-01-25',
        orderedBy: 'DOC001',
        notes: 'Đồng nhiễm viêm gan B'
      }
    ];

    const mockPlans = [
    {
      id: 1,
        patientId: 'P001',
        patientName: 'Nguyễn Văn An',
        patientAge: 35,
        planName: 'Kế hoạch điều trị HIV - Giai đoạn 1',
      status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-07-15',
        lastModified: '2024-01-20',
        modifiedBy: 'BS. Nguyễn Văn Minh',
      medications: [
          {
            id: 1,
            medicationId: 'biktarvy',
            name: 'Biktarvy',
            genericName: 'Bictegravir/Tenofovir alafenamide/Emtricitabine',
            dosage: '50mg/25mg/200mg',
            frequency: 'Một lần mỗi ngày',
            instructions: 'Uống cùng với thức ăn',
            startDate: '2024-01-15',
            endDate: '2024-07-15',
            isActive: true,
            sideEffects: ['Buồn nôn', 'Đau đầu', 'Mệt mỏi'],
            warnings: []
          }
        ],
        monitoring: [
          {
            id: 1,
            testId: 'viral-load',
            name: 'Tải lượng virus HIV',
            frequency: 'Mỗi 3 tháng',
            nextDue: '2024-04-15',
            normalRange: '<50 copies/mL',
            notes: 'Theo dõi đáp ứng điều trị',
            isActive: true
          }
      ],
      goals: [
          {
            id: 1,
            description: 'Đạt tải lượng virus không phát hiện được',
            targetDate: '2024-07-15',
            status: 'in-progress',
            priority: 'high'
          }
        ],
        notes: 'Bệnh nhân tuân thủ điều trị tốt',
        warnings: [],
        adherence: 95,
        viralLoad: '<50',
        cd4Count: 650
    },
    {
      id: 2,
        patientId: 'P002',
        patientName: 'Trần Thị Bình',
        patientAge: 42,
        planName: 'Kế hoạch điều trị HIV - Giai đoạn 2',
        status: 'paused',
        startDate: '2023-11-01',
        endDate: '2024-05-01',
        lastModified: '2024-01-18',
        modifiedBy: 'BS. Nguyễn Văn Minh',
      medications: [
          {
            id: 1,
            medicationId: 'descovy',
            name: 'Descovy',
            genericName: 'Tenofovir alafenamide/Emtricitabine',
            dosage: '25mg/200mg',
            frequency: 'Một lần mỗi ngày',
            instructions: 'Uống vào buổi tối',
            startDate: '2023-11-01',
            endDate: '2024-05-01',
            isActive: true,
            sideEffects: ['Buồn nôn', 'Đau đầu'],
            warnings: []
          },
          {
            id: 2,
            medicationId: 'isentress',
            name: 'Isentress',
            genericName: 'Raltegravir',
            dosage: '400mg',
            frequency: 'Hai lần mỗi ngày',
            instructions: 'Uống trước bữa ăn 30 phút',
            startDate: '2023-11-01',
            endDate: '2024-05-01',
            isActive: true,
            sideEffects: ['Mất ngủ', 'Đau đầu', 'Chóng mặt'],
            warnings: []
          }
        ],
        monitoring: [
          {
            id: 1,
            testId: 'viral-load',
            name: 'Tải lượng virus HIV',
            frequency: 'Mỗi 3 tháng',
            nextDue: '2024-02-01',
            normalRange: '<50 copies/mL',
            notes: 'Cần theo dõi đáp ứng',
            isActive: true
          },
          {
            id: 2,
            testId: 'liver-function',
            name: 'Chức năng gan',
            frequency: 'Mỗi 6 tháng',
            nextDue: '2024-05-01',
            normalRange: 'ALT: 7-55 U/L, AST: 8-48 U/L',
            notes: 'Theo dõi tác dụng phụ',
            isActive: true
          }
      ],
      goals: [
          {
            id: 1,
            description: 'Cải thiện số lượng CD4',
            targetDate: '2024-05-01',
            status: 'achieved',
            priority: 'medium'
          }
        ],
        notes: 'Bệnh nhân có tiểu đường, cần theo dõi tương tác thuốc',
        warnings: ['Đồng nhiễm tiểu đường'],
        adherence: 88,
        viralLoad: '150',
        cd4Count: 420
    },
    {
      id: 3,
        patientId: 'P003',
        patientName: 'Lê Văn Cường',
        patientAge: 28,
        planName: 'Kế hoạch điều trị HIV - Khởi đầu',
      status: 'active',
        startDate: '2024-01-10',
        endDate: '2024-12-10',
        lastModified: '2024-01-22',
        modifiedBy: 'BS. Nguyễn Văn Minh',
      medications: [
          {
            id: 1,
            medicationId: 'biktarvy',
            name: 'Biktarvy',
            genericName: 'Bictegravir/Tenofovir alafenamide/Emtricitabine',
            dosage: '50mg/25mg/200mg',
            frequency: 'Một lần mỗi ngày',
            instructions: 'Uống cùng với thức ăn',
            startDate: '2024-01-10',
            endDate: '2024-12-10',
            isActive: true,
            sideEffects: ['Buồn nôn', 'Đau đầu', 'Mệt mỏi'],
            warnings: []
          }
        ],
        monitoring: [
          {
            id: 1,
            testId: 'viral-load',
            name: 'Tải lượng virus HIV',
            frequency: 'Mỗi 3 tháng',
            nextDue: '2024-04-10',
            normalRange: '<50 copies/mL',
            notes: 'Bệnh nhân mới, theo dõi sát',
            isActive: true
          },
          {
            id: 2,
            testId: 'cd4-count',
            name: 'Số lượng CD4',
            frequency: 'Mỗi 3 tháng',
            nextDue: '2024-04-10',
            normalRange: '500-1500 cells/mm³',
            notes: 'Theo dõi hồi phục miễn dịch',
            isActive: true
          }
      ],
      goals: [
          {
            id: 1,
            description: 'Đạt tải lượng virus không phát hiện được trong 6 tháng',
            targetDate: '2024-07-10',
            status: 'pending',
            priority: 'high'
          }
        ],
        notes: 'Bệnh nhân trẻ, tiên lượng tốt',
        warnings: ['Dị ứng Sulfa'],
        adherence: 98,
        viralLoad: '2500',
        cd4Count: 380
      }
    ];

    setTimeout(() => {
      setPatients(mockPatients);
      setTestResults(mockTestResults);
      setPlans(mockPlans);
      setFilteredPlans(mockPlans);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter plans based on search and status
  useEffect(() => {
    let filtered = plans;

    if (searchTerm) {
      filtered = filtered.filter(plan =>
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.patientId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(plan => plan.status === statusFilter);
    }

    setFilteredPlans(filtered);
  }, [plans, searchTerm, statusFilter]);

  const handleCreatePlan = () => {
    setEditingPlan(null);
    setSelectedPatient(null);
    setShowPatientSelector(true);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setShowPatientSelector(false);
    setShowEditor(true);
  };

  const handleEditPlan = (plan) => {
    const patient = patients.find(p => p.id === plan.patientId);
    setEditingPlan(plan);
    setSelectedPatient(patient);
    setShowEditor(true);
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      // Update existing plan - ensure we preserve the original structure
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? { 
          ...editingPlan, // Keep original data
          ...planData, // Override with new data
          id: editingPlan.id, // Ensure ID is preserved
          patientId: editingPlan.patientId, // Ensure patientId is preserved
          patientName: editingPlan.patientName, // Preserve patient name
          patientAge: editingPlan.patientAge, // Preserve patient age
          lastModified: new Date().toISOString().split('T')[0],
          modifiedBy: 'BS. Nguyễn Văn Minh'
        } : plan
      ));
    } else {
      // Create new plan
      const newPlan = {
        ...planData,
        id: Date.now(),
        patientId: selectedPatient?.id,
        patientName: selectedPatient?.name || 'Bệnh nhân mới',
        patientAge: selectedPatient?.age || 0,
        lastModified: new Date().toISOString().split('T')[0],
        modifiedBy: 'BS. Nguyễn Văn Minh',
        adherence: 0,
        viralLoad: 'Chưa có',
        cd4Count: 'Chưa có'
      };
      setPlans([...plans, newPlan]);
    }
    
    setShowEditor(false);
    setEditingPlan(null);
    setSelectedPatient(null);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kế hoạch điều trị này?')) {
      setPlans(plans.filter(plan => plan.id !== planId));
    }
  };

  // Get patient's test results
  const getPatientTestResults = (patientId) => {
    return testResults.filter(result => result.patientId === patientId)
      .sort((a, b) => new Date(b.testDate) - new Date(a.testDate));
  };

  // Get patient's current medications
  const getPatientCurrentMedications = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient?.currentMedications || [];
  };

  // Get patients without active treatment plans
  const getPatientsWithoutActivePlans = () => {
    const activePlanPatientIds = plans
      .filter(plan => plan.status === 'active')
      .map(plan => plan.patientId);
    
    return patients.filter(patient => 
      !activePlanPatientIds.includes(patient.id) && 
      patient.status === 'active'
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Đang hoạt động';
      case 'paused':
        return 'Tạm dừng';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
      case 'critical':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAdherenceColor = (adherence) => {
    if (adherence >= 95) return 'text-green-600';
    if (adherence >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (showEditor) {
    return (
      <Layout currentRole={UserRole.DOCTOR} pageTitle="Chỉnh sửa kế hoạch điều trị">
        <TreatmentPlanEditor
          patientId={selectedPatient?.id}
          patient={selectedPatient}
          patientTestResults={selectedPatient ? getPatientTestResults(selectedPatient.id) : []}
          patientCurrentMedications={selectedPatient ? getPatientCurrentMedications(selectedPatient.id) : []}
          existingPlan={editingPlan}
          onSave={handleSavePlan}
          onCancel={() => {
            setShowEditor(false);
            setEditingPlan(null);
            setSelectedPatient(null);
          }}
        />
      </Layout>
    );
  }

  if (showPatientSelector) {
    const availablePatients = getPatientsWithoutActivePlans();
    
    return (
      <Layout currentRole={UserRole.DOCTOR} pageTitle="Chọn bệnh nhân">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Chọn bệnh nhân để tạo kế hoạch điều trị</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowPatientSelector(false)}
            >
              Hủy bỏ
            </Button>
          </div>

          {availablePatients.length === 0 ? (
            <Card>
              <div className="p-8 text-center">
                <UserIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có bệnh nhân nào cần tạo kế hoạch điều trị
                </h3>
                <p className="text-gray-500">
                  Tất cả bệnh nhân của bạn đã có kế hoạch điều trị đang hoạt động.
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePatients.map((patient) => {
                const latestTestResults = getPatientTestResults(patient.id).slice(0, 2);
                const riskColor = {
                  low: 'text-green-600 bg-green-50 border-green-200',
                  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
                  high: 'text-red-600 bg-red-50 border-red-200'
                };

                return (
                  <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="p-6" onClick={() => handleSelectPatient(patient)}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                            <p className="text-sm text-gray-500">ID: {patient.id}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${riskColor[patient.riskLevel]}`}>
                          {patient.riskLevel === 'low' ? 'Thấp' : 
                           patient.riskLevel === 'medium' ? 'Trung bình' : 'Cao'}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Tuổi:</span>
                            <span className="ml-2 font-medium">{patient.age}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Giới tính:</span>
                            <span className="ml-2 font-medium">{patient.gender}</span>
                          </div>
                        </div>

                        <div className="text-sm">
                          <span className="text-gray-500">Chẩn đoán:</span>
                          <span className="ml-2 font-medium">{patient.diagnosisDate}</span>
                        </div>

                        {patient.allergies.length > 0 && (
                          <div className="text-sm">
                            <span className="text-gray-500">Dị ứng:</span>
                            <span className="ml-2 text-red-600">{patient.allergies.join(', ')}</span>
                          </div>
                        )}

                        {patient.comorbidities.length > 0 && (
                          <div className="text-sm">
                            <span className="text-gray-500">Bệnh kèm theo:</span>
                            <span className="ml-2 text-orange-600">{patient.comorbidities.join(', ')}</span>
                          </div>
                        )}

                        {latestTestResults.length > 0 && (
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Kết quả xét nghiệm gần nhất:</p>
                            <div className="space-y-1">
                              {latestTestResults.map((result) => (
                                <div key={result.id} className="flex justify-between text-xs">
                                  <span className="text-gray-600">{result.testType}:</span>
                                  <span className={`font-medium ${
                                    result.status === 'normal' ? 'text-green-600' :
                                    result.status === 'abnormal' || result.status === 'high' ? 'text-red-600' :
                                    'text-yellow-600'
                                  }`}>
                                    {result.result} {result.unit}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <Button variant="primary" size="sm" className="w-full">
                          Tạo kế hoạch điều trị
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentRole={UserRole.DOCTOR} pageTitle="Kế hoạch điều trị">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bệnh nhân, kế hoạch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
        </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
              <option value="paused">Tạm dừng</option>
                  <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
                </select>
          </div>

          <Button variant="primary" onClick={handleCreatePlan}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Tạo kế hoạch mới
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đang hoạt động</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {plans.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
                      <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tạm dừng</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {plans.filter(p => p.status === 'paused').length}
                  </p>
                        </div>
                      </div>
            </div>
        </Card>

          <Card>
            <div className="p-4">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserIcon className="h-8 w-8 text-blue-600" />
                  </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tổng bệnh nhân</p>
                  <p className="text-2xl font-semibold text-gray-900">{plans.length}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BeakerIcon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tuân thủ TB</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {plans.length > 0 ? Math.round(plans.reduce((sum, p) => sum + p.adherence, 0) / plans.length) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Treatment Plans List */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Danh sách kế hoạch điều trị ({filteredPlans.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải...</p>
              </div>
            ) : filteredPlans.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BeakerIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy kế hoạch điều trị nào</p>
                <Button variant="outline" onClick={handleCreatePlan} className="mt-4">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tạo kế hoạch đầu tiên
                </Button>
                  </div>
            ) : (
              <div className="space-y-4">
                {filteredPlans.map((plan) => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{plan.planName}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plan.status)}`}>
                            {getStatusText(plan.status)}
                          </span>
                </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                            <p className="text-sm text-gray-500">Bệnh nhân</p>
                            <p className="font-medium">{plan.patientName}</p>
                            <p className="text-sm text-gray-500">ID: {plan.patientId}</p>
                    </div>

                    <div>
                            <p className="text-sm text-gray-500">Thời gian điều trị</p>
                            <p className="font-medium">{plan.startDate} - {plan.endDate}</p>
                            <p className="text-sm text-gray-500">Cập nhật: {plan.lastModified}</p>
                    </div>

                    <div>
                            <p className="text-sm text-gray-500">Tuân thủ điều trị</p>
                            <p className={`font-medium ${getAdherenceColor(plan.adherence)}`}>
                              {plan.adherence}%
                            </p>
                            <p className="text-sm text-gray-500">Tải lượng: {plan.viralLoad}</p>
                    </div>

                          <div>
                            <p className="text-sm text-gray-500">Số lượng CD4</p>
                            <p className="font-medium">{plan.cd4Count}</p>
                            <p className="text-sm text-gray-500">{plan.medications.length} loại thuốc</p>
                  </div>
                </div>

                        {/* Medications */}
                        <div className="mb-3">
                          <p className="text-sm text-gray-500 mb-1">Thuốc điều trị:</p>
                          <div className="flex flex-wrap gap-2">
                            {plan.medications.map((med, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {med.name} - {med.dosage}
                              </span>
                            ))}
                </div>
                        </div>

                        {/* Goals */}
                        {plan.goals.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-500 mb-1">Mục tiêu điều trị:</p>
                            <div className="space-y-1">
                              {plan.goals.map((goal, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <span className={`w-2 h-2 rounded-full ${
                                    goal.status === 'achieved' ? 'bg-green-500' :
                                    goal.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                                  }`} />
                                  <span className="text-sm text-gray-700">{goal.description}</span>
                                  <span className={`text-xs ${getPriorityColor(goal.priority)}`}>
                                    ({goal.priority === 'high' ? 'Cao' : goal.priority === 'medium' ? 'TB' : 'Thấp'})
                                  </span>
                      </div>
                    ))}
                  </div>
                </div>
                        )}

                        {/* Next monitoring */}
                        {plan.monitoring.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Xét nghiệm tiếp theo:</p>
                            <div className="flex flex-wrap gap-2">
                              {plan.monitoring.map((test, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                  {test.name} - {test.nextDue}
                                </span>
                              ))}
                  </div>
                          </div>
                        )}
                </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPlan(plan)}
                        >
                          <PencilIcon className="h-4 w-4" />
                    </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePlan(plan.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default TreatmentPlansPage; 