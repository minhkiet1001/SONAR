import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { UserRole } from '../../types/index.js';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import {
  BeakerIcon,
  ChartBarIcon,
  InformationCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  CalendarIcon,
  HeartIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  AcademicCapIcon,
  BookOpenIcon,
  LightBulbIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const TestResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [selectedRegimen, setSelectedRegimen] = useState(null);
  const [showRegimenModal, setShowRegimenModal] = useState(false);
  const [showTestHistoryModal, setShowTestHistoryModal] = useState(false);

  // Handle URL parameters for direct navigation
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Set default regimen after component mounts
  useEffect(() => {
    if (!selectedRegimen && arvRegimens.length > 0) {
      setSelectedRegimen(arvRegimens[0]); // Default to Biktarvy
    }
  }, [selectedRegimen]);

  // Comprehensive test results data with detailed information
  const testResults = [
    {
      id: 1,
      testName: 'Tải lượng virus HIV (HIV Viral Load)',
      date: new Date('2024-01-20'),
      category: 'Viral Load',
      result: '< 40',
      unit: 'copies/mL',
      referenceRange: '< 50 copies/mL (Không phát hiện)',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'stable',
      previousResult: '< 40',
      interpretation: 'Tải lượng virus không phát hiện được - điều này rất tốt và cho thấy thuốc ARV đang hoạt động hiệu quả.',
      clinicalSignificance: 'Tải lượng virus không phát hiện được có nghĩa là nguy cơ lây truyền HIV cho người khác gần như bằng 0 (U=U: Undetectable = Untransmittable).',
      nextTestDate: '2024-04-20',
      arvRegimen: 'Biktarvy (Bictegravir/Tenofovir alafenamide/Emtricitabine)',
      adherenceRate: 98
    },
    {
      id: 2,
      testName: 'Số lượng CD4+ T-cells',
      date: new Date('2024-01-20'),
      category: 'CD4 Count',
      result: '750',
      unit: 'cells/μL',
      referenceRange: '500-1600 cells/μL (Bình thường)',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'increasing',
      previousResult: '680',
      interpretation: 'Số lượng CD4 tốt, hệ miễn dịch đang hoạt động hiệu quả.',
      clinicalSignificance: 'CD4 > 500 cho thấy hệ miễn dịch mạnh, nguy cơ nhiễm trùng cơ hội thấp.',
      nextTestDate: '2024-04-20',
      cd4Percentage: 35,
      immuneStatus: 'Mạnh'
    },
    {
      id: 3,
      testName: 'Tỷ lệ CD4/CD8',
      date: new Date('2024-01-20'),
      category: 'CD4 Count',
      result: '0.85',
      unit: 'ratio',
      referenceRange: '0.8-2.5 (Bình thường)',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'stable',
      previousResult: '0.82',
      interpretation: 'Tỷ lệ CD4/CD8 bình thường, cân bằng miễn dịch tốt.',
      clinicalSignificance: 'Tỷ lệ này phản ánh sự cân bằng của hệ miễn dịch. Tỷ lệ bình thường cho thấy điều trị hiệu quả.'
    },
    {
      id: 4,
      testName: 'ALT (Alanine Aminotransferase)',
      date: new Date('2024-01-20'),
      category: 'Liver Function',
      result: '28',
      unit: 'U/L',
      referenceRange: '7-55 U/L',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'stable',
      previousResult: '32',
      interpretation: 'Chức năng gan bình thường, không có dấu hiệu tổn thương gan.',
      clinicalSignificance: 'Quan trọng để theo dõi tác dụng phụ của thuốc ARV đối với gan.',
      arvSafety: 'Thuốc ARV hiện tại an toàn cho gan'
    },
    {
      id: 5,
      testName: 'Creatinine',
      date: new Date('2024-01-20'),
      category: 'Kidney Function',
      result: '0.9',
      unit: 'mg/dL',
      referenceRange: '0.7-1.3 mg/dL',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'stable',
      previousResult: '0.8',
      interpretation: 'Chức năng thận bình thường.',
      clinicalSignificance: 'Theo dõi chức năng thận quan trọng khi sử dụng một số loại thuốc ARV.',
      arvSafety: 'Thuốc ARV hiện tại an toàn cho thận'
    },
    {
      id: 6,
      testName: 'Tải lượng virus HIV',
      date: new Date('2023-10-20'),
      category: 'Viral Load',
      result: '< 40',
      unit: 'copies/mL',
      referenceRange: '< 50 copies/mL',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'stable',
      previousResult: '< 40',
      interpretation: 'Tải lượng virus tiếp tục không phát hiện được.',
      arvRegimen: 'Biktarvy'
    },
    {
      id: 7,
      testName: 'Số lượng CD4+ T-cells',
      date: new Date('2023-10-20'),
      category: 'CD4 Count',
      result: '680',
      unit: 'cells/μL',
      referenceRange: '500-1600 cells/μL',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'increasing',
      previousResult: '620',
      interpretation: 'CD4 tiếp tục tăng, hệ miễn dịch đang phục hồi tốt.',
      immuneStatus: 'Mạnh'
    },
    {
      id: 8,
      testName: 'Tải lượng virus HIV',
      date: new Date('2023-07-15'),
      category: 'Viral Load',
      result: '< 40',
      unit: 'copies/mL',
      referenceRange: '< 50 copies/mL',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'stable',
      previousResult: '< 40',
      interpretation: 'Tải lượng virus duy trì ở mức không phát hiện được.',
      arvRegimen: 'Biktarvy'
    },
    {
      id: 9,
      testName: 'Số lượng CD4+ T-cells',
      date: new Date('2023-07-15'),
      category: 'CD4 Count',
      result: '620',
      unit: 'cells/μL',
      referenceRange: '500-1600 cells/μL',
      status: 'normal',
      doctorName: 'BS. Nguyễn Thị Lan',
      trend: 'increasing',
      previousResult: '580',
      interpretation: 'CD4 tiếp tục cải thiện, hệ miễn dịch đang phục hồi.',
      immuneStatus: 'Tốt'
    }
  ];

  // Comprehensive ARV regimen information
  const arvRegimens = [
    {
      id: 1,
      name: 'Biktarvy',
      category: 'STR (Single Tablet Regimen)',
      components: [
        {
          name: 'Bictegravir',
          dose: '50mg',
          class: 'INSTI (Integrase Strand Transfer Inhibitor)',
          mechanism: 'Ngăn chặn enzyme integrase của HIV, ngăn virus tích hợp vào DNA tế bào chủ'
        },
        {
          name: 'Tenofovir alafenamide (TAF)',
          dose: '25mg',
          class: 'NRTI (Nucleoside Reverse Transcriptase Inhibitor)',
          mechanism: 'Ngăn chặn enzyme reverse transcriptase, ngăn HIV sao chép'
        },
        {
          name: 'Emtricitabine (FTC)',
          dose: '200mg',
          class: 'NRTI (Nucleoside Reverse Transcriptase Inhibitor)',
          mechanism: 'Ngăn chặn enzyme reverse transcriptase, tăng cường hiệu quả với TAF'
        }
      ],
      dosage: '1 viên/ngày',
      timing: 'Uống cùng giờ mỗi ngày, có thể uống với hoặc không có thức ăn',
      startDate: '2023-01-15',
      effectiveness: 'Rất cao (>95% bệnh nhân đạt tải lượng virus không phát hiện)',
      sideEffects: 'Ít và nhẹ',
      description: 'Phác đồ một viên mỗi ngày, hiệu quả cao với ít tác dụng phụ',
      advantages: [
        'Chỉ cần uống 1 viên/ngày - thuận tiện cho việc tuân thủ',
        'Ít tương tác thuốc so với các phác đồ khác',
        'An toàn cho thận và xương (TAF an toàn hơn TDF)',
        'Hiệu quả cao trong việc ức chế virus (>95%)',
        'Rào cản kháng thuốc cao',
        'Phù hợp cho nhiều nhóm bệnh nhân'
      ],
      monitoring: [
        'Tải lượng virus mỗi 3-6 tháng',
        'CD4 mỗi 3-6 tháng',
        'Chức năng gan (ALT, AST) mỗi 3-6 tháng',
        'Chức năng thận (Creatinine, eGFR) mỗi 3-6 tháng',
        'Lipid máu hàng năm',
        'Mật độ xương (nếu có yếu tố nguy cơ)'
      ],
      contraindications: [
        'Dị ứng với bất kỳ thành phần nào',
        'Suy thận nặng (eGFR < 30 mL/min)',
        'Đang dùng dofetilide',
        'Đang dùng rifampin'
      ],
      drugInteractions: [
        'Thuốc kháng acid: uống cách nhau 2 giờ',
        'Sắt, canxi: có thể uống cùng nếu có thức ăn',
        'Metformin: có thể cần giảm liều',
        'Warfarin: theo dõi INR chặt chẽ'
      ],
      cost: 'Cao nhưng được bảo hiểm y tế hỗ trợ',
      patientEducation: [
        'Uống đúng giờ mỗi ngày để duy trì nồng độ thuốc',
        'Không bỏ liều - có thể dẫn đến kháng thuốc',
        'Báo cáo tác dụng phụ cho bác sĩ',
        'Xét nghiệm định kỳ để theo dõi hiệu quả và an toàn',
        'Có thể uống với hoặc không có thức ăn'
      ],
      forConditions: [1, 2, 4] // HIV mới chẩn đoán, được kiểm soát tốt, có bệnh đồng mắc
    },
    {
      id: 2,
      name: 'Triumeq',
      category: 'STR (Single Tablet Regimen)',
      components: [
        {
          name: 'Dolutegravir',
          dose: '50mg',
          class: 'INSTI (Integrase Strand Transfer Inhibitor)',
          mechanism: 'Ngăn chặn enzyme integrase của HIV'
        },
        {
          name: 'Abacavir',
          dose: '600mg',
          class: 'NRTI (Nucleoside Reverse Transcriptase Inhibitor)',
          mechanism: 'Ngăn chặn enzyme reverse transcriptase'
        },
        {
          name: 'Lamivudine',
          dose: '300mg',
          class: 'NRTI (Nucleoside Reverse Transcriptase Inhibitor)',
          mechanism: 'Ngăn chặn enzyme reverse transcriptase'
        }
      ],
      dosage: '1 viên/ngày',
      timing: 'Uống cùng giờ mỗi ngày, có thể uống với hoặc không có thức ăn',
      effectiveness: 'Rất cao',
      sideEffects: 'Ít, cần test HLA-B*5701 trước khi dùng',
      description: 'Phác đồ hiệu quả cao, cần xét nghiệm gen trước điều trị',
      advantages: [
        'Hiệu quả cao và bền vững',
        'Ít tương tác thuốc',
        'Không ảnh hưởng thận',
        'Rào cản kháng thuốc cao'
      ],
      contraindications: [
        'HLA-B*5701 dương tính',
        'Suy gan nặng',
        'Dị ứng với abacavir'
      ],
      forConditions: [1, 2] // HIV mới chẩn đoán, được kiểm soát tốt
    },
    {
      id: 3,
      name: 'Descovy + Isentress',
      category: 'Multi-tablet Regimen',
      components: [
        {
          name: 'Tenofovir alafenamide',
          dose: '25mg',
          class: 'NRTI',
          mechanism: 'Ngăn chặn reverse transcriptase'
        },
        {
          name: 'Emtricitabine',
          dose: '200mg',
          class: 'NRTI',
          mechanism: 'Ngăn chặn reverse transcriptase'
        },
        {
          name: 'Raltegravir',
          dose: '400mg',
          class: 'INSTI',
          mechanism: 'Ngăn chặn integrase'
        }
      ],
      dosage: 'Descovy 1 viên/ngày + Isentress 1 viên x 2 lần/ngày',
      timing: 'Descovy 1 lần/ngày, Isentress 2 lần/ngày cách 12 giờ',
      effectiveness: 'Cao',
      sideEffects: 'Ít',
      description: 'Phác đồ 2 thuốc, phù hợp cho bệnh nhân có tương tác thuốc phức tạp',
      forConditions: [2, 4] // HIV được kiểm soát tốt, có bệnh đồng mắc
    },
    {
      id: 4,
      name: 'Darunavir/Cobicistat + Truvada',
      category: 'Multi-tablet Regimen (Kháng thuốc)',
      components: [
        {
          name: 'Darunavir',
          dose: '800mg',
          class: 'PI (Protease Inhibitor)',
          mechanism: 'Ngăn chặn enzyme protease, ngăn virus trưởng thành'
        },
        {
          name: 'Cobicistat',
          dose: '150mg',
          class: 'Pharmacokinetic Enhancer',
          mechanism: 'Tăng cường nồng độ darunavir trong máu'
        },
        {
          name: 'Tenofovir disoproxil fumarate',
          dose: '300mg',
          class: 'NRTI',
          mechanism: 'Ngăn chặn reverse transcriptase'
        },
        {
          name: 'Emtricitabine',
          dose: '200mg',
          class: 'NRTI',
          mechanism: 'Ngăn chặn reverse transcriptase'
        }
      ],
      dosage: 'Darunavir/Cobicistat 1 viên/ngày + Truvada 1 viên/ngày',
      timing: 'Uống cùng thức ăn, cùng giờ mỗi ngày',
      effectiveness: 'Cao cho bệnh nhân kháng thuốc',
      sideEffects: 'Trung bình, có thể ảnh hưởng đường tiêu hóa',
      description: 'Phác đồ cho bệnh nhân có kháng thuốc với INSTI hoặc NNRTI',
      advantages: [
        'Hiệu quả cao với virus kháng thuốc',
        'Rào cản kháng thuốc cao',
        'Kinh nghiệm lâm sàng dài',
        'Phù hợp cho nhiều tình huống kháng thuốc'
      ],
      contraindications: [
        'Suy gan nặng',
        'Dị ứng với sulfonamide',
        'Tương tác thuốc nghiêm trọng'
      ],
      forConditions: [3], // HIV kháng thuốc
      specialNotes: 'Cần xét nghiệm kháng thuốc trước khi sử dụng'
    },
    {
      id: 5,
      name: 'Cabotegravir + Rilpivirine (Cabenuva)',
      category: 'Long-acting Injectable',
      components: [
        {
          name: 'Cabotegravir',
          dose: '400mg',
          class: 'INSTI (Integrase Strand Transfer Inhibitor)',
          mechanism: 'Ngăn chặn enzyme integrase của HIV'
        },
        {
          name: 'Rilpivirine',
          dose: '600mg',
          class: 'NNRTI (Non-nucleoside Reverse Transcriptase Inhibitor)',
          mechanism: 'Ngăn chặn enzyme reverse transcriptase'
        }
      ],
      dosage: 'Tiêm bắp mỗi 2 tháng',
      timing: 'Tiêm tại cơ sở y tế mỗi 8 tuần',
      effectiveness: 'Rất cao',
      sideEffects: 'Ít, có thể đau tại chỗ tiêm',
      description: 'Phác đồ tiêm dài hạn, thuận tiện cho bệnh nhân khó tuân thủ uống thuốc hàng ngày',
      advantages: [
        'Chỉ cần tiêm 2 tháng/lần',
        'Không cần nhớ uống thuốc hàng ngày',
        'Hiệu quả cao và bền vững',
        'Cải thiện chất lượng cuộc sống'
      ],
      contraindications: [
        'Tải lượng virus > 50 copies/mL',
        'Kháng thuốc với cabotegravir hoặc rilpivirine',
        'Suy gan nặng'
      ],
      forConditions: [2], // HIV được kiểm soát tốt
      specialNotes: 'Cần ổn định với thuốc uống trước khi chuyển sang tiêm'
    }
  ];

  // Educational content about HIV tests
  const testEducation = {
    'Viral Load': {
      title: 'Tải lượng virus HIV',
      description: 'Đo lường số lượng virus HIV trong máu',
      importance: [
        'Đánh giá hiệu quả của thuốc ARV',
        'Theo dõi tiến triển bệnh',
        'Xác định nguy cơ lây truyền',
        'Điều chỉnh phác đồ điều trị'
      ],
      ranges: [
        { range: '< 50 copies/mL', status: 'Không phát hiện', color: 'green', description: 'Mục tiêu điều trị đạt được' },
        { range: '50-1,000 copies/mL', status: 'Thấp', color: 'yellow', description: 'Cần theo dõi và có thể điều chỉnh thuốc' },
        { range: '> 1,000 copies/mL', status: 'Cao', color: 'red', description: 'Cần điều chỉnh phác đồ điều trị ngay' }
      ],
      frequency: 'Mỗi 3-6 tháng khi ổn định, mỗi 1-3 tháng khi bắt đầu điều trị'
    },
    'CD4 Count': {
      title: 'Số lượng CD4+ T-cells',
      description: 'Đo lường tế bào miễn dịch chính bị HIV tấn công',
      importance: [
        'Đánh giá tình trạng hệ miễn dịch',
        'Xác định nguy cơ nhiễm trùng cơ hội',
        'Theo dõi phục hồi miễn dịch',
        'Quyết định thời điểm bắt đầu điều trị dự phòng'
      ],
      ranges: [
        { range: '> 500 cells/μL', status: 'Bình thường', color: 'green', description: 'Hệ miễn dịch mạnh, nguy cơ nhiễm trùng thấp' },
        { range: '200-500 cells/μL', status: 'Trung bình', color: 'yellow', description: 'Cần theo dõi, có thể cần dự phòng một số bệnh' },
        { range: '< 200 cells/μL', status: 'Thấp', color: 'red', description: 'Nguy cơ cao nhiễm trùng cơ hội, cần điều trị tích cực' }
      ],
      frequency: 'Mỗi 3-6 tháng khi ổn định'
    },
    'Liver Function': {
      title: 'Chức năng gan',
      description: 'Đánh giá tình trạng hoạt động của gan',
      importance: [
        'Theo dõi tác dụng phụ của thuốc ARV',
        'Phát hiện sớm tổn thương gan',
        'Điều chỉnh liều thuốc nếu cần',
        'Theo dõi đồng nhiễm viêm gan B, C'
      ],
      tests: ['ALT', 'AST', 'Bilirubin', 'Albumin'],
      frequency: 'Mỗi 3-6 tháng hoặc khi có triệu chứng'
    },
    'Kidney Function': {
      title: 'Chức năng thận',
      description: 'Đánh giá khả năng lọc và thải độc của thận',
      importance: [
        'Theo dõi tác dụng phụ của một số thuốc ARV',
        'Điều chỉnh liều thuốc theo chức năng thận',
        'Phát hiện sớm bệnh thận',
        'Đảm bảo an toàn khi dùng thuốc'
      ],
      tests: ['Creatinine', 'eGFR', 'Protein niệu'],
      frequency: 'Mỗi 3-6 tháng'
    }
  };

  // Filter results based on selected category
  const filteredResults = selectedCategory === 'all' 
    ? testResults 
    : testResults.filter(test => test.category === selectedCategory);

  // Sort by date (newest first)
  const sortedResults = [...filteredResults].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group results by date
  const resultsByDate = sortedResults.reduce((groups, test) => {
    const dateStr = test.date.toISOString().split('T')[0];
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(test);
    return groups;
  }, {});

  // Find the selected test
  const selectedTest = selectedTestId 
    ? testResults.find(test => test.id === selectedTestId) 
    : null;

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'normal':
        return 'Bình thường';
      case 'attention':
        return 'Cần chú ý';
      case 'critical':
        return 'Nguy hiểm';
      default:
        return 'Không xác định';
    }
  };

  // Get status indicator color
  const getStatusIndicator = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'attention':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <ArrowUpIcon className="h-4 w-4 text-green-600" />;
      case 'decreasing':
        return <ArrowDownIcon className="h-4 w-4 text-red-600" />;
      case 'stable':
        return <div className="h-4 w-4 bg-blue-600 rounded-full"></div>;
      default:
        return null;
    }
  };

  // Get comprehensive HIV indicators summary
  const getHIVIndicatorsSummary = () => {
    const latestViralLoad = testResults
      .filter(test => test.category === 'Viral Load')
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    
    const latestCD4 = testResults
      .filter(test => test.category === 'CD4 Count' && test.testName === 'Số lượng CD4+ T-cells')
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    
    const latestCD4Ratio = testResults
      .filter(test => test.category === 'CD4 Count' && test.testName === 'Tỷ lệ CD4/CD8')
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    
    const latestLiver = testResults
      .filter(test => test.category === 'Liver Function')
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    
    const latestKidney = testResults
      .filter(test => test.category === 'Kidney Function')
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

    return {
      viralLoad: latestViralLoad,
      cd4Count: latestCD4,
      cd4Ratio: latestCD4Ratio,
      liverFunction: latestLiver,
      kidneyFunction: latestKidney,
      overallStatus: 'excellent', // Based on all indicators
      treatmentEffectiveness: 98, // Percentage
      immuneRecovery: 'strong'
    };
  };

  const hivSummary = getHIVIndicatorsSummary();

  // Modal Component for Treatment Regimen
  const RegimenModal = ({ regimen, isOpen, onClose }) => {
    if (!isOpen || !regimen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full mr-4">
                  <CpuChipIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{regimen.name}</h2>
                  <p className="text-gray-600">{regimen.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
                Thông tin cơ bản
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Liều lượng:</span>
                    <span className="font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded">{regimen.dosage}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Hiệu quả:</span>
                    <span className="font-semibold text-green-700 bg-green-100 px-3 py-1 rounded">{regimen.effectiveness}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Tác dụng phụ:</span>
                    <span className="font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded">{regimen.sideEffects}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{regimen.description}</p>
                  {regimen.timing && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">Cách dùng:</p>
                      <p className="text-sm text-blue-700">{regimen.timing}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Components */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BeakerIcon className="h-5 w-5 mr-2 text-purple-600" />
                Thành phần hoạt chất
              </h3>
              <div className="space-y-4">
                {regimen.components.map((component, idx) => (
                  <div key={idx} className="border-l-4 border-purple-300 pl-4 bg-purple-50 p-4 rounded-r-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{component.name}</h4>
                      <span className="text-purple-600 font-bold text-lg">{component.dose}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded">
                        {component.class}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{component.mechanism}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages */}
            {regimen.advantages && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Ưu điểm nổi bật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {regimen.advantages.map((advantage, idx) => (
                    <div key={idx} className="flex items-start bg-white p-3 rounded-lg">
                      <span className="text-green-500 mr-3 mt-0.5 font-bold text-lg">✓</span>
                      <span className="text-sm text-green-700 leading-relaxed">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Monitoring and Contraindications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regimen.monitoring && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Theo dõi cần thiết
                  </h3>
                  <div className="space-y-2">
                    {regimen.monitoring.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-white p-3 rounded-lg">
                        <span className="text-blue-500 mr-3 mt-0.5">📊</span>
                        <span className="text-sm text-blue-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {regimen.contraindications && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                    Chống chỉ định
                  </h3>
                  <div className="space-y-2">
                    {regimen.contraindications.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-white p-3 rounded-lg">
                        <span className="text-red-500 mr-3 mt-0.5 font-bold">⚠</span>
                        <span className="text-sm text-red-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Patient Education */}
            {regimen.patientEducation && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  Hướng dẫn cho bệnh nhân
                </h3>
                <div className="space-y-2">
                  {regimen.patientEducation.map((item, idx) => (
                    <div key={idx} className="flex items-start bg-white p-3 rounded-lg">
                      <span className="text-yellow-500 mr-3 mt-0.5">💡</span>
                      <span className="text-sm text-yellow-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Modal Component for Test History
  const TestHistoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <ClockIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lịch sử xét nghiệm</h2>
                  <p className="text-gray-600">Theo dõi tiến triển qua các lần xét nghiệm</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className="text-sm border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">🔍 Tất cả xét nghiệm</option>
                  <option value="Viral Load">🦠 Tải lượng virus HIV</option>
                  <option value="CD4 Count">🛡️ Số lượng CD4</option>
                  <option value="Liver Function">🫀 Chức năng gan</option>
                  <option value="Kidney Function">🫘 Chức năng thận</option>
                </select>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {selectedTest ? (
              /* Detailed Test View */
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <BeakerIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{selectedTest.testName}</h4>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {formatDate(selectedTest.date)}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTestId(null)}
                    className="bg-white hover:bg-gray-50 border-gray-300"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    Quay lại danh sách
                  </Button>
                </div>

                {/* Test Result Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <ChartBarIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900">Kết quả</h5>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`h-4 w-4 rounded-full ${getStatusIndicator(selectedTest.status)}`}></div>
                      <span className="text-2xl font-bold text-gray-900">
                        {selectedTest.result} {selectedTest.unit}
                      </span>
                      {getTrendIcon(selectedTest.trend)}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Phạm vi tham chiếu:</strong><br />
                        {selectedTest.referenceRange}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <InformationCircleIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900">Trạng thái</h5>
                    </div>
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2 ${getStatusColor(selectedTest.status)}`}>
                        {getStatusText(selectedTest.status)}
                      </span>
                    </div>
                    {selectedTest.previousResult && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Kết quả trước:</strong><br />
                          {selectedTest.previousResult} {selectedTest.unit}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Information Sections */}
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <BookOpenIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900">Giải thích kết quả</h5>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{selectedTest.interpretation}</p>
                  </div>

                  {selectedTest.clinicalSignificance && (
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <AcademicCapIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <h5 className="text-lg font-semibold text-gray-900">Ý nghĩa lâm sàng</h5>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{selectedTest.clinicalSignificance}</p>
                    </div>
                  )}

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                        <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900">Thông tin bác sĩ</h5>
                    </div>
                    <p className="text-gray-700">Được xét nghiệm bởi: <strong>{selectedTest.doctorName}</strong></p>
                  </div>
                </div>
              </div>
            ) : (
              /* Test Results List */
              <div>
                {Object.keys(resultsByDate).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(resultsByDate).map(([dateStr, tests]) => (
                      <div key={dateStr} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <CalendarIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {formatDate(new Date(dateStr))}
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tests.map((test) => (
                            <div 
                              key={test.id} 
                              className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all group"
                              onClick={() => setSelectedTestId(test.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`h-3 w-3 rounded-full ${getStatusIndicator(test.status)} shadow-sm`}></div>
                                  <div>
                                    <h5 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {test.testName}
                                    </h5>
                                    <p className="text-xs text-gray-500 mt-1">{test.category}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="text-right">
                                    <span className="text-sm font-bold text-gray-900 block">
                                      {test.result} {test.unit}
                                    </span>
                                    <div className="flex items-center justify-end mt-1">
                                      {getTrendIcon(test.trend)}
                                    </div>
                                  </div>
                                  <EyeIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
                    <div className="p-4 bg-white rounded-full w-20 h-20 mx-auto mb-4 shadow-sm">
                      <BeakerIcon className="h-12 w-12 text-gray-300 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có kết quả xét nghiệm</h3>
                    <p className="text-gray-500">Không tìm thấy kết quả xét nghiệm nào cho danh mục đã chọn.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout currentRole={UserRole.CUSTOMER} userName="Nguyễn Văn An">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tra cứu thông tin xét nghiệm</h1>
              <p className="text-gray-600 mt-1">Lịch sử xét nghiệm cá nhân và thông tin chi tiết về các phác đồ điều trị </p>
            </div>
            <div className="flex space-x-3">
           
              <Button variant="primary" className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Đặt lịch xét nghiệm
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - HIV Indicators Summary */}
          <div className="space-y-6">
            {/* HIV Indicators Summary */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 mr-2 text-primary-600" />
                  Tổng hợp chỉ số HIV
                </h2>
                <p className="text-gray-600 mt-2">Tổng quan về tình trạng sức khỏe và hiệu quả điều trị HIV</p>
              </div>
              <div className="p-6">
                {/* Overall Status */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-full mr-4">
                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-900">Tình trạng tổng thể: Xuất sắc</h3>
                        <p className="text-green-700">Điều trị HIV hiệu quả, hệ miễn dịch mạnh</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{hivSummary.treatmentEffectiveness}%</div>
                      <div className="text-sm text-green-700">Hiệu quả điều trị</div>
                    </div>
                  </div>
                </div>

                {/* Key Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Viral Load Indicator */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <BeakerIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">Tải lượng virus</h4>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {hivSummary.viralLoad?.result} {hivSummary.viralLoad?.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Không phát hiện</span>
                      <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">U=U: Không lây truyền</p>
                  </div>

                  {/* CD4 Count Indicator */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">CD4 Count</h4>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {hivSummary.cd4Count?.result} {hivSummary.cd4Count?.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Hệ miễn dịch mạnh</span>
                      <ArrowUpIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Tăng {hivSummary.cd4Count?.result - hivSummary.cd4Count?.previousResult || 70} so với lần trước</p>
                  </div>

                  {/* Liver Function Indicator */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg mr-3">
                          <HeartIcon className="h-5 w-5 text-orange-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">Chức năng gan</h4>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {hivSummary.liverFunction?.result} {hivSummary.liverFunction?.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Bình thường</span>
                      <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Thuốc ARV an toàn</p>
                  </div>

                  {/* Kidney Function Indicator */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-teal-100 rounded-lg mr-3">
                          <svg className="h-5 w-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900">Chức năng thận</h4>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {hivSummary.kidneyFunction?.result} {hivSummary.kidneyFunction?.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Bình thường</span>
                      <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Không ảnh hưởng</p>
                  </div>
                </div>

                {/* Treatment Progress */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Tiến triển điều trị
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">18 tháng</div>
                      <div className="text-sm text-gray-600">Thời gian điều trị</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                      <div className="text-sm text-gray-600">Tuân thủ điều trị</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">9/9</div>
                      <div className="text-sm text-gray-600">Lần xét nghiệm tốt</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    variant="primary" 
                    className="flex-1 flex items-center justify-center"
                    onClick={() => setShowTestHistoryModal(true)}
                  >
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Xem lịch sử xét nghiệm
                  </Button>
                  {/* <Button variant="outline" className="flex items-center">
                    <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                    Báo cáo chi tiết
                  </Button> */}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Treatment Regimens */}
          <div className="space-y-6">
            {/* Doctor Prescribed Treatment */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <CpuChipIcon className="h-6 w-6 mr-2 text-primary-600" />
                  Phác đồ điều trị của bệnh nhân do bác sĩ chỉ định
                </h2>
                <p className="text-gray-600 mt-2">BS. Nguyễn Thị Lan đã chỉ định phác đồ điều trị phù hợp với tình trạng sức khỏe hiện tại của bạn</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {arvRegimens
                    .filter(regimen => regimen.forConditions?.includes(2)) // HIV được kiểm soát tốt
                    .map((regimen) => (
                      <div key={regimen.id} className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
                        <div
                          className="w-full text-left p-4 rounded-lg transition-all hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedRegimen(regimen);
                            setShowRegimenModal(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CpuChipIcon className="h-5 w-5 text-primary-600 mr-3" />
                              <div>
                                <h4 className="font-semibold text-gray-900">{regimen.name}</h4>
                                <p className="text-sm text-gray-600">{regimen.category}</p>
                                <p className="text-xs text-gray-500 mt-1">{regimen.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {regimen.id === 1 && (
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Đang dùng
                                </span>
                              )}
                              <EyeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <RegimenModal 
          regimen={selectedRegimen} 
          isOpen={showRegimenModal} 
          onClose={() => {
            setShowRegimenModal(false);
            setSelectedRegimen(null);
          }} 
        />
        
        <TestHistoryModal 
          isOpen={showTestHistoryModal} 
          onClose={() => {
            setShowTestHistoryModal(false);
            setSelectedTestId(null);
          }} 
        />
      </div>
    </Layout>
  );
};

export default TestResultsPage; 