package com.grocery.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.service.UserService;
import com.grocery.security.model.SecurityUser;

@Service
public class AppUserOidcUserService extends OidcUserService {

    @Autowired
    private UserService userService;
    
    @Override
    public OidcUser loadUser(OidcUserRequest request) {
        // load the OidcUser from the UserInfo endoint
        OidcUser oidcUser = super.loadUser(request);
        
        String provider = request.getClientRegistration().getRegistrationId();
        User appUser = userService.resolveOidcUser(provider, oidcUser);

        return new SecurityUser(appUser, oidcUser);
    }

}