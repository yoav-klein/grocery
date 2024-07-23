package com.grocery.business.entities;

public class Item {

    private String name;
    private int quantity;
    private ItemCategory category;
    private QuantityType quantityType;

    public QuantityType getQuantityType() {
        return quantityType;
    }

    public void setQuantityType(QuantityType quantityType) {
        this.quantityType = quantityType;
    }

    public Item() {}
    
    public Item(String name, int quantity, ItemCategory category, QuantityType quantityType) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
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
