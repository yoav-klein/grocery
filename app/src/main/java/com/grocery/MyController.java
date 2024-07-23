package com.grocery;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;

import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;
import com.grocery.business.entities.QuantityType;
import com.grocery.business.services.ItemService;

import java.util.List;
import java.util.Map;


@Controller
public class MyController {

    @Autowired
    ItemService itemService;

    @ModelAttribute("allItems")
    public List<Item> populateItems(){
        return itemService.getAllItems();
    }

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
    
    @RequestMapping("/")
    public String index(Model model) {
        System.out.println("DEBUG: /");
        
        return "index"; // This corresponds to the view name
    }

    @PostMapping("/newItem")
    public String newItem(Item item) {
        System.out.println("DEBUG: Adding new item");
        System.out.println(item);
        itemService.add(item);

        return "redirect:/";
    }
    
}
