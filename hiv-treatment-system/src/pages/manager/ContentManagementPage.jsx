import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import AddContentModal from '../../components/manager/AddContentModal';
import {
  DocumentTextIcon,
  VideoCameraIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const ContentManagementPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentData, setContentData] = useState([
    {
      id: 1,
      title: 'Sống khỏe với HIV',
      description: 'Hướng dẫn toàn diện về cách sống khỏe mạnh với HIV',
      type: 'article',
      category: 'education',
      status: 'published',
      author: 'BS. Nguyễn Văn A',
      updatedAt: new Date('2024-06-15'),
      featured: true
    },
    {
      id: 2,
      title: 'Video: Cách uống thuốc ARV đúng cách',
      description: 'Video hướng dẫn chi tiết về cách sử dụng thuốc ARV',
      type: 'video',
      category: 'treatment',
      status: 'published',
      author: 'BS. Trần Thị B',
      updatedAt: new Date('2024-06-10'),
      featured: false
    },
    {
      id: 3,
      title: 'Tài liệu: Dinh dưỡng cho người nhiễm HIV',
      description: 'Tài liệu PDF về chế độ dinh dưỡng phù hợp',
      type: 'pdf',
      category: 'nutrition',
      status: 'draft',
      author: 'Chuyên gia dinh dưỡng',
      updatedAt: new Date('2024-06-05'),
      featured: false
    },
    {
      id: 4,
      title: 'Blog: Câu chuyện của tôi',
      description: 'Chia sẻ câu chuyện cá nhân từ bệnh nhân',
      type: 'blog',
      category: 'support',
      status: 'published',
      author: 'Bệnh nhân X',
      updatedAt: new Date('2024-06-01'),
      featured: true
    }
  ]);

  // Quick stats
  const quickStats = [
    {
      title: 'Tổng nội dung',
      value: '186',
      change: '+15',
      changeType: 'increase',
      icon: DocumentTextIcon,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Tài liệu giáo dục',
      value: '124',
      change: '+8',
      changeType: 'increase',
      icon: EyeIcon,
      color: 'bg-green-100 text-green-800'
    },
    {
      title: 'Bài viết Blog',
      value: '42',
      change: '+5',
      changeType: 'increase',
      icon: PencilIcon,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Lượt xem tháng này',
      value: '18.2K',
      change: '+22.1%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  // Mock categories data
  const categories = [
    { id: '1', name: 'Sống với HIV', slug: 'living-with-hiv' },
    { id: '2', name: 'Điều trị', slug: 'treatment' },
    { id: '3', name: 'Phòng ngừa', slug: 'prevention' },
    { id: '4', name: 'Hỗ trợ', slug: 'support' },
    { id: '5', name: 'Sức khỏe', slug: 'wellness' },
    { id: '6', name: 'Blog', slug: 'blog' },
    { id: '7', name: 'Tin tức', slug: 'news' },
  ];

  // Handle save content
  const handleSaveContent = (newContent) => {
    setContentData(prev => [...prev, newContent]);
    console.log('Content saved:', newContent);
  };

  // Handle edit content
  const handleEditContent = (content) => {
    alert(`Chỉnh sửa nội dung: ${content.title}\nTính năng này sẽ được triển khai trong phiên bản tiếp theo.`);
  };

  // Handle delete content
  const handleDeleteContent = (content) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa nội dung "${content.title}"?`)) {
      setContentData(prev => prev.filter(item => item.id !== content.id));
      alert('Nội dung đã được xóa thành công!');
    }
  };

  // Filter content based on search term and filters
  const filteredContent = contentData.filter((content) => {
    const matchesSearch = 
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || content.category === categoryFilter;
    const matchesType = typeFilter === 'all' || content.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status badge based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Đã xuất bản</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Bản nháp</span>;
      case 'under-review':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang xem xét</span>;
      default:
        return null;
    }
  };

  // Get type badge based on content type
  const getTypeBadge = (type) => {
    switch (type) {
      case 'article':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Bài viết</span>;
      case 'video':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Video</span>;
      case 'blog':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Blog</span>;
      case 'pdf':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">PDF</span>;
      case 'infographic':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Infographic</span>;
      default:
        return null;
    }
  };

  // Get category name from slug
  const getCategoryName = (slug) => {
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.name : slug;
  };

  // Handle view content details
  const handleViewContent = (content) => {
    setSelectedContent(content);
  };

  // Handle close content details
  const handleCloseContentDetails = () => {
    setSelectedContent(null);
  };

  return (
    <Layout currentRole={UserRole.MANAGER} userName="Alex Manager" hasNotifications={true}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Nội dung & Blog</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý tài liệu giáo dục, bài viết blog, tin tức và nội dung hỗ trợ cho bệnh nhân
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowAddContentModal(true)}
          >
            Tạo nội dung mới
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Tìm kiếm
              </label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Tìm kiếm theo tiêu đề, mô tả hoặc tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                id="status-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
                <option value="under-review">Đang xem xét</option>
              </select>
            </div>
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                id="category-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Loại
              </label>
              <select
                id="type-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tất cả loại</option>
                <option value="article">Bài viết</option>
                <option value="blog">Blog</option>
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="infographic">Infographic</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Content table */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Nội dung & Blog</h2>
            <span className="text-sm text-gray-500">Hiển thị {filteredContent.length} / {contentData.length} mục</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cập nhật cuối
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nổi bật
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.map((content) => (
                  <tr key={content.id} className={content.featured ? 'bg-primary-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start flex-col">
                        <div className="text-sm font-medium text-gray-900">{content.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{content.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(content.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getCategoryName(content.category)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(content.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(content.updatedAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {content.featured ? (
                        <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-primary-600 hover:text-primary-900 mr-3"
                        onClick={() => handleViewContent(content)}
                      >
                        Xem
                      </button>
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={() => handleEditContent(content)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteContent(content)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredContent.length === 0 && (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy nội dung</h3>
              <p className="mt-1 text-sm text-gray-500">
                Hãy điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc của bạn.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => setShowAddContentModal(true)}
                >
                  Tạo nội dung mới
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Content details modal - simplified for brevity */}
      {selectedContent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Chi tiết nội dung</h3>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-medium text-gray-900">{selectedContent.title}</h4>
                        <div className="flex flex-col items-end">
                          {getStatusBadge(selectedContent.status)}
                          <div className="mt-1">
                            {getTypeBadge(selectedContent.type)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        {selectedContent.description}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-500">Danh mục</p>
                          <p className="text-gray-900">{getCategoryName(selectedContent.category)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Tác giả</p>
                          <p className="text-gray-900">{selectedContent.author}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Ngày tạo</p>
                          <p className="text-gray-900">{formatDate(selectedContent.createdAt)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Cập nhật cuối</p>
                          <p className="text-gray-900">{formatDate(selectedContent.updatedAt)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Lượt xem</p>
                          <p className="text-gray-900">{selectedContent.views || 0}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Nổi bật</p>
                          <p className="text-gray-900">{selectedContent.featured ? 'Có' : 'Không'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {/* Handle edit */}}
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {selectedContent.status === 'published' ? 'Hủy xuất bản' : 'Xuất bản'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseContentDetails}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={showAddContentModal}
        onClose={() => setShowAddContentModal(false)}
        categories={categories}
        onSave={handleSaveContent}
      />
    </Layout>
  );
};

export default ContentManagementPage; 