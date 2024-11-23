package com.amanverma.backend.repo;

import com.amanverma.backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DepartmentRepo extends JpaRepository<Department, Long> {

    @Query("SELECT d FROM Department d WHERE d.departmentName = :name")
    Department findByName(String name);
}
