package com.amanverma.backend.service;

import com.amanverma.backend.dto.DepartmentResponse;
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
        return departmentRepo.findByName(name);
    }

    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepo.findAll().stream()
                .map(departmentMapper::toResponse)
                .collect(Collectors.toList());
    }

    public void increaseDepartmentCapacity(Department department) {
        department.setCurrentCount(department.getCurrentCount() + 1);
        departmentRepo.save(department);
    }

    public void decreaseDepartmentCapacity(Department department) {
        department.setCurrentCount(department.getCurrentCount() - 1);
        departmentRepo.save(department);
    }

    public void updateDepartmentCapacity(Department oldDepartment, Department newDepartment) {
        oldDepartment.setCurrentCount(oldDepartment.getCurrentCount() - 1);
        newDepartment.setCurrentCount(newDepartment.getCurrentCount() + 1);
        departmentRepo.save(oldDepartment);
        departmentRepo.save(newDepartment);
    }
}
