package com.amanverma.backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;

@Setter
@Getter
public class EmployeeRequest {

    @NotBlank
    private String empId;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String email;
    @NotBlank
    private String title;
    @NotBlank
    private String department;

    private MultipartFile photograph;

    // Getters and Setters

}
