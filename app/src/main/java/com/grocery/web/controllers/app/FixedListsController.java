package com.grocery.web.controllers.app;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.grocery.business.domain.dto.ProductQuantity;
import com.grocery.business.domain.exception.FixedListNotFoundException;
import com.grocery.business.domain.model.FixedList;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.service.FixedListsService;
import com.grocery.business.domain.service.CurrentListService;
import com.grocery.business.domain.service.ProductService;
import com.grocery.business.tenancy.exception.UserNotFoundException;

@Controller
@RequestMapping("/tenant/{tenantId}/lists")
public class FixedListsController {

    @Autowired
    private FixedListsService fixedListsService;
    
    @Autowired
    private ProductService productService;

    @Autowired
    private CurrentListService currentListService;

    @GetMapping("/addList")
    public String addList(Model model, @PathVariable("tenantId") String tenantId) {
        model.addAttribute("allProducts", productService.getAllProducts(tenantId));

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
    @PostMapping
    public String createList(@PathVariable("tenantId") String tenantId, @RequestParam("name") String name, @RequestParam("productIds") List<Integer> productIds) {
        fixedListsService.createFixedList(tenantId, name, productIds);

        return String.format("redirect:/tenant/%s", tenantId);
    }
    
}

