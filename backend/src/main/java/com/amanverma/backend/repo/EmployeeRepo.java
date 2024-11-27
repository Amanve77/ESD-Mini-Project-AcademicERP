package com.amanverma.backend.repo;

import com.amanverma.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee, String> {

    @Query("SELECT e FROM Employee e WHERE e.employeeId = :empId")
    Employee findByEmpId(String empId);
}
