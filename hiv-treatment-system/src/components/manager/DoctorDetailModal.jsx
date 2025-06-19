import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, PencilIcon, UserIcon, EnvelopeIcon, PhoneIcon, AcademicCapIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

const DoctorDetailModal = ({ isOpen, onClose, doctor, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialty: doctor?.specialty || '',
    email: doctor?.email || '',
    phone: doctor?.phone || '',
    status: doctor?.status || 'active',
    experience: doctor?.experience || '',
    workingHours: doctor?.workingHours || '',
    languages: doctor?.languages || [],
    bio: doctor?.bio || ''
  });

  const [errors, setErrors] = useState({});

  const specialties = [
    'Bệnh truyền nhiễm',
    'Nội khoa',
    'Tâm lý học',
    'Dinh dưỡng',
    'Dược lâm sàng',
    'Chăm sóc sức khỏe tổng quát'
  ];

  const statusOptions = [
    { value: 'active', label: 'Đang làm việc', color: 'bg-green-100 text-green-800' },
    { value: 'on-leave', label: 'Nghỉ phép', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'inactive', label: 'Không hoạt động', color: 'bg-red-100 text-red-800' }
  ];

  const languageOptions = [
    'Tiếng Việt',
    'English',
    'Français',
    '中文',
    '日本語'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLanguageChange = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedDoctor = {
        ...doctor,
        ...formData,
        updatedAt: new Date()
      };
      
      onSave(updatedDoctor);
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: doctor?.name || '',
      specialty: doctor?.specialty || '',
      email: doctor?.email || '',
      phone: doctor?.phone || '',
      status: doctor?.status || 'active',
      experience: doctor?.experience || '',
      workingHours: doctor?.workingHours || '',
      languages: doctor?.languages || [],
      bio: doctor?.bio || ''
    });
    setErrors({});
    setIsEditing(false);
    onClose();
  };

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusOption?.color}`}>
        {statusOption?.label}
      </span>
    );
  };

  if (!doctor) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {isEditing ? 'Chỉnh sửa thông tin bác sĩ' : 'Chi tiết bác sĩ'}
                  </Dialog.Title>
                  <div className="flex items-center space-x-2">
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={handleClose}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                            errors.name ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chuyên khoa
                        </label>
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option value="">Chọn chuyên khoa</option>
                          {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                            errors.email ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                            errors.phone ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Lưu thay đổi
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                          <UserIcon className="h-8 w-8 text-primary-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          {getStatusBadge(doctor.status)}
                          {doctor.experience && (
                            <span className="text-sm text-gray-500">
                              {doctor.experience} năm kinh nghiệm
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin liên hệ</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm text-gray-900">{doctor.email}</span>
                          </div>
                          <div className="flex items-center">
                            <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm text-gray-900">{doctor.phone}</span>
                          </div>
                          {doctor.workingHours && (
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-sm text-gray-900">{doctor.workingHours}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Thông tin chuyên môn</h4>
                        <div className="space-y-3">
                          {doctor.languages && doctor.languages.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-500">Ngôn ngữ:</span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {doctor.languages.map(language => (
                                  <span key={language} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {language}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {doctor.bio && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Tiểu sử</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{doctor.bio}</p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={handleClose}
                      >
                        Đóng
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DoctorDetailModal; 