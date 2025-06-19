import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const DataAnalytics = ({
  statistics = {
    totalPatients: 0,
    newPatients: 0,
    activePatients: 0,
    treatmentSuccess: 0,
    avgTreatmentDuration: 0,
    testResultsByMonth: [],
    patientsByAgeGroup: [],
    patientsByGender: [],
    treatmentAdherence: [],
  }
}) => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample color palette for charts
  const chartColors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'
  ];
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Calculate percentage
  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };
  
  // Mock function to get data for selected time range
  const getDataForTimeRange = (range) => {
    // In a real implementation, this would filter data based on time range
    return statistics;
  };
  
  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real implementation, we would fetch new data or filter existing data
  };
  
  // Current data based on selected time range
  const currentData = getDataForTimeRange(timeRange);
  
  return (
    <div className="space-y-6">
      {/* Header with time range filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Phân tích dữ liệu điều trị HIV
        </h2>
        <div className="flex items-center space-x-2 bg-white p-1 rounded-lg shadow-sm">
          <Button 
            variant={timeRange === 'week' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('week')}
          >
            Tuần
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('month')}
          >
            Tháng
          </Button>
          <Button 
            variant={timeRange === 'quarter' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('quarter')}
          >
            Quý
          </Button>
          <Button 
            variant={timeRange === 'year' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => handleTimeRangeChange('year')}
          >
            Năm
          </Button>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Tổng số bệnh nhân</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{formatNumber(currentData.totalPatients)}</p>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-green-500 text-sm font-medium">+{currentData.newPatients}</span>
                <span className="ml-2 text-sm text-gray-500">bệnh nhân mới</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Bệnh nhân đang điều trị</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{formatNumber(currentData.activePatients)}</p>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-gray-900 text-sm font-medium">
                  {calculatePercentage(currentData.activePatients, currentData.totalPatients)}%
                </span>
                <span className="ml-2 text-sm text-gray-500">trong tổng số bệnh nhân</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Tỷ lệ điều trị thành công</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {calculatePercentage(currentData.treatmentSuccess, currentData.totalPatients)}%
            </p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${calculatePercentage(currentData.treatmentSuccess, currentData.totalPatients)}%` }}
              ></div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Thời gian điều trị trung bình</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{currentData.avgTreatmentDuration}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-500">tháng điều trị</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Gender distribution chart */}
      <Card title="Phân bố bệnh nhân theo giới tính">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            {currentData.patientsByGender.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-full h-24 md:h-40 flex flex-col justify-end">
                  <div 
                    className={`${chartColors[index % chartColors.length]} rounded-t-full w-full`} 
                    style={{ height: `${calculatePercentage(item.count, currentData.totalPatients)}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">{item.gender}</p>
                <p className="text-xs text-gray-500">{item.count} ({calculatePercentage(item.count, currentData.totalPatients)}%)</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Age distribution chart */}
      <Card title="Phân bố bệnh nhân theo độ tuổi">
        <div className="p-4">
          <div className="space-y-4">
            {currentData.patientsByAgeGroup.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.ageGroup}</span>
                  <span className="text-sm text-gray-500">{item.count} bệnh nhân</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${chartColors[index % chartColors.length]} h-2.5 rounded-full`} 
                    style={{ width: `${calculatePercentage(item.count, currentData.totalPatients)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Treatment adherence */}
      <Card title="Mức độ tuân thủ điều trị">
        <div className="p-4">
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                {currentData.treatmentAdherence.map((item, index) => {
                  // Calculate the pie chart segments
                  let total = currentData.treatmentAdherence.reduce((sum, i) => sum + i.count, 0);
                  let angleOffset = currentData.treatmentAdherence
                    .slice(0, index)
                    .reduce((sum, i) => sum + (i.count / total) * 360, 0);
                  let angle = (item.count / total) * 360;
                  
                  // Convert to SVG arc path
                  let startAngle = angleOffset * (Math.PI / 180);
                  let endAngle = (angleOffset + angle) * (Math.PI / 180);
                  
                  let x1 = 18 + 15 * Math.sin(startAngle);
                  let y1 = 18 - 15 * Math.cos(startAngle);
                  let x2 = 18 + 15 * Math.sin(endAngle);
                  let y2 = 18 - 15 * Math.cos(endAngle);
                  
                  // Determine if the arc should be drawn the long way around
                  let largeArcFlag = angle > 180 ? 1 : 0;
                  
                  return (
                    <path 
                      key={index}
                      d={`M 18 18 L ${x1} ${y1} A 15 15 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={item.color || chartColors[index % chartColors.length].replace('bg-', 'fill-').replace('-500', '-600')}
                    />
                  );
                })}
                <circle cx="18" cy="18" r="10" fill="white" />
              </svg>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            {currentData.treatmentAdherence.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${chartColors[index % chartColors.length]}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.level}</p>
                  <p className="text-xs text-gray-500">{calculatePercentage(item.count, currentData.treatmentAdherence.reduce((sum, i) => sum + i.count, 0))}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Test results by month */}
      <Card title="Kết quả xét nghiệm theo tháng">
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="h-60 flex items-end space-x-2">
              {currentData.testResultsByMonth.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex-1 flex flex-col-reverse">
                    {Object.entries(item.results).map(([key, value], i) => {
                      const percentage = calculatePercentage(value, Object.values(item.results).reduce((sum, val) => sum + val, 0));
                      const heightClass = percentage > 0 ? `h-[${percentage}%]` : 'h-0';
                      const colorClass = key === 'positive' 
                        ? 'bg-red-500' 
                        : key === 'negative' 
                          ? 'bg-green-500' 
                          : 'bg-yellow-500';
                      
                      return (
                        <div 
                          key={i} 
                          className={`w-full ${colorClass}`} 
                          style={{ height: `${percentage}%` }}
                        ></div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs font-medium text-gray-900">{item.month}</p>
                  <p className="text-xs text-gray-500">{Object.values(item.results).reduce((sum, val) => sum + val, 0)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Âm tính</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-700">Dương tính</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-700">Không xác định</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Download report button */}
      <div className="flex justify-end">
        <Button variant="outline">
          Tải xuống báo cáo đầy đủ
        </Button>
      </div>
    </div>
  );
};

export default DataAnalytics; 