package com.grocery.business.domain.dto;

import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;

public class ListItemRequest {

    private String name;
    private QuantityType quantityType;
    private ProductCategory category;
    private int quantity;

    public ListItemRequest(String name, QuantityType quantityType, ProductCategory category, int quantity) {
        this.name = name;
        this.quantityType = quantityType;
        this.category = category;
        this.quantity = quantity;
    }

    public ListItemRequest() {}

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public QuantityType getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(QuantityType quantityType) {
        this.quantityType = quantityType;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return this.quantity + " " + this.quantityType +  " X " + this.name + "(" + this.category + ")";
    }

}
