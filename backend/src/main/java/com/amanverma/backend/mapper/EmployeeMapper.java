package com.amanverma.backend.mapper;

import com.amanverma.backend.dto.EmployeeRequest;
import com.amanverma.backend.entity.Department;
import com.amanverma.backend.entity.Employee;
import com.amanverma.backend.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeMapper {

    private final DepartmentService departmentService;


    public Employee toEntity(EmployeeRequest request) {

        Department department = departmentService.getByName(request.department());
        return Employee.builder()
                .employeeId(request.empId())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .title(request.title())
                .photographPath(request.photographPath())
                .department(department)
                .build();
    }

}
