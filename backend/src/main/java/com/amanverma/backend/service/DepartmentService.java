package com.amanverma.backend.service;

import com.amanverma.backend.dto.DepartmentResponse;
import com.amanverma.backend.dto.EmployeeResponse;
import com.amanverma.backend.entity.Department;
import com.amanverma.backend.mapper.DepartmentMapper;
import com.amanverma.backend.repo.DepartmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepo departmentRepo;
    private final DepartmentMapper departmentMapper;

    public Department getByName(String name) {
        return departmentRepo.findByName(name);  // Assuming you have a method like this in your repository
    }

    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepo.findAll().stream()
                .map(departmentMapper::toResponse)
                .collect(Collectors.toList());
    }

}
