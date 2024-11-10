package com.grocery.business.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.entities.repositories.ListItemDAO;
import com.grocery.business.entities.ListItem;
import com.grocery.business.entities.ProductCategory;

@Service
public class ListItemService {
    
    @Autowired
    private ListItemDAO itemRepository;

    public List<ListItem> getAllItems() {
        
        return this.itemRepository.getAllItems();
    }

    public Map<ProductCategory, List<ListItem>> getItemsByCategory() {
        return this.itemRepository.getAllItems().stream().collect(Collectors.groupingBy(ListItem::getCategory));
    }

    public void add(ListItem item) {
        if(isItemInList(item)) {
            this.itemRepository.addQuantity(item, item.getQuantity());
            return;
        }
        this.itemRepository.addItem(item);
    }

    public void deleteItem(int id) {
        this.itemRepository.deleteItem(id);
    }

    private boolean isItemInList(ListItem item) {
        ListItem requestedItem = itemRepository.getItemByName(item);

        return requestedItem != null;
    }
}
