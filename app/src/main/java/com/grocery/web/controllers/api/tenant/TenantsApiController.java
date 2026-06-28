package com.grocery.web.controllers.api.tenant;

import java.io.IOException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.grocery.business.tenancy.dto.TenantRequest;
import com.grocery.business.tenancy.model.Tenant;
import com.grocery.business.tenancy.service.TenantService;
import com.grocery.business.tenancy.service.TenantUserService;
import com.grocery.business.tenancy.service.UserService;
import com.grocery.security.model.SecurityUser;


@Controller
public class TenantsApiController {

    @Autowired
    TenantUserService tenantUserService;

    @Autowired
    UserService userService;
    
    @Autowired
    TenantService tenantService;
    
    @PostMapping("/tenants")
    public ResponseEntity createTenant(@AuthenticationPrincipal SecurityUser user, @Validated @RequestBody TenantRequest tenantRequest) throws IOException {
        Tenant tenant = tenantService.createTenant(tenantRequest.getTenantName(), user.getAppUser().getId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
