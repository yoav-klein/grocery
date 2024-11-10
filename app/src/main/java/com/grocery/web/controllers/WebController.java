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


import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;
import com.grocery.business.entities.QuantityType;
import com.grocery.business.services.ItemService;

import java.util.List;
import java.util.Map;


@Controller
public class WebController {

    @Autowired
    ItemService itemService;

    @ModelAttribute("itemsByCategory")
    public Map<ItemCategory, List<Item>> populateItemsByCategory() {
        return itemService.getItemsByCategory();
    }

    @ModelAttribute("item") 
    public Item populateItem() {
        return new Item();
    }

    @ModelAttribute("allQuantityTypes") 
    public QuantityType[] populateAllTypes() {
        return QuantityType.values();
    }

    @ModelAttribute("allCategories")
    public ItemCategory[] populateAllCategories() {
        return ItemCategory.values();
    }

    
    @GetMapping("/")
    public String index(Model model) {
        
        return "html/index"; // This corresponds to the view name
    }

    @GetMapping("/myList")
    public String fixedList(Model model) {
        return "html/my-list";
    }

    @GetMapping("/myProducts")
    public String myProducts(Model model) {
        return "html/my-products";
    }

    @PostMapping("/newItem")
    public String newItem(@Validated @ModelAttribute Item item, BindingResult result) {
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
