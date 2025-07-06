package com.grocery.business.domain.model;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Product {

    @NotNull
    @Size(max=48, message="Name too long")
    @Size(min=2, message="Name too short")
    private String name;

    private ProductCategory category;
    private QuantityType quantityType;
    private int productId = -1;
    
    public Product() {}
    
    public Product(String name, ProductCategory category, QuantityType quantityType) {
        this.name = name;
        this.category = category;
        this.quantityType = quantityType;
    }
    
    public Product(int productId, String name, ProductCategory category, QuantityType quantityType) {
        this(name, category, quantityType);
        this.productId = productId;
    }
    
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

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
