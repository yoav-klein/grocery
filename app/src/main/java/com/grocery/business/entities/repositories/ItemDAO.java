package com.grocery.business.entities.repositories;

import java.util.List;


import com.grocery.business.entities.Item;

public interface ItemDAO {
    void addItem(Item item);
    List<Item> getAllItems();
    void deleteItem(int id);
    
}
