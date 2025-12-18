package com.grocery.web.controllers.tenant;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.grocery.business.tenancy.service.TenantService;
import com.grocery.business.tenancy.service.TenantUserService;
import com.grocery.business.tenancy.service.UserService;
import com.grocery.business.tenancy.model.Tenant;

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
    public String getTenants(Model model, @AuthenticationPrincipal Object user) {
        OAuth2User oauth2User = (OAuth2User)user;
        model.addAttribute("tenantMemberships", tenantUserService.getAllTenantsForUser(oauth2User.getAttribute("sub")));
        model.addAttribute("invitations", userService.getAllInvitationsForUser(oauth2User.getAttribute("sub")));
        
        return "my-tenants";
    }

    // create tenant
    @PostMapping("/tenants")
    public String createTenant(RedirectAttributes ra, @AuthenticationPrincipal Object user, @RequestParam("name") String tenantName) throws IOException {
        OAuth2User oauth2User = (OAuth2User)user;
        String userId = oauth2User.getAttribute("sub");
        Tenant tenant = tenantService.createTenant(tenantName, userId);

        // add the tenantId as flash attribute, mostly for tests
        ra.addFlashAttribute("tenantId", tenant.getId());

        return "redirect:/my-tenants";
    }
}