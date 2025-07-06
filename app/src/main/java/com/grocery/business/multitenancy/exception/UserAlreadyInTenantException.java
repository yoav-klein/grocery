package com.grocery.business.multitenancy.exception;

public class UserAlreadyInTenantException extends Exception {
    public UserAlreadyInTenantException(String message) {
        super(message);
    }

    public UserAlreadyInTenantException() {
        super();
    }
}