package com.grocery.business.entities.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;
import com.grocery.business.entities.QuantityType;


@Repository
public class ItemRepository {
    private List<Item> items = new ArrayList<>();

    public ItemRepository() {
        items.add(new Item("Tomato", 5, ItemCategory.VEGETABLES, QuantityType.KG));
        items.add(new Item("Vodka", 1, ItemCategory.ALCOHOL, QuantityType.UNIT));
    }
    
    public List<Item> findAll() {
        return new ArrayList<Item>(this.items);
    }

    public void add(Item item) {
        items.add(item);
    }
    
}
