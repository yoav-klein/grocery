package com.grocery.web.dto;

import java.util.List;

import com.grocery.business.entities.Product;
import com.grocery.business.entities.ProductCategory;

public class CategoryProduct {
    ProductCategory category;
    List<Product> products;

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }


    public CategoryProduct(ProductCategory category, List<Product> products) {
        this.category = category;
        this.products = products;
    }
    
}
