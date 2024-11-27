package com.amanverma.backend.controller;

import com.amanverma.backend.dto.DepartmentResponse;
import com.amanverma.backend.dto.EmployeeResponse;
import com.amanverma.backend.helper.JWTHelper;
import com.amanverma.backend.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    private final DepartmentService departmentService;
    private final JWTHelper jwtHelper;

    private boolean isAuthorized(String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtHelper.extractEmail(jwtToken);
        return jwtHelper.validateToken(jwtToken, email);
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

}
