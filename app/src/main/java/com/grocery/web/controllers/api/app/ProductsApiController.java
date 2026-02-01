package com.grocery.web.controllers.api.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.grocery.business.domain.dto.ProductRequest;
import com.grocery.business.domain.exception.ProductAlreadyExistsException;
import com.grocery.business.domain.service.ProductService;

@Controller
@RequestMapping("/tenant/{tenantId}/products")
public class ProductsApiController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity addProduct(@PathVariable("tenantId") String tenantId, @RequestBody @Validated ProductRequest product) throws ProductAlreadyExistsException {
        
        productService.addProduct(tenantId, product);
        
        return new ResponseEntity(HttpStatus.OK);
    }

    @ExceptionHandler
    public final ProblemDetail handleProductAlreadyExistsException(ProductAlreadyExistsException e) {
        ProblemDetail pd = ProblemDetail.forStatus(409);
        pd.setTitle("Product already exists!");

        return pd;
    }

}
