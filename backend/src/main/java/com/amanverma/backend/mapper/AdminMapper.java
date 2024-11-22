package com.amanverma.backend.mapper;

import com.amanverma.backend.dto.AdminRequest;
import com.amanverma.backend.entity.Admin;
import org.springframework.stereotype.Service;

@Service
public class AdminMapper {
    public Admin toEntity(AdminRequest request) {
        return Admin.builder()
                .adminId(request.adminId())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(request.password())
                .build();
    }
}
