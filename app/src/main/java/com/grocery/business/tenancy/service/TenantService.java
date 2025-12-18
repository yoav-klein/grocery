package com.grocery.business.tenancy.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.grocery.business.tenancy.exception.UserAlreadyInTenantException;
import com.grocery.business.tenancy.exception.UserAlreadyInvitedException;
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
        tenantUserService.addUserToTenant(tenantId, ownerId, "admin");

        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        tenant.setName(tenantName);

        return tenant;
    }

    public Tenant getTenantById(String id) {
        return tenantRepository.findTenantById(id).get();
    }

    @PreAuthorize("@tenantUserService.isMostSenior(@authz.getUserIdFromAuthentication(authentication), #tenantId)")
    public void deleteTenant(@P("tenantId") String tenantId) {
        tenantRepository.deleteTenant(tenantId);
        tenantRepository.deleteTenantSchema(tenantId);
    }

    // TRANSACTIONAL
    @PreAuthorize("@authz.isAdmin(authentication, #tenantId)")
    public Invitation inviteUser(@P("tenantId") String tenantId, String email) throws UserNotFoundException, UserAlreadyInTenantException, UserAlreadyInvitedException {
        String invitationId = UUID.randomUUID().toString().replace("-", "");

        User user = userService.getUserByEmail(email);
        if(tenantUserRepository.isUserPartOfTenant(user.getId(), tenantId)) {
            throw new UserAlreadyInTenantException();
        }
        
        try {
            invitationRepository.addInvitation(invitationId, tenantId, user.getId());
        } catch(DuplicateKeyException e) {
            throw new UserAlreadyInvitedException();
        }
        
        Tenant tenant = getTenantById(tenantId);
        return new Invitation(invitationId, tenant, user);
    }

    public List<Invitation> getAllInvitationsForTenant(String tenantId) {
        return invitationRepository.getAllInvitationsForTenant(tenantId);
    }
}
