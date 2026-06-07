package com.grocery.business.tenancy.dto;

import jakarta.validation.constraints.Size;
import com.grocery.business.tenancy.model.Language;

public class TenantRequest {

    @Size(min=2, max=20)
    private String tenantName;
    private Language defaultLanguage;

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }

    public Language getDefaultLanguage() {
        return defaultLanguage;
    }

    public void setDefaultLanguage(Language defaultLanguage) {
        this.defaultLanguage = defaultLanguage;
    }

    
}
