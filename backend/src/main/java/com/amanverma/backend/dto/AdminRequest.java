package com.amanverma.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record AdminRequest(
        @NotNull(message = "Admin ID should be present")
        @JsonProperty("admin_id")
        String adminId,

        @NotNull(message = "Admin should be present")
        @NotEmpty(message = "Admin should be present")
        @NotBlank(message = "Admin should be present")
        @JsonProperty("first_name")
        String firstName,

        @JsonProperty("last_name")
        String lastName,

        @NotNull(message="Admin email is required")
        @Email(message = "Email must be in correct format")
        @JsonProperty("email")
        String email,

        @NotNull(message = "Password should be present")
        @NotEmpty(message = "Password should be present")
        @NotBlank(message = "Password should be present")
        @Size(min = 6, max = 12)
        @JsonProperty("password")
        String password
) {
}
