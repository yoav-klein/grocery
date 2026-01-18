package com.grocery.business.domain.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class FixedListRequest {
    @NotNull
    @Size(max=36, message="Name too long")
    @Size(min=2, message="Name too short")
    private String listName;

    @Size(min=1, message="List cannot be empty")
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
