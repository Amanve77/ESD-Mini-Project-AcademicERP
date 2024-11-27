package com.amanverma.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EmployeeResponse {
    // Getters and Setters
    private String empId;
    private String firstName;
    private String lastName;
    private String email;
    private String title;
    private String photographPath; // The URL to be returned
    private String department;

    // Constructor
    public EmployeeResponse(String empId, String firstName, String lastName, String email, String title, String photographPath, String department) {
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.title = title;
        this.photographPath = photographPath;
        this.department = department;
    }

}
