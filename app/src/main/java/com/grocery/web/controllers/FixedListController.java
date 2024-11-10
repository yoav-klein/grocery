package com.grocery.web.controllers;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.grocery.business.entities.ProductCategory;
import com.grocery.business.entities.QuantityType;

import org.springframework.stereotype.Controller;

@Controller
public class FixedListController {
    
    @ModelAttribute("allQuantityTypes") 
    public QuantityType[] populateAllTypes() {
        return QuantityType.values();
    }

    @ModelAttribute("allCategories")
    public ProductCategory[] populateAllCategories() {
        return ProductCategory.values();
    }
    
    @GetMapping("/myList")
    public String fixedList(Model model) {
        return "html/my-list";
    }

    @GetMapping("/myProducts")
    public String myProducts(Model model) {
        return "html/my-products";
    }
}
