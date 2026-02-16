package com.grocery.web.controllers.api.app;


import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.WebRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.grocery.business.domain.dto.FixedListRequest;
import com.grocery.business.domain.dto.FixedListEditRequest;
import com.grocery.business.domain.exception.FixedListAlreadyExistsException;
import com.grocery.business.domain.exception.FixedListNotFoundException;
import com.grocery.business.domain.exception.ProductNotFoundException;
import com.grocery.business.domain.service.FixedListsService;

@Controller
@RequestMapping("/tenant/{tenantId}/lists")
public class FixedListsApiController {

    @Autowired
    private FixedListsService fixedListsService;
    
    // new list
    @PostMapping("/addList")
    public ResponseEntity<Integer> createList(@PathVariable("tenantId") String tenantId, @Validated @RequestBody FixedListRequest fixedListRequest) throws FixedListAlreadyExistsException, ProductNotFoundException {
        
        int listId = fixedListsService.addFixedList(tenantId, fixedListRequest.getListName(), fixedListRequest.getProductIds());

        return new ResponseEntity<>(listId, HttpStatus.OK);
    }

    // patch list
    @PutMapping("/{listId}")
    public ResponseEntity<Object> editList(@PathVariable("tenantId") String tenantId, @PathVariable("listId") int listId, @Validated @RequestBody FixedListEditRequest fixedListEditRequest) throws FixedListNotFoundException {
        fixedListsService.editFixedList(tenantId,
            listId,
            fixedListEditRequest.getListName(),
            fixedListEditRequest.getAddProducts(), 
            fixedListEditRequest.getRemoveProducts());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity<Object> handleDuplicateFixedList(FixedListAlreadyExistsException e) {
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public final ProblemDetail handleFixedListNotFound(FixedListNotFoundException e) {
        ProblemDetail pd = ProblemDetail.forStatus(404);
        pd.setType(URI.create("fixed-list-not-found"));
        pd.setTitle("Fixed list not found"); // TODO: localize message
        
        return pd;
    }

    @ExceptionHandler
    public final ProblemDetail handleProductNotFoundException(ProductNotFoundException ex) throws Exception {
        ProblemDetail pd = ProblemDetail.forStatus(404);
        pd.setType(URI.create("product-not-found"));
        pd.setTitle("Product not found"); // TODO: localize message
        
        return pd;
    }
    
}

