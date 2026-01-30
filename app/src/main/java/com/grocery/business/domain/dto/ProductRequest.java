package com.grocery.business.domain.dto;

import com.grocery.business.domain.model.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProductRequest {

    @NotNull
    @Size(max=48, message="Name too long")
    @Size(min=2, message="Name too short")
    private String name;

    private ProductCategory category;
    private QuantityType quantityType;

    public QuantityType getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(QuantityType quantityType) {
        this.quantityType = quantityType;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }
}
