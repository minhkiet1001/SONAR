import React, { useState, useEffect, useRef } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  UserIcon,
  ClockIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  VideoCameraIcon,
  PaperClipIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline';
import Button from './Button';
import Card from './Card';

const ChatSupport = ({ 
  isOpen, 
  onClose, 
  userRole = 'guest', // 'guest', 'customer', 'staff'
  userName = 'Khách',
  staffName = 'Nhân viên hỗ trợ',
  existingMessages = [], // For staff to load existing conversation
  sessionId = null, // For staff to identify the session
  onNewMessage = null // Callback for new messages
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connecting', 'connected', 'disconnected'
  const [chatSession, setChatSession] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load existing messages or create initial messages
  useEffect(() => {
    if (isOpen) {
      if (existingMessages && existingMessages.length > 0) {
        // For staff: load existing conversation
        setMessages(existingMessages);
      } else if (messages.length === 0) {
        // For guests/customers: create initial messages
        const initialMessages = getInitialMessages();
        setMessages(initialMessages);
      }
      
      // Simulate connection
      setTimeout(() => {
        setConnectionStatus('connected');
      }, 1500);
    }
  }, [isOpen, existingMessages]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getInitialMessages = () => {
    const timestamp = new Date();
    
    if (userRole === 'staff') {
      return [
        {
          id: 1,
          text: 'Chào bạn! Tôi có thể hỗ trợ gì cho bạn hôm nay?',
          sender: 'staff',
          timestamp,
          status: 'sent',
          staffName: staffName
        }
      ];
    } else if (userRole === 'guest') {
      return [
        {
          id: 1,
          text: `Xin chào! Tôi là ${staffName}. Chào mừng bạn đến với dịch vụ hỗ trợ trực tuyến của chúng tôi.`,
          sender: 'staff',
          timestamp,
          status: 'sent',
          staffName: staffName
        },
        {
          id: 2,
          text: 'Bạn có thể chat ẩn danh với chúng tôi để được tư vấn về các dịch vụ, đặt lịch hẹn, hoặc giải đáp thắc mắc. Mọi thông tin sẽ được bảo mật tuyệt đối.',
          sender: 'staff',
          timestamp: new Date(timestamp.getTime() + 1000),
          status: 'sent',
          staffName: staffName
        },
        {
          id: 3,
          text: 'Tôi có thể hỗ trợ gì cho bạn hôm nay?',
          sender: 'staff',
          timestamp: new Date(timestamp.getTime() + 2000),
          status: 'sent',
          staffName: staffName
        }
      ];
    } else {
      return [
        {
          id: 1,
          text: `Xin chào ${userName}! Tôi là ${staffName}. Tôi có thể hỗ trợ gì cho bạn hôm nay?`,
          sender: 'staff',
          timestamp,
          status: 'sent',
          staffName: staffName
        }
      ];
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: userRole === 'staff' ? 'staff' : 'user',
      timestamp: new Date(),
      status: 'sending',
      staffName: userRole === 'staff' ? 'Nhân viên hiện tại' : undefined,
      customerName: userRole !== 'staff' ? userName : undefined
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setNewMessage('');

    // Simulate message sending
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);

    // Call onNewMessage callback for staff
    if (onNewMessage && sessionId) {
      onNewMessage(sessionId, { ...message, status: 'sent' });
    }

    // Simulate staff response (if user is not staff)
    if (userRole !== 'staff') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = generateStaffResponse(newMessage);
        const staffResponse = {
          id: updatedMessages.length + 1,
          text: response,
          sender: 'staff',
          timestamp: new Date(),
          status: 'sent',
          staffName: staffName
        };
        setMessages(prev => [...prev, staffResponse]);
        
        // Call onNewMessage callback for staff response
        if (onNewMessage && sessionId) {
          onNewMessage(sessionId, staffResponse);
        }
      }, 2000);
    }
  };

  const generateStaffResponse = (userMessage) => {
    const responses = {
      appointment: [
        'Tôi có thể giúp bạn đặt lịch hẹn. Bạn có thể xem lịch khám của các bác sĩ tại trang "Lịch khám" hoặc trang "Đội ngũ bác sĩ".',
        'Để đặt lịch hẹn, bạn cần đăng nhập hoặc đăng ký tài khoản. Tôi có thể hướng dẫn bạn quy trình này.',
        'Bạn có thể xem thời gian có sẵn của các bác sĩ mà không cần đăng nhập. Bạn muốn tôi hướng dẫn không?'
      ],
      test: [
        'Về kết quả xét nghiệm, bạn cần đăng nhập để xem kết quả cá nhân. Tôi có thể giải thích về các loại xét nghiệm chúng tôi cung cấp.',
        'Kết quả xét nghiệm thường có sẵn trong 2-3 ngày làm việc. Bạn sẽ nhận được thông báo khi có kết quả.',
        'Tôi có thể giúp bạn hiểu về quy trình xét nghiệm và các chỉ số cơ bản.'
      ],
      medication: [
        'Về thuốc điều trị ARV, tôi có thể cung cấp thông tin tổng quan. Để được tư vấn cụ thể, bạn nên đặt lịch hẹn với bác sĩ.',
        'Chúng tôi có đội ngũ bác sĩ chuyên khoa có thể tư vấn về phác đồ điều trị phù hợp.',
        'Bạn có thể tìm hiểu về các loại thuốc ARV trong mục "Tài liệu giáo dục" của chúng tôi.'
      ],
      services: [
        'Chúng tôi cung cấp dịch vụ chăm sóc HIV toàn diện bao gồm: tư vấn, xét nghiệm, điều trị ARV, và hỗ trợ tâm lý.',
        'Bạn có thể xem chi tiết các dịch vụ tại trang "Dịch vụ" hoặc tôi có thể giải thích cụ thể về dịch vụ nào bạn quan tâm.',
        'Tất cả dịch vụ của chúng tôi đều đảm bảo bảo mật tuyệt đối và được thực hiện bởi đội ngũ chuyên gia.'
      ],
      doctors: [
        'Chúng tôi có đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm. Bạn có thể xem thông tin chi tiết tại trang "Đội ngũ bác sĩ".',
        'Các bác sĩ của chúng tôi chuyên về nhiễm trùng, nội khoa, tâm lý và sản phụ khoa. Bạn quan tâm đến chuyên khoa nào?',
        'Bạn có thể xem lịch làm việc và đặt lịch hẹn với bác sĩ phù hợp tại trang "Lịch khám".'
      ],
      privacy: [
        'Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân và y tế của bạn theo tiêu chuẩn quốc tế.',
        'Cuộc trò chuyện này hoàn toàn ẩn danh và bảo mật. Chúng tôi không lưu trữ thông tin cá nhân nào.',
        'Mọi dữ liệu y tế được mã hóa và chỉ có bác sĩ điều trị mới có quyền truy cập.'
      ],
      general: [
        'Tôi hiểu mối quan tâm của bạn. Bạn có thể chia sẻ thêm chi tiết để tôi hỗ trợ tốt hơn không?',
        'Cảm ơn bạn đã liên hệ. Tôi sẽ cố gắng hỗ trợ bạn tốt nhất có thể.',
        'Nếu cần hỗ trợ khẩn cấp, bạn có thể gọi đường dây nóng: 1900-1234 (24/7)'
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('lịch hẹn') || lowerMessage.includes('đặt lịch') || lowerMessage.includes('appointment')) {
      return responses.appointment[Math.floor(Math.random() * responses.appointment.length)];
    } else if (lowerMessage.includes('xét nghiệm') || lowerMessage.includes('kết quả') || lowerMessage.includes('test')) {
      return responses.test[Math.floor(Math.random() * responses.test.length)];
    } else if (lowerMessage.includes('thuốc') || lowerMessage.includes('medication') || lowerMessage.includes('uống') || lowerMessage.includes('arv')) {
      return responses.medication[Math.floor(Math.random() * responses.medication.length)];
    } else if (lowerMessage.includes('dịch vụ') || lowerMessage.includes('service') || lowerMessage.includes('tìm hiểu')) {
      return responses.services[Math.floor(Math.random() * responses.services.length)];
    } else if (lowerMessage.includes('bác sĩ') || lowerMessage.includes('doctor') || lowerMessage.includes('chuyên khoa')) {
      return responses.doctors[Math.floor(Math.random() * responses.doctors.length)];
    } else if (lowerMessage.includes('bảo mật') || lowerMessage.includes('privacy') || lowerMessage.includes('an toàn') || lowerMessage.includes('riêng tư')) {
      return responses.privacy[Math.floor(Math.random() * responses.privacy.length)];
    } else {
      return responses.general[Math.floor(Math.random() * responses.general.length)];
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <ClockIcon className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <CheckIcon className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <CheckIcon className="h-3 w-3 text-green-500" />;
      default:
        return null;
    }
  };

  const quickReplies = userRole === 'staff' ? [
    'Tôi có thể hỗ trợ gì cho bạn?',
    'Vui lòng chờ trong giây lát...',
    'Tôi sẽ chuyển bạn đến chuyên gia.',
    'Cảm ơn bạn đã liên hệ!'
  ] : userRole === 'guest' ? [
    'Tôi muốn tìm hiểu về dịch vụ',
    'Làm thế nào để đặt lịch hẹn?',
    'Xem thông tin bác sĩ',
    'Tư vấn về HIV/AIDS',
    'Thông tin bảo mật'
  ] : [
    'Tôi cần đặt lịch hẹn',
    'Xem kết quả xét nghiệm',
    'Hỏi về thuốc điều trị',
    'Cần hỗ trợ khẩn cấp'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">
                {userRole === 'staff' ? `Chat với ${userName}` : 'Hỗ trợ trực tuyến'}
              </h3>
              <div className="flex items-center space-x-1 text-xs">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-400' : 
                  connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span>
                  {connectionStatus === 'connected' ? 'Đang kết nối' : 
                   connectionStatus === 'connecting' ? 'Đang kết nối...' : 'Mất kết nối'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {userRole === 'staff' && (
              <>
                <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                  <PhoneIcon className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded">
                  <VideoCameraIcon className="h-4 w-4" />
                </button>
              </>
            )}
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {/* Show sender name for staff view */}
                {userRole === 'staff' && message.sender === 'user' && message.customerName && (
                  <p className="text-xs text-primary-200 mb-1">{message.customerName}</p>
                )}
                {userRole !== 'staff' && message.sender === 'staff' && message.staffName && (
                  <p className="text-xs text-gray-500 mb-1">{message.staffName}</p>
                )}
                
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center justify-between mt-1 ${
                  message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                  {message.sender === 'user' && (
                    <div className="ml-2">
                      {getStatusIcon(message.status)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies - only show for new conversations */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <p className="text-xs text-gray-500 mb-2">Câu trả lời nhanh:</p>
            <div className="flex flex-wrap gap-1">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(reply)}
                  className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="2"
                disabled={connectionStatus !== 'connected'}
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <button
                onClick={handleFileUpload}
                className="p-2 text-gray-400 hover:text-gray-600"
                disabled={connectionStatus !== 'connected'}
              >
                <PaperClipIcon className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || connectionStatus !== 'connected'}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => {
              // Handle file upload
              console.log('File selected:', e.target.files[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSupport; 