package com.grocery.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.grocery.business.tenancy.service.TenantUserService;

@Component("authz")
public class AuthBean {

    @Autowired
    TenantUserService tenantUserService;
    
    public boolean isUserPartOfTenant(String userId, String tenantId) {
        return tenantUserService.isUserPartOfTenant(userId, tenantId);
    }

    public boolean isAdmin(String userId, String tenantId) {
        return tenantUserService.isAdmin(userId, tenantId);
    }
}
