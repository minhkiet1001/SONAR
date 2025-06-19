package com.hivtreatment.exception;

public class DuplicateResourceException extends RuntimeException {
    private String field;
    private String value;

    public DuplicateResourceException(String field, String value) {
        super(String.format("%s '%s' đã được sử dụng", getFieldDisplayName(field), value));
        this.field = field;
        this.value = value;
    }

    public DuplicateResourceException(String message) {
        super(message);
    }

    private static String getFieldDisplayName(String field) {
        switch (field.toLowerCase()) {
            case "email":
                return "Email";
            case "phone":
                return "Số điện thoại";
            default:
                return field;
        }
    }

    public String getField() {
        return field;
    }

    public String getValue() {
        return value;
    }
} 