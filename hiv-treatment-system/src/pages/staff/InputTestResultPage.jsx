import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { UserRole } from '../../types/index.js';
import { 
  ArrowLeftIcon,
  BeakerIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const InputTestResultPage = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Giả lập dữ liệu xét nghiệm
  const [testResult, setTestResult] = useState({
    id: '',
    patientId: '',
    patientName: '',
    testType: '',
    orderedDate: '',
    orderedBy: '',
    status: '',
    notes: ''
  });
  
  const [formData, setFormData] = useState({
    result: '',
    resultNotes: '',
    interpretation: 'normal',
    completedDate: new Date().toISOString().split('T')[0], // Ngày hôm nay
    labTechnician: ''
  });
  
  // Giả lập dữ liệu nhân viên phòng lab
  const labTechnicians = [
    { id: 'LAB001', name: 'Nguyễn Văn Kỹ Thuật' },
    { id: 'LAB002', name: 'Trần Thị Xét Nghiệm' },
    { id: 'LAB003', name: 'Lê Văn Phòng Lab' }
  ];
  
  useEffect(() => {
    // Mô phỏng việc tải dữ liệu từ API
    setTimeout(() => {
      // Dữ liệu giả định
      if (testId === 'TR10022') {
        setTestResult({
          id: 'TR10022',
          patientId: 'PT10032',
          patientName: 'Nguyễn Thị F',
          testType: 'Viral Load',
          orderedDate: '20/06/2023',
          orderedBy: 'BS. Trần Minh',
          status: 'pending',
          notes: 'Kiểm tra tải lượng virus định kỳ'
        });
      } else if (testId === 'TR10023') {
        setTestResult({
          id: 'TR10023',
          patientId: 'PT10036',
          patientName: 'Trần Văn G',
          testType: 'CD4 Count',
          orderedDate: '21/06/2023',
          orderedBy: 'BS. Lê Hà',
          status: 'processing',
          notes: 'Theo dõi số lượng tế bào CD4'
        });
      } else if (testId === 'TR10024') {
        setTestResult({
          id: 'TR10024',
          patientId: 'PT10039',
          patientName: 'Lê Thị H',
          testType: 'Resistance Testing',
          orderedDate: '22/06/2023',
          orderedBy: 'BS. Nguyễn Thành',
          status: 'pending',
          notes: 'Kiểm tra khả năng kháng thuốc'
        });
      } else {
        // Trường hợp mặc định nếu không tìm thấy ID
        setTestResult({
          id: testId || 'Không xác định',
          patientId: 'PT00000',
          patientName: 'Không tìm thấy thông tin bệnh nhân',
          testType: 'Không xác định',
          orderedDate: '',
          orderedBy: '',
          status: 'error',
          notes: 'Không tìm thấy thông tin xét nghiệm'
        });
      }
      
      setIsLoading(false);
    }, 600);
  }, [testId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập gửi dữ liệu đến API
    console.log('Kết quả xét nghiệm:', {
      testId: testResult.id,
      ...formData
    });
    
    setShowSuccessMessage(true);
    
    // Sau 2 giây, chuyển về trang danh sách kết quả xét nghiệm
    setTimeout(() => {
      navigate('/staff/test-results');
    }, 2000);
  };
  
  // Hiển thị trường kết quả phù hợp theo loại xét nghiệm
  const renderResultField = () => {
    switch (testResult.testType) {
      case 'Viral Load':
        return (
          <div>
            <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
              Tải lượng virus (copies/mL) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <Input
                id="result"
                name="result"
                type="text"
                value={formData.result}
                onChange={handleInputChange}
                placeholder="Ví dụ: < 20 hoặc 500"
                required
              />
              <span className="ml-2 text-sm text-gray-500">copies/mL</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Nhập "{'<'} 20" nếu không phát hiện được virus
            </p>
          </div>
        );
      case 'CD4 Count':
        return (
          <div>
            <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng tế bào CD4 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <Input
                id="result"
                name="result"
                type="number"
                value={formData.result}
                onChange={handleInputChange}
                required
              />
              <span className="ml-2 text-sm text-gray-500">cells/mm³</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Giá trị bình thường: 500-1500 cells/mm³
            </p>
          </div>
        );
      case 'Resistance Testing':
        return (
          <div>
            <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
              Kết quả xét nghiệm kháng thuốc <span className="text-red-500">*</span>
            </label>
            <textarea
              id="result"
              name="result"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={formData.result}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      default:
        return (
          <div>
            <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
              Kết quả xét nghiệm <span className="text-red-500">*</span>
            </label>
            <Input
              id="result"
              name="result"
              value={formData.result}
              onChange={handleInputChange}
              required
            />
          </div>
        );
    }
  };

  // Hiển thị tình trạng xét nghiệm
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'completed':
        return 'Hoàn thành';
      case 'error':
        return 'Lỗi';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <Layout currentRole={UserRole.STAFF} userName="Trần Văn Nhân Viên">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentRole={UserRole.STAFF} userName="Trần Văn Nhân Viên">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            <Link to="/staff/test-results" className="mr-4">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeftIcon className="h-4 w-4 mr-1" /> Quay lại
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Nhập kết quả xét nghiệm</h1>
          </div>
        </div>

        {showSuccessMessage ? (
          <Card>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Cập nhật thành công!</h2>
              <p className="text-gray-600 mb-4">Kết quả xét nghiệm đã được cập nhật vào hệ thống.</p>
              <p className="text-gray-500">Đang chuyển hướng đến trang danh sách kết quả xét nghiệm...</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Thông tin xét nghiệm */}
            <Card>
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-lg font-medium text-gray-900">Thông tin xét nghiệm</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">ID xét nghiệm</p>
                        <p className="text-sm font-medium">{testResult.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Loại xét nghiệm</p>
                        <p className="text-sm font-medium">{testResult.testType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày chỉ định</p>
                        <p className="text-sm font-medium">{testResult.orderedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bác sĩ chỉ định</p>
                        <p className="text-sm font-medium">{testResult.orderedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trạng thái</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-yellow-100 text-yellow-800 border-yellow-200">
                          {getStatusLabel(testResult.status)}
                        </span>
                      </div>
                    </div>
                    {testResult.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Ghi chú</p>
                        <p className="text-sm">{testResult.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
                        {testResult.patientName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {testResult.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testResult.patientId}
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/staff/patients/${testResult.patientId}`} 
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mt-2"
                    >
                      Xem hồ sơ bệnh nhân
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            {/* Form nhập kết quả */}
            <Card>
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-lg font-medium text-gray-900">Nhập kết quả</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Kết quả xét nghiệm */}
                    {renderResultField()}
                    
                    {/* Đánh giá kết quả */}
                    <div>
                      <label htmlFor="interpretation" className="block text-sm font-medium text-gray-700 mb-1">
                        Đánh giá <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="interpretation"
                        name="interpretation"
                        value={formData.interpretation}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="normal">Bình thường</option>
                        <option value="attention">Cần chú ý</option>
                        <option value="critical">Nguy hiểm</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Ghi chú kết quả */}
                    <div>
                      <label htmlFor="resultNotes" className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú kết quả
                      </label>
                      <textarea
                        id="resultNotes"
                        name="resultNotes"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        value={formData.resultNotes}
                        onChange={handleInputChange}
                        placeholder="Nhập ghi chú hoặc diễn giải kết quả xét nghiệm"
                      />
                    </div>
                    
                    {/* Ngày hoàn thành */}
                    <div>
                      <label htmlFor="completedDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày hoàn thành <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="completedDate"
                        name="completedDate"
                        type="date"
                        value={formData.completedDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Nhân viên xét nghiệm */}
                    <div>
                      <label htmlFor="labTechnician" className="block text-sm font-medium text-gray-700 mb-1">
                        Nhân viên xét nghiệm <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="labTechnician"
                        name="labTechnician"
                        value={formData.labTechnician}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">-- Chọn nhân viên --</option>
                        {labTechnicians.map(tech => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Nút hành động */}
                <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                  <Link to="/staff/test-results">
                    <Button variant="outline" type="button">Hủy</Button>
                  </Link>
                  <Button variant="primary" type="submit" className="flex items-center">
                    <BeakerIcon className="h-4 w-4 mr-1" /> Lưu kết quả xét nghiệm
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InputTestResultPage; 