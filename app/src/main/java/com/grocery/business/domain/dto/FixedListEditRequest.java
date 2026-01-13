package com.grocery.business.domain.dto;

import java.util.List;

public class FixedListEditRequest {
    
    private String listName;
    private List<Integer> addProducts;
    private List<Integer> removeProducts;

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public List<Integer> getAddProducts() {
        return addProducts;
    }

    public void setAddProducts(List<Integer> addProducts) {
        this.addProducts = addProducts;
    }

    public List<Integer> getRemoveProducts() {
        return removeProducts;
    }

    public void setRemoveProducts(List<Integer> removeProducts) {
        this.removeProducts = removeProducts;
    }
    
}
