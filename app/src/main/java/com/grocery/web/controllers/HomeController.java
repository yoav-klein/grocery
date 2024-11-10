package com.grocery.web.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;


import com.grocery.business.entities.ListItem;
import com.grocery.business.entities.ProductCategory;
import com.grocery.business.entities.QuantityType;
import com.grocery.business.services.ItemService;

import java.util.List;
import java.util.Map;


@Controller
public class HomeController {

    @Autowired
    ItemService itemService;

    @ModelAttribute("itemsByCategory")
    public Map<ProductCategory, List<ListItem>> populateItemsByCategory() {
        return itemService.getItemsByCategory();
    }

    @ModelAttribute("item") 
    public ListItem populateItem() {
        return new ListItem();
    }

    @ModelAttribute("allQuantityTypes") 
    public QuantityType[] populateAllTypes() {
        return QuantityType.values();
    }

    @ModelAttribute("allCategories")
    public ProductCategory[] populateAllCategories() {
        return ProductCategory.values();
    }

    
    @GetMapping("/")
    public String index(Model model) {
        
        return "html/index"; // This corresponds to the view name
    }


    @PostMapping("/newItem")
    public String newItem(@Validated @ModelAttribute ListItem item, BindingResult result) {
        if(result.hasErrors()) {
            return "html/index";
        }
        itemService.add(item);

        return "redirect:/";
    }
    
    @GetMapping("/deleteItem")
    public String deleteItem(@RequestParam("id") int id) {
        this.itemService.deleteItem(id);
        return "redirect:/";
    }

    @GetMapping("/css/dynamic.css")
    public String getCss() {
        return "css/dynamic";
    }

}
