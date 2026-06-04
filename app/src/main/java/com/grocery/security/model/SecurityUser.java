package com.grocery.security.model;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import com.grocery.business.tenancy.model.User;

public class SecurityUser implements OidcUser {
    private User appUser;
    private OidcUser oidcUser;

    public SecurityUser(User appUser, OidcUser oidcUser) {
        this.appUser = appUser;
        this.oidcUser = oidcUser;
    }

    public SecurityUser() {}

    public User getAppUser() {
        return this.appUser;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.oidcUser.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.oidcUser.getAuthorities();
    }

    @Override
    public String getName() {
        return appUser.getId();
    }

    @Override
    public Map<String, Object> getClaims() {
        return this.oidcUser.getClaims();
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return this.oidcUser.getUserInfo();
    }

    @Override
    public OidcIdToken getIdToken() {
        return this.oidcUser.getIdToken();
    }

}
