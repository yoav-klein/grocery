package com.grocery.business.entities;

public class Item {

    private int id = -1;
    private String name;
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
