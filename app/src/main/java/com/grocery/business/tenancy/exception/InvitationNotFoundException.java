package com.grocery.business.tenancy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Invitation not found")
public class InvitationNotFoundException extends Exception {
    
}