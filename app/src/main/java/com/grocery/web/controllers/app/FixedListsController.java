package com.grocery.web.controllers.app;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.grocery.business.domain.dto.FixedListRequest;
import com.grocery.business.domain.exception.FixedListAlreadyExistsException;
import com.grocery.business.domain.exception.FixedListNotFoundException;
import com.grocery.business.domain.model.FixedList;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.service.FixedListsService;
import com.grocery.business.domain.service.ProductService;

@Controller
@RequestMapping("/tenant/{tenantId}/lists")
public class FixedListsController {

    @Autowired
    private FixedListsService fixedListsService;
    
    @Autowired
    private ProductService productService;

    @GetMapping("/addList")
    public String addList(Model model, @PathVariable("tenantId") String tenantId) {
        model.addAttribute("productsByCategory", productService.getAllProducts(tenantId).stream().collect(Collectors.groupingBy(Product::getCategory)));

        return "add-fixed-list";
    }

    @GetMapping("/{listId}")
    public String fixedList(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("listId") int listId) throws FixedListNotFoundException {
        FixedList fixedList = fixedListsService.getFixedList(tenantId, listId);
        model.addAttribute("fixedList", fixedList);
        model.addAttribute("productsByCategory", fixedList.getProducts().stream().collect(Collectors.groupingBy(Product::getCategory)));

        return "fixed-list";
    }

    // new list
    @PostMapping("/addList")
    public ResponseEntity<Integer> createList(@PathVariable("tenantId") String tenantId, @RequestBody FixedListRequest fixedListRequest) throws FixedListAlreadyExistsException {
        int listId = fixedListsService.createFixedList(tenantId, fixedListRequest.getListName(), fixedListRequest.getProductIds());

        return new ResponseEntity<Integer>(Integer.valueOf(listId), HttpStatus.OK);
    }
    
}

