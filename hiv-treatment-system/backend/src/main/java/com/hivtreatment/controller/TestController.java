package com.hivtreatment.controller;

import com.hivtreatment.entity.User;
import com.hivtreatment.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TestController {

    @Autowired
    private ValidationService validationService;

    @GetMapping("/public")
    public ResponseEntity<?> publicEndpoint() {
        return ResponseEntity.ok(new MessageResponse("This is a public endpoint!"));
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('STAFF') or hasRole('DOCTOR') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> userAccess() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(new UserInfoResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().toString()
        ));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminAccess() {
        return ResponseEntity.ok(new MessageResponse("Admin Content!"));
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<?> doctorAccess() {
        return ResponseEntity.ok(new MessageResponse("Doctor Content!"));
    }

    @GetMapping("/staff")
    @PreAuthorize("hasRole('STAFF') or hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> staffAccess() {
        return ResponseEntity.ok(new MessageResponse("Staff Content!"));
    }

    @PostMapping("/validate-email")
    public ResponseEntity<Map<String, Object>> validateEmail(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            validationService.validateEmailUnique(email);
            response.put("success", true);
            response.put("message", "Email có thể sử dụng");
            response.put("isTestEmail", validationService.isTestEmail(email));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            response.put("isTestEmail", validationService.isTestEmail(email));
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/validate-phone")
    public ResponseEntity<Map<String, Object>> validatePhone(@RequestParam String phone) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            validationService.validatePhoneUnique(phone);
            response.put("success", true);
            response.put("message", "Số điện thoại có thể sử dụng");
            response.put("isTestPhone", validationService.isTestPhone(phone));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            response.put("isTestPhone", validationService.isTestPhone(phone));
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/validate-user")
    public ResponseEntity<Map<String, Object>> validateUser(
            @RequestParam String email, 
            @RequestParam String phone) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            validationService.validateUserUnique(email, phone);
            response.put("success", true);
            response.put("message", "Email và số điện thoại có thể sử dụng");
            response.put("isTestEmail", validationService.isTestEmail(email));
            response.put("isTestPhone", validationService.isTestPhone(phone));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            response.put("isTestEmail", validationService.isTestEmail(email));
            response.put("isTestPhone", validationService.isTestPhone(phone));
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Response classes
    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class UserInfoResponse {
        private Integer id;
        private String name;
        private String email;
        private String role;

        public UserInfoResponse(Integer id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        // Getters and Setters
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
} 