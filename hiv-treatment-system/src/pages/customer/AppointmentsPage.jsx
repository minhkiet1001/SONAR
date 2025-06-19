import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { UserRole } from "../../types/index.js";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import AppointmentBooking from "../../components/customer/AppointmentBooking";
import { useLocation } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PlusIcon,
  HeartIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const AppointmentsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Check if we should show booking form based on URL
  useEffect(() => {
    if (location.pathname === '/customer/appointments/new') {
      setShowBookingForm(true);
    }
  }, [location.pathname]);

  // Mock appointments data with services
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      service: {
        id: "routine-checkup",
        name: "Khám định kỳ",
        icon: HeartIcon,
      },
      doctorName: "BS. Nguyễn Văn Minh",
      doctorSpecialty: "Bác sĩ Nhiễm trùng",
      date: new Date("2024-12-20T10:00:00"),
      timeSlot: {
        startTime: "10:00",
        endTime: "10:30",
      },
      status: "scheduled",
      patientInfo: {
        fullName: "Nguyễn Văn An",
        phone: "0123456789",
      },
      notes: "Mang theo danh sách thuốc hiện tại",
      bookingId: "APT-001",
    },
    {
      id: 2,
      service: {
        id: "lab-results",
        name: "Xem kết quả xét nghiệm",
        icon: BeakerIcon,
      },
      doctorName: "BS. Trần Thị Hương",
      doctorSpecialty: "Bác sĩ Nội khoa",
      date: new Date("2024-12-25T14:30:00"),
      timeSlot: {
        startTime: "14:30",
        endTime: "15:00",
      },
      status: "scheduled",
      patientInfo: {
        fullName: "Nguyễn Văn An",
        phone: "0123456789",
      },
      bookingId: "APT-002",
    },
    {
      id: 3,
      service: {
        id: "psychological-support",
        name: "Hỗ trợ tâm lý",
        icon: ChatBubbleLeftRightIcon,
      },
      doctorName: "BS. Lê Văn Đức",
      doctorSpecialty: "Bác sĩ Tâm lý",
      date: new Date("2024-11-15T11:00:00"),
      timeSlot: {
        startTime: "11:00",
        endTime: "12:00",
      },
      status: "completed",
      patientInfo: {
        fullName: "Nguyễn Văn An",
        phone: "0123456789",
      },
      bookingId: "APT-003",
    },
    {
      id: 4,
      service: {
        id: "medication-review",
        name: "Tư vấn thuốc ARV",
        icon: DocumentTextIcon,
      },
      doctorName: "BS. Phạm Thị Lan",
      doctorSpecialty: "Dược sĩ lâm sàng",
      date: new Date("2024-11-01T09:30:00"),
      timeSlot: {
        startTime: "09:30",
        endTime: "10:00",
      },
      status: "completed",
      patientInfo: {
        fullName: "Nguyễn Văn An",
        phone: "0123456789",
      },
      bookingId: "APT-004",
    },
    {
      id: 5,
      service: {
        id: "hiv-consultation",
        name: "Tư vấn HIV",
        icon: ChatBubbleLeftRightIcon,
      },
      doctorName: "BS. Nguyễn Văn Minh",
      doctorSpecialty: "Bác sĩ Nhiễm trùng",
      date: new Date("2024-10-20T13:00:00"),
      timeSlot: {
        startTime: "13:00",
        endTime: "13:30",
      },
      status: "cancelled",
      patientInfo: {
        fullName: "Nguyễn Văn An",
        phone: "0123456789",
      },
      bookingId: "APT-005",
    },
  ]);

  const handleBookingComplete = (bookingData) => {
    // Add new appointment to the list
    const newAppointment = {
      id: appointments.length + 1,
      service: bookingData.service,
      doctorName: bookingData.doctorName,
      doctorSpecialty: getDoctorSpecialty(bookingData.doctorId),
      date: new Date(bookingData.date + "T" + bookingData.timeSlot.startTime),
      timeSlot: bookingData.timeSlot,
      status: "scheduled",
      patientInfo: bookingData.patientInfo,
      notes: bookingData.patientInfo.notes,
      bookingId: bookingData.bookingId,
      isUrgent: bookingData.patientInfo.isUrgent,
    };

    setAppointments([newAppointment, ...appointments]);
    setShowBookingForm(false);
    setActiveTab("upcoming");
  };

  const getDoctorSpecialty = (doctorId) => {
    const specialties = {
      1: "Bác sĩ Nhiễm trùng",
      2: "Bác sĩ Nội khoa",
      3: "Bác sĩ Tâm lý",
      4: "Dược sĩ lâm sàng",
    };
    return specialties[doctorId] || "Bác sĩ";
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "scheduled":
        return "Đã lên lịch";
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const filterAppointments = (status) => {
    const now = new Date();
    return appointments.filter((appointment) => {
      switch (status) {
        case "upcoming":
          return appointment.status === "scheduled" && appointment.date >= now;
        case "past":
          return appointment.status === "completed" || appointment.date < now;
        case "cancelled":
          return appointment.status === "cancelled";
        default:
          return true;
      }
    });
  };

  const filteredAppointments = filterAppointments(activeTab);

  if (showBookingForm) {
    return (
      <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Đặt lịch hẹn mới
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Chọn dịch vụ, bác sĩ và thời gian phù hợp cho cuộc hẹn của bạn
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowBookingForm(false)}>
              Quay lại
            </Button>
          </div>

          <AppointmentBooking onBookingComplete={handleBookingComplete} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
                  <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Lịch hẹn của tôi
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý và theo dõi các cuộc hẹn khám bệnh
                        </p>
                      </div>
                    <Button
                      variant="primary"
            onClick={() => setShowBookingForm(true)}
            className="flex items-center"
                    >
            <PlusIcon className="h-5 w-5 mr-2" />
            Đặt lịch hẹn mới
                    </Button>
                  </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              {
                key: "upcoming",
                label: "Sắp tới",
                count: filterAppointments("upcoming").length,
              },
              {
                key: "past",
                label: "Đã khám",
                count: filterAppointments("past").length,
              },
              {
                key: "cancelled",
                label: "Đã hủy",
                count: filterAppointments("cancelled").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.key
                        ? "bg-primary-100 text-primary-600"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
            </nav>
          </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card>
              <div className="p-8 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === "upcoming" && "Không có lịch hẹn sắp tới"}
                  {activeTab === "past" && "Không có lịch hẹn đã qua"}
                  {activeTab === "cancelled" && "Không có lịch hẹn đã hủy"}
                          </h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === "upcoming" &&
                    "Bạn chưa có lịch hẹn nào được lên lịch."}
                  {activeTab === "past" &&
                    "Bạn chưa có lịch hẹn nào đã hoàn thành."}
                  {activeTab === "cancelled" && "Bạn chưa hủy lịch hẹn nào."}
                </p>
                {activeTab === "upcoming" && (
                    <Button
                      variant="primary"
                    onClick={() => setShowBookingForm(true)}
                    >
                      Đặt lịch hẹn mới
                    </Button>
                )}
                  </div>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => {
              const ServiceIcon = appointment.service.icon;
              return (
                <Card key={appointment.id}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="h-5 w-5 text-primary-600" />
                </div>
                          <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                              {appointment.service.name}
                          </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.doctorName} -{" "}
                              {appointment.doctorSpecialty}
                          </p>
                        </div>
                          <div className="flex items-center space-x-2">
                            {appointment.isUrgent && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                🚨 Khẩn cấp
                              </span>
                            )}
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {appointment.timeSlot.startTime} -{" "}
                            {appointment.timeSlot.endTime}
                      </div>
                      <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2" />
                            {appointment.patientInfo.fullName}
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">
                              Ghi chú:
                            </span>
                            <span className="ml-2 text-sm text-gray-600">
                              {appointment.notes}
                            </span>
                          </div>
                        )}

                        <div className="mt-3 text-xs text-gray-400">
                          Mã lịch hẹn: {appointment.bookingId}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        {appointment.status === "scheduled" && (
                          <>
                            <Button variant="outline" size="sm">
                              Chỉnh sửa
                            </Button>
                          <Button
                            variant="outline"
                            size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              Hủy lịch
                            </Button>
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm">
                            Xem chi tiết
                          </Button>
                        )}
                        {appointment.status === "cancelled" && (
                          <Button variant="outline" size="sm">
                            Đặt lại
                          </Button>
                        )}
                        </div>
                    </div>
                </div>
                </Card>
              );
            })
            )}
          </div>
      </div>
    </Layout>
  );
};

export default AppointmentsPage; 
