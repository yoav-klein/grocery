package com.grocery.web.controllers.tenant;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.grocery.business.tenancy.exception.UserAlreadyInTenantException;
import com.grocery.business.tenancy.exception.UserAlreadyInvitedException;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.model.Invitation;
import com.grocery.business.tenancy.service.TenantService;
import com.grocery.business.tenancy.service.TenantUserService;
import com.grocery.business.tenancy.service.UserService;

@Controller
@RequestMapping("/tenant/{tenantId}")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @Autowired
    private TenantUserService tenantUserService;

    @Autowired
    private UserService userService;


    @ModelAttribute("user")
    public void addUserToModel(Model model, @AuthenticationPrincipal Object user) throws UserNotFoundException {
        OAuth2User oauth2User = (OAuth2User)user;
        model.addAttribute("user", userService.getUserById(oauth2User.getAttribute("sub")));
    }

    @ModelAttribute("tenant")
    public void addTenantToModel(Model model, @PathVariable("tenantId") String tenantId) throws UserNotFoundException {
        model.addAttribute("tenant", tenantService.getTenantById(tenantId));
    }

    @GetMapping("/management")
    public String tenantManagement(Model model, @PathVariable("tenantId")String tenantId) {
        
        model.addAttribute("memberships", tenantUserService.getAllUsersForTenant(tenantId));
        model.addAttribute("invitations", tenantService.getAllInvitationsForTenant(tenantId));
        model.addAttribute("page", "management");

        return "manage-tenant";
    }

    @GetMapping
    public String home(@PathVariable("tenantId")String tenantId) {
        return String.format("redirect:/tenant/%s/currentList", tenantId);
    }

    // invite user to tenant
    @PostMapping("/invitations")
    public String inviteUser(RedirectAttributes ra, Model model, @PathVariable("tenantId") String tenantId, @RequestParam("email") String userEmail)
        throws UserNotFoundException, UserAlreadyInTenantException, UserAlreadyInvitedException {
        Invitation invitation = tenantService.inviteUser(tenantId, userEmail);
        
        ra.addFlashAttribute("invitationId", invitation.getId()); // not sure if I need this...

        return String.format("redirect:/tenant/%s", tenantId);
    }

    // remove user
    @DeleteMapping("/members/{userId}")
    public String removeMember(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("userId") String userId) throws UserNotFoundException {
        tenantUserService.removeUserFromTenant(tenantId, userId);

        return String.format("redirect:/tenant/%s", tenantId);
    }

    @PostMapping("/members/{userId}/promote")
    public String promoteMember(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("userId") String userId) throws UserNotFoundException {
        tenantUserService.promoteToAdmin(tenantId, userId);

        return String.format("redirect:/tenant/%s", tenantId);
    }

    // leave tenant
    @DeleteMapping("/members/{user}/leave")
    public String leaveTenant(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("user") String userId) throws UserNotFoundException {
        tenantUserService.removeUserFromTenant(tenantId, userId);

        return "redirect:/my-tenants";
    }

    // delete tenant
    @DeleteMapping
    public String deleteTenant(Model model, @PathVariable("tenantId") String tenantId) {
        tenantService.deleteTenant(tenantId);

        return "redirect:/";
    }


}
