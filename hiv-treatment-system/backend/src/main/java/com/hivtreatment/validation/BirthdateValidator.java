package com.hivtreatment.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class BirthdateValidator implements ConstraintValidator<ValidBirthdate, LocalDate> {

    @Override
    public void initialize(ValidBirthdate constraintAnnotation) {
        // No initialization needed
    }

    @Override
    public boolean isValid(LocalDate birthdate, ConstraintValidatorContext context) {
        if (birthdate == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Ngày sinh không được để trống")
                   .addConstraintViolation();
            return false;
        }

        LocalDate now = LocalDate.now();

        // Birthdate must not be in the future
        if (birthdate.isAfter(now)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Ngày sinh không được ở tương lai")
                   .addConstraintViolation();
            return false;
        }

        return true;
    }
} 