package com.grocery.business.domain.model;

import java.time.LocalDateTime;
import com.grocery.business.tenancy.model.User;
import jakarta.validation.constraints.Min;

public class CurrentListItem extends Product {

    private int id = -1;

    @Min(value=1, message="Min quantity: 1")
    private int quantity;

    private LocalDateTime addedAt;
    private User addedBy;
    
    public CurrentListItem() {
        super();
    }
    
    public CurrentListItem(int id, String name, int quantity, ProductCategory category, QuantityType quantityType, User addedBy, LocalDateTime addedAt) {
        super(name, category, quantityType);
        this.id = id;
        this.quantity = quantity;
        this.addedBy = addedBy;
        this.addedAt = addedAt;
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

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    public User getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(User addedBy) {
        this.addedBy = addedBy;
    }
    
    
}