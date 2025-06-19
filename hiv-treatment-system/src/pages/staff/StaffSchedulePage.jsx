import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  PhoneIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

// Generate random tasks for staff
const generateRandomTasks = () => {
  const tasks = [];
  const today = new Date();
  
  const taskTypes = [
    { name: 'Tiếp nhận bệnh nhân mới', icon: UserIcon, category: 'patient' },
    { name: 'Cập nhật hồ sơ bệnh nhân', icon: DocumentTextIcon, category: 'admin' },
    { name: 'Gọi điện nhắc lịch hẹn', icon: PhoneIcon, category: 'communication' },
    { name: 'Nhập kết quả xét nghiệm', icon: BeakerIcon, category: 'lab' },
    { name: 'Hỗ trợ bác sĩ khám bệnh', icon: UserIcon, category: 'support' },
    { name: 'Chuẩn bị phòng khám', icon: ClockIcon, category: 'preparation' },
    { name: 'Kiểm tra thiết bị y tế', icon: CheckCircleIcon, category: 'maintenance' },
    { name: 'Tư vấn bệnh nhân qua điện thoại', icon: PhoneIcon, category: 'communication' },
    { name: 'Lập báo cáo hàng ngày', icon: DocumentTextIcon, category: 'admin' },
    { name: 'Hướng dẫn bệnh nhân sử dụng thuốc', icon: DocumentTextIcon, category: 'education' }
  ];

  const patientNames = [
    'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Thị Dung', 
    'Hoàng Văn Em', 'Vũ Thị Phương', 'Đặng Văn Giang', 'Bùi Thị Hoa',
    'Ngô Văn Inh', 'Đinh Thị Kim', 'Lý Văn Long', 'Mai Thị Minh'
  ];

  const priorities = ['high', 'medium', 'low'];
  const statuses = ['pending', 'in-progress', 'completed'];

  // Generate tasks for the next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip weekends for most tasks
    if (date.getDay() === 0 || date.getDay() === 6) {
      if (Math.random() > 0.3) continue; // 30% chance on weekends
    }
    
    // Random number of tasks per day (3-12)
    const tasksPerDay = Math.floor(Math.random() * 10) + 3;
    
    for (let j = 0; j < tasksPerDay; j++) {
      const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
      const hour = Math.floor(Math.random() * 9) + 8; // 8 AM to 4 PM
      const minute = Math.random() > 0.5 ? 0 : 30;
      const duration = Math.floor(Math.random() * 3) + 1; // 1-3 hours
      
      const endHour = hour + duration;
      const endMinute = minute;
      
      let taskDescription = taskType.name;
      if (taskType.category === 'patient' || taskType.category === 'support') {
        const patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
        taskDescription += ` - ${patientName}`;
      }
      
      tasks.push({
        id: `task-${i}-${j}`,
        title: taskDescription,
        description: getTaskDescription(taskType.name, taskType.category),
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute),
        startTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        endTime: `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: i === 0 ? (Math.random() > 0.3 ? 'pending' : 'in-progress') : statuses[Math.floor(Math.random() * statuses.length)],
        category: taskType.category,
        icon: taskType.icon,
        assignedBy: Math.random() > 0.5 ? 'BS. Lê Thị Minh' : 'Trưởng khoa',
        estimatedDuration: `${duration} giờ`,
        location: getTaskLocation(taskType.category)
      });
    }
  }
  
  return tasks.sort((a, b) => a.date - b.date);
};

const getTaskDescription = (taskName, category) => {
  const descriptions = {
    'patient': 'Tiếp nhận và hướng dẫn bệnh nhân mới về quy trình khám chữa bệnh',
    'admin': 'Cập nhật thông tin và hoàn thiện hồ sơ theo quy định',
    'communication': 'Liên hệ và tư vấn bệnh nhân qua điện thoại',
    'lab': 'Nhập và kiểm tra tính chính xác của kết quả xét nghiệm',
    'support': 'Hỗ trợ bác sĩ trong quá trình khám và điều trị bệnh nhân',
    'preparation': 'Chuẩn bị đầy đủ thiết bị và vật tư cho ca khám',
    'maintenance': 'Kiểm tra và bảo trì thiết bị y tế theo lịch định kỳ',
    'education': 'Hướng dẫn bệnh nhân về cách sử dụng thuốc và chế độ sinh hoạt'
  };
  return descriptions[category] || 'Thực hiện việc làm được giao';
};

const getTaskLocation = (category) => {
  const locations = {
    'patient': 'Quầy tiếp nhận',
    'admin': 'Văn phòng',
    'communication': 'Phòng tư vấn',
    'lab': 'Phòng xét nghiệm',
    'support': 'Phòng khám',
    'preparation': 'Phòng khám',
    'maintenance': 'Kho thiết bị',
    'education': 'Phòng tư vấn'
  };
  return locations[category] || 'Văn phòng';
};

const StaffSchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('today'); // 'today' | 'week' | 'calendar'
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    const generatedTasks = generateRandomTasks();
    setTasks(generatedTasks);
    
    // Filter today's tasks
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todayTaskList = generatedTasks.filter(task => 
      task.date >= todayStart && task.date < todayEnd
    );
    setTodayTasks(todayTaskList);
    
    // Calculate weekly stats
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    
    const weeklyTasks = generatedTasks.filter(task => 
      task.date >= weekStart && task.date < weekEnd
    );
    
    setWeeklyStats({
      total: weeklyTasks.length,
      completed: weeklyTasks.filter(task => task.status === 'completed').length,
      pending: weeklyTasks.filter(task => task.status === 'pending').length,
      inProgress: weeklyTasks.filter(task => task.status === 'in-progress').length
    });
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'in-progress':
        return 'Đang thực hiện';
      case 'pending':
        return 'Chờ thực hiện';
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircleIcon;
      case 'in-progress':
        return ArrowPathIcon;
      case 'pending':
        return ClockIcon;
      default:
        return ClockIcon;
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    setTodayTasks(todayTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getTasksForDate = (dateString) => {
    const date = new Date(dateString);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    return tasks.filter(task => task.date >= dayStart && task.date < dayEnd);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout currentRole={UserRole.STAFF} userName="Nguyễn Thị Lan">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch làm việc</h1>
            <p className="mt-1 text-sm text-gray-500">
               Lịch trình và công việc hàng ngày
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setViewMode('today')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                  viewMode === 'today'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Hôm nay
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 text-sm font-medium border-t border-b ${
                  viewMode === 'week'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Tuần này
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                  viewMode === 'calendar'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <CalendarIcon className="h-4 w-4 mr-2 inline" />
                Lịch
              </button>
            </div>
            <Button variant="primary" className="flex items-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Việc phải làm
            </Button>
          </div>
        </div>

        {viewMode === 'today' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card title={`Việc phải làm hôm nay - ${formatDate(new Date())}`}>
                <div className="p-6">
                  {todayTasks.length > 0 ? (
                    <div className="space-y-4">
                      {todayTasks.map((task) => {
                        const StatusIcon = getStatusIcon(task.status);
                        const TaskIcon = task.icon;
                        return (
                          <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <TaskIcon className="h-4 w-4 text-primary-600" />
                                  </div>
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {task.title}
                                  </h3>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                    {getPriorityIcon(task.priority)} {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                                  </span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                    {getStatusText(task.status)}
                                  </span>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                  <div className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    {task.startTime} - {task.endTime}
                                  </div>
                                  <div>
                                    <span className="font-medium">Thời lượng:</span> {task.estimatedDuration}
                                  </div>
                                  <div>
                                    <span className="font-medium">Địa điểm:</span> {task.location}
                                  </div>
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                  <span className="font-medium">Giao bởi:</span> {task.assignedBy}
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2 ml-4">
                                {task.status === 'pending' && (
                                  <Button 
                                    variant="primary" 
                                    size="sm"
                                    onClick={() => updateTaskStatus(task.id, 'in-progress')}
                                  >
                                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                                    Bắt đầu
                                  </Button>
                                )}
                                {task.status === 'in-progress' && (
                                  <Button 
                                    variant="primary" 
                                    size="sm"
                                    onClick={() => updateTaskStatus(task.id, 'completed')}
                                  >
                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                    Hoàn thành
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">
                                  Chi tiết
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Không có việc phải làm nào hôm nay</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card title="Thống kê tuần này">
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tổng việc phải làm:</span>
                      <span className="text-sm font-medium">{weeklyStats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Đã hoàn thành:</span>
                      <span className="text-sm font-medium text-green-600">{weeklyStats.completed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Đang thực hiện:</span>
                      <span className="text-sm font-medium text-blue-600">{weeklyStats.inProgress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Chờ thực hiện:</span>
                      <span className="text-sm font-medium text-gray-600">{weeklyStats.pending}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Tiến độ tuần</span>
                      <span>{Math.round((weeklyStats.completed / weeklyStats.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(weeklyStats.completed / weeklyStats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Today's Priority Tasks */}
              <Card title="Việc làm ưu tiên hôm nay">
                <div className="p-4">
                  {(() => {
                    const priorityTasks = todayTasks.filter(task => 
                      task.priority === 'high' && task.status !== 'completed'
                    );
                    
                    if (priorityTasks.length === 0) {
                      return (
                        <div className="text-center py-4">
                          <CheckCircleIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Không có việc phải làm ưu tiên</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="space-y-3">
                        {priorityTasks.slice(0, 3).map((task) => (
                          <div key={task.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                              <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            </div>
                            <p className="text-xs text-gray-600">{task.startTime} - {task.endTime}</p>
                            <p className="text-xs text-gray-500">{task.location}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card title="Thao tác nhanh">
                <div className="p-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Tiếp nhận bệnh nhân mới
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Gọi điện nhắc lịch hẹn
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BeakerIcon className="h-4 w-4 mr-2" />
                    Nhập kết quả xét nghiệm
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    Lập báo cáo
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {viewMode === 'week' && (
          <Card title="Lịch làm việc tuần này">
            <div className="p-6">
              {(() => {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
                
                const weekDays = [];
                for (let i = 0; i < 7; i++) {
                  const day = new Date(weekStart);
                  day.setDate(weekStart.getDate() + i);
                  weekDays.push(day);
                }
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weekDays.map((day, index) => {
                      const dayTasks = getTasksForDate(day.toISOString().split('T')[0]);
                      const isToday = day.toDateString() === today.toDateString();
                      
                      return (
                        <div key={index} className={`border rounded-lg p-3 ${isToday ? 'bg-primary-50 border-primary-200' : 'bg-white'}`}>
                          <h3 className={`font-medium text-center mb-3 ${isToday ? 'text-primary-700' : 'text-gray-900'}`}>
                            {day.toLocaleDateString('vi-VN', { weekday: 'short' })}
                            <br />
                            <span className="text-sm">{day.getDate()}/{day.getMonth() + 1}</span>
                          </h3>
                          
                          <div className="space-y-2">
                            {dayTasks.slice(0, 3).map((task) => (
                              <div key={task.id} className="text-xs p-2 bg-white border rounded">
                                <div className="flex items-center space-x-1 mb-1">
                                  <span className={`w-2 h-2 rounded-full ${
                                    task.priority === 'high' ? 'bg-red-400' : 
                                    task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                                  }`}></span>
                                  <span className="font-medium truncate">{task.title}</span>
                                </div>
                                <p className="text-gray-500">{task.startTime}</p>
                              </div>
                            ))}
                            {dayTasks.length > 3 && (
                              <p className="text-xs text-gray-500 text-center">
                                +{dayTasks.length - 3} việc phải làm khác
                              </p>
                            )}
                            {dayTasks.length === 0 && (
                              <p className="text-xs text-gray-400 text-center py-2">
                                Không có việc phải làm
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </Card>
        )}

        {viewMode === 'calendar' && (
          <Card title="Lịch làm việc tháng này">
            <div className="p-6">
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Chế độ xem lịch sẽ được phát triển trong phiên bản tiếp theo</p>
                <p className="text-sm mt-2">Hiện tại hãy sử dụng chế độ "Hôm nay" hoặc "Tuần này"</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default StaffSchedulePage; 