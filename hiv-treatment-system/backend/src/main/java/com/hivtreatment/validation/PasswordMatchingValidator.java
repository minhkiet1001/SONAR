package com.hivtreatment.validation;

import com.hivtreatment.dto.RegisterRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchingValidator implements ConstraintValidator<PasswordMatching, RegisterRequest> {

    @Override
    public void initialize(PasswordMatching constraintAnnotation) {
        // Initialization logic if needed
    }

    @Override
    public boolean isValid(RegisterRequest request, ConstraintValidatorContext context) {
        if (request == null) {
            return true;
        }
        
        String password = request.getPassword();
        String confirmPassword = request.getConfirmPassword();
        
        if (password == null || confirmPassword == null) {
            return false;
        }
        
        return password.equals(confirmPassword);
    }
} 