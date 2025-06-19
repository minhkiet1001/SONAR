import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Pagination from "../../components/common/Pagination";
import { UserRole } from "../../types/index.js";
import {
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BeakerIcon,
  DocumentTextIcon,
  XMarkIcon,
  MapPinIcon,
  IdentificationIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' | 'table'
  const [sortBy, setSortBy] = useState("name"); // 'name' | 'date' | 'status'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // 6 items per page for cards, 10 for table

  // Enhanced mock patients data
  const patientsData = [
    {
      id: "PT10045",
      fullName: "Nguyễn Văn A",
      gender: "Nam",
      age: 38,
      dateOfBirth: "1985-05-12",
      phone: "0901234567",
      email: "nguyenvana@example.com",
      address: "123 Lê Lợi, Quận 1, TP.HCM",
      patientCode: "HIV23045",
      registrationDate: "2023-01-15",
      status: "active",
      lastVisit: "2024-06-05",
      nextAppointment: "2024-06-25",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      priority: "normal",
      testResults: [
        {
          date: "2024-06-05",
          type: "Viral Load",
          result: "< 20 copies/mL",
          status: "normal",
        },
        {
          date: "2024-06-05",
          type: "CD4 Count",
          result: "650 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Dolutegravir",
          dosage: "1 viên/ngày",
          startDate: "2023-01-15",
        },
      ],
      notes: "Bệnh nhân tuân thủ điều trị tốt, không có tác dụng phụ.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 5 tháng",
    },
    {
      id: "PT10046",
      fullName: "Trần Thị B",
      gender: "Nữ",
      age: 33,
      dateOfBirth: "1990-09-23",
      phone: "0912345678",
      email: "tranthib@example.com",
      address: "45 Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
      patientCode: "HIV23046",
      registrationDate: "2023-01-20",
      status: "active",
      lastVisit: "2024-06-10",
      nextAppointment: "2024-06-30",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      priority: "normal",
      testResults: [
        {
          date: "2024-06-10",
          type: "Viral Load",
          result: "< 20 copies/mL",
          status: "normal",
        },
        {
          date: "2024-06-10",
          type: "CD4 Count",
          result: "530 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Efavirenz",
          dosage: "1 viên/ngày",
          startDate: "2023-01-20",
        },
      ],
      notes:
        "Bệnh nhân có phản ứng nhẹ với thuốc trong giai đoạn đầu, hiện tại ổn định.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 5 tháng",
    },
    {
      id: "PT10047",
      fullName: "Lê Văn C",
      gender: "Nam",
      age: 45,
      dateOfBirth: "1978-11-05",
      phone: "0923456789",
      email: "levanc@example.com",
      address: "78 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
      patientCode: "HIV23047",
      registrationDate: "2023-01-25",
      status: "inactive",
      lastVisit: "2024-04-15",
      nextAppointment: "2024-05-15",
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      priority: "high",
      testResults: [
        {
          date: "2024-04-15",
          type: "Viral Load",
          result: "120 copies/mL",
          status: "attention",
        },
        {
          date: "2024-04-15",
          type: "CD4 Count",
          result: "420 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Emtricitabine/Efavirenz",
          dosage: "1 viên/ngày",
          startDate: "2023-01-25",
        },
      ],
      notes: "Bệnh nhân không đến khám đúng hẹn. Cần liên hệ để nhắc nhở.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 4 tháng",
    },
    {
      id: "PT10048",
      fullName: "Phạm Thị D",
      gender: "Nữ",
      age: 29,
      dateOfBirth: "1995-03-17",
      phone: "0934567890",
      email: "phamthid@example.com",
      address: "222 Nguyễn Văn Cừ, Quận 5, TP.HCM",
      patientCode: "HIV23048",
      registrationDate: "2023-01-30",
      status: "active",
      lastVisit: "2024-06-12",
      nextAppointment: "2024-07-02",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      priority: "normal",
      testResults: [
        {
          date: "2024-06-12",
          type: "Viral Load",
          result: "< 20 copies/mL",
          status: "normal",
        },
        {
          date: "2024-06-12",
          type: "CD4 Count",
          result: "700 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Dolutegravir",
          dosage: "1 viên/ngày",
          startDate: "2023-01-30",
        },
      ],
      notes: "Bệnh nhân tuân thủ điều trị tốt, không có tác dụng phụ.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 4 tháng",
    },
    {
      id: "PT10049",
      fullName: "Hoàng Văn E",
      gender: "Nam",
      age: 41,
      dateOfBirth: "1982-12-30",
      phone: "0945678901",
      email: "hoangvane@example.com",
      address: "55 Lý Tự Trọng, Quận 1, TP.HCM",
      patientCode: "HIV23049",
      registrationDate: "2023-02-05",
      status: "attention",
      lastVisit: "2024-06-08",
      nextAppointment: "2024-06-28",
      avatar: "https://randomuser.me/api/portraits/men/40.jpg",
      priority: "high",
      testResults: [
        {
          date: "2024-06-08",
          type: "Viral Load",
          result: "500 copies/mL",
          status: "attention",
        },
        {
          date: "2024-06-08",
          type: "CD4 Count",
          result: "380 cells/mm³",
          status: "attention",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Dolutegravir",
          dosage: "1 viên/ngày",
          startDate: "2023-02-05",
        },
      ],
      notes:
        "Cần theo dõi sát vì tải lượng virus tăng. Đã điều chỉnh liệu pháp.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 4 tháng",
    },
    // Add more mock data for pagination demo
    {
      id: "PT10050",
      fullName: "Nguyễn Thị F",
      gender: "Nữ",
      age: 35,
      dateOfBirth: "1988-08-15",
      phone: "0956789012",
      email: "nguyenthif@example.com",
      address: "89 Trần Hưng Đạo, Quận 1, TP.HCM",
      patientCode: "HIV23050",
      registrationDate: "2023-02-10",
      status: "active",
      lastVisit: "2024-06-15",
      nextAppointment: "2024-07-05",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      priority: "normal",
      testResults: [
        {
          date: "2024-06-15",
          type: "Viral Load",
          result: "< 20 copies/mL",
          status: "normal",
        },
        {
          date: "2024-06-15",
          type: "CD4 Count",
          result: "580 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Dolutegravir",
          dosage: "1 viên/ngày",
          startDate: "2023-02-10",
        },
      ],
      notes: "Bệnh nhân tuân thủ điều trị tốt.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 4 tháng",
    },
    {
      id: "PT10051",
      fullName: "Võ Văn G",
      gender: "Nam",
      age: 42,
      dateOfBirth: "1981-03-22",
      phone: "0967890123",
      email: "vovang@example.com",
      address: "156 Pasteur, Quận 3, TP.HCM",
      patientCode: "HIV23051",
      registrationDate: "2023-02-15",
      status: "active",
      lastVisit: "2024-06-18",
      nextAppointment: "2024-07-08",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      priority: "normal",
      testResults: [
        {
          date: "2024-06-18",
          type: "Viral Load",
          result: "< 20 copies/mL",
          status: "normal",
        },
        {
          date: "2024-06-18",
          type: "CD4 Count",
          result: "620 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Efavirenz",
          dosage: "1 viên/ngày",
          startDate: "2023-02-15",
        },
      ],
      notes: "Bệnh nhân ổn định, tuân thủ điều trị tốt.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 4 tháng",
    },
    {
      id: "PT10052",
      fullName: "Đặng Thị H",
      gender: "Nữ",
      age: 28,
      dateOfBirth: "1995-11-08",
      phone: "0978901234",
      email: "dangthih@example.com",
      address: "234 Võ Văn Tần, Quận 3, TP.HCM",
      patientCode: "HIV23052",
      registrationDate: "2023-02-20",
      status: "active",
      lastVisit: "2024-06-20",
      nextAppointment: "2024-07-10",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      priority: "normal",
      testResults: [
        {
          date: "2024-06-20",
          type: "Viral Load",
          result: "< 20 copies/mL",
          status: "normal",
        },
        {
          date: "2024-06-20",
          type: "CD4 Count",
          result: "680 cells/mm³",
          status: "normal",
        },
      ],
      medications: [
        {
          name: "Tenofovir/Lamivudine/Dolutegravir",
          dosage: "1 viên/ngày",
          startDate: "2023-02-20",
        },
      ],
      notes: "Bệnh nhân trẻ, tuân thủ điều trị tốt.",
      assignedStaff: "Trần Văn Nhân Viên",
      treatmentDuration: "1 năm 4 tháng",
    },
  ];

  // Filter and sort patients
  const filteredPatients = patientsData
    .filter((patient) => {
      const matchesSearch =
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || patient.status === statusFilter;
      const matchesGender =
        genderFilter === "all" || patient.gender === genderFilter;

      return matchesSearch && matchesStatus && matchesGender;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fullName.localeCompare(b.fullName);
        case "date":
          return new Date(b.registrationDate) - new Date(a.registrationDate);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  // Pagination logic
  const totalItems = filteredPatients.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, genderFilter, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "attention":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "normal":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang điều trị";
      case "inactive":
        return "Không hoạt động";
      case "attention":
        return "Cần chú ý";
      default:
        return "Không xác định";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const PatientDetailModal = ({ patient, isOpen, onClose }) => {
    if (!isOpen || !patient) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>

          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={patient.avatar}
                    alt={patient.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {patient.fullName}
                    </h2>
                    <p className="text-gray-600">
                      Mã BN: {patient.patientCode}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {getStatusText(patient.status)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                          patient.priority
                        )}`}
                      >
                        {patient.priority === "high"
                          ? "Ưu tiên cao"
                          : patient.priority === "medium"
                          ? "Ưu tiên trung bình"
                          : "Bình thường"}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Thông tin cơ bản
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <IdentificationIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Tuổi:</span>
                          <span className="ml-auto font-medium">
                            {patient.age}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Giới tính:</span>
                          <span className="ml-auto font-medium">
                            {patient.gender}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Điện thoại:</span>
                          <span className="ml-auto font-medium">
                            {patient.phone}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-auto font-medium text-xs">
                            {patient.email}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">Địa chỉ:</span>
                          <span className="ml-2 font-medium text-xs text-right">
                            {patient.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Thông tin điều trị
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">Ngày đăng ký:</span>
                          <span className="ml-auto font-medium">
                            {formatDate(patient.registrationDate)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            Thời gian điều trị:
                          </span>
                          <span className="ml-auto font-medium">
                            {patient.treatmentDuration}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            Nhân viên phụ trách:
                          </span>
                          <span className="ml-auto font-medium text-xs">
                            {patient.assignedStaff}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Middle Column - Test Results & Medications */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Kết quả xét nghiệm gần nhất
                      </h3>
                      <div className="space-y-3">
                        {patient.testResults.map((test, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {test.type}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(test.date)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {test.result}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                  test.status
                                )}`}
                              >
                                {test.status === "normal"
                                  ? "Bình thường"
                                  : "Cần chú ý"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Thuốc điều trị hiện tại
                      </h3>
                      <div className="space-y-3">
                        {patient.medications.map((med, index) => (
                          <div
                            key={index}
                            className="p-3 bg-blue-50 rounded-lg"
                          >
                            <p className="text-sm font-medium text-gray-900">
                              {med.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              Liều dùng: {med.dosage}
                            </p>
                            <p className="text-xs text-gray-500">
                              Bắt đầu: {formatDate(med.startDate)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Column - Appointments & Notes */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Lịch hẹn
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">
                            Khám gần nhất
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(patient.lastVisit)}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">
                            Hẹn khám tiếp theo
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(patient.nextAppointment)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Ghi chú
                      </h3>
                      <p className="text-sm text-gray-700">{patient.notes}</p>
                    </div>
                  </Card>

                  <div className="space-y-2">
                    <Link
                      to={`/staff/appointments/new?patientId=${patient.id}`}
                    >
                      <Button variant="outline" className="w-full">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Đặt lịch hẹn
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      currentRole={UserRole.STAFF}
      userName="Trần Văn Nhân Viên"
      pageTitle="Quản lý bệnh nhân"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quản lý bệnh nhân</h1>
              <p className="text-primary-100">
                Theo dõi và quản lý thông tin bệnh nhân HIV
              </p>
            </div>
            <Link to="/staff/patients/new">
              <Button variant="white" className="flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Thêm bệnh nhân mới
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, mã BN, SĐT, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang điều trị</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="attention">Cần chú ý</option>
                </select>

                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tất cả giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="name">Sắp xếp theo tên</option>
                  <option value="date">Sắp xếp theo ngày đăng ký</option>
                  <option value="status">Sắp xếp theo trạng thái</option>
                </select>

                <Button
                  variant="outline"
                  onClick={() =>
                    setViewMode(viewMode === "cards" ? "table" : "cards")
                  }
                >
                  {viewMode === "cards" ? "Xem dạng bảng" : "Xem dạng thẻ"}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {filteredPatients.length}
                </div>
                <div className="text-sm text-blue-600">Tổng số bệnh nhân</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {filteredPatients.filter((p) => p.status === "active").length}
                </div>
                <div className="text-sm text-green-600">Đang điều trị</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {
                    filteredPatients.filter((p) => p.status === "attention")
                      .length
                  }
                </div>
                <div className="text-sm text-red-600">Cần chú ý</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {
                    filteredPatients.filter((p) => p.status === "inactive")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Không hoạt động</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Patients List */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPatients.map((patient) => (
              <Card
                key={patient.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={patient.avatar}
                        alt={patient.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {patient.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Mã: {patient.patientCode}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.age} tuổi • {patient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {getStatusText(patient.status)}
                      </span>
                      {patient.priority === "high" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Ưu tiên cao
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>
                        Khám gần nhất: {formatDate(patient.lastVisit)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>
                        Hẹn tiếp theo: {formatDate(patient.nextAppointment)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      <span>{patient.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPatient(patient)}
                      className="flex-1"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bệnh nhân
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thông tin liên hệ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lịch hẹn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={patient.avatar}
                            alt={patient.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              Mã: {patient.patientCode}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                            patient.status
                          )}`}
                        >
                          {getStatusText(patient.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>Gần nhất: {formatDate(patient.lastVisit)}</div>
                        <div>
                          Tiếp theo: {formatDate(patient.nextAppointment)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {currentPatients.length === 0 && (
          <Card>
            <div className="p-8 text-center">
              <UserIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                Không tìm thấy bệnh nhân nào phù hợp
              </p>
            </div>
          </Card>
        )}

        {/* Patient Detail Modal */}
        <PatientDetailModal
          patient={selectedPatient}
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default PatientsPage;
