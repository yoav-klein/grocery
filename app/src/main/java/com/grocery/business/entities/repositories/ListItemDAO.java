package com.grocery.business.entities.repositories;

import java.util.List;


import com.grocery.business.entities.ListItem;

public interface ListItemDAO {
    void addItem(ListItem item);
    List<ListItem> getAllItems();
    void deleteItem(int id);
    ListItem getItemByName(ListItem item);
    void addQuantity(ListItem target, int quantity);
}
