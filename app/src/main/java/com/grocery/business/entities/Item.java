package com.grocery.business.entities;

public class Item {

    private String name;
    private Integer quantity;
    private ItemCategory category;

    public Item(String name, int quantity, ItemCategory category) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
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
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ItemCategory getCategory() {
        return category;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setCategory(ItemCategory category) {
        this.category = category;
    }

    
    
}
