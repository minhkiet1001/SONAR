import React from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import PatientInfoCard from '../../components/common/PatientInfoCard';

const PatientDetailPage = () => {
  // Dữ liệu mẫu của bệnh nhân
  const patientData = {
    name: 'Trần Thị Bình',
    age: 42,
    gender: 'Nữ',
    diagnosisDate: '2023-03-20',
    allergies: 'Penicillin, Aspirin',
    comorbidities: 'Tiểu đường type 2',
    patientId: 'BN-2023-0042',
    address: 'Số 123 Đường Lê Lợi, Quận 1, TP.HCM',
    phone: '0901234567',
    email: 'binh.tran@email.com',
  };

  return (
    <Layout currentRole={UserRole.DOCTOR}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết bệnh nhân</h1>
          <p className="text-gray-600">Xem và quản lý thông tin chi tiết của bệnh nhân</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Thông tin cá nhân */}
          <PatientInfoCard patientData={patientData} />

          {/* Phần này có thể thêm các thông tin khác như lịch sử khám bệnh, kết quả xét nghiệm, v.v. */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lịch sử khám bệnh</h2>
            {/* Nội dung lịch sử khám bệnh */}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kết quả xét nghiệm gần đây</h2>
            {/* Nội dung kết quả xét nghiệm */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetailPage; 