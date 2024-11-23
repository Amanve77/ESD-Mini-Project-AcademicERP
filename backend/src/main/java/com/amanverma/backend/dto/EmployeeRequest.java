package com.amanverma.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record EmployeeRequest(
        @NotNull(message = "Employee ID should be present")
        @NotEmpty(message = "Employee ID should be present")
        @NotBlank(message = "Employee ID should be present")
        @JsonProperty("employee_id")
        String empId,

        @NotNull(message = "Employee first name should be present")
        @NotEmpty(message = "Employee first name should be present")
        @NotBlank(message = "Employee first name should be present")
        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @Email(message = "Email should be in proper format")
        @NotEmpty(message = "Email should be present")
        @JsonProperty("email")
        String email,

        @NotNull(message = "Employee title should be present")
        @NotEmpty(message = "Employee title should be present")
        @NotBlank(message = "Employee title should be present")
        @JsonProperty("title")
        String title,

        @NotNull(message = "Employee photo should be present")
        @NotEmpty(message = "Employee photo should be present")
        @NotBlank(message = "Employee photo should be present")
        @JsonProperty("photograph_path")
        String photographPath,

        @NotNull(message = "Employee department should be present")
        @NotEmpty(message = "Employee department should be present")
        @NotBlank(message = "Employee department should be present")
        @JsonProperty("department")
        String department
) {
}
