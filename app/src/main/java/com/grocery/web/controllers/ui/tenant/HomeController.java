package com.grocery.web.controllers.ui.tenant;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.grocery.business.tenancy.dto.TenantRequest;
import com.grocery.business.tenancy.model.Tenant;
import com.grocery.business.tenancy.service.TenantService;
import com.grocery.business.tenancy.service.TenantUserService;
import com.grocery.business.tenancy.service.UserService;
import com.grocery.security.model.SecurityUser;

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
        return "redirect:/tenants";
        // return "index"; // This corresponds to the view name
    }

    @GetMapping("/tenants")
    public String getTenants(Model model, @AuthenticationPrincipal SecurityUser user) {
        model.addAttribute("tenantMemberships", tenantUserService.getAllTenantsForUser(user.getAppUser().getId()));
        model.addAttribute("tenantRequest", new TenantRequest());
        
        return "tenants";
    }
}