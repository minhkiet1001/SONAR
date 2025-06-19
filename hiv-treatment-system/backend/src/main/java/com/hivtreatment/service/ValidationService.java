package com.hivtreatment.service;

import com.hivtreatment.exception.DuplicateResourceException;
import com.hivtreatment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ValidationService {

    @Autowired
    private UserRepository userRepository;

    @Value("${app.dev-mode:false}")
    private boolean devMode;

    @Value("${app.test-email-pattern:.*test.*@.*}")
    private String testEmailPattern;

    @Value("${app.test-phone-pattern:.*test.*}")
    private String testPhonePattern;

    /**
     * Validate email for duplicates
     * @param email Email to validate
     * @throws DuplicateResourceException if email already exists
     */
    public void validateEmailUnique(String email) {
        if (!StringUtils.hasText(email)) {
            return;
        }

        if (userRepository.existsByEmail(email)) {
            // Skip validation for test emails in dev mode
            if (devMode && email.matches(testEmailPattern)) {
                return;
            }
            throw new DuplicateResourceException("email", email);
        }
    }

    /**
     * Validate phone for duplicates
     * @param phone Phone to validate
     * @throws DuplicateResourceException if phone already exists
     */
    public void validatePhoneUnique(String phone) {
        if (!StringUtils.hasText(phone)) {
            return;
        }

        if (userRepository.existsByPhone(phone)) {
            // Skip validation for test phones in dev mode
            if (devMode && phone.matches(testPhonePattern)) {
                return;
            }
            throw new DuplicateResourceException("phone", phone);
        }
    }

    /**
     * Validate both email and phone for duplicates
     * @param email Email to validate
     * @param phone Phone to validate
     * @throws DuplicateResourceException if either email or phone already exists
     */
    public void validateUserUnique(String email, String phone) {
        validateEmailUnique(email);
        validatePhoneUnique(phone);
    }

    /**
     * Check if email is a test email in dev mode
     * @param email Email to check
     * @return true if it's a test email and dev mode is enabled
     */
    public boolean isTestEmail(String email) {
        return devMode && StringUtils.hasText(email) && email.matches(testEmailPattern);
    }

    /**
     * Check if phone is a test phone in dev mode
     * @param phone Phone to check
     * @return true if it's a test phone and dev mode is enabled
     */
    public boolean isTestPhone(String phone) {
        return devMode && StringUtils.hasText(phone) && phone.matches(testPhonePattern);
    }
} 