package com.grocery.business.multitenancy.exception;

public class UserNotExistsException extends Exception {
    public UserNotExistsException(String message) {
        super(message);
    }

    public UserNotExistsException() {
        super();
    }
    
}