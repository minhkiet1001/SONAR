package com.hivtreatment.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PhoneValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPhone {
    String message() default "Số điện thoại phải bắt đầu bằng 0 hoặc 84 và có đúng định dạng";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
} 