package com.grocery.business.tenancy.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.grocery.business.tenancy.exception.UserAlreadyInTenantException;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.model.Tenant;
import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.repository.InvitationRepository;
import com.grocery.business.tenancy.repository.TenantRepository;
import com.grocery.business.tenancy.repository.TenantUserRepository;

@Service("tenantService")
public class TenantService {

    @Autowired
    TenantRepository tenantRepository;

    @Autowired
    UserService userService;

    @Autowired
    TenantUserRepository tenantUserRepository;

    @Autowired
    TenantUserService tenantUserService;

    @Autowired
    InvitationRepository invitationRepository;

    // TRANSACTIONAL
    public Tenant createTenant(String tenantName, String ownerId) throws IOException {
        String tenantId = UUID.randomUUID().toString().replace("-", "");
        tenantRepository.createTenantSchema(tenantId);
        tenantRepository.createTenant(tenantId, tenantName);
        try {
            tenantUserService.addUserToTenant(tenantId, ownerId, "admin");
        } catch(UserAlreadyInTenantException e) {} // not really possible in this scenario

        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        tenant.setName(tenantName);

        return tenant;
    }

    public Tenant getTenantById(String id) {
        return tenantRepository.findTenantById(id).get();
    }

    @PreAuthorize("@tenantUserService.isMostSenior(principal.appUser.id, #tenantId)")
    public void deleteTenant(@P("tenantId") String tenantId) {
        tenantRepository.deleteTenant(tenantId);
        tenantRepository.deleteTenantSchema(tenantId);
    }

    @PreAuthorize("@authz.isAdmin(principal.appUser.id, #tenantId)")
    public Invitation createInvitation(@P("tenantId") String tenantId, String invitedByUserId) throws UserNotFoundException {
        String invitationId = UUID.randomUUID().toString().replace("-", "");

        User invitedBy = userService.getUserById(invitedByUserId);
        
        invitationRepository.save(invitationId, tenantId, invitedBy.getId());
        
        Tenant tenant = getTenantById(tenantId);
        return new Invitation(invitationId, tenant, invitedBy);
    }

}
