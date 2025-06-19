package com.hivtreatment.service;

import com.hivtreatment.dto.AuthResponse;
import com.hivtreatment.dto.LoginRequest;
import com.hivtreatment.dto.RegisterRequest;
import com.hivtreatment.entity.User;
import com.hivtreatment.repository.UserRepository;
import com.hivtreatment.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OtpService otpService;

    @Autowired
    private ValidationService validationService;

    public String sendOtpForRegistration(String email) {
        // Validate email uniqueness (handles test emails in dev mode automatically)
        validationService.validateEmailUnique(email);
        
        String otp = otpService.generateOtp();
        otpService.sendOtp(email, otp);
        return "OTP đã được gửi đến email của bạn";
    }

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtUtil.generateToken(user);

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        // Verify OTP first
        if (!otpService.verifyOtp(registerRequest.getEmail(), registerRequest.getOtp())) {
            throw new RuntimeException("Mã OTP không đúng hoặc đã hết hạn");
        }

        // Validate email and phone uniqueness (handles test data in dev mode automatically)
        validationService.validateUserUnique(registerRequest.getEmail(), registerRequest.getPhone());

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole()); // Mặc định là CUSTOMER
        user.setPhone(registerRequest.getPhone());
        user.setGender(registerRequest.getGender());
        user.setBirthdate(registerRequest.getBirthdate());
        user.setAddress(registerRequest.getAddress());
        user.setAnonymous(false);

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser);

        return new AuthResponse(token, savedUser.getId(), savedUser.getName(), 
                               savedUser.getEmail(), savedUser.getRole());
    }
} 