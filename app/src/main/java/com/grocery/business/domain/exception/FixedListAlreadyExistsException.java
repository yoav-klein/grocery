package com.grocery.business.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Fixed list with name already exists")
public class FixedListAlreadyExistsException extends Exception {

    public FixedListAlreadyExistsException() {
        super("Fixed list with name already exists");
    }
}
