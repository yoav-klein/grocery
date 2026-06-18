package com.grocery.web.controllers.ui.app;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.service.TenantService;
import com.grocery.business.tenancy.service.TenantUserService;

@Controller
@RequestMapping("/tenant/{tenantId}")
public class ManageTenantController {

    @Autowired
    private TenantService tenantService;

    @Autowired
    private TenantUserService tenantUserService;

    
    @GetMapping
    public String home(@PathVariable("tenantId")String tenantId) {
        return String.format("redirect:/tenant/%s/currentList", tenantId);
    }

    @GetMapping("/management")
    public String tenantManagement(Model model, @PathVariable("tenantId") String tenantId) {
        model.addAttribute("memberships", tenantUserService.getAllUsersForTenant(tenantId));
        model.addAttribute("page", "management");

        return "manage-tenant";
    }

    // remove user
    @DeleteMapping("/members/{userId}")
    public String removeMember(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("userId") String userId) throws UserNotFoundException {
        tenantUserService.removeUserFromTenant(tenantId, userId);

        return String.format("redirect:/tenant/%s/management", tenantId);
    }

    @PostMapping("/members/{userId}/promote")
    public String promoteMember(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("userId") String userId) throws UserNotFoundException {
        tenantUserService.promoteToAdmin(tenantId, userId);

        return String.format("redirect:/tenant/%s/management", tenantId);
    }

    // leave tenant
    @DeleteMapping("/members/{user}/leave")
    public String leaveTenant(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("user") String userId) throws UserNotFoundException {
        tenantUserService.removeUserFromTenant(tenantId, userId);

        return "redirect:/tenants";
    }

    // delete tenant
    @DeleteMapping
    public String deleteTenant(Model model, @PathVariable("tenantId") String tenantId) {
        tenantService.deleteTenant(tenantId);

        return "redirect:/";
    }


}
