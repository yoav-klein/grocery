package com.grocery.business.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Fixed list not found")
public class ProductNotFoundException extends Exception {
    
    public ProductNotFoundException(int productId) {
        super(String.format("product %d not found", productId));
    }
}
