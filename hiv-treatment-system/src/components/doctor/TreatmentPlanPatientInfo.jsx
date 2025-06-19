import React, { useState } from 'react';

const TreatmentPlanPatientInfo = ({ patientData, onUpdateAllergies, onUpdateComorbidities }) => {
  const [formData, setFormData] = useState(patientData || {
    name: '',
    age: '',
    gender: '',
    diagnosisDate: '',
    allergies: '',
    comorbidities: '',
  });

  // Cập nhật dữ liệu khi chỉnh sửa phần dị ứng và bệnh khác
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    
    // Gọi callback để cập nhật dữ liệu lên component cha (nếu có)
    if (name === 'allergies' && onUpdateAllergies) {
      onUpdateAllergies(value);
    } else if (name === 'comorbidities' && onUpdateComorbidities) {
      onUpdateComorbidities(value);
    }
  };

  // Render field label
  const renderFieldLabel = (label) => (
    <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
  );

  // Render field read-only value
  const renderReadOnlyValue = (value) => (
    <div className="text-base text-gray-900">{value || 'Chưa có thông tin'}</div>
  );

  // Render textarea field cho phần có thể chỉnh sửa
  const renderTextareaField = (name, value) => (
    <textarea
      name={name}
      id={name}
      rows={3}
      value={value || ''}
      onChange={handleInputChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
    />
  );

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Thông tin bệnh nhân</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tên bệnh nhân - Read Only */}
          <div>
            {renderFieldLabel('Tên bệnh nhân')}
            {renderReadOnlyValue(formData.name)}
          </div>

          {/* Tuổi - Read Only */}
          <div>
            {renderFieldLabel('Tuổi')}
            {renderReadOnlyValue(formData.age)}
          </div>

          {/* Giới tính - Read Only */}
          <div>
            {renderFieldLabel('Giới tính')}
            {renderReadOnlyValue(formData.gender)}
          </div>

          {/* Ngày chẩn đoán - Read Only */}
          <div>
            {renderFieldLabel('Ngày chẩn đoán')}
            {renderReadOnlyValue(formData.diagnosisDate)}
          </div>
        </div>

        {/* Dị ứng - Có thể chỉnh sửa */}
        <div>
          {renderFieldLabel('Dị ứng')}
          {renderTextareaField('allergies', formData.allergies)}
        </div>

        {/* Bệnh khác - Có thể chỉnh sửa */}
        <div>
          {renderFieldLabel('Bệnh khác')}
          {renderTextareaField('comorbidities', formData.comorbidities)}
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanPatientInfo; 