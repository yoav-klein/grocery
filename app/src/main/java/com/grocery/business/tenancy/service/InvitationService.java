package com.grocery.business.tenancy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import com.grocery.business.tenancy.exception.InvitationNotFoundException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.repository.InvitationRepository;
import com.grocery.business.tenancy.repository.TenantUserRepository;

@Service("invitationService")
public class InvitationService {
    @Autowired
    InvitationRepository invitationRepository;

    @Autowired
    TenantUserRepository tenantUserRepository;

    public String getInvitedUserId(String invitationId) throws InvitationNotFoundException {
        Invitation invitation = invitationRepository.findInvitationById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });
        
        return invitation.getUser().getId();
    }

    public String getInvitationTenantId(String invitationId) throws InvitationNotFoundException {
        Invitation invitation = invitationRepository.findInvitationById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });
        
        return invitation.getTenant().getId();
    }
    
    // TRANSACTIONAL
    // security - allowed only to the invited user
    @PreAuthorize("@authz.isUser(authentication, @invitationService.getInvitedUserId(#invitationId))")
    public void acceptInvitation(@P("invitationId") String invitationId) throws InvitationNotFoundException {
        Invitation invitation = invitationRepository.findInvitationById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });

        invitationRepository.removeInvitation(invitationId);
        tenantUserRepository.addUserToTenant(invitation.getTenant().getId(), invitation.getUser().getId(), "regular");
    }

    // security - allowed only to the invited user, or tenant admin
    @PreAuthorize("@authz.isAdmin(authentication, @invitationService.getInvitationTenantId(#invitationId)) or @authz.isUser(authentication, @invitationService.getInvitedUserId(#invitationId))")
    public void declineInvitation(@P("invitationId") String invitationId) throws InvitationNotFoundException {
        invitationRepository.removeInvitation(invitationId);
    }

    
    public Invitation getInvitationById(String invitationId) throws InvitationNotFoundException {
        Invitation invitation = invitationRepository.findInvitationById(invitationId).orElseThrow(() -> { return new InvitationNotFoundException(); });
        
        return invitation;
    }
}