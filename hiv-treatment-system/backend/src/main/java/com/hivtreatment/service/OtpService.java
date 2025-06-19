package com.hivtreatment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // 6-digit OTP
        return String.valueOf(otp);
    }

    public void sendOtp(String email, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Mã xác thực đăng ký tài khoản - HIV Treatment System");
            message.setText("Mã xác thực của bạn là: " + otp + "\n\n" +
                    "Mã này có hiệu lực trong 5 phút.\n" +
                    "Vui lòng không chia sẻ mã này với bất kỳ ai.\n\n" +
                    "Trân trọng,\n" +
                    "HIV Treatment System");
            
            mailSender.send(message);
            
            // Store OTP with expiration (5 minutes)
            otpStorage.put(email, otp);
            scheduler.schedule(() -> otpStorage.remove(email), 5, TimeUnit.MINUTES);
            
        } catch (Exception e) {
            throw new RuntimeException("Không thể gửi email OTP: " + e.getMessage());
        }
    }

    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // Remove OTP after successful verification
            return true;
        }
        return false;
    }

    public void removeOtp(String email) {
        otpStorage.remove(email);
    }
} 