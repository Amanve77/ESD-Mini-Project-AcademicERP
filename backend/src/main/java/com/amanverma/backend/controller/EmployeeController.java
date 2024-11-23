package com.amanverma.backend.controller;


import com.amanverma.backend.dto.EmployeeRequest;
import com.amanverma.backend.dto.EmployeeResponse;
import com.amanverma.backend.entity.Employee;
import com.amanverma.backend.helper.JWTHelper;
import com.amanverma.backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    private final JWTHelper jwtHelper;

    @PostMapping()
    public ResponseEntity<String> createEmployee(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody @Valid EmployeeRequest employeeRequest ) {

        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtHelper.extractEmail(jwtToken);
        if(!jwtHelper.validateToken(jwtToken, email)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        return ResponseEntity.ok((employeeService.createEmployee(employeeRequest)));
    }

    @GetMapping("/{empId}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String empId) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtHelper.extractEmail(jwtToken);
        if(!jwtHelper.validateToken(jwtToken, email)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        EmployeeResponse employeeResponse = employeeService.getEmployeeById(empId);
        return new ResponseEntity<>(employeeResponse, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtHelper.extractEmail(jwtToken);
        if(!jwtHelper.validateToken(jwtToken, email)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<EmployeeResponse> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("/{empId}")
    public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable String empId, @RequestBody EmployeeRequest employeeRequest) {
        EmployeeResponse employeeResponse = employeeService.updateEmployee(empId, employeeRequest);
        return new ResponseEntity<>(employeeResponse, HttpStatus.OK);
    }

}
