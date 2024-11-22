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
@Table(name = "departments")
public class Department {
    @Id
    @Column(name = "department_id")
    String departmentId;

    @Column(name = "department_name", unique = true, nullable = false)
    String departmentName;

    @Column(name = "capacity", nullable = false)
    Long capacity;

    @Column(name = "current_count", nullable = false)
    Long currentCount;
}
