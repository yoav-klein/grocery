package com.grocery.business.domain.dto;

import java.util.List;

public class FixedListRequest {
    private String listName;
    private List<Integer> productIds;

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public List<Integer> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<Integer> productIds) {
        this.productIds = productIds;
    }

    
}
