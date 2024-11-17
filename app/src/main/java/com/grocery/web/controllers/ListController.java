package com.grocery.web.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.grocery.business.entities.ProductCategory;
import com.grocery.business.entities.ListItem;
import com.grocery.business.entities.Product;
import com.grocery.business.services.ListItemService;
import com.grocery.business.services.ProductService;
import com.grocery.business.forms.FullListForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ListController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ListItemService itemService;

    @ModelAttribute("itemsByCategory")
    public FullListForm populateItemsByCategory() {
        List<Product> allProducts = productService.getAllProducts();

        List<ListItem> allItems = new ArrayList<>();
        for(Product product : allProducts) {
            allItems.add(new ListItem(0, product.getName(), 0, product.getCategory(), product.getQuantityType()));
        }

        FullListForm form = new FullListForm();
        Map<ProductCategory, List<ListItem>> itemsByCategory = allItems.stream().collect(Collectors.groupingBy(ListItem::getCategory));

        form.setMap(itemsByCategory);
        
        return form;
    }
    
    
    @GetMapping("/myList")
    public String fixedList(Model model) {
        return "html/my-list";
    }

    @PostMapping("/insert")
    public String insert(@ModelAttribute("itemsByCategory") FullListForm list) {
        for(ProductCategory category : list.getMap().keySet()) {
            List<ListItem> items = list.getMap().get(category);

            for(ListItem item : items) {
                if(item.getQuantity() > 0) {
                    itemService.add(item);
                }
            }

        }

        return "redirect:/";
    }

}
