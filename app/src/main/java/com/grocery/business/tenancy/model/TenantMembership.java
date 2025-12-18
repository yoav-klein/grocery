package com.grocery.business.tenancy.model;

import java.time.LocalDateTime;

public class TenantMembership {
    private User user;
    private Tenant tenant;
    private String role;
    private LocalDateTime since;
    private LocalDateTime adminSince;

    public TenantMembership(User user, Tenant tenant, String role, LocalDateTime since, LocalDateTime adminSince) {
        this.user = user;
        this.tenant = tenant;
        this.role = role;
        this.since = since;
        this.adminSince = adminSince;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Tenant getTenant() {
        return tenant;
    }
    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public LocalDateTime getSince() {
        return since;
    }
    public void setSince(LocalDateTime since) {
        this.since = since;
    }
    public LocalDateTime getAdminSince() {
        return adminSince;
    }
    public void setAdminSince(LocalDateTime adminSince) {
        this.adminSince = adminSince;
    }
}