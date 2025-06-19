import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { UserRole } from '../../types/index.js';
import ChatButton from '../common/ChatButton';

const Layout = ({ 
  children, 
  currentRole = UserRole.GUEST,
  userName, 
  pageTitle, 
  className = ''
}) => {
  // Define background color based on role
  const getBgColor = () => {
    switch(currentRole) {
      case UserRole.ADMIN:
        return 'bg-gray-100';
      case UserRole.MANAGER:
        return 'bg-blue-50';
      case UserRole.DOCTOR:
        return 'bg-green-50';
      case UserRole.STAFF:
        return 'bg-yellow-50';
      case UserRole.CUSTOMER:
        return 'bg-primary-50';
      default:
        return 'bg-white';
    }
  };

  // Show chat button for guests, customers, and staff
  const showChatButton = [UserRole.GUEST, UserRole.CUSTOMER, UserRole.STAFF].includes(currentRole);

  return (
    <div className={`min-h-screen flex flex-col ${getBgColor()}`}>
      <Navbar currentRole={currentRole} userName={userName} />
      <main className="flex-grow">
        {pageTitle && (
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                <span>{pageTitle}</span>
              </h1>
            </div>
          </div>
        )}
        
        <div className={`px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
          {children}
        </div>
      </main>
      <Footer />
      
      {/* Chat Button for guests, customers, and staff */}
      {showChatButton && (
        <ChatButton 
          userRole={currentRole.toLowerCase()} 
          userName={userName || (currentRole === UserRole.GUEST ? 'Khách' : 'Người dùng')}
        />
      )}
    </div>
  );
};

export default Layout; 