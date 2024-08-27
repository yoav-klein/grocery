package com.grocery.business.entities;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Item {

    private int id = -1;

    @NotNull
    @Size(max=48, message="Name too long")
    @Size(min=2, message="Name too short")
    private String name;

    @Min(value=1, message="Min quantity: 1")
    private int quantity;
    private ItemCategory category;
    private QuantityType quantityType;

    public Item() {}
    
    public Item(int id, String name, int quantity, ItemCategory category, QuantityType quantityType) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.quantityType = quantityType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
    public int getQuantity() {
        return quantity;
    }
    
    public ItemCategory getCategory() {
        return category;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return this.quantity + " " + this.quantityType.getDisplayName() + " X " + this.name + " " + this.category.getDisplayName(); 
    }
    
    
}
