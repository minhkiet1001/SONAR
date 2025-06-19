# Tính năng Quản lý Lịch hẹn Thông minh cho Bác sĩ

## Tổng quan
Hệ thống quản lý lịch hẹn thông minh được thiết kế để hỗ trợ bác sĩ trong việc theo dõi và đặt lịch tái khám cho bệnh nhân HIV một cách hiệu quả và khoa học, với khả năng đồng bộ dữ liệu tự động giữa các hệ thống.

## Các tính năng chính

### 1. Trợ lý Đặt lịch Thông minh (SmartSchedulingAssistant)

#### Đề xuất lịch hẹn tự động
- **Phân tích kết quả xét nghiệm**: Tự động phát hiện các chỉ số bất thường cần can thiệp
  - Tải lượng virus cao (>50 copies/mL) → Đề xuất hẹn khẩn cấp trong 2 ngày
  - CD4 thấp (<200 cells/μL) → Đề xuất hẹn khẩn cấp trong 1 ngày
  - Chức năng gan/thận bất thường → Đề xuất theo dõi trong 5 ngày

- **Theo dõi bệnh nhân mới**: 
  - Bệnh nhân mới điều trị cần tái khám sau 14 ngày
  - Đánh giá đáp ứng điều trị và tác dụng phụ

- **Giám sát thuốc**: 
  - Theo dõi tác dụng phụ của các thuốc như Biktarvy
  - Đề xuất kiểm tra định kỳ sau 90 ngày

#### Phân loại mức độ ưu tiên
- **Khẩn cấp (Critical)**: CD4 <200, nguy cơ nhiễm trùng cơ hội
- **Cao (High)**: Tải lượng virus cao, cần điều chỉnh phác đồ
- **Trung bình (Medium)**: Theo dõi định kỳ, bệnh nhân mới
- **Thấp (Low)**: Tái khám thường quy

#### Thông tin chi tiết (Insights)
- Phân tích tỷ lệ không đến khám
- Đánh giá phân bố nguy cơ bệnh nhân
- Cảnh báo tuân thủ điều trị thấp
- Quản lý khối lượng công việc

### 2. Hoàn thành Lịch hẹn với Lựa chọn Có sẵn

#### Chẩn đoán có sẵn
Hệ thống cung cấp danh sách chẩn đoán HIV phổ biến:
- HIV nhiễm trùng không triệu chứng
- HIV nhiễm trùng có triệu chứng
- AIDS với nhiễm trùng cơ hội
- HIV với bệnh lý thần kinh/da
- HIV ổn định với điều trị ARV
- HIV kháng thuốc
- HIV với đồng nhiễm viêm gan B/C
- HIV với lao phổi
- Theo dõi sau điều trị HIV
- Điều chỉnh phác đồ điều trị HIV

#### Đơn thuốc có sẵn
**Thuốc HIV được tích hợp sẵn:**
- **Biktarvy** (Bictegravir/Tenofovir alafenamide/Emtricitabine)
- **Descovy** (Tenofovir alafenamide/Emtricitabine)
- **Isentress** (Raltegravir)
- **Truvada** (Tenofovir disoproxil/Emtricitabine)
- **Kaletra** (Lopinavir/Ritonavir)

**Tính năng thông minh:**
- Tự động điền liều lượng, tần suất khi chọn thuốc
- Hướng dẫn sử dụng có sẵn
- Thời gian điều trị tùy chỉnh
- Thêm/xóa thuốc dễ dàng

#### Phương pháp điều trị có sẵn
- Tiếp tục phác đồ điều trị hiện tại
- Điều chỉnh liều thuốc
- Thay đổi phác đồ điều trị
- Tạm ngừng điều trị do tác dụng phụ
- Bổ sung thuốc hỗ trợ
- Theo dõi tác dụng phụ
- Tư vấn tuân thủ điều trị
- Điều trị nhiễm trùng cơ hội
- Hỗ trợ dinh dưỡng
- Tư vấn tâm lý
- Xét nghiệm theo dõi
- Chuyển tuyến chuyên khoa

### 3. Hệ thống Đồng bộ Dữ liệu Tự động

#### Đồng bộ đa hệ thống
Khi bác sĩ hoàn thành lịch hẹn, hệ thống tự động:

**1. Cập nhật hồ sơ bệnh nhân:**
- Lịch sử khám bệnh
- Chẩn đoán mới nhất
- Đơn thuốc hiện tại
- Ngày khám cuối và hẹn tiếp theo

**2. Thông báo hệ thống nhân viên:**
- Trạng thái lịch hẹn đã hoàn thành
- Thông tin chẩn đoán và điều trị
- Lịch tái khám (nếu có)
- Cập nhật thống kê

**3. Tạo lịch tái khám tự động:**
- Tính toán mức độ ưu tiên dựa trên chẩn đoán
- Đặt lịch theo ngày chỉ định của bác sĩ
- Thông báo cho bệnh nhân và nhân viên

**4. Gửi thông báo:**
- Kết quả khám cho bệnh nhân
- Đơn thuốc mới (nếu có)
- Lịch tái khám (nếu có)
- Cập nhật cho nhân viên

#### Trạng thái đồng bộ
- **Đang đồng bộ**: Hiển thị spinner và thông báo
- **Thành công**: Hiển thị danh sách các hệ thống đã cập nhật
- **Lỗi**: Hiển thị thông báo lỗi và nút thử lại

### 4. Giao diện Người dùng Cải tiến

