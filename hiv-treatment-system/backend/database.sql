CREATE TABLE [User] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role NVARCHAR(50) DEFAULT 'CUSTOMER', -- Guest, Customer, Staff, Manager, Admin
    anonymous BIT DEFAULT 0,
    phone VARCHAR(20) NOT NULL,
    birthdate DATE,
    address NVARCHAR(255),
    gender NVARCHAR(10) NOT NULL -- MALE, FEMALE, OTHER
);

CREATE TABLE Article (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255),
    content TEXT,
    author_id INT FOREIGN KEY REFERENCES [User](id),
    created_at DATETIME,
    category VARCHAR(100)
);

CREATE TABLE Doctor (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES [User](id),
    specialty VARCHAR(100),
    degree VARCHAR(100)
);

CREATE TABLE Appointment (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES [User](id),
    doctor_id INT FOREIGN KEY REFERENCES Doctor(id),
    scheduled_at DATETIME,
    status VARCHAR(50)
);

CREATE TABLE TreatmentPlan (
    id INT IDENTITY(1,1) PRIMARY KEY,
    appointment_id INT FOREIGN KEY REFERENCES Appointment(id),
    regimen_name VARCHAR(100),
    description TEXT
);

CREATE TABLE Drug (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100),
    treatmentplan_id INT FOREIGN KEY REFERENCES TreatmentPlan(id),
    dosage VARCHAR(50)
);

CREATE TABLE LabResult (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES [User](id),
    test_type VARCHAR(50),
    result VARCHAR(100),
    test_date DATE
);

CREATE TABLE Reminder (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES [User](id),
    appointment_id INT FOREIGN KEY REFERENCES Appointment(id),
    reminder_date DATETIME,
    message TEXT
);

CREATE TABLE Schedule (
    id INT IDENTITY(1,1) PRIMARY KEY,
    doctor_id INT FOREIGN KEY REFERENCES Doctor(id),
    service VARCHAR(100),
    day_of_week VARCHAR(20),
    start_time TIME,
    end_time TIME
);

CREATE TABLE Report (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES [User](id),
    generated_at DATETIME,
    report_month VARCHAR(7), -- 'YYYY-MM'
    total_patients INT,
    new_patients INT,
    total_appointments INT,
    summary TEXT
);

CREATE TABLE Conversation (
    id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NULL FOREIGN KEY REFERENCES [User](id),
    staff_id INT NOT NULL FOREIGN KEY REFERENCES [User](id),
    is_anonymous BIT,
    created_at DATETIME
);

CREATE TABLE Message (
    id INT IDENTITY(1,1) PRIMARY KEY,
    conversation_id INT FOREIGN KEY REFERENCES Conversation(id),
    sender_id INT FOREIGN KEY REFERENCES [User](id),
    message_text TEXT,
    sent_at DATETIME
);