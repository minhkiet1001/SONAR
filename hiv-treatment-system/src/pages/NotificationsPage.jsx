import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { UserRole } from '../types/index.js';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockNotifications = [
        {
          id: '1',
          title: 'Nhắc nhở lịch hẹn',
          message: 'Bạn có một cuộc hẹn mới được lên lịch vào ngày mai lúc 10:00 AM với BS. Smith',
          time: '1 giờ trước',
          read: false,
          type: 'appointment'
        },
        {
          id: '2',
          title: 'Kết quả xét nghiệm đã có',
          message: 'Kết quả xét nghiệm gần đây của bạn đã có sẵn để xem',
          time: '2 giờ trước',
          read: false,
          type: 'test'
        },
        {
          id: '3',
          title: 'Nạp lại thuốc',
          message: 'Yêu cầu nạp lại thuốc của bạn đã được chấp nhận và sẵn sàng để lấy',
          time: '1 ngày trước',
          read: true,
          type: 'medication'
        },
        {
          id: '4',
          title: 'Bảo trì hệ thống',
          message: 'Hệ thống sẽ được bảo trì vào Chủ nhật từ 2:00 AM đến 4:00 AM',
          time: '2 ngày trước',
          read: true,
          type: 'system'
        },
        {
          id: '5',
          title: 'Lịch hẹn đã được đổi',
          message: 'Cuộc hẹn của bạn với BS. Johnson đã được chuyển sang thứ Sáu lúc 2:00 PM',
          time: '3 ngày trước',
          read: false,
          type: 'appointment'
        }
      ];
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    };

    fetchNotifications();
  }, []);

  // Filter notifications based on selection
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => notification.type === filter);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Get type badge color
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-800';
      case 'test':
        return 'bg-green-100 text-green-800';
      case 'medication':
        return 'bg-yellow-100 text-yellow-800';
      case 'system':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get type translation
  const getTypeText = (type) => {
    switch (type) {
      case 'appointment':
        return 'lịch hẹn';
      case 'test':
        return 'xét nghiệm';
      case 'medication':
        return 'thuốc';
      case 'system':
        return 'hệ thống';
      default:
        return type;
    }
  };

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An" hasNotifications={true}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
            <div className="flex items-center space-x-4">
              <select 
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tất cả thông báo</option>
                <option value="unread">Chưa đọc</option>
                <option value="appointment">Lịch hẹn</option>
                <option value="test">Kết quả xét nghiệm</option>
                <option value="medication">Thuốc</option>
                <option value="system">Hệ thống</option>
              </select>
              {notifications.some(notification => !notification.read) && (
                <button 
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                  onClick={markAllAsRead}
                >
                  Đánh dấu tất cả là đã đọc
                </button>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500">
                <span className="sr-only">Đang tải...</span>
              </div>
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border-b border-gray-200 last:border-b-0 ${notification.read ? 'bg-white' : 'bg-indigo-50'}`}
                >
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Mới
                              </span>
                            )}
                          </h3>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(notification.type)}`}>
                            {getTypeText(notification.type)}
                          </span>
                          <span className="ml-2">{notification.time}</span>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        {!notification.read && (
                          <button 
                            className="mr-2 text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Đánh dấu đã đọc
                          </button>
                        )}
                        <button 
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{notification.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-md">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Không có thông báo nào</h3>
              <p className="mt-1 text-sm text-gray-500">Tất cả các thông báo của bạn sẽ hiển thị ở đây.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage; 