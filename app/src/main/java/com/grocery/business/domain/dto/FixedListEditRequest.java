package com.grocery.business.domain.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FixedListEditRequest {
    
    @NotNull
    @Size(max=36, message="Name too long")
    @Size(min=2, message="Name too short")
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
