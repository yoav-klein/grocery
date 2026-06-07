package com.grocery.web.controllers.ui.tenant;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.validation.BindingResult;

import com.grocery.business.tenancy.model.Tenant;
import com.grocery.business.tenancy.service.TenantService;
import com.grocery.business.tenancy.service.TenantUserService;
import com.grocery.business.tenancy.service.UserService;
import com.grocery.security.model.SecurityUser;
import com.grocery.business.tenancy.dto.TenantRequest;

@Controller
public class HomeController {

    @Autowired
    TenantUserService tenantUserService;

    @Autowired
    UserService userService;
    
    @Autowired
    TenantService tenantService;

    @RequestMapping("/")
    public String home() {
        // TODO: decide on home
        return "redirect:/my-tenants";
        // return "index"; // This corresponds to the view name
    }

    @GetMapping("/my-tenants")
    public String getTenants(Model model, @AuthenticationPrincipal SecurityUser user) {
        model.addAttribute("tenantMemberships", tenantUserService.getAllTenantsForUser(user.getAppUser().getId()));
        model.addAttribute("tenantRequest", new TenantRequest());
        
        return "my-tenants";
    }

    // create tenant
    @PostMapping("/tenants")
    public String createTenant(Model model, RedirectAttributes ra, @AuthenticationPrincipal SecurityUser user, @Validated TenantRequest tenantRequest, BindingResult result) throws IOException {
        Tenant tenant = tenantService.createTenant(tenantRequest.getTenantName(), user.getAppUser().getId());

        // add the tenantId as flash attribute, mostly for tests
        ra.addFlashAttribute("tenantId", tenant.getId());

        return "redirect:/my-tenants";
    }
}