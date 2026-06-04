package com.grocery.web.controllers.api.tenant;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.service.TenantService;
import com.grocery.security.model.SecurityUser;

@Controller
@RequestMapping("/tenant/{tenantId}/invitations")
public class InvitationsApiController {
    
    @Autowired
    private TenantService tenantService;
    
    @PostMapping
    public ResponseEntity<String> createInvitation(HttpServletRequest request,
        @PathVariable("tenantId") String tenantId,
        @AuthenticationPrincipal SecurityUser user) throws UserNotFoundException {
        Invitation invitation = tenantService.createInvitation(tenantId, user.getAppUser().getId());

        return new ResponseEntity<String>(String.format("%s/invitations/%s/prompt", ServletUriComponentsBuilder.fromContextPath(request).build().toString(),invitation.getId()), HttpStatus.OK);
    }
}
