import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  CalendarIcon, 
  HeartIcon, 
  ClipboardDocumentListIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  UserIcon,
  PhoneIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const carouselImages = [
    {
      src: '/images/healthcare-banner-1.jpg',
      alt: 'Chăm sóc sức khỏe toàn diện',
      placeholderColor: '2563eb',
      placeholderText: 'Chăm sóc sức khỏe toàn diện',
      description: 'Đội ngũ y bác sĩ chuyên nghiệp, tận tâm'
    },
    {
      src: '/images/healthcare-banner-2.jpg',
      alt: 'Điều trị HIV hiện đại',
      placeholderColor: '3b82f6',
      placeholderText: 'Điều trị HIV hiện đại',
      description: 'Phương pháp điều trị tiên tiến, hiệu quả'
    },
    {
      src: '/images/healthcare-banner-3.jpg',
      alt: 'Theo dõi sức khỏe',
      placeholderColor: '60a5fa',
      placeholderText: 'Theo dõi sức khỏe',
      description: 'Giám sát và quản lý sức khỏe thường xuyên'
    },
    {
      src: '/images/healthcare-banner-4.jpg',
      alt: 'Hỗ trợ toàn diện',
      placeholderColor: '93c5fd',
      placeholderText: 'Hỗ trợ toàn diện',
      description: 'Đồng hành cùng bạn trên hành trình điều trị'
    }
  ];

  // Carousel automation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => 
        prevImage === carouselImages.length - 1 ? 0 : prevImage + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Carousel error handling
  const handleImageError = (e, image) => {
    // Create a canvas for the placeholder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `#${image.placeholderColor}`);
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(image.placeholderText, canvas.width / 2, canvas.height / 2);

    // Set the canvas as the image source
    e.target.src = canvas.toDataURL();
  };

  // Handle function card clicks
  const handleCardClick = (path) => {
    navigate(path);
  };

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: 'BS. Nguyễn Văn Minh',
      date: new Date('2023-06-15T10:00:00'),
      type: 'Khám định kỳ',
      location: 'Phòng khám số 3, Tầng 2'
    },
    {
      id: 2,
      doctorName: 'BS. Trần Thị Hương',
      date: new Date('2023-06-22T14:30:00'),
      type: 'Xét nghiệm máu',
      location: 'Phòng xét nghiệm, Tầng 1'
    }
  ];

  // Mock data for recent test results
  const recentTestResults = [
    {
      id: 1,
      name: 'Số lượng CD4',
      date: new Date('2023-05-20'),
      status: 'normal',
      value: '650 tế bào/mm³'
    },
    {
      id: 2,
      name: 'Tải lượng virus',
      date: new Date('2023-05-20'),
      status: 'normal',
      value: 'Không phát hiện (<20 bản sao/mL)'
    }
  ];

  // Mock data for medications
  const medications = [
    {
      id: 1,
      name: 'Tenofovir',
      dosage: '300mg',
      frequency: 'Một lần mỗi ngày',
      nextRefill: new Date('2023-07-01')
    },
    {
      id: 2,
      name: 'Emtricitabine',
      dosage: '200mg',
      frequency: 'Một lần mỗi ngày',
      nextRefill: new Date('2023-07-01')
    }
  ];

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color for test results
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'normal':
        return 'Bình thường';
      case 'attention':
        return 'Cần chú ý';
      case 'critical':
        return 'Nguy hiểm';
      default:
        return 'Không xác định';
    }
  };

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An">
      <div>
        {/* Hero Banner with Carousel */}
        <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    {carouselImages[currentImage].alt}
                  </span>
                </h1>
                <p className="text-lg mb-6 opacity-90 animate-fade-in-up animation-delay-200">
                  {carouselImages[currentImage].description}
                </p>
                <div className="flex animate-fade-in-up animation-delay-400">
                  <Button 
                    variant="white" 
                    className="group flex items-center justify-center font-medium px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/customer/appointments')}
                  >
                    <CalendarIcon className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" />
                    Đặt lịch hẹn
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative h-96 rounded-lg shadow-2xl overflow-hidden">
                {carouselImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      index === currentImage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, image)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white text-lg font-medium">{image.description}</p>
                    </div>
                  </div>
                ))}
                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImage 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="max-w-7xl mx-auto px-4 -mt-8 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Card 1 - Appointments */}
            <div onClick={() => handleCardClick('/customer/appointments/upcoming')} className="cursor-pointer group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-primary-50">
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-primary-100 p-3 rounded-full w-fit mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <CalendarIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-primary-600">Lịch hẹn</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Quản lý lịch hẹn khám và nhận thông báo nhắc nhở</p>
                  <div className="flex items-center text-primary-600 font-medium transition-all duration-300 group-hover:translate-x-2">
                    Xem lịch hẹn <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Card 2 - Test Results */}
            <div onClick={() => handleCardClick('/customer/test-results/latest')} className="cursor-pointer group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50">
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <BeakerIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">Kết quả xét nghiệm</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Truy cập kết quả xét nghiệm và theo dõi tiến triển</p>
                  <div className="flex items-center text-blue-600 font-medium transition-all duration-300 group-hover:translate-x-2">
                    Xem kết quả <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Card 3 - Medications */}
            <div onClick={() => handleCardClick('/customer/medications/current')} className="cursor-pointer group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-green-50">
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-green-100 p-3 rounded-full w-fit mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <BeakerIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-green-600">Thuốc điều trị</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Quản lý đơn thuốc và nhận thông báo về lịch uống thuốc</p>
                  <div className="flex items-center text-green-600 font-medium transition-all duration-300 group-hover:translate-x-2">
                    Xem thuốc <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Card 4 - Resources */}
            <div onClick={() => handleCardClick('/customer/resources')} className="cursor-pointer group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50">
                <div className="p-6 flex flex-col h-full">
                  <div className="bg-purple-100 p-3 rounded-full w-fit mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <AcademicCapIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-purple-600">Tài nguyên học tập</h3>
                  <p className="text-gray-600 mb-4 flex-grow">Tìm hiểu thêm về HIV/AIDS và các phương pháp điều trị</p>
                  <div className="flex items-center text-purple-600 font-medium transition-all duration-300 group-hover:translate-x-2">
                    Xem tài liệu <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Health Status Section */}
        <div className="bg-gray-50/50 py-12 mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:16px_16px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600">
                  Tình trạng sức khỏe của bạn
                </span>
              </h2>
              <p className="text-gray-600 mt-2 animate-fade-in-up animation-delay-200">Theo dõi và quản lý sức khỏe của bạn một cách hiệu quả</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Appointments */}
              <div className="group">
                <Card className="transition-all duration-300 hover:shadow-lg group-hover:translate-y-[-4px] bg-gradient-to-br from-white to-primary-50/30">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <CalendarIcon className="h-6 w-6 text-primary-600 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 group-hover:from-blue-600 group-hover:to-primary-600 transition-all duration-300">
                          Lịch hẹn sắp tới
                        </span>
                      </h3>
                      <Link 
                        to="/customer/appointments" 
                        className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors duration-300 flex items-center group"
                      >
                        Xem tất cả
                        <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                    
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment, index) => (
                          <div 
                            key={appointment.id} 
                            className={`border border-primary-100 rounded-lg p-4 transition-all duration-300 
                              hover:bg-primary-50/50 hover:border-primary-200 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                                  {appointment.doctorName}
                                </p>
                                <p className="text-gray-600 text-sm">{appointment.type}</p>
                                <p className="text-gray-500 text-sm mt-1 flex items-center">
                                  <svg className="h-4 w-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                  </svg>
                                  {appointment.location}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-primary-600 font-medium transition-colors duration-300 group-hover:text-primary-700">
                                  {formatDate(appointment.date)}
                                </p>
                                <p className="text-gray-600 font-medium">{formatTime(appointment.date)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Bạn không có lịch hẹn nào sắp tới</p>
                        <Button 
                          variant="primary" 
                          className="transition-all duration-300 hover:scale-105"
                        >
                          Đặt lịch hẹn mới
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
              
              {/* Recent Test Results */}
              <div className="group">
                <Card className="transition-all duration-300 hover:shadow-lg group-hover:translate-y-[-4px] bg-gradient-to-br from-white to-blue-50/30">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <BeakerIcon className="h-6 w-6 text-blue-600 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-primary-600 group-hover:from-primary-600 group-hover:to-blue-600 transition-all duration-300">
                          Kết quả xét nghiệm gần đây
                        </span>
                      </h3>
                      <Link 
                        to="/customer/test-results" 
                        className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-300 flex items-center group"
                      >
                        Xem tất cả
                        <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                    
                    {recentTestResults.length > 0 ? (
                      <div className="space-y-4">
                        {recentTestResults.map((result, index) => (
                          <div 
                            key={result.id} 
                            className={`border border-blue-100 rounded-lg p-4 transition-all duration-300 
                              hover:bg-blue-50/50 hover:border-blue-200 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                  {result.name}
                                </p>
                                <p className="text-gray-600 mt-1">{result.value}</p>
                              </div>
                              <div className="text-right">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)} transition-colors duration-300`}>
                                  {getStatusText(result.status)}
                                </span>
                                <p className="text-gray-500 text-sm mt-2">{formatDate(result.date)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Không có kết quả xét nghiệm nào gần đây</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Medication Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                Thuốc điều trị của bạn
              </span>
            </h2>
            <p className="text-gray-600 mt-2 animate-fade-in-up animation-delay-200">Quản lý thuốc và lịch trình điều trị HIV</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medications.map((medication, index) => (
              <div key={medication.id} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg group-hover:translate-y-[-4px] bg-gradient-to-br from-white to-green-50/30">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                          {medication.name}
                        </h3>
                        <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <BeakerIcon className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">Ngày lấy thuốc tiếp theo</p>
                      <p className="font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                        {formatDate(medication.nextRefill)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
            
            {/* Add More Card */}
            <div className="group animate-fade-in-up" style={{ animationDelay: `${medications.length * 100}ms` }}>
              <Card className="h-full border-2 border-dashed border-gray-300 bg-transparent hover:bg-gray-50/80 transition-all duration-300 group-hover:border-primary-300">
                <Link 
                  to="/customer/medications" 
                  className="p-6 flex flex-col items-center justify-center h-full text-center group-hover:scale-105 transition-transform duration-300"
                >
                  <div className="bg-gray-100 p-3 rounded-full mb-4 transition-all duration-300 group-hover:bg-primary-100 group-hover:rotate-12">
                    <BeakerIcon className="h-6 w-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    Xem tất cả thuốc
                  </h3>
                  <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-300">
                    Quản lý đơn thuốc và lịch trình điều trị của bạn
                  </p>
                </Link>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us Section (based on Vinmec) */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">Tại sao chọn Hệ thống điều trị HIV của chúng tôi?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="bg-primary-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chuyên gia hàng đầu</h3>
                <p className="text-gray-600">Đội ngũ chuyên gia, bác sĩ có trình độ chuyên môn cao, tận tâm và chuyên nghiệp</p>
              </div>
              
              {/* Feature 2 */}
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chất lượng quốc tế</h3>
                <p className="text-gray-600">Tuân thủ các tiêu chuẩn chất lượng quốc tế về điều trị HIV/AIDS</p>
              </div>
              
              {/* Feature 3 */}
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Công nghệ tiên tiến</h3>
                <p className="text-gray-600">Ứng dụng các công nghệ hiện đại trong điều trị và theo dõi tình trạng sức khỏe</p>
              </div>
              
              {/* Feature 4 */}
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hỗ trợ toàn diện</h3>
                <p className="text-gray-600">Đồng hành cùng bệnh nhân trong suốt quá trình điều trị với sự thấu hiểu và tôn trọng</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Support Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]"></div>
            <div className="relative p-8 md:p-12">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                <div className="mb-8 lg:mb-0">
                  <h3 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
                    Cần hỗ trợ?
                  </h3>
                  <p className="text-lg text-white/90 mb-6 animate-fade-in-up animation-delay-200">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình điều trị HIV. 
                    Đừng ngần ngại liên hệ khi cần trợ giúp.
                  </p>
                  <div className="space-y-4 animate-fade-in-up animation-delay-400">
                    <div className="flex items-center text-white group">
                      <div className="p-2 bg-white/10 rounded-lg mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <PhoneIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-white/75">Hotline</p>
                        <p className="font-medium">1900 1234</p>
                      </div>
                    </div>
                    <div className="flex items-center text-white group">
                      <div className="p-2 bg-white/10 rounded-lg mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <ChatBubbleLeftRightIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-white/75">Email</p>
                        <p className="font-medium">support@hivcare.vn</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 animate-fade-in-up animation-delay-600">
                    <h4 className="text-xl font-semibold text-white mb-4">Gửi tin nhắn cho chúng tôi</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all duration-300"
                      />
                      <textarea
                        rows="4"
                        placeholder="Nội dung tin nhắn"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all duration-300"
                      ></textarea>
                      <button className="w-full bg-white text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105">
                        Gửi tin nhắn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage; 