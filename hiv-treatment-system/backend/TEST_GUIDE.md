# 🧪 Backend Test Guide

## Hướng dẫn sử dụng trang test backend

### 🚀 Khởi động Backend

1. **Chạy backend server:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Truy cập trang test:**
   - Mở browser và vào: `http://localhost:8080`
   - Hoặc trực tiếp: `http://localhost:8080/test.html`

### 📝 Chức năng Register

1. **Điền form Register:**
   - **Full Name**: Tên đầy đủ của user
   - **Email**: Email duy nhất (sẽ dùng để login)
   - **Password**: Mật khẩu (tối thiểu 6 ký tự)
   - **Role**: Chọn vai trò (Customer, Staff, Doctor, Manager, Admin)
   - **Phone**: Số điện thoại (tùy chọn)
   - **Address**: Địa chỉ (tùy chọn)

2. **Click "Register"** để tạo tài khoản mới

3. **Kết quả:**
   - Thành công: Hiển thị thông tin user và JWT token
   - Thất bại: Hiển thị lỗi (email đã tồn tại, validation error, etc.)

### 🔐 Chức năng Login

1. **Điền form Login:**
   - **Email**: Email đã đăng ký
   - **Password**: Mật khẩu tương ứng

2. **Click "Login"** để đăng nhập

3. **Quick Test Accounts:**
   - Click các button để tự động điền thông tin test:
     - **Admin Account**: admin@test.com / password123
     - **Doctor Account**: doctor@test.com / password123  
     - **Customer Account**: customer@test.com / password123
   - ⚠️ **Lưu ý**: Cần register các account này trước khi login

### 🧪 Test API Endpoints

Sau khi login thành công, JWT token sẽ được hiển thị và các button test sẽ được kích hoạt:

#### 1. **Test Public Endpoint**
- Không cần authentication
- Test endpoint: `GET /api/test/public`
- Luôn hoạt động

#### 2. **Test User Info** 
- Cần JWT token
- Test endpoint: `GET /api/test/user`
- Hiển thị thông tin user hiện tại

#### 3. **Test Admin Only**
- Cần JWT token + ADMIN role
- Test endpoint: `GET /api/test/admin`
- Chỉ ADMIN mới truy cập được

#### 4. **Test Doctor Only**
- Cần JWT token + DOCTOR role  
- Test endpoint: `GET /api/test/doctor`
- Chỉ DOCTOR mới truy cập được

#### 5. **Test Staff Access**
- Cần JWT token + (STAFF hoặc MANAGER hoặc ADMIN) role
- Test endpoint: `GET /api/test/staff`
- STAFF, MANAGER, ADMIN đều truy cập được

### 📊 Đọc kết quả

**Response Box** sẽ hiển thị:
- ✅ **Thành công**: Màu xanh, hiển thị JSON response
- ❌ **Lỗi**: Màu đỏ, hiển thị error message
- ℹ️ **Thông tin**: Màu xanh dương, hiển thị trạng thái

**JWT Token Section** sẽ hiển thị:
- Token đầy đủ để copy/paste vào Postman
- Token tự động được sử dụng cho các test endpoint

### 🔧 Troubleshooting

#### 1. **Network Error**
```
❌ Network Error!
Failed to fetch
```
**Giải pháp:**
- Kiểm tra backend server có đang chạy không
- Kiểm tra URL: `http://localhost:8080`
- Kiểm tra CORS configuration

#### 2. **Registration Failed - Email already taken**
```
❌ Registration Failed!
{"message": "Error: Email is already taken!"}
```
**Giải pháp:**
- Sử dụng email khác
- Hoặc login với email đã tồn tại

#### 3. **Login Failed - Invalid credentials**
```
❌ Login Failed!
{"message": "Error: Invalid email or password!"}
```
**Giải pháp:**
- Kiểm tra email/password
- Đảm bảo đã register account trước

#### 4. **Access Denied - Insufficient role**
```
❌ Admin Endpoint Error (403)
{"timestamp": "...", "status": 403, "error": "Forbidden"}
```
**Giải pháp:**
- Đăng nhập với account có role phù hợp
- Admin endpoint cần ADMIN role
- Doctor endpoint cần DOCTOR role

### 📋 Test Scenarios

#### **Scenario 1: Test Complete Flow**
1. Register account với role ADMIN
2. Login với account vừa tạo
3. Test tất cả endpoints → Tất cả should work

#### **Scenario 2: Test Role-based Access**
1. Register account với role CUSTOMER
2. Login với account này
3. Test User Info → ✅ Should work
4. Test Admin Only → ❌ Should fail (403)
5. Test Doctor Only → ❌ Should fail (403)

#### **Scenario 3: Test Without Authentication**
1. Không login
2. Test User Info → ❌ Should show "Please login first"
3. Test Public Endpoint → ✅ Should work

### 🎯 Expected Results

| Endpoint | Guest | Customer | Staff | Doctor | Manager | Admin |
|----------|-------|----------|-------|---------|---------|-------|
| Public | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| User Info | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin Only | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Doctor Only | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Staff Access | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |

### 🔍 Debug Tips

1. **Mở Developer Tools (F12)** để xem:
   - Network requests
   - Console errors
   - Response details

2. **Check Backend Logs** để xem:
   - Authentication errors
   - Authorization failures
   - Database connection issues

3. **Verify Database** để đảm bảo:
   - User được tạo thành công
   - Role được set đúng
   - Password được hash

### 🎉 Success Indicators

✅ **Backend hoạt động tốt khi:**
- Register tạo user mới thành công
- Login trả về JWT token
- Protected endpoints respect role-based access
- Public endpoints accessible without auth
- Error handling hoạt động đúng

Trang test này giúp verify tất cả chức năng authentication và authorization của backend trước khi integrate với frontend React! 