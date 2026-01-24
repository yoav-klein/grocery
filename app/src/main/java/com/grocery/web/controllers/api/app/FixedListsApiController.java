package com.grocery.web.controllers.api.app;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;

import com.grocery.business.domain.dto.FixedListRequest;
import com.grocery.business.domain.dto.FixedListEditRequest;
import com.grocery.business.domain.exception.FixedListAlreadyExistsException;
import com.grocery.business.domain.exception.FixedListNotFoundException;
import com.grocery.business.domain.service.FixedListsService;

@Controller
@RequestMapping("/tenant/{tenantId}/lists")
public class FixedListsApiController {

    @Autowired
    private FixedListsService fixedListsService;
    
    // new list
    @PostMapping("/addList")
    public ResponseEntity<Integer> createList(@PathVariable("tenantId") String tenantId, @Validated @RequestBody FixedListRequest fixedListRequest) throws FixedListAlreadyExistsException {
        
        int listId = fixedListsService.createFixedList(tenantId, fixedListRequest.getListName(), fixedListRequest.getProductIds());

        return new ResponseEntity<Integer>(Integer.valueOf(listId), HttpStatus.OK);
    }

    // patch list
    @PutMapping("/{listId}")
    public ResponseEntity editList(@PathVariable("tenantId") String tenantId, @PathVariable("listId") int listId, @RequestBody FixedListEditRequest fixedListEditRequest) throws FixedListNotFoundException {
        fixedListsService.editFixedList(tenantId,
            listId,
            fixedListEditRequest.getListName(),
            fixedListEditRequest.getAddProducts(), 
            fixedListEditRequest.getRemoveProducts());

        return new ResponseEntity(HttpStatus.OK);
    }
    
}

