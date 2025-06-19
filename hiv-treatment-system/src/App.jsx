import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HeroSection from './components/guest/HeroSection';
import { UserRole } from './types/index.js';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotificationsPage from './pages/NotificationsPage';
import ResourcesPage from './pages/guest/ResourcesPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';


// InfoPage component cho bệnh nhân
const InfoPage = () => {
  const infoLinks = [
    { name: 'Trang chủ', href: '/customer/dashboard', description: 'Tổng quan về dịch vụ của chúng tôi' },
    { name: 'Giới thiệu', href: '/customer/info', description: 'Thông tin về chúng tôi và sứ mệnh của chúng tôi' },
    { name: 'Lịch hẹn', href: '/customer/appointments', description: 'Đặt lịch hẹn với bác sĩ chuyên khoa' },
    { name: 'Xét nghiệm', href: '/customer/test-results', description: 'Xem kết quả xét nghiệm và theo dõi sức khỏe' },
    { name: 'Thuốc điều trị', href: '/customer/medications', description: 'Quản lý thuốc và lịch uống thuốc' },
    { name: 'Blog', href: '/customer/blog', description: 'Tin tức và bài viết về sức khỏe và điều trị HIV' },
    { name: 'Liên hệ', href: '/customer/support', description: 'Thông tin liên hệ và hỗ trợ' }
  ];

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An" pageTitle="Thông Tin">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Các trang thông tin</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infoLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition duration-150"
            >
              <h2 className="text-xl font-semibold text-primary-600 mb-2">{link.name}</h2>
              <p className="text-gray-600">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

// Các trang cho Khách
import HomePage from './pages/guest/HomePage';
import AboutPage from './pages/guest/AboutPage';
import ServicesPage from './pages/guest/ServicesPage';
import BlogPage from './pages/guest/BlogPage';
import ContactPage from './pages/guest/ContactPage';
import PublicSchedulePage from './pages/guest/PublicSchedulePage';
import DoctorsPage from './pages/guest/DoctorsPage';

// Các trang cho Bệnh nhân
import DashboardPage from './pages/customer/DashboardPage';
import AppointmentsPage from './pages/customer/AppointmentsPage';
import TestResultsPage from './pages/customer/TestResultsPage';
import MedicationsPage from './pages/customer/MedicationsPage';
import CustomerResourcesPage from './pages/customer/ResourcesPage';

import SettingsPage from './pages/customer/SettingsPage';


// Các trang cho Bác sĩ
import DoctorDashboardPage from './pages/doctor/DashboardPage';
import DoctorPatientsPage from './pages/doctor/PatientsPage';
import DoctorAppointmentsPage from './pages/doctor/AppointmentsPage';
import DoctorTestResultsPage from './pages/doctor/TestResultsPage';
import DoctorTreatmentPlansPage from './pages/doctor/TreatmentPlansPage';
import DoctorCalendarPage from './pages/doctor/DoctorCalendarPage';
import NewTreatmentPlanPage from './pages/doctor/NewTreatmentPlanPage';
import DoctorSettingsPage from './pages/doctor/DoctorSettingsPage';

// Các trang cho Nhân viên
import StaffDashboardPage from './pages/staff/DashboardPage';
import StaffPatientsPage from './pages/staff/PatientsPage';
import NewPatientPage from './pages/staff/NewPatientPage';
import StaffAppointmentsPage from './pages/staff/AppointmentsPage';
import NewAppointmentPage from './pages/staff/NewAppointmentPage';
import StaffTestResultsPage from './pages/staff/TestResultsPage';
import InputTestResultPage from './pages/staff/InputTestResultPage';
import StaffReportsPage from './pages/staff/ReportsPage';
import StaffSchedulePage from './pages/staff/StaffSchedulePage';
import StaffSettingsPage from './pages/staff/SettingsPage';
import ChatManagementPage from './pages/staff/ChatManagementPage';

// Placeholder cho các trang nhân viên chưa triển khai
const StaffPatientDetailPage = () => <Layout currentRole={UserRole.STAFF}><div className="p-8">Trang chi tiết bệnh nhân</div></Layout>;
const EditPatientPage = () => <Layout currentRole={UserRole.STAFF}><div className="p-8">Trang chỉnh sửa thông tin bệnh nhân</div></Layout>;

// Các trang cho Quản lý
import ManagerDashboardPage from './pages/manager/DashboardPage';
import StaffPage from './pages/manager/StaffPage';
import ReportsPage from './pages/manager/ReportsPage';
import ManagerDoctorsPage from './pages/manager/DoctorsPage';
import ContentManagementPage from './pages/manager/ContentManagementPage';
import AnalyticsPage from './pages/manager/AnalyticsPage';
import DoctorSchedulePage from './pages/manager/DoctorSchedulePage';
import ManagerSettingsPage from './pages/manager/ManagerSettingsPage';

// Các trang cho Quản trị
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminUsersPage from './pages/admin/UsersPage';
import DataManagementPage from './pages/admin/DataManagementPage';
import StatisticsPage from './pages/admin/StatisticsPage';



// Placeholder cho các trang quản trị chưa triển khai
const AdminNewUserPage = () => <Layout currentRole={UserRole.ADMIN}><div className="p-8">Trang thêm người dùng mới</div></Layout>;
const AdminEditUserPage = () => <Layout currentRole={UserRole.ADMIN}><div className="p-8">Trang chỉnh sửa người dùng</div></Layout>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Các trang Khách */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/schedule" element={<PublicSchedulePage />} />
        
        {/* Các trang Xác thực */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        

        
        {/* Các trang Bệnh nhân */}
        <Route path="/customer" element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="/customer/dashboard" element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/customer/info" element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <InfoPage />
          </ProtectedRoute>
        } />

        
        {/* Redirect old dashboard route */}
        <Route path="/dashboard" element={<Navigate to="/customer/dashboard" replace />} />
        
        {/* Lịch hẹn */}
        <Route path="/customer/appointments" element={<AppointmentsPage />} />
        <Route path="/customer/appointments/upcoming" element={<AppointmentsPage />} />
        <Route path="/customer/appointments/history" element={<AppointmentsPage />} />
        <Route path="/customer/appointments/new" element={<AppointmentsPage />} />
        
        {/* Kết quả xét nghiệm */}
        <Route path="/customer/test-results" element={<TestResultsPage />} />
        <Route path="/customer/test-results/latest" element={<TestResultsPage />} />
        <Route path="/customer/test-results/history" element={<TestResultsPage />} />
        <Route path="/customer/test-results/compare" element={<TestResultsPage />} />
        
        {/* Thuốc */}
        <Route path="/customer/medications" element={<MedicationsPage />} />
        <Route path="/customer/medications/current" element={<MedicationsPage />} />
        <Route path="/customer/medications/history" element={<MedicationsPage />} />
        <Route path="/customer/medications/refill" element={<MedicationsPage />} />
        
        {/* Tài liệu */}
        <Route path="/customer/resources" element={<CustomerResourcesPage />} />
        <Route path="/customer/resources/treatment" element={<CustomerResourcesPage />} />
        <Route path="/customer/resources/living-with-hiv" element={<CustomerResourcesPage />} />
        <Route path="/customer/resources/support" element={<CustomerResourcesPage />} />
        
        {/* Thông tin cá nhân */}

        <Route path="/customer/settings" element={<SettingsPage />} />
        <Route path="/customer/support" element={<InfoPage />} />
        


        {/* Redirect old routes */}
        <Route path="/education" element={<Navigate to="/resources" replace />} />
        <Route path="/customer/education" element={<Navigate to="/customer/resources" replace />} />

        {/* Các trang Bác sĩ */}
        <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <DoctorDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
        <Route path="/doctor/treatment-plans" element={<DoctorTreatmentPlansPage />} />
        <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
        <Route path="/doctor/test-results" element={<DoctorTestResultsPage />} />
        <Route path="/doctor/calendar" element={<DoctorCalendarPage />} />

        <Route path="/doctor/settings" element={<DoctorSettingsPage />} />

        {/* Các trang Nhân viên */}
        <Route path="/staff" element={<Navigate to="/staff/dashboard" replace />} />
        <Route path="/staff/dashboard" element={
          <ProtectedRoute allowedRoles={['STAFF']}>
            <StaffDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/staff/patients" element={<StaffPatientsPage />} />
        <Route path="/staff/patients/new" element={<NewPatientPage />} />
        <Route path="/staff/patients/:patientId" element={<StaffPatientDetailPage />} />
        <Route path="/staff/patients/:patientId/edit" element={<EditPatientPage />} />
        <Route path="/staff/appointments" element={<StaffAppointmentsPage />} />
        <Route path="/staff/appointments/new" element={<NewAppointmentPage />} />
        <Route path="/staff/test-results" element={<StaffTestResultsPage />} />
        <Route path="/staff/test-results/:testId/input" element={<InputTestResultPage />} />
        <Route path="/staff/reports" element={<StaffReportsPage />} />
        <Route path="/staff/settings" element={<StaffSettingsPage />} />
        <Route path="/staff/schedule" element={<StaffSchedulePage />} />

        <Route path="/staff/chat" element={<ChatManagementPage />} />

        {/* Các trang Quản lý */}
        <Route path="/manager" element={<Navigate to="/manager/dashboard" replace />} />
        <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
        <Route path="/manager/staff" element={<StaffPage />} />
        <Route path="/manager/doctors" element={<ManagerDoctorsPage />} />
        <Route path="/manager/reports" element={<ReportsPage />} />
        <Route path="/manager/content" element={<ContentManagementPage />} />
        <Route path="/manager/analytics" element={<AnalyticsPage />} />
        <Route path="/manager/doctor-schedule" element={<DoctorSchedulePage />} />

        <Route path="/manager/settings" element={<ManagerSettingsPage />} />

        {/* Các trang Quản trị */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/users/new" element={<AdminNewUserPage />} />
        <Route path="/admin/users/:userId/edit" element={<AdminEditUserPage />} />
        <Route path="/admin/data-management" element={<DataManagementPage />} />

        <Route path="/admin/statistics" element={<StatisticsPage />} />
        
        {/* 404 Page - Must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
 