package com.grocery.business.tenancy.model;
public class Invitation {
    private String id;
    private Tenant tenant;
    private User invitedBy;

    public Invitation() {
    }

    public Invitation(String id, Tenant tenant, User invitedBy) {
        this.id = id;
        this.tenant = tenant;
        this.invitedBy = invitedBy;
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

    public User getInvitedBy() {
        return invitedBy;
    }

    public void setInvitedBy(User invitedBy) {
        this.invitedBy = invitedBy;
    }
    
}