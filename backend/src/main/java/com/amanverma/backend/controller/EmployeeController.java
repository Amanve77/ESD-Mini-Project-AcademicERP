package com.amanverma.backend.controller;

import com.amanverma.backend.dto.EmployeeRequest;
import com.amanverma.backend.dto.EmployeeResponse;
import com.amanverma.backend.helper.JWTHelper;
import com.amanverma.backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private static final String UPLOAD_DIR = "/home/aman-verma/Desktop/ESD-Mini-Project-AcademicERP/backend/src/main/resources/static/images/";

    private final EmployeeService employeeService;
    private final JWTHelper jwtHelper;

    private boolean isAuthorized(String token) {
        String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtHelper.extractEmail(jwtToken);
        return jwtHelper.validateToken(jwtToken, email);
    }

    @PostMapping
    public ResponseEntity<String> createEmployee(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @ModelAttribute @Valid EmployeeRequest employeeRequest
    ) throws IOException {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String photographPath = savePhotograph(employeeRequest.getPhotograph());
        return ResponseEntity.ok(employeeService.createEmployee(employeeRequest, photographPath));
    }

    @GetMapping("/{empId}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String empId
    ) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        EmployeeResponse employeeResponse = employeeService.getEmployeeById(empId);
        if (employeeResponse.getPhotographPath() != null) {
            employeeResponse.setPhotographPath(buildPhotographUrl(employeeResponse.getPhotographPath()));
        }
        return ResponseEntity.ok(employeeResponse);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @PutMapping("/{empId}")
    public ResponseEntity<String> updateEmployee(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String empId,
            @ModelAttribute EmployeeRequest employeeRequest
    ) throws IOException {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String photographPath = savePhotograph(employeeRequest.getPhotograph());
        return ResponseEntity.ok(employeeService.updateEmployee(empId, employeeRequest, photographPath));
    }

    @DeleteMapping("/{empId}")
    public ResponseEntity<String> deleteEmployee(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String empId
    ) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        employeeService.deleteEmployee(empId);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    @GetMapping("/photos/{filename}")
    public ResponseEntity<byte[]> getPhoto(
            @PathVariable String filename
    ) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            byte[] imageBytes = Files.readAllBytes(filePath);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath))
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    private String savePhotograph(MultipartFile photograph) {
        if (photograph != null && !photograph.isEmpty()) {
            try {
                String originalFileName = photograph.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR, originalFileName);
                Files.createDirectories(filePath.getParent()); // Ensure directories exist
                photograph.transferTo(filePath.toFile()); // Save file
                return filePath.toString(); // Return saved file path
            } catch (IOException e) {
                throw new RuntimeException("Error saving photograph: " + e.getMessage(), e);
            }
        }
        return null;
    }



    private String buildPhotographUrl(String photographPath) {
        try {
            String fileName = Paths.get(photographPath).getFileName().toString();
            return "http://localhost:8080/api/v1/employees/photos/" + fileName; // Updated to match `getPhoto` endpoint
        } catch (Exception e) {
            throw new RuntimeException("Error building photograph URL: " + e.getMessage(), e);
        }
    }




}
