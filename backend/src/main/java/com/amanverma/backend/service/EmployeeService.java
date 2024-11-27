package com.amanverma.backend.service;

import com.amanverma.backend.dto.EmployeeRequest;
import com.amanverma.backend.dto.EmployeeResponse;
import com.amanverma.backend.entity.Employee;
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
    private final DepartmentService departmentService;

    public String createEmployee(EmployeeRequest employeeRequest, String photographPath) {
        Employee employee = employeeMapper.toEntity(employeeRequest, photographPath);
        employee.setDepartment(departmentService.getByName(employeeRequest.getDepartment()));
        employeeRepo.save(employee);
        return "Employee created successfully";
    }

    public EmployeeResponse getEmployeeById(String empId) {
        Employee employee = employeeRepo.findByEmpId(empId);
        if (employee == null) {
            throw new EntityNotFoundException("Employee not found with ID: " + empId);
        }
        return employeeMapper.toResponse(employee);
    }

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepo.findAll().stream()
                .map(employeeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public EmployeeResponse updateEmployee(String empId, EmployeeRequest request, String newPhotographPath) {
        Employee existingEmployee = employeeRepo.findByEmpId(empId);
        if (existingEmployee == null) {
            throw new EntityNotFoundException("Employee not found with ID: " + empId);
        }

        existingEmployee.setFirstName(request.getFirstName());
        existingEmployee.setLastName(request.getLastName());
        existingEmployee.setEmail(request.getEmail());
        existingEmployee.setTitle(request.getTitle());
        existingEmployee.setPhotographPath(newPhotographPath != null ? newPhotographPath : existingEmployee.getPhotographPath());
        existingEmployee.setDepartment(departmentService.getByName(request.getDepartment()));

        Employee updatedEmployee = employeeRepo.save(existingEmployee);
        return employeeMapper.toResponse(updatedEmployee);
    }

    public void deleteEmployee(String empId) {
        Employee employee = employeeRepo.findByEmpId(empId);
        if (employee == null) {
            throw new EntityNotFoundException("Employee not found with ID: " + empId);
        }
        employeeRepo.delete(employee);
    }
}
