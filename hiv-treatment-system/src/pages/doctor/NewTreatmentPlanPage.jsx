import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import TreatmentPlanManager from '../../components/doctor/TreatmentPlanManager';
import Button from '../../components/common/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const NewTreatmentPlanPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  // Mock patient data - in a real app, this would be fetched based on patientId
  const patient = {
    id: patientId || 'PT10045',
    fullName: 'Nguyễn Văn A',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    hivStatus: 'positive',
    phoneNumber: '(091) 234-5678',
    allergies: 'Penicillin',
    address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    healthInsuranceNumber: 'BH12345678',
  };

  // Mock ARV options
  const arvOptions = [
    { id: 'arv1', name: 'TLD', description: 'Tenofovir + Lamivudine + Dolutegravir' },
    { id: 'arv2', name: 'TLE', description: 'Tenofovir + Lamivudine + Efavirenz' },
    { id: 'arv3', name: 'AZT-3TC-DTG', description: 'Zidovudine + Lamivudine + Dolutegravir' },
    { id: 'arv4', name: 'AZT-3TC-EFV', description: 'Zidovudine + Lamivudine + Efavirenz' },
    { id: 'arv5', name: 'ABC-3TC-DTG', description: 'Abacavir + Lamivudine + Dolutegravir' },
    { id: 'arv6', name: 'RAL-DRV-RTV', description: 'Raltegravir + Darunavir + Ritonavir' },
  ];

  // Handle save treatment plan
  const handleSaveTreatmentPlan = (planData) => {
    console.log('Saving treatment plan:', planData);
    // In a real app, this would send data to an API
    
    // Show success message
    alert('Kế hoạch điều trị đã được lưu thành công!');
    
    // Navigate back to treatment plans page
    navigate('/doctor/treatment-plans');
  };

  return (
    <Layout currentRole={UserRole.DOCTOR} userName="BS. Sarah Johnson">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate('/doctor/treatment-plans')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo kế hoạch điều trị mới</h1>
            <p className="mt-1 text-sm text-gray-500">
              Thiết lập kế hoạch điều trị HIV cho bệnh nhân
            </p>
          </div>
        </div>

        <TreatmentPlanManager 
          patient={patient}
          arvOptions={arvOptions}
          onSavePlan={handleSaveTreatmentPlan}
        />
      </div>
    </Layout>
  );
};

export default NewTreatmentPlanPage; 