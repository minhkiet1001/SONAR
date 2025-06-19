import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

const CreateReportModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'performance',
    category: 'staff',
    description: '',
    dateRange: 'month',
    startDate: '',
    endDate: '',
    departments: [],
    includeCharts: true,
    format: 'pdf',
    recipients: '',
    priority: 'normal'
  });

  const [errors, setErrors] = useState({});

  const reportTypes = [
    { value: 'performance', label: 'Báo cáo hiệu suất', icon: ChartBarIcon },
    { value: 'financial', label: 'Báo cáo tài chính', icon: DocumentTextIcon },
    { value: 'patient', label: 'Báo cáo bệnh nhân', icon: DocumentTextIcon },
    { value: 'staff', label: 'Báo cáo nhân viên', icon: DocumentTextIcon }
  ];

  const dateRanges = [
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
    { value: 'year', label: 'Năm này' },
    { value: 'custom', label: 'Tùy chỉnh' }
  ];

  const departments = [
    'Khoa Đa khoa',
    'Khoa Bệnh truyền nhiễm',
    'Khoa Chăm sóc bệnh nhân',
    'Khoa Dược',
    'Phòng xét nghiệm',
    'Phòng Tư vấn',
    'Phòng Hành chính'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDepartmentChange = (department) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề báo cáo';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả báo cáo';
    }

    if (formData.dateRange === 'custom') {
      if (!formData.startDate) {
        newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'Vui lòng chọn ngày kết thúc';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const reportData = {
        ...formData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date(),
        createdBy: 'Manager',
        progress: 0
      };
      
      onSave(reportData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      type: 'performance',
      category: 'staff',
      description: '',
      dateRange: 'month',
      startDate: '',
      endDate: '',
      departments: [],
      includeCharts: true,
      format: 'pdf',
      recipients: '',
      priority: 'normal'
    });
    setErrors({});
    onClose();
  };

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
                    Tạo báo cáo mới
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề báo cáo *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                          errors.title ? 'border-red-300' : ''
                        }`}
                        placeholder="Nhập tiêu đề báo cáo..."
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loại báo cáo
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        {reportTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả báo cáo *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                        errors.description ? 'border-red-300' : ''
                      }`}
                      placeholder="Mô tả nội dung và mục đích của báo cáo..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Khoảng thời gian
                      </label>
                      <select
                        name="dateRange"
                        value={formData.dateRange}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      >
                        {dateRanges.map(range => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.dateRange === 'custom' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Từ ngày *
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                              errors.startDate ? 'border-red-300' : ''
                            }`}
                          />
                          {errors.startDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Đến ngày *
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                              errors.endDate ? 'border-red-300' : ''
                            }`}
                          />
                          {errors.endDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Khoa/Phòng (chọn nhiều)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {departments.map(department => (
                        <label key={department} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.departments.includes(department)}
                            onChange={() => handleDepartmentChange(department)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{department}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="includeCharts"
                      checked={formData.includeCharts}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Bao gồm biểu đồ và hình ảnh
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                    >
                      Tạo báo cáo
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateReportModal; 