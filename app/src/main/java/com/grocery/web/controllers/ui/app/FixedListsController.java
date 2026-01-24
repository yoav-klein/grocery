package com.grocery.web.controllers.ui.app;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
        model.addAttribute("page", "addFixedList");
        model.addAttribute("productsByCategory", productService.getAllProducts(tenantId).stream().collect(Collectors.groupingBy(Product::getCategory)));
        model.addAttribute("mode", "add");
        
        return "fixed-list-editor";
    }
    
    @GetMapping("/edit/{listId}")
    public String editList(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("listId") int listId) throws FixedListNotFoundException {
        FixedList fixedList = fixedListsService.getFixedList(tenantId, listId);
        model.addAttribute("page", "fixedList" + fixedList.getId());
        model.addAttribute("fixedList", fixedList);
        model.addAttribute("productsByCategory", productService.getAllProducts(tenantId).stream().collect(Collectors.groupingBy(Product::getCategory)));
        model.addAttribute("listProductsByCategory", fixedList.getProducts().stream().collect(Collectors.groupingBy(Product::getCategory)));
        model.addAttribute("mode", "edit");

        return "fixed-list-editor";
    }

    @GetMapping("/{listId}")
    public String fixedList(Model model, @PathVariable("tenantId") String tenantId, @PathVariable("listId") int listId) throws FixedListNotFoundException {
        FixedList fixedList = fixedListsService.getFixedList(tenantId, listId);
        model.addAttribute("page", "fixedList" + fixedList.getId());
        model.addAttribute("fixedList", fixedList);
        model.addAttribute("productsByCategory", fixedList.getProducts().stream().collect(Collectors.groupingBy(Product::getCategory)));

        return "fixed-list";
    }

    // delete list
    @DeleteMapping("/{listId}")
    public String deleteList(@PathVariable("tenantId") String tenantId, @PathVariable("listId") int listId ) {
        fixedListsService.deleteFixedList(tenantId, listId);

        return String.format("redirect:/tenant/%s", tenantId);
    }
    
}

