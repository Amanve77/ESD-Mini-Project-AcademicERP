package com.amanverma.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "employees")
public class Employee {

    @Id
    @Column(name = "employee_id")
    private String employeeId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "photograph_path", nullable = false, unique = true)
    private String photographPath;

    @ManyToOne
    @JoinColumn(name = "department")
    private Department department;
    
}
