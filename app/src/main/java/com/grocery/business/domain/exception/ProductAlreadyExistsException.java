
package com.grocery.business.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.grocery.business.domain.model.ProductCategory;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Product already exists")
public class ProductAlreadyExistsException extends Exception {

    public final String name;
    public final ProductCategory category;

    public ProductAlreadyExistsException(String name, ProductCategory category) {
        super("Product already exists");
        this.name = name;
        this.category = category;
    }
}

