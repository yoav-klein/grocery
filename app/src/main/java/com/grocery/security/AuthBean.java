package com.grocery.security;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.grocery.business.tenancy.service.TenantUserService;

@Component("authz")
public class AuthBean {

    @Autowired
    TenantUserService tenantUserService;
    
    public boolean isUserPartOfTenant(Authentication authentication, String tenantId) {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = token.getPrincipal();
        Map<String, Object> attrs = oauth2User.getAttributes();
        String sub = (String) attrs.get("sub");

        System.out.println("IS USER PART OF TENANT");
        System.err.println(String.format("User: %s, Tenant: %s", sub, tenantId));

        return tenantUserService.isUserPartOfTenant(sub, tenantId);
    }

    public boolean isAdmin(Authentication authentication, String tenantId) {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = token.getPrincipal();
        Map<String, Object> attrs = oauth2User.getAttributes();
        String sub = (String) attrs.get("sub");

        return tenantUserService.isAdmin(sub, tenantId);
    }

    public boolean isUser(Authentication authentication, String userId) {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = token.getPrincipal();
        Map<String, Object> attrs = oauth2User.getAttributes();
        String sub = (String) attrs.get("sub");
        
        return sub.equals(userId);
    }

    public String getUserIdFromAuthentication(Authentication authentication) {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = token.getPrincipal();
        Map<String, Object> attrs = oauth2User.getAttributes();
        return (String) attrs.get("sub");
    }
}
