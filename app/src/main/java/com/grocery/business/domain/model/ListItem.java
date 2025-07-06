package com.grocery.business.domain.model;

import jakarta.validation.constraints.Min;

public class ListItem extends Product {

    private int id = -1;

    @Min(value=1, message="Min quantity: 1")
    private int quantity;
    
    public ListItem() {
        super();
    }
    
    public ListItem(int id, String name, int quantity, ProductCategory category, QuantityType quantityType) {
        super(name, category, quantityType);
        this.id = id;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return this.quantity + " " + this.getQuantityType().getDisplayName() + " X " + this.getName() + " " + this.getCategory().getDisplayName(); 
    }
    
    
}
