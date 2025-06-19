import React from 'react';
import Card from '../common/Card';

const StaffDashboard = ({
  staffInfo,
  metrics = {
    appointmentsToday: 0,
    appointmentsThisWeek: 0,
    patientsAssigned: 0,
    pendingTasks: 0,
    testResultsPending: 0,
    treatmentPlansToReview: 0,
  },
  recentActivities = [],
}) => {
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get appropriate color class based on indicator
  const getColorClass = (value, threshold1, threshold2) => {
    if (value >= threshold2) return 'text-red-600';
    if (value >= threshold1) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Greeting and quick stats */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-primary-600 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-white">Chào mừng, {staffInfo?.fullName || 'Nhân viên'}</h3>
          <p className="mt-1 max-w-2xl text-sm text-primary-100">
            {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Chức vụ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{staffInfo?.role || 'Nhân viên y tế'}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phòng ban</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{staffInfo?.department || 'Khoa Điều trị HIV'}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{staffInfo?.email || 'email@example.com'}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{staffInfo?.phone || 'Chưa cập nhật'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Lịch hẹn hôm nay">
          <div className="p-4 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-primary-600">{metrics.appointmentsToday}</span>
            <p className="mt-2 text-sm text-gray-500">bệnh nhân</p>
          </div>
        </Card>

        <Card title="Bệnh nhân được phân công">
          <div className="p-4 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-primary-600">{metrics.patientsAssigned}</span>
            <p className="mt-2 text-sm text-gray-500">bệnh nhân</p>
          </div>
        </Card>

        <Card title="Nhiệm vụ chưa hoàn thành">
          <div className="p-4 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${getColorClass(metrics.pendingTasks, 5, 10)}`}>
              {metrics.pendingTasks}
            </span>
            <p className="mt-2 text-sm text-gray-500">nhiệm vụ</p>
          </div>
        </Card>
      </div>

      {/* Tasks and pending work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Kết quả xét nghiệm chờ xử lý">
          <div className="p-4">
            {metrics.testResultsPending > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Cần xử lý</span>
                <span className={`text-2xl font-bold ${getColorClass(metrics.testResultsPending, 3, 7)}`}>
                  {metrics.testResultsPending}
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Không có kết quả xét nghiệm nào đang chờ xử lý</p>
            )}
          </div>
        </Card>

        <Card title="Phác đồ điều trị cần xem xét">
          <div className="p-4">
            {metrics.treatmentPlansToReview > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Cần xem xét</span>
                <span className={`text-2xl font-bold ${getColorClass(metrics.treatmentPlansToReview, 2, 5)}`}>
                  {metrics.treatmentPlansToReview}
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Không có phác đồ điều trị nào cần xem xét</p>
            )}
          </div>
        </Card>
      </div>

      {/* Recent activities */}
      <Card title="Hoạt động gần đây">
        <div className="p-4">
          {recentActivities.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <li key={index} className="py-3">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'appointment' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'test_result' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'treatment' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'appointment' ? 'A' :
                       activity.type === 'test_result' ? 'T' :
                       activity.type === 'treatment' ? 'Đ' : 'H'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">
                      {formatDate(activity.timestamp)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">Không có hoạt động nào gần đây</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StaffDashboard; 