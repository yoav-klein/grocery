package com.grocery.business.domain.model;

import java.util.List;

public class FixedList {
    
    private String name;
    private int id;
    private List<Product> products;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }   

    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
    
}
