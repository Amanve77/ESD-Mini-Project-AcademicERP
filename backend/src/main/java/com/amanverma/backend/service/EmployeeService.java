package com.amanverma.backend.service;


import com.amanverma.backend.dto.EmployeeRequest;
import com.amanverma.backend.dto.EmployeeResponse;
import com.amanverma.backend.entity.Employee;
import com.amanverma.backend.helper.EncryptionService;
import com.amanverma.backend.helper.JWTHelper;
import com.amanverma.backend.mapper.EmployeeMapper;
import com.amanverma.backend.repo.EmployeeRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {


    private final EmployeeMapper employeeMapper;
    private final EmployeeRepo employeeRepo;
    private final EncryptionService encryptionService;
    private final JWTHelper jwtHelper;

    public String createEmployee(EmployeeRequest employeeRequest) {
        Employee employee = employeeMapper.toEntity(employeeRequest);
        employeeRepo.save(employee);
        return "Employee created Successfully";
    }

    public EmployeeResponse getEmployeeById(String empId) {
        Employee employee = employeeRepo.findByEmpId(empId);
        if (employee == null) {
            throw new EntityNotFoundException("Employee not found with ID: " + empId);
        }
        return employeeMapper.toResponse(employee);
    }

    public List<EmployeeResponse> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream()
                .map(employeeMapper::toResponse)
                .collect(Collectors.toList());
    }


}