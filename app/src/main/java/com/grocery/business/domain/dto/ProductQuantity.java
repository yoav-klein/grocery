package com.grocery.business.domain.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class ProductQuantity {
    
    private int id;

    @Min(1)
    private int quantity;

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


}