#### Form hoàn thành lịch hẹn
- **Chẩn đoán**: Dropdown + textarea tùy chỉnh
- **Đơn thuốc**: Thêm/xóa thuốc với dropdown thông minh
- **Điều trị**: Checkbox đa lựa chọn + textarea bổ sung
- **Ghi chú**: Textarea cho bác sĩ tự do ghi chú
- **Tái khám**: Checkbox + date picker với validation

#### Trạng thái loading và feedback
- Loading spinner khi đang xử lý
- Thông báo tiến trình đồng bộ
- Danh sách chi tiết các hệ thống đã cập nhật
- Thông báo thành công với auto-close

### 5. Tính năng Tái khám Thông minh

#### Tự động tạo lịch tái khám
Khi bác sĩ chỉ định tái khám:
1. Hệ thống tự động tạo lịch hẹn mới
2. Tính toán mức độ ưu tiên dựa trên:
   - Chẩn đoán (AIDS, kháng thuốc → cao)
   - Phương pháp điều trị (thay đổi phác đồ → cao)
   - Tình trạng bệnh nhân
3. Đồng bộ với tất cả hệ thống
4. Gửi thông báo cho bệnh nhân và nhân viên

#### Theo dõi liên tục
- Liên kết các cuộc hẹn với nhau
- Theo dõi tiến trình điều trị
- Cảnh báo khi cần can thiệp

## Luồng công việc mới

### 1. Bác sĩ hoàn thành khám bệnh
- Chọn chẩn đoán từ danh sách có sẵn hoặc nhập tùy chỉnh
- Kê đơn thuốc với dropdown thông minh
- Chọn phương pháp điều trị
- Ghi chú bổ sung
- Chỉ định tái khám (nếu cần)

### 2. Hệ thống xử lý và đồng bộ
- Hiển thị trạng thái "Đang xử lý..."
- Đồng bộ với hệ thống bệnh nhân
- Cập nhật hệ thống nhân viên
- Tạo lịch tái khám (nếu có)
- Gửi thông báo

### 3. Xác nhận hoàn thành
- Hiển thị danh sách hệ thống đã cập nhật
- Thông báo thành công
- Tự động đóng modal sau 2 giây

### 4. Bệnh nhân và nhân viên nhận thông báo
- Bệnh nhân: Kết quả khám, đơn thuốc, lịch tái khám
- Nhân viên: Cập nhật trạng thái, lịch mới được tạo

## Lợi ích nâng cao

### Cho Bác sĩ
- **Tiết kiệm thời gian**: Chọn nhanh từ danh sách có sẵn
- **Giảm sai sót**: Dropdown với validation tự động
- **Đồng bộ tự động**: Không cần thao tác thủ công
- **Feedback rõ ràng**: Biết chính xác trạng thái xử lý

### Cho Bệnh nhân
- **Thông tin kịp thời**: Nhận thông báo ngay sau khám
- **Lịch tái khám tự động**: Không lo quên hẹn
- **Đơn thuốc rõ ràng**: Thông tin chi tiết về thuốc
- **Theo dõi liên tục**: Hệ thống nhắc nhở

### Cho Nhân viên
- **Cập nhật tự động**: Không cần nhập lại dữ liệu
- **Thống kê real-time**: Số liệu cập nhật ngay
- **Quản lý lịch hẹn**: Lịch mới được tạo tự động
- **Giảm tải công việc**: Ít thao tác thủ công

### Cho Hệ thống Y tế
- **Tính nhất quán**: Dữ liệu đồng bộ giữa các hệ thống
- **Giảm lỗi**: Validation và kiểm tra tự động
- **Hiệu quả cao**: Quy trình tự động hóa
- **Theo dõi chất lượng**: Dữ liệu đầy đủ và chính xác

## Công nghệ sử dụng

- **React**: Giao diện người dùng với hooks
- **Tailwind CSS**: Styling responsive và animations
- **Heroicons**: Icon set với loading states
- **JavaScript ES6+**: Logic xử lý và async/await
- **Service Architecture**: Tách biệt logic đồng bộ
- **Mock Data**: Dữ liệu mẫu realistic cho demo

## Cấu trúc File mới

```
src/
├── components/
│   ├── doctor/
│   │   ├── SmartSchedulingAssistant.jsx    # Trợ lý đặt lịch thông minh
│   │   └── AppointmentDetailModal.jsx      # Modal chi tiết với selections
│   └── common/
│       └── AppointmentSyncIndicator.jsx    # Hiển thị trạng thái đồng bộ
├── services/
│   └── appointmentSyncService.js           # Service đồng bộ dữ liệu
├── pages/
│   └── doctor/
│       └── AppointmentsPage.jsx            # Trang quản lý lịch hẹn
└── types/
    └── index.js                            # Định nghĩa types
```

## Tương lai phát triển

### Tích hợp AI/ML
- Đề xuất chẩn đoán dựa trên triệu chứng
- Tối ưu hóa phác đồ điều trị
- Dự đoán tuân thủ điều trị

### Tích hợp hệ thống thực tế
- API endpoints cho các hệ thống HIS/EMR
- Webhook notifications
- Real-time sync với database

### Mở rộng tính năng
- Voice-to-text cho ghi chú
- Barcode scanning cho thuốc
- Telemedicine integration
- Mobile app cho bệnh nhân

### Báo cáo và Phân tích
- Dashboard analytics cho quản lý
- Báo cáo hiệu quả điều trị
- Tracking outcomes dài hạn 