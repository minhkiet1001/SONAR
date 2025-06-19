package com.hivtreatment.dto;

import com.hivtreatment.entity.Gender;
import com.hivtreatment.entity.Role;
import java.time.LocalDate;

public class UserProfileDTO {
    private Integer id;
    private String name;
    private String email;
    private Role role;
    private String phone;
    private LocalDate birthdate;
    private String address;
    private Gender gender;
    private Boolean anonymous;

    // Constructors
    public UserProfileDTO() {}

    public UserProfileDTO(Integer id, String name, String email, Role role, 
                         String phone, LocalDate birthdate, String address, 
                         Gender gender, Boolean anonymous) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.birthdate = birthdate;
        this.address = address;
        this.gender = gender;
        this.anonymous = anonymous;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public Boolean getAnonymous() {
        return anonymous;
    }

    public void setAnonymous(Boolean anonymous) {
        this.anonymous = anonymous;
    }
} 