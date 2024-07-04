package com.grocery.business.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.entities.repositories.ItemRepository;
import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;

@Service
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        
        return this.itemRepository.findAll();
    }

    public Map<ItemCategory, List<Item>> getItemsByCategory() {
        return this.itemRepository.findAll().stream().collect(Collectors.groupingBy(Item::getCategory));
    }

    public void add(Item item) {
        this.itemRepository.add(item);
    }
}
