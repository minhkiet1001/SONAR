package com.hivtreatment.dto;

import com.hivtreatment.entity.Gender;
import com.hivtreatment.validation.ValidBirthdate;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class UpdateProfileRequest {
    @Size(max = 100, message = "Tên không được vượt quá 100 ký tự")
    private String name;

    @Size(max = 20, message = "Số điện thoại không được vượt quá 20 ký tự")
    private String phone;

    @ValidBirthdate
    private LocalDate birthdate;

    @Size(max = 255, message = "Địa chỉ không được vượt quá 255 ký tự")
    private String address;

    private Gender gender;

    // Constructors
    public UpdateProfileRequest() {}

    public UpdateProfileRequest(String name, String phone, LocalDate birthdate, 
                               String address, Gender gender) {
        this.name = name;
        this.phone = phone;
        this.birthdate = birthdate;
        this.address = address;
        this.gender = gender;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
} 