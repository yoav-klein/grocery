package com.grocery.web.controllers.ui.tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.grocery.business.tenancy.exception.InvitationNotFoundException;
import com.grocery.business.tenancy.exception.UserAlreadyInTenantException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.service.InvitationService;
import com.grocery.security.model.SecurityUser;

@Controller
@RequestMapping("/invitations")
public class InvitationsController {
    @Autowired
    private InvitationService invitationService;

    @GetMapping("{id}/prompt")
    public String promptForInvitation(Model model, @PathVariable("id") String invitationId, @AuthenticationPrincipal SecurityUser user) throws InvitationNotFoundException {
        Invitation invitation = invitationService.getInvitationById(invitationId);
        model.addAttribute("invitation", invitation);

        return "invitation-prompt";
    }

    @PostMapping("/{id}/accept")
    public String acceptInvitation(@PathVariable("id") String invitationId, @AuthenticationPrincipal SecurityUser user) throws InvitationNotFoundException, UserAlreadyInTenantException {
        invitationService.acceptInvitation(invitationId, user.getAppUser().getId());
        return "redirect:/tenants";
    }

    @DeleteMapping("/{id}")
    public String revokeInvitation(@PathVariable("id") String invitationId) throws InvitationNotFoundException {
        String tenantId = invitationService.getInvitationById(invitationId).getTenant().getId();
        invitationService.revokeInvitation(invitationId);
        return "redirect:/tenant/" + tenantId + "/management";
    }


}