package com.grocery.business.tenancy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "User is already in tenant")
public class UserAlreadyInTenantException extends Exception {
    public UserAlreadyInTenantException(String message) {
        super(message);
    }

    public UserAlreadyInTenantException() {
        super();
    }
}
