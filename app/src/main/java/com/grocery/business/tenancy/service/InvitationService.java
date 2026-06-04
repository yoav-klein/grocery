package com.grocery.business.tenancy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.grocery.business.tenancy.exception.InvitationNotFoundException;
import com.grocery.business.tenancy.exception.UserAlreadyInTenantException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.repository.InvitationRepository;
import com.grocery.business.tenancy.service.TenantUserService;

@Service("invitationService")
public class InvitationService {
    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    TenantUserService tenantUserService;

    public String getInvitationTenantId(String invitationId) throws InvitationNotFoundException {
        Invitation invitation = invitationRepository.findById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });
        
        return invitation.getTenant().getId();
    }
    
    // TRANSACTIONAL
    // security - allowed only to the invited user
    public void acceptInvitation(String invitationId, String userId) throws InvitationNotFoundException, UserAlreadyInTenantException {
        Invitation invitation = invitationRepository.findById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });

        invitationRepository.delete(invitationId);
        tenantUserService.addUserToTenant(invitation.getTenant().getId(), userId, "regular");
    }

    // security - allowed only to the invited user, or tenant admin
    @PreAuthorize("@authz.isAdmin(principal.appUser.id, @invitationService.getInvitationTenantId(#invitationId))")
    public void revokeInvitation(@P("invitationId") String invitationId) throws InvitationNotFoundException {
        invitationRepository.delete(invitationId);
    }

    public Invitation getInvitationById(String invitationId) throws InvitationNotFoundException {
        Invitation invitation = invitationRepository.findById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });
        
        return invitation;
    }
}