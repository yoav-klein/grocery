package com.grocery.business.forms;

import com.grocery.business.entities.ProductCategory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.grocery.business.entities.ListItem;

public class FullListForm {
    private Map<ProductCategory, List<ListItem>> map;

    public FullListForm() {
        map = new HashMap<>();
    }

    public void setMap(Map<ProductCategory, List<ListItem>> map) {
        this.map = map;
    }

    public Map<ProductCategory, List<ListItem>> getMap() {
        return this.map;
    }
    
}
