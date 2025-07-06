package com.grocery.business.multitenancy.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.grocery.business.multitenancy.exception.UserAlreadyInTenantException;
import com.grocery.business.multitenancy.exception.UserNotExistsException;
import com.grocery.business.multitenancy.model.Invitation;
import com.grocery.business.multitenancy.model.Tenant;
import com.grocery.business.multitenancy.model.User;
import com.grocery.business.multitenancy.repository.InvitationRepository;
import com.grocery.business.multitenancy.repository.TenantRepository;
import com.grocery.business.multitenancy.repository.TenantUserRepository;

@Service("tenantService")
public class TenantService {

    @Autowired
    TenantRepository tenantRepository;

    @Autowired
    UserService userService;

    @Autowired
    TenantUserRepository tenantUserRepository;

    @Autowired
    InvitationRepository invitationRepository;

    public List<Tenant> getAllTenantsForUser(String userId) {
        return tenantUserRepository.getAllTenantsForUser(userId);
    }

    public List<User> getAllUsersForTenant(String tenantId) {
        return tenantUserRepository.getAllUsersForTenant(tenantId);
    }

    // TRANSACTIONAL
    public Tenant createTenant(String tenantName, String ownerId) {
        String tenantId = UUID.randomUUID().toString().replace("-", "");
        tenantRepository.createTenantSchema(tenantId);
        tenantRepository.createTenant(tenantId, tenantName);
        tenantUserRepository.addUserToTenant(tenantId, ownerId, "admin");

        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        tenant.setName(tenantName);

        return tenant;
    }

    public Tenant getTenantById(String id) {
        return tenantRepository.getTenantById(id);
    }

    @PreAuthorize("@authz.isAdmin(authentication, #id)")
    public void deleteTenant(@P("id") String id) {
        tenantRepository.deleteTenant(id);
        tenantRepository.deleteTenantSchema(id);
    }

    // TRANSACTIONAL
    @PreAuthorize("@authz.isAdmin(authentication, #id)")
    public Invitation inviteUser(@P("id") String tenantId, String email) throws UserNotExistsException, UserAlreadyInTenantException {
        String invitationId = UUID.randomUUID().toString().replace("-", "");

        User user = userService.getUserByEmail(email).orElseThrow(() -> { return new UserNotExistsException();});
        if(isUserPartOfTenant(user.getId(), tenantId)) {
            throw new UserAlreadyInTenantException();
        }
        
        invitationRepository.addInvitation(invitationId, tenantId, user.getId());
        
        Tenant tenant = getTenantById(tenantId);
        return new Invitation(invitationId, tenant, user);
    }

    @PreAuthorize("@authz.isAdmin(authentication, #tenantId) or @authz.isUser(authentication, #userId)")
    public void removeUserFromTenant(@P("tenantId") String tenantId, @P("userId") String userId) {
        tenantUserRepository.removeUserFromTenant(tenantId, userId);
        // if last user in tenant, delete tenant
        if(tenantUserRepository.getAllUsersForTenant(tenantId).isEmpty()) {
            this.deleteTenant(tenantId);
        }
    }

    public boolean isUserPartOfTenant(String userId, String tenantId) {
        return tenantUserRepository.isUserPartOfTenant(userId, tenantId);
    }

    public boolean isAdmin(String userId, String tenantId) {
        return tenantUserRepository.isUserPartOfTenant(userId, tenantId) && tenantUserRepository.getUserRole(userId, tenantId).equals("admin");
    }

    public List<Invitation> getAllInvitationsForTenant(String tenantId) {
        return invitationRepository.getAllInvitationsForTenant(tenantId);
    }

}