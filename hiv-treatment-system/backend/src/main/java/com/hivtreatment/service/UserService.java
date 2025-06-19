package com.hivtreatment.service;

import com.hivtreatment.dto.UpdateProfileRequest;
import com.hivtreatment.dto.UserProfileDTO;
import com.hivtreatment.entity.User;
import com.hivtreatment.exception.ResourceNotFoundException;
import com.hivtreatment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ValidationService validationService;

    /**
     * Lấy thông tin profile của user theo email
     */
    public UserProfileDTO getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với email: " + email));
        
        return convertToProfileDTO(user);
    }

    /**
     * Lấy thông tin profile của user theo ID
     */
    public UserProfileDTO getUserProfileById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId));
        
        return convertToProfileDTO(user);
    }

    /**
     * Cập nhật thông tin profile của user
     */
    @Transactional
    public UserProfileDTO updateUserProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với email: " + email));

        // Validate phone number if provided and different from current
        if (request.getPhone() != null && !request.getPhone().equals(user.getPhone())) {
            validationService.validatePhoneUnique(request.getPhone());
        }

        // Update user information
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getBirthdate() != null) {
            user.setBirthdate(request.getBirthdate());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }

        User updatedUser = userRepository.save(user);
        return convertToProfileDTO(updatedUser);
    }

    /**
     * Convert User entity to UserProfileDTO
     */
    private UserProfileDTO convertToProfileDTO(User user) {
        return new UserProfileDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getBirthdate(),
                user.getAddress(),
                user.getGender(),
                user.getAnonymous()
        );
    }

    /**
     * Kiểm tra xem user có tồn tại không
     */
    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Lấy User entity theo email (dùng cho internal service)
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với email: " + email));
    }
} 