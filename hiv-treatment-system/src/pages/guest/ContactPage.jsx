import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ContactPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role');
  const isCustomer = role === 'customer';
  const currentRole = isCustomer ? UserRole.CUSTOMER : UserRole.GUEST;
  const userName = isCustomer ? 'Nguyễn Văn An' : undefined;

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactPreference: 'email',
    reason: ''
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Thông tin liên hệ
  const contactInfo = {
    address: "123 Đại lộ Y tế, Phòng 300, Quận 1, TP. Hồ Chí Minh",
    phone: "(028) 456-7890",
    emergencyPhone: "(800) 555-1234",
    email: "contact@hivtreatmentcenter.org",
    hours: [
      "Thứ Hai - Thứ Sáu: 8:00 - 18:00",
      "Thứ Bảy: 9:00 - 14:00",
      "Chủ Nhật: Đóng cửa"
    ],
    socialMedia: {
      facebook: "https://www.facebook.com/hivtreatmentcenter",
      twitter: "https://twitter.com/hivtreatmentctr",
      instagram: "https://www.instagram.com/hivtreatmentcenter"
    }
  };

  // Lý do liên hệ
  const contactReasons = [
    { id: 'general', name: 'Thông Tin Chung' },
    { id: 'appointment', name: 'Đặt Lịch Hẹn' },
    { id: 'testing', name: 'Thắc Mắc Về Xét Nghiệm HIV' },
    { id: 'treatment', name: 'Các Phương Pháp Điều Trị' },
    { id: 'support', name: 'Dịch Vụ Hỗ Trợ' },
    { id: 'feedback', name: 'Phản Hồi hoặc Đề Xuất' },
    { id: 'other', name: 'Khác' }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactPreference: 'email',
        reason: ''
      });
    }, 2000);
  };

  return (
    <Layout currentRole={currentRole} userName={userName}>
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4"><span>Liên Hệ Với Chúng Tôi</span></h1>
            <p className="text-xl text-green-100">
              <span>Chúng tôi luôn sẵn sàng trả lời câu hỏi và hỗ trợ bạn. Hãy liên hệ với đội ngũ của chúng tôi qua biểu mẫu liên hệ hoặc thông qua bất kỳ kênh liên lạc nào của chúng tôi.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6"><span>Gửi Tin Nhắn Cho Chúng Tôi</span></h2>
              
              {submitted ? (
                <Card className="bg-green-50 border border-green-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <svg className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900"><span>Tin Nhắn Đã Được Gửi Thành Công!</span></h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      <span>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.</span>
                    </p>
                    <Button variant="primary" onClick={() => setSubmitted(false)}>
                      <span>Gửi Tin Nhắn Khác</span>
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card>
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Họ Tên *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Địa Chỉ Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Số Điện Thoại
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="contactPreference" className="block text-sm font-medium text-gray-700 mb-1">
                            Phương Thức Liên Hệ Ưa Thích
                          </label>
                          <select
                            id="contactPreference"
                            name="contactPreference"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.contactPreference}
                            onChange={handleChange}
                          >
                            <option value="email">Email</option>
                            <option value="phone">Điện thoại</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                          Lý Do Liên Hệ *
                        </label>
                        <select
                          id="reason"
                          name="reason"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={formData.reason}
                          onChange={handleChange}
                        >
                          <option value="">Chọn lý do</option>
                          {contactReasons.map(reason => (
                            <option key={reason.id} value={reason.id}>{reason.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Tiêu Đề *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Nội Dung *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="text-right">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                        </Button>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                          {error}
                        </div>
                      )}
                    </div>
                  </form>
                </Card>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6"><span>Thông Tin Liên Hệ</span></h2>
              
              <Card className="mb-6">
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900"><span>Địa Chỉ</span></h3>
                        <p className="text-gray-600 mt-1"><span>{contactInfo.address}</span></p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900"><span>Điện Thoại</span></h3>
                        <p className="text-gray-600 mt-1"><span>{contactInfo.phone}</span></p>
                        <p className="text-gray-600 mt-1"><span>Đường dây nóng: {contactInfo.emergencyPhone}</span></p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900"><span>Email</span></h3>
                        <p className="text-gray-600 mt-1"><span>{contactInfo.email}</span></p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900"><span>Giờ Làm Việc</span></h3>
                        <div className="text-gray-600 mt-1">
                          {contactInfo.hours.map((hour, index) => (
                            <p key={index}><span>{hour}</span></p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="mb-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Giờ Làm Việc</h3>
                  <div className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      {contactInfo.hours.map((hours, index) => (
                        <p key={index} className="text-gray-600">{hours}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết Nối Với Chúng Tôi</h3>
                  <div className="flex space-x-4">
                    <a href={contactInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Vị Trí Của Chúng Tôi</h2>
          <div className="bg-gray-300 h-96 rounded-lg overflow-hidden shadow-md">
            {/* In a real application, you would embed a Google Map or similar here */}
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-gray-600">Bản đồ tương tác sẽ được hiển thị tại đây</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Câu Hỏi Thường Gặp</h2>
            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tôi có thể đặt lịch hẹn nhanh như thế nào?</h3>
                  <p className="text-gray-600">
                    Chúng tôi cố gắng tiếp nhận bệnh nhân mới trong vòng 1-2 tuần. Nếu bạn có nhu cầu khẩn cấp, vui lòng gọi điện trực tiếp đến văn phòng của chúng tôi và chúng tôi sẽ cố gắng hết sức để sắp xếp cho bạn sớm hơn.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Xét nghiệm HIV có bảo mật không?</h3>
                  <p className="text-gray-600">
                    Có, tất cả các xét nghiệm đều hoàn toàn bảo mật. Chúng tôi tuân thủ các tiêu chuẩn bảo mật nghiêm ngặt và thông tin của bạn được bảo vệ theo quy định HIPAA.
                  </p>
                </div>
              </Card>
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Các gói bảo hiểm nào được chấp nhận?</h3>
                  <p className="text-gray-600">
                    Chúng tôi chấp nhận hầu hết các gói bảo hiểm chính bao gồm Medicare và Medicaid. Đối với những người không có bảo hiểm, chúng tôi cung cấp phí theo thang đối và có thể giúp kết nối bạn với các chương trình hỗ trợ.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage; 