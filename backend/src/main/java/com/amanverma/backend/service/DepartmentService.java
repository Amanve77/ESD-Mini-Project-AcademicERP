package com.amanverma.backend.service;

import com.amanverma.backend.entity.Department;
import com.amanverma.backend.repo.DepartmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepo departmentRepo;

    public Department getByName(String name) {
        return departmentRepo.findByName(name);  // Assuming you have a method like this in your repository
    }

}
