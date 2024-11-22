package com.amanverma.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AdminLogin(
        @NotNull(message = "Email is required")
        @NotEmpty(message = "Email is required")
        @NotBlank(message = "Email is required")
        @JsonProperty("email")
        String email,

        @NotNull(message = "Password is required")
        @NotEmpty(message = "Password is required")
        @NotBlank(message = "Password is required")
        @Size(min = 6, max = 12)
        @JsonProperty("password")
        String password
) {
}
