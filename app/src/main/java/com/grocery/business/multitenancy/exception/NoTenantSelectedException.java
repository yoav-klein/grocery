package com.grocery.business.multitenancy.exception;

public class NoTenantSelectedException extends Exception {
    public NoTenantSelectedException(String message) {
        super(message);
    }

    public NoTenantSelectedException() {
        super();
    }
}