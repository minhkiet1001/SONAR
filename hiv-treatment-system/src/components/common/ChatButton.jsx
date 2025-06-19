import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import ChatSupport from './ChatSupport';

const ChatButton = ({ userRole = 'guest', userName = 'Khách' }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleChatToggle}
          className="relative w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Mở chat hỗ trợ"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          
          {/* New message indicator */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {userRole === 'staff' ? 'Chat với khách hàng' : 'Hỗ trợ trực tuyến'}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </button>
      </div>

      {/* Chat Support Component */}
      <ChatSupport
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userRole={userRole}
        userName={userName}
      />
    </>
  );
};

export default ChatButton; 