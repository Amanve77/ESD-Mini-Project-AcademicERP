package com.amanverma.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EmployeeResponse(

        @JsonProperty("employee_id")
        String empId,

        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @JsonProperty("email")
        String email,

        @JsonProperty("title")
        String title,

        @JsonProperty("photograph_path")
        String photographPath,

        @JsonProperty("department")
        String department
) {
}
