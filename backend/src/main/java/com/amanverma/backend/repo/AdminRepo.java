package com.amanverma.backend.repo;

import com.amanverma.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
