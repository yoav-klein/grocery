package com.grocery.business.domain.repository;

import java.util.List;

import com.grocery.business.domain.model.ListItem;

public interface ListItemDAO {
    void addItem(ListItem item);
    List<ListItem> getAllItems();
    void deleteItem(int id);
    ListItem getItemByName(ListItem item);
    void addQuantity(ListItem target, int quantity);
}
