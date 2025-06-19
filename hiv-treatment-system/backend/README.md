# HIV Treatment System Backend

Backend API cho hệ thống quản lý điều trị HIV được xây dựng với Spring Boot, Java 21, và SQL Server.

## Công nghệ sử dụng

- **Java 21**
- **Spring Boot 3.2.0**
- **Spring Security** với JWT Authentication
- **Spring Data JPA** với Hibernate
- **SQL Server** Database
- **Maven** Build Tool

## Cấu hình Database

1. Cài đặt SQL Server và tạo database:
```sql
CREATE DATABASE HIVTreatmentDB;
```

2. Cập nhật thông tin database trong `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=HIVTreatmentDB;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=your_password
```

## Chạy ứng dụng

1. Clone repository và navigate đến thư mục backend
2. Chạy lệnh Maven:
```bash
mvn clean install
mvn spring-boot:run
```

3. Server sẽ chạy tại: `http://localhost:8080`

## API Endpoints

### Authentication Endpoints

#### 1. Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER",
  "phone": "0123456789",
  "address": "123 Main St"
}
```

#### 2. Login User
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Test Auth
- **GET** `/api/auth/test`

### Protected Test Endpoints

#### 1. Public Endpoint
- **GET** `/api/test/public`

#### 2. User Info (Requires Authentication)
- **GET** `/api/test/user`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### 3. Admin Only
- **GET** `/api/test/admin`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Requires:** ADMIN role

#### 4. Doctor Only
- **GET** `/api/test/doctor`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Requires:** DOCTOR role

#### 5. Staff Access
- **GET** `/api/test/staff`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Requires:** STAFF, MANAGER, or ADMIN role

## User Roles

- **GUEST**: Khách vãng lai
- **CUSTOMER**: Khách hàng/Bệnh nhân
- **STAFF**: Nhân viên
- **DOCTOR**: Bác sĩ
- **MANAGER**: Quản lý
- **ADMIN**: Quản trị viên

## JWT Configuration

- **Secret Key**: Được cấu hình trong `application.properties`
- **Expiration**: 24 giờ (86400000 ms)
- **Header Format**: `Authorization: Bearer <token>`

## CORS Configuration

- Cho phép origins: `http://localhost:3000`, `http://localhost:5173`
- Hỗ trợ các method: GET, POST, PUT, DELETE, OPTIONS
- Cho phép tất cả headers

## Database Schema

Ứng dụng sử dụng Hibernate để tự động tạo/cập nhật database schema dựa trên các Entity classes.

## Testing với Postman/curl

### 1. Register một user mới:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

### 2. Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Access protected endpoint:
```bash
curl -X GET http://localhost:8080/api/test/user \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Lưu ý

1. Đảm bảo SQL Server đang chạy và có thể kết nối
2. Cập nhật thông tin database connection trong `application.properties`
3. JWT secret key nên được thay đổi trong môi trường production
4. Các endpoint được bảo vệ cần JWT token trong header Authorization 