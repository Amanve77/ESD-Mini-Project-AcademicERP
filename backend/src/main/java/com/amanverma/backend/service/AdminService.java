package com.amanverma.backend.service;


import com.amanverma.backend.dto.AdminLogin;
import com.amanverma.backend.dto.AdminRequest;
import com.amanverma.backend.entity.Admin;
import com.amanverma.backend.helper.EncryptionService;
import com.amanverma.backend.helper.JWTHelper;
import com.amanverma.backend.mapper.AdminMapper;
import com.amanverma.backend.repo.AdminRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepo adminRepo;
    private final EncryptionService encryptionService;
    private final JWTHelper jwtHelper;
    private final AdminMapper adminMapper;

    public String createAdmin(AdminRequest request) {

        Admin admin = adminMapper.toEntity(request);
        admin.setPassword(encryptionService.encryptPassword(admin.getPassword()));
        adminRepo.save(admin);
        return "Customer Created Successfully";
    }

    public String login(AdminLogin adminLogin) {
        Admin admin = adminRepo.findByEmail(adminLogin.email());
        if(!encryptionService.verifyPassword(adminLogin.password(), admin.getPassword())) {
            return "Wrong Password or Email";
        }
        return jwtHelper.generateToken(adminLogin.email());
    }
}
