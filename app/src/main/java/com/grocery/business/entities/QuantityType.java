package com.grocery.business.entities;

public enum QuantityType {
    KG("Kg"),
    UNIT("Unit");

    private final String displayName;

    QuantityType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return this.displayName;
    }
    
}
