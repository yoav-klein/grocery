package com.grocery.business.tenancy.model;
public class UserProviderLink {
    private String userId;
    private String provider;
    private String providerSubject;

    public UserProviderLink() {
    }

    public UserProviderLink(String userId, String provider, String providerSubject) {
        this.userId = userId;
        this.provider = provider;
        this.providerSubject = providerSubject;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderSubject() {
        return providerSubject;
    }

    public void setProviderSubject(String providerSubject) {
        this.providerSubject = providerSubject;
    }
}