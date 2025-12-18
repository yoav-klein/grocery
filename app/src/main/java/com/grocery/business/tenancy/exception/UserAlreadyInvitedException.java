package com.grocery.business.tenancy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "User already invited to tenant")
public class UserAlreadyInvitedException extends Exception {
    public UserAlreadyInvitedException(String message) {
        super(message);
    }

    public UserAlreadyInvitedException() {
        super();
    }
}