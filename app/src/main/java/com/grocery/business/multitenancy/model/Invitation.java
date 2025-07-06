package com.grocery.business.multitenancy.model;

public class Invitation {
    private String id;
    private Tenant tenant;
    private User user;

    public Invitation() {
    }

    public Invitation(String id, Tenant tenant, User user) {
        this.id = id;
        this.tenant = tenant;
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Tenant getTenant() {
        return tenant;
    }
    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
}