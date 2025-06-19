# 🚀 Quick Start Guide

## ✅ Backend đã sẵn sàng!

### 🏃‍♂️ Chạy Backend

```bash
cd backend
mvn spring-boot:run
```

### 🌐 Truy cập Test Page

Mở browser và vào: **http://localhost:8080/test.html**

### 🧪 Test API

#### 1. **Register Account**
- Điền form bên trái
- Chọn role (Admin, Doctor, Customer, etc.)
- Click "Register"

#### 2. **Login**
- Điền email/password bên phải
- Hoặc click "Quick Test Accounts" để auto-fill
- Click "Login"

#### 3. **Test Protected Endpoints**
- Sau khi login, JWT token sẽ hiển thị
- Click các button test để kiểm tra authorization

### 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Đăng ký user mới |
| `/api/auth/login` | POST | Đăng nhập |
| `/api/test/public` | GET | Public endpoint |
| `/api/test/user` | GET | User info (cần auth) |
| `/api/test/admin` | GET | Admin only |
| `/api/test/doctor` | GET | Doctor only |
| `/api/test/staff` | GET | Staff/Manager/Admin |

### 🔧 Database

- **H2 In-Memory Database** (cho testing)
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (để trống)

### ✅ Test Results

```
✅ Backend running on port 8080
✅ API endpoints working
✅ JWT authentication working
✅ Role-based authorization working
✅ CORS configured for frontend
✅ Test page accessible
```

### 🎯 Next Steps

1. **Frontend Integration**: Sử dụng API endpoints này trong React app
2. **SQL Server**: Thay đổi config trong `application.properties` để dùng SQL Server
3. **Additional Features**: Thêm các entity khác (Article, Appointment, etc.)

### 🐛 Troubleshooting

**Network Error trên trang test:**
- Đảm bảo backend đang chạy: `netstat -an | findstr :8080`
- Kiểm tra browser console (F12) để xem lỗi chi tiết
- Thử refresh trang hoặc clear browser cache

**Database Connection Error:**
- Hiện tại dùng H2 in-memory, không cần setup gì
- Để dùng SQL Server, cập nhật `application.properties`

### 🎉 Success!

Backend HIV Treatment System đã sẵn sàng cho frontend integration! 