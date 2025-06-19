import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const SupportFeature = ({ isMobile = false }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <>
      {/* Support button */}
      <button
        type="button"
        className={`
          ${isMobile 
            ? "-mx-3 flex w-full items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" 
            : "text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-150 ease-in-out"
          }
        `}
        onClick={() => setShowSupportModal(true)}
        aria-label="Hỗ trợ và trợ giúp"
      >
        <QuestionMarkCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        <span>Hỗ trợ</span>
      </button>

      {/* Support modal */}
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        open={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              <span>Hỗ trợ và trợ giúp</span>
            </Dialog.Title>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                <span>Chúng tôi luôn sẵn sàng hỗ trợ bạn. Vui lòng chọn một trong các tùy chọn dưới đây:</span>
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Chat với nhân viên hỗ trợ</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Gọi đường dây nóng (24/7)</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Gửi email cho chúng tôi</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Câu hỏi thường gặp</span>
                </button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">
                <span>Đường dây nóng hỗ trợ tâm lý:</span>
              </p>
              <p className="text-base font-medium text-primary-600">
                <span>1800-1234</span>
              </p>
              <p className="text-xs text-gray-500">
                <span>Miễn phí, hoạt động 24/7, bảo mật thông tin</span>
              </p>
            </div>
            <div className="mt-6">
              <Button
                type="button"
                variant="subtle"
                onClick={() => setShowSupportModal(false)}
              >
                <span>Đóng</span>
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SupportFeature; 