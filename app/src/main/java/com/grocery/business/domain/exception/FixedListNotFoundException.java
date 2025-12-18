package com.grocery.business.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Fixed list not found")
public class FixedListNotFoundException extends Exception {

    public FixedListNotFoundException(int listId) {
        super(String.format("fixed list id: %d not found!", listId));
    }
}
