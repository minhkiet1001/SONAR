# Hướng dẫn Demo - Tính năng Lịch hẹn Thông minh

## Tổng quan Demo
Demo này minh họa quy trình hoàn chỉnh từ khi bác sĩ khám bệnh đến khi dữ liệu được đồng bộ với hệ thống bệnh nhân và nhân viên.

## Chuẩn bị Demo

### 1. Đăng nhập với role Bác sĩ
- Truy cập ứng dụng
- Chọn role "Doctor" 
- Điều hướng đến `/doctor/appointments`

### 2. Dữ liệu mẫu có sẵn
- **4 bệnh nhân** với các tình trạng khác nhau
- **5 lịch hẹn** bao gồm đã hoàn thành và đang chờ
- **Kết quả xét nghiệm** với các chỉ số bất thường
- **Phác đồ điều trị** đang hoạt động

## Kịch bản Demo

### Phần 1: Trợ lý Đặt lịch Thông minh

#### Bước 1: Xem đề xuất thông minh
```
✅ Quan sát: SmartSchedulingAssistant hiển thị các đề xuất
- Trần Thị Bình: Tải lượng virus cao (Ưu tiên: Cao)
- Lê Văn Cường: Bệnh nhân mới cần theo dõi (Ưu tiên: TB)
- Phạm Thị Dung: CD4 rất thấp (Ưu tiên: Khẩn cấp)
```

#### Bước 2: Đặt lịch từ đề xuất
```
1. Click "Đặt lịch" cho bệnh nhân ưu tiên cao
2. Form tự động điền thông tin bệnh nhân
3. Điều chỉnh thời gian nếu cần
4. Lưu lịch hẹn
```

### Phần 2: Hoàn thành Lịch hẹn với Lựa chọn Có sẵn

#### Bước 1: Mở lịch hẹn đã lên lịch
```
1. Tìm lịch hẹn có status "Đã lên lịch"
2. Click nút "Xem chi tiết" (👁️)
3. Click "Hoàn thành" trong modal
```

#### Bước 2: Chọn chẩn đoán
```
✅ Demo: Dropdown chẩn đoán có sẵn
- Chọn "HIV ổn định với điều trị ARV"
- Hoặc nhập chẩn đoán tùy chỉnh
- Lưu ý: Chỉ được chọn một trong hai
```

#### Bước 3: Kê đơn thuốc thông minh
```
✅ Demo: Thêm thuốc với dropdown
1. Click "Thêm thuốc"
2. Chọn "Biktarvy" từ dropdown
3. Quan sát: Liều lượng, tần suất tự động điền
4. Chọn hướng dẫn sử dụng từ dropdown
5. Nhập thời gian điều trị: "6 tháng"
6. Thêm thuốc thứ 2 nếu cần
```

#### Bước 4: Chọn phương pháp điều trị
```
✅ Demo: Checkbox đa lựa chọn
- Tick "Tiếp tục phác đồ điều trị hiện tại"
- Tick "Theo dõi tác dụng phụ"
- Quan sát: Tags hiển thị phương pháp đã chọn
- Nhập điều trị bổ sung nếu cần
```

#### Bước 5: Ghi chú và tái khám
```
✅ Demo: Ghi chú tự do và lịch tái khám
- Nhập ghi chú: "Bệnh nhân tuân thủ tốt, tiếp tục theo dõi"
- Tick "Cần tái khám"
- Chọn ngày tái khám: 3 tháng sau
- Quan sát: Thông báo về tự động tạo lịch
```

### Phần 3: Đồng bộ Dữ liệu Tự động

#### Bước 1: Xử lý và đồng bộ
```
✅ Demo: Trạng thái loading và sync
1. Click "Lưu kết quả & Đồng bộ hệ thống"
2. Quan sát: Spinner "Đang xử lý..."
3. Quan sát: Thông báo "Đang đồng bộ dữ liệu..."
4. Xem console log cho chi tiết sync
```

#### Bước 2: Kết quả đồng bộ
```
✅ Demo: Thông báo thành công
- Hiển thị checkmark xanh
- Danh sách hệ thống đã cập nhật:
  ✓ Hồ sơ bệnh nhân đã được cập nhật
  ✓ Hệ thống nhân viên đã được thông báo
  ✓ Lịch tái khám đã được tạo tự động
  ✓ Đơn thuốc đã được ghi nhận
  ✓ Thông báo đã được gửi cho bệnh nhân
```

#### Bước 3: Tự động đóng và cập nhật
```
✅ Demo: Auto-close và refresh
- Modal tự động đóng sau 2 giây
- Danh sách lịch hẹn cập nhật status
- Lịch tái khám mới xuất hiện trong danh sách
```

### Phần 4: Kiểm tra Kết quả

#### Bước 1: Xem lịch hẹn đã hoàn thành
```
✅ Kiểm tra: Thông tin đã lưu
- Status: "Hoàn thành" (màu xanh)
- Hiển thị chẩn đoán
- Hiển thị danh sách thuốc
- Hiển thị phương pháp điều trị
- Thời gian hoàn thành
```

#### Bước 2: Xem lịch tái khám tự động
```
✅ Kiểm tra: Lịch mới được tạo
- Loại: "Tái khám"
- Ngày: Theo chỉ định bác sĩ
- Lý do: "Tái khám theo chỉ định bác sĩ"
- Ghi chú: Liên kết với cuộc hẹn trước
- Tạo bởi: "Hệ thống"
```

## Điểm nhấn Demo

### 1. Tính năng Thông minh
```
🎯 Nhấn mạnh:
- Đề xuất dựa trên dữ liệu thực tế
- Tự động điền thông tin thuốc
- Tính toán ưu tiên tái khám
- Validation tự động
```

### 2. Trải nghiệm Người dùng
```
🎯 Nhấn mạnh:
- Giao diện trực quan, dễ sử dụng
- Feedback rõ ràng cho mọi thao tác
- Loading states và animations
- Error handling graceful
```

### 3. Tích hợp Hệ thống
```
🎯 Nhấn mạnh:
- Đồng bộ tự động giữa các role
- Thông báo real-time
- Dữ liệu nhất quán
- Audit trail đầy đủ
```

## Kịch bản Lỗi (Optional)

### Demo xử lý lỗi
```
1. Không chọn chẩn đoán → Button disabled
2. Không có thuốc → Vẫn lưu được
3. Lỗi mạng → Hiển thị thông báo lỗi
4. Retry mechanism → Thử lại tự động
```

## Console Logs để Quan sát

### Trong quá trình demo, quan sát console:
```javascript
// Sync process
🔄 Starting appointment sync across systems...
📋 Updating patient records: {...}
👥 Updating staff system: {...}
📅 Creating follow-up appointment: {...}
🔔 Sending notifications: [...]
💊 Updating medication records: {...}
📊 Updating staff statistics: {...}
✅ Appointment sync completed successfully
```

## Câu hỏi Demo

### Cho khách hàng/stakeholders:
1. **"Làm thế nào để bác sĩ biết bệnh nhân nào cần khám gấp?"**
   → Trỏ vào SmartSchedulingAssistant

2. **"Bác sĩ có phải nhập lại thông tin thuốc không?"**
   → Demo dropdown tự động điền

3. **"Bệnh nhân có biết kết quả khám không?"**
   → Giải thích hệ thống thông báo

4. **"Nhân viên có phải tạo lịch tái khám thủ công không?"**
   → Demo tự động tạo lịch

5. **"Dữ liệu có đồng bộ giữa các hệ thống không?"**
   → Demo sync process

## Tips Demo

### Chuẩn bị:
- [ ] Mở browser console để xem logs
- [ ] Chuẩn bị dữ liệu test cases
- [ ] Test trước tất cả flows
- [ ] Chuẩn bị backup plan nếu có lỗi

### Trong demo:
- [ ] Nói chậm, giải thích từng bước
- [ ] Nhấn mạnh benefits cho từng role
- [ ] Sử dụng real-world scenarios
- [ ] Invite questions và feedback

### Sau demo:
- [ ] Tóm tắt key benefits
- [ ] Thảo luận implementation plan
- [ ] Collect feedback và requirements
- [ ] Schedule follow-up meeting 