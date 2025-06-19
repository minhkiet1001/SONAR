import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ChatSupport from '../../components/common/ChatSupport';
import {
  ChatBubbleLeftRightIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const ChatManagementPage = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock chat sessions data with detailed conversation history
  useEffect(() => {
    const mockSessions = [
      {
        id: 1,
        customerName: 'Nguyễn Văn An',
        customerId: 'C001',
        status: 'active',
        priority: 'high',
        subject: 'Hỏi về kết quả xét nghiệm',
        lastMessage: 'Tôi muốn hỏi về kết quả xét nghiệm HIV của mình',
        lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        startTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        assignedStaff: 'Nhân viên A',
        unreadCount: 2,
        messageCount: 8,
        customerType: 'existing',
        tags: ['xét nghiệm', 'kết quả'],
        satisfaction: null,
        messages: [
          {
            id: 1,
            text: 'Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên A'
          },
          {
            id: 2,
            text: 'Chào bạn, tôi muốn hỏi về kết quả xét nghiệm HIV của mình',
            sender: 'user',
            timestamp: new Date(Date.now() - 14 * 60 * 1000),
            status: 'sent',
            customerName: 'Nguyễn Văn An'
          },
          {
            id: 3,
            text: 'Tôi có thể giúp bạn kiểm tra kết quả xét nghiệm. Bạn có thể cho tôi biết mã số xét nghiệm không?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 13 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên A'
          },
          {
            id: 4,
            text: 'Mã số của tôi là XN001234',
            sender: 'user',
            timestamp: new Date(Date.now() - 12 * 60 * 1000),
            status: 'sent',
            customerName: 'Nguyễn Văn An'
          },
          {
            id: 5,
            text: 'Tôi đang kiểm tra thông tin cho bạn. Vui lòng chờ trong giây lát...',
            sender: 'staff',
            timestamp: new Date(Date.now() - 11 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên A'
          },
          {
            id: 6,
            text: 'Kết quả xét nghiệm của bạn đã có. Tải lượng virus HIV không phát hiện được (<50 copies/mL). Đây là kết quả rất tốt!',
            sender: 'staff',
            timestamp: new Date(Date.now() - 8 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên A'
          },
          {
            id: 7,
            text: 'Cảm ơn bạn! Điều này có nghĩa là gì vậy?',
            sender: 'user',
            timestamp: new Date(Date.now() - 7 * 60 * 1000),
            status: 'sent',
            customerName: 'Nguyễn Văn An'
          },
          {
            id: 8,
            text: 'Tôi muốn hỏi về kết quả xét nghiệm HIV của mình',
            sender: 'user',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            status: 'sent',
            customerName: 'Nguyễn Văn An'
          }
        ]
      },
      {
        id: 2,
        customerName: 'Trần Thị Bình',
        customerId: 'C002',
        status: 'waiting',
        priority: 'medium',
        subject: 'Đặt lịch hẹn khám',
        lastMessage: 'Tôi cần đặt lịch hẹn với bác sĩ',
        lastMessageTime: new Date(Date.now() - 10 * 60 * 1000),
        startTime: new Date(Date.now() - 12 * 60 * 1000),
        assignedStaff: null,
        unreadCount: 1,
        messageCount: 3,
        customerType: 'new',
        tags: ['lịch hẹn', 'đặt khám'],
        satisfaction: null,
        messages: [
          {
            id: 1,
            text: 'Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 12 * 60 * 1000),
            status: 'sent',
            staffName: 'Hệ thống'
          },
          {
            id: 2,
            text: 'Chào bạn, tôi cần đặt lịch hẹn với bác sĩ',
            sender: 'user',
            timestamp: new Date(Date.now() - 11 * 60 * 1000),
            status: 'sent',
            customerName: 'Trần Thị Bình'
          },
          {
            id: 3,
            text: 'Tôi cần đặt lịch hẹn với bác sĩ',
            sender: 'user',
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
            status: 'sent',
            customerName: 'Trần Thị Bình'
          }
        ]
      },
      {
        id: 3,
        customerName: 'Lê Văn Cường',
        customerId: 'C003',
        status: 'resolved',
        priority: 'low',
        subject: 'Hỏi về thuốc điều trị',
        lastMessage: 'Cảm ơn bạn đã hỗ trợ!',
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
        startTime: new Date(Date.now() - 45 * 60 * 1000),
        assignedStaff: 'Nhân viên B',
        unreadCount: 0,
        messageCount: 12,
        customerType: 'existing',
        tags: ['thuốc', 'điều trị'],
        satisfaction: 5,
        messages: [
          {
            id: 1,
            text: 'Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên B'
          },
          {
            id: 2,
            text: 'Tôi muốn hỏi về thuốc ARV mà tôi đang sử dụng',
            sender: 'user',
            timestamp: new Date(Date.now() - 44 * 60 * 1000),
            status: 'sent',
            customerName: 'Lê Văn Cường'
          },
          {
            id: 3,
            text: 'Bạn có thể cho tôi biết tên thuốc và liều lượng hiện tại không?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 43 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên B'
          },
          {
            id: 4,
            text: 'Tôi đang dùng Biktarvy, 1 viên mỗi ngày',
            sender: 'user',
            timestamp: new Date(Date.now() - 42 * 60 * 1000),
            status: 'sent',
            customerName: 'Lê Văn Cường'
          },
          {
            id: 5,
            text: 'Biktarvy là một lựa chọn tốt. Bạn có gặp tác dụng phụ nào không?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 40 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên B'
          },
          {
            id: 6,
            text: 'Có một chút buồn nôn vào buổi sáng',
            sender: 'user',
            timestamp: new Date(Date.now() - 38 * 60 * 1000),
            status: 'sent',
            customerName: 'Lê Văn Cường'
          },
          {
            id: 7,
            text: 'Đây là tác dụng phụ thường gặp và thường giảm dần theo thời gian. Bạn nên uống thuốc cùng với thức ăn.',
            sender: 'staff',
            timestamp: new Date(Date.now() - 36 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên B'
          },
          {
            id: 8,
            text: 'Cảm ơn bạn! Tôi sẽ thử uống cùng với bữa sáng',
            sender: 'user',
            timestamp: new Date(Date.now() - 35 * 60 * 1000),
            status: 'sent',
            customerName: 'Lê Văn Cường'
          },
          {
            id: 9,
            text: 'Nếu tình trạng không cải thiện sau 1 tuần, hãy liên hệ với bác sĩ điều trị nhé.',
            sender: 'staff',
            timestamp: new Date(Date.now() - 33 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên B'
          },
          {
            id: 10,
            text: 'Được rồi, tôi sẽ theo dõi',
            sender: 'user',
            timestamp: new Date(Date.now() - 32 * 60 * 1000),
            status: 'sent',
            customerName: 'Lê Văn Cường'
          },
          {
            id: 11,
            text: 'Còn gì khác tôi có thể hỗ trợ bạn không?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 31 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên B'
          },
          {
            id: 12,
            text: 'Cảm ơn bạn đã hỗ trợ!',
            sender: 'user',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            status: 'sent',
            customerName: 'Lê Văn Cường'
          }
        ]
      },
      {
        id: 4,
        customerName: 'Phạm Thị Dung',
        customerId: 'C004',
        status: 'active',
        priority: 'urgent',
        subject: 'Cần hỗ trợ khẩn cấp',
        lastMessage: 'Tôi đang có triệu chứng bất thường',
        lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
        startTime: new Date(Date.now() - 8 * 60 * 1000),
        assignedStaff: 'Nhân viên C',
        unreadCount: 3,
        messageCount: 6,
        customerType: 'existing',
        tags: ['khẩn cấp', 'triệu chứng'],
        satisfaction: null,
        messages: [
          {
            id: 1,
            text: 'Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 8 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên C'
          },
          {
            id: 2,
            text: 'Tôi cần hỗ trợ khẩn cấp, tôi đang có triệu chứng bất thường',
            sender: 'user',
            timestamp: new Date(Date.now() - 7 * 60 * 1000),
            status: 'sent',
            customerName: 'Phạm Thị Dung'
          },
          {
            id: 3,
            text: 'Tôi hiểu sự lo lắng của bạn. Bạn có thể mô tả chi tiết triệu chứng không?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 6 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên C'
          },
          {
            id: 4,
            text: 'Tôi bị sốt cao và đau đầu từ sáng nay',
            sender: 'user',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            status: 'sent',
            customerName: 'Phạm Thị Dung'
          },
          {
            id: 5,
            text: 'Nhiệt độ của bạn là bao nhiêu? Bạn có uống thuốc hạ sốt chưa?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 4 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên C'
          },
          {
            id: 6,
            text: 'Tôi đang có triệu chứng bất thường',
            sender: 'user',
            timestamp: new Date(Date.now() - 2 * 60 * 1000),
            status: 'sent',
            customerName: 'Phạm Thị Dung'
          }
        ]
      },
      {
        id: 5,
        customerName: 'Hoàng Văn Em',
        customerId: 'C005',
        status: 'paused',
        priority: 'medium',
        subject: 'Thông tin về dịch vụ',
        lastMessage: 'Tôi sẽ liên hệ lại sau',
        lastMessageTime: new Date(Date.now() - 60 * 60 * 1000),
        startTime: new Date(Date.now() - 75 * 60 * 1000),
        assignedStaff: 'Nhân viên A',
        unreadCount: 0,
        messageCount: 5,
        customerType: 'new',
        tags: ['thông tin', 'dịch vụ'],
        satisfaction: null,
        messages: [
          {
            id: 1,
            text: 'Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 75 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên A'
          },
          {
            id: 2,
            text: 'Tôi muốn tìm hiểu về các dịch vụ điều trị HIV',
            sender: 'user',
            timestamp: new Date(Date.now() - 74 * 60 * 1000),
            status: 'sent',
            customerName: 'Hoàng Văn Em'
          },
          {
            id: 3,
            text: 'Chúng tôi cung cấp đầy đủ các dịch vụ từ xét nghiệm, tư vấn đến điều trị. Bạn quan tâm đến dịch vụ nào cụ thể?',
            sender: 'staff',
            timestamp: new Date(Date.now() - 72 * 60 * 1000),
            status: 'sent',
            staffName: 'Nhân viên A'
          },
          {
            id: 4,
            text: 'Tôi cần thời gian suy nghĩ thêm',
            sender: 'user',
            timestamp: new Date(Date.now() - 70 * 60 * 1000),
            status: 'sent',
            customerName: 'Hoàng Văn Em'
          },
          {
            id: 5,
            text: 'Tôi sẽ liên hệ lại sau',
            sender: 'user',
            timestamp: new Date(Date.now() - 60 * 60 * 1000),
            status: 'sent',
            customerName: 'Hoàng Văn Em'
          }
        ]
      }
    ];

    setTimeout(() => {
      setChatSessions(mockSessions);
      setFilteredSessions(mockSessions);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter sessions based on search and filters
  useEffect(() => {
    let filtered = chatSessions;

    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(session => session.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(session => session.priority === priorityFilter);
    }

    // Sort by priority and last message time
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });

    setFilteredSessions(filtered);
  }, [chatSessions, searchTerm, statusFilter, priorityFilter]);

  const handleOpenChat = (sessionId) => {
    setActiveChatId(sessionId);
    // Mark messages as read
    setChatSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId ? { ...session, unreadCount: 0 } : session
      )
    );
  };

  const handleCloseChat = () => {
    setActiveChatId(null);
  };

  const handleAssignToSelf = (sessionId) => {
    setChatSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId 
          ? { ...session, assignedStaff: 'Nhân viên hiện tại', status: 'active' }
          : session
      )
    );
  };

  const handleResolveSession = (sessionId) => {
    setChatSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId 
          ? { ...session, status: 'resolved' }
          : session
      )
    );
  };

  const handlePauseSession = (sessionId) => {
    setChatSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId 
          ? { ...session, status: 'paused' }
          : session
      )
    );
  };

  // Handle new message from chat
  const handleNewMessage = (sessionId, message) => {
    setChatSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId 
          ? { 
              ...session, 
              messages: [...session.messages, message],
              lastMessage: message.text,
              lastMessageTime: message.timestamp,
              messageCount: session.messageCount + 1
            }
          : session
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Đang xử lý';
      case 'waiting':
        return 'Chờ xử lý';
      case 'paused':
        return 'Tạm dừng';
      case 'resolved':
        return 'Đã giải quyết';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'Khẩn cấp';
      case 'high':
        return 'Cao';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Thấp';
      default:
        return priority;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return 'Vừa xong';
  };

  const activeSession = chatSessions.find(session => session.id === activeChatId);

  return (
    <Layout currentRole={UserRole.STAFF} pageTitle="Quản lý Chat hỗ trợ">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng, chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="waiting">Chờ xử lý</option>
              <option value="active">Đang xử lý</option>
              <option value="paused">Tạm dừng</option>
              <option value="resolved">Đã giải quyết</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="urgent">Khẩn cấp</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Chờ xử lý</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {chatSessions.filter(s => s.status === 'waiting').length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đang xử lý</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {chatSessions.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Đã giải quyết</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {chatSessions.filter(s => s.status === 'resolved').length}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Thời gian TB</p>
                  <p className="text-2xl font-semibold text-gray-900">8 phút</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Chat Sessions List */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Danh sách chat ({filteredSessions.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Đang tải...</p>
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Không tìm thấy phiên chat nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{session.customerName}</h4>
                              <p className="text-sm text-gray-500">ID: {session.customerId}</p>
                            </div>
                          </div>

                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                            {getStatusText(session.status)}
                          </span>

                          <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(session.priority)}`}>
                            {getPriorityText(session.priority)}
                          </span>

                          {session.unreadCount > 0 && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                              {session.unreadCount} tin mới
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Chủ đề</p>
                            <p className="font-medium">{session.subject}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Tin nhắn cuối</p>
                            <p className="text-sm text-gray-700 truncate">{session.lastMessage}</p>
                            <p className="text-xs text-gray-500">{formatTime(session.lastMessageTime)}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Nhân viên phụ trách</p>
                            <p className="font-medium">{session.assignedStaff || 'Chưa phân công'}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Thống kê</p>
                            <p className="text-sm">{session.messageCount} tin nhắn</p>
                            <p className="text-xs text-gray-500">Bắt đầu: {formatTime(session.startTime)}</p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {session.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Satisfaction rating */}
                        {session.satisfaction && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Đánh giá:</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={`text-sm ${star <= session.satisfaction ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenChat(session.id)}
                        >
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                          Mở chat
                        </Button>

                        {!session.assignedStaff && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAssignToSelf(session.id)}
                          >
                            Nhận xử lý
                          </Button>
                        )}

                        {session.status === 'active' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePauseSession(session.id)}
                              className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                            >
                              Tạm dừng
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResolveSession(session.id)}
                              className="text-green-600 border-green-300 hover:bg-green-50"
                            >
                              Giải quyết
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Active Chat Modal */}
        {activeSession && (
          <ChatSupport
            isOpen={true}
            onClose={handleCloseChat}
            userRole="staff"
            userName={activeSession.customerName}
            staffName="Nhân viên hỗ trợ"
            existingMessages={activeSession.messages}
            sessionId={activeSession.id}
            onNewMessage={handleNewMessage}
          />
        )}
      </div>
    </Layout>
  );
};

export default ChatManagementPage; 