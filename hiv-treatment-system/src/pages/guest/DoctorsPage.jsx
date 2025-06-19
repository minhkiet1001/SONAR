import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import {
  UserIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'rating' | 'experience'
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn Minh',
      specialty: 'Bác sĩ Nhiễm trùng',
      specialtyCode: 'infectious',
      experience: 15,
      experienceText: '15 năm kinh nghiệm',
      education: 'Tiến sĩ Y khoa - Đại học Y Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      reviewCount: 124,
      location: 'Phòng khám 101, Tầng 2',
      phone: '(024) 3123-4567',
      email: 'bs.minh@hivcare.vn',
      languages: ['Tiếng Việt', 'English'],
      workingDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
      workingHours: '8:00 - 17:00',
      shifts: [
        { type: 'Buổi sáng', time: '08:00 - 12:00' },
        { type: 'Buổi chiều', time: '13:00 - 17:00' }
      ],
      bio: 'Chuyên gia hàng đầu về điều trị HIV/AIDS với hơn 15 năm kinh nghiệm. Đã điều trị thành công cho hơn 2000 bệnh nhân. Tốt nghiệp xuất sắc từ Đại học Y Hà Nội và có nhiều năm đào tạo tại các bệnh viện hàng đầu thế giới.',
      achievements: [
        'Giải thưởng Bác sĩ xuất sắc năm 2023',
        'Chứng chỉ điều trị HIV quốc tế (WHO)',
        'Thành viên Hội Nhiễm trùng Việt Nam',
        'Nghiên cứu sinh tại Johns Hopkins University'
      ],
      specializations: [
        'Điều trị HIV/AIDS',
        'Bệnh nhiễm trùng cơ hội',
        'Tư vấn phòng ngừa HIV',
        'Điều trị kháng thuốc ARV'
      ],
      publications: [
        'Nghiên cứu hiệu quả điều trị HIV tại Việt Nam (2023)',
        'Phác đồ điều trị mới cho bệnh nhân HIV (2022)',
        'Tình hình kháng thuốc ARV tại Việt Nam (2021)'
      ]
    },
    {
      id: 2,
      name: 'BS. Trần Thị Hương',
      specialty: 'Bác sĩ Nội khoa',
      specialtyCode: 'internal',
      experience: 12,
      experienceText: '12 năm kinh nghiệm',
      education: 'Thạc sĩ Y khoa - Đại học Y TP.HCM',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 4.9,
      reviewCount: 98,
      location: 'Phòng khám 205, Tầng 2',
      phone: '(024) 3123-4568',
      email: 'bs.huong@hivcare.vn',
      languages: ['Tiếng Việt', 'English', 'Français'],
      workingDays: ['Thứ 2', 'Thứ 3', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
      workingHours: '8:30 - 18:00',
      shifts: [
        { type: 'Buổi sáng', time: '08:30 - 12:30' },
        { type: 'Buổi chiều', time: '14:00 - 18:00' }
      ],
      bio: 'Bác sĩ nội khoa giàu kinh nghiệm, chuyên về chăm sóc toàn diện cho bệnh nhân HIV. Có kinh nghiệm làm việc tại nhiều bệnh viện lớn và tham gia các chương trình đào tạo quốc tế về HIV/AIDS.',
      achievements: [
        'Chứng chỉ tư vấn HIV/AIDS (CDC)',
        'Đào tạo tại Bệnh viện Johns Hopkins',
        'Nghiên cứu sinh xuất sắc',
        'Giải thưởng Bác sĩ trẻ tiêu biểu 2022'
      ],
      specializations: [
        'Chăm sóc toàn diện HIV',
        'Quản lý tác dụng phụ thuốc ARV',
        'Điều trị bệnh đồng mắc',
        'Tư vấn dinh dưỡng cho bệnh nhân HIV'
      ],
      publications: [
        'Chăm sóc toàn diện bệnh nhân HIV (2023)',
        'Quản lý tác dụng phụ thuốc ARV (2022)'
      ]
    },
    {
      id: 3,
      name: 'BS. Lê Văn Đức',
      specialty: 'Bác sĩ Tâm lý',
      specialtyCode: 'psychology',
      experience: 8,
      experienceText: '8 năm kinh nghiệm',
      education: 'Thạc sĩ Tâm lý học - Đại học Quốc gia Hà Nội',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
      rating: 4.7,
      reviewCount: 76,
      location: 'Phòng tư vấn 301, Tầng 3',
      phone: '(024) 3123-4569',
      email: 'bs.duc@hivcare.vn',
      languages: ['Tiếng Việt', 'English'],
      workingDays: ['Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
      workingHours: '9:00 - 17:30',
      shifts: [
        { type: 'Buổi sáng', time: '09:00 - 12:00' },
        { type: 'Buổi chiều', time: '13:30 - 17:30' }
      ],
      bio: 'Chuyên gia tâm lý với kinh nghiệm hỗ trợ tâm lý cho bệnh nhân HIV và gia đình. Đã tham gia nhiều chương trình đào tạo về tư vấn tâm lý cho bệnh nhân HIV tại trong và ngoài nước.',
      achievements: [
        'Chứng chỉ tư vấn tâm lý HIV (APA)',
        'Thành viên Hội Tâm lý học Việt Nam',
        'Chuyên gia tư vấn gia đình',
        'Giảng viên thỉnh giảng tại Đại học Y Hà Nội'
      ],
      specializations: [
        'Tư vấn tâm lý cho bệnh nhân HIV',
        'Hỗ trợ gia đình bệnh nhân',
        'Điều trị trầm cảm, lo âu',
        'Tư vấn tiền và sau test HIV'
      ],
      publications: [
        'Tâm lý học trong điều trị HIV (2023)',
        'Hỗ trợ tâm lý cho gia đình bệnh nhân HIV (2022)'
      ]
    },
    {
      id: 4,
      name: 'BS. Phạm Thị Mai',
      specialty: 'Bác sĩ Sản phụ khoa',
      specialtyCode: 'gynecology',
      experience: 10,
      experienceText: '10 năm kinh nghiệm',
      education: 'Tiến sĩ Y khoa - Đại học Y Dược TP.HCM',
      avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
      rating: 4.8,
      reviewCount: 89,
      location: 'Phòng khám 102, Tầng 1',
      phone: '(024) 3123-4570',
      email: 'bs.mai@hivcare.vn',
      languages: ['Tiếng Việt', 'English'],
      workingDays: ['Thứ 2', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
      workingHours: '8:00 - 16:30',
      shifts: [
        { type: 'Buổi sáng', time: '08:00 - 12:00' },
        { type: 'Buổi chiều', time: '13:00 - 16:30' }
      ],
      bio: 'Chuyên gia sản phụ khoa với kinh nghiệm chăm sóc phụ nữ mang thai nhiễm HIV. Đã tham gia nhiều chương trình phòng chống lây truyền HIV từ mẹ sang con.',
      achievements: [
        'Chứng chỉ chăm sóc thai kỳ HIV+',
        'Chuyên gia phòng chống MTCT',
        'Thành viên Hội Sản phụ khoa Việt Nam',
        'Giải thưởng nghiên cứu khoa học 2023'
      ],
      specializations: [
        'Chăm sóc thai kỳ HIV+',
        'Phòng chống lây truyền mẹ-con',
        'Tư vấn kế hoạch hóa gia đình',
        'Điều trị bệnh phụ khoa'
      ],
      publications: [
        'Phòng chống lây truyền HIV từ mẹ sang con (2023)',
        'Chăm sóc thai kỳ an toàn cho phụ nữ HIV+ (2022)'
      ]
    }
  ];

  const specialties = [
    { code: 'all', name: 'Tất cả chuyên khoa' },
    { code: 'infectious', name: 'Bác sĩ Nhiễm trùng' },
    { code: 'internal', name: 'Bác sĩ Nội khoa' },
    { code: 'psychology', name: 'Bác sĩ Tâm lý' },
    { code: 'gynecology', name: 'Bác sĩ Sản phụ khoa' }
  ];

  // Filter and sort doctors
  const filteredAndSortedDoctors = doctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = specialtyFilter === 'all' || doctor.specialtyCode === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          i < Math.floor(rating) ? (
            <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
          ) : (
            <StarIcon key={i} className="h-4 w-4 text-gray-300" />
          )
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const DoctorDetailModal = ({ doctor, isOpen, onClose }) => {
    if (!isOpen || !doctor) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                    <p className="text-lg text-primary-600 font-medium">{doctor.specialty}</p>
                    <p className="text-gray-600">{doctor.experienceText}</p>
                    <div className="mt-2">{renderStars(doctor.rating)}</div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Contact & Schedule */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <MapPinIcon className="h-4 w-4 mr-3 text-gray-400" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <PhoneIcon className="h-4 w-4 mr-3 text-gray-400" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <EnvelopeIcon className="h-4 w-4 mr-3 text-gray-400" />
                          <span>{doctor.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <GlobeAltIcon className="h-4 w-4 mr-3 text-gray-400" />
                          <span>{doctor.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Working Schedule */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Lịch làm việc</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="h-4 w-4 mr-3 text-gray-400" />
                          <div>
                            <div className="font-medium">Ngày làm việc</div>
                            <div className="text-gray-600">{doctor.workingDays.join(', ')}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm">
                          <ClockIcon className="h-4 w-4 mr-3 text-gray-400" />
                          <div>
                            <div className="font-medium">Giờ làm việc</div>
                            <div className="text-gray-600">{doctor.workingHours}</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="font-medium text-sm mb-2">Ca làm việc:</div>
                          {doctor.shifts.map((shift, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>{shift.type}:</span>
                              <span>{shift.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      to="/schedule"
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center block"
                    >
                      Xem lịch khám
                    </Link>
                    <Link
                      to="/login"
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                    >
                      Đặt lịch hẹn
                    </Link>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Biography */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Giới thiệu</h3>
                      <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                    </div>
                  </Card>

                  {/* Education */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Học vấn</h3>
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-5 w-5 mr-3 text-gray-400" />
                        <span className="text-gray-700">{doctor.education}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Specializations */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Chuyên môn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {doctor.specializations.map((spec, index) => (
                          <div key={index} className="flex items-center">
                            <CheckBadgeIcon className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm text-gray-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Achievements */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Thành tích & Chứng chỉ</h3>
                      <div className="space-y-2">
                        {doctor.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center">
                            <CheckBadgeIcon className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-sm text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Publications */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Công trình nghiên cứu</h3>
                      <div className="space-y-2">
                        {doctor.publications.map((publication, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{publication}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout currentRole={UserRole.GUEST} pageTitle="Đội ngũ bác sĩ">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Đội ngũ bác sĩ chuyên khoa</h1>
          <p className="text-primary-100">
            Gặp gỡ các chuyên gia hàng đầu trong lĩnh vực điều trị HIV/AIDS
          </p>
        </div>

        {/* Search and Filter */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bác sĩ theo tên, chuyên khoa hoặc chuyên môn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {specialties.map(specialty => (
                  <option key={specialty.code} value={specialty.code}>
                    {specialty.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="name">Sắp xếp theo tên</option>
                <option value="rating">Sắp xếp theo đánh giá</option>
                <option value="experience">Sắp xếp theo kinh nghiệm</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedDoctors.map(doctor => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                    <p className="text-sm text-gray-600">{doctor.experienceText}</p>
                    <div className="mt-1">{renderStars(doctor.rating)}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {doctor.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {doctor.workingHours}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {doctor.workingDays.slice(0, 3).join(', ')}
                    {doctor.workingDays.length > 3 && '...'}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 line-clamp-3">{doctor.bio}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Chuyên môn chính:</h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.specializations.slice(0, 2).map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {doctor.specializations.length > 2 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{doctor.specializations.length - 2} khác
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDoctor(doctor)}
                    className="flex-1"
                  >
                    Xem chi tiết
                  </Button>
                  <Link to="/schedule" className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Xem lịch khám
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAndSortedDoctors.length === 0 && (
          <Card>
            <div className="p-8 text-center">
              <UserIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Không tìm thấy bác sĩ nào phù hợp với tiêu chí tìm kiếm</p>
            </div>
          </Card>
        )}

        {/* Call to Action */}
        <Card>
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sẵn sàng đặt lịch hẹn?
            </h3>
            <p className="text-gray-600 mb-4">
              Đăng nhập để đặt lịch hẹn với bác sĩ chuyên khoa của chúng tôi
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button variant="primary">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">
                  Đăng ký tài khoản
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Doctor Detail Modal */}
        <DoctorDetailModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      </div>
    </Layout>
  );
};

export default DoctorsPage; 