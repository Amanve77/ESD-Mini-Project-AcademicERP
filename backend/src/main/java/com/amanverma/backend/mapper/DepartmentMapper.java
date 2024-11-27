package com.amanverma.backend.mapper;

import com.amanverma.backend.dto.DepartmentResponse;
import com.amanverma.backend.entity.Department;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DepartmentMapper{

    public DepartmentResponse toResponse(Department department) {

        DepartmentResponse response = new DepartmentResponse();

        response.setDepartmentId(department.getDepartmentId());
        response.setDepartmentName(department.getDepartmentName());

        return response;
    }

}
