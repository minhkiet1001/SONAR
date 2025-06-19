package com.hivtreatment.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<ValidPhone, String> {

    @Override
    public void initialize(ValidPhone constraintAnnotation) {
        // Initialization logic if needed
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.trim().isEmpty()) {
            return false;
        }
        
        // Remove all spaces and special characters
        String cleanPhone = phone.replaceAll("[\\s\\-\\(\\)\\+]", "");
        
        // Check if starts with 0 and has 10 digits total (0xxxxxxxxx)
        if (cleanPhone.matches("^0\\d{9}$")) {
            return true;
        }
        
        // Check if starts with 84 and has 11 digits total (84xxxxxxxxx)
        if (cleanPhone.matches("^84\\d{9}$")) {
            return true;
        }
        
        return false;
    }
} 