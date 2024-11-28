package com.amanverma.backend.controller;


import com.amanverma.backend.dto.AdminLogin;
import com.amanverma.backend.dto.AdminRequest;
import com.amanverma.backend.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping()
    public ResponseEntity<String> createCustomer(@RequestBody @Valid AdminRequest request) {
        return ResponseEntity.ok(adminService.createAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AdminLogin adminLogin) {
        String token = adminService.login(adminLogin);

        if ("Wrong Password or Email".equals(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }

        return ResponseEntity.ok(Map.of("token", token));
    }
}
