package com.grocery.security;

import java.util.function.Supplier;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class TenantAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

    @Autowired
    private AuthBean authz;

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
        HttpServletRequest request = context.getRequest();
        String tenantId = extractTenantId(request.getRequestURI());
        
        if(authz.isUserPartOfTenant(authentication.get(), tenantId)) {
            return new AuthorizationDecision(true);
        }
        return new AuthorizationDecision(false);
    }

    private String extractTenantId(String requestUri) {
        Pattern pattern = Pattern.compile("/tenant/(?<tenantId>[^/]+)");
        Matcher matcher = pattern.matcher(requestUri);
        if(matcher.find()) {
            return matcher.group("tenantId");
        }
        return "";
    }
}