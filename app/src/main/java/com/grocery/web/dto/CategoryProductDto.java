package com.grocery.web.dto;

import java.util.ArrayList;
import java.util.List;

public class CategoryProductDto {

    private List<CategoryProduct> categoryProducts = new ArrayList<>();

    public List<CategoryProduct> getCategoryProducts() {
        return categoryProducts;
    }

    public void setCategoryProducts(List<CategoryProduct> productCategories) {
        this.categoryProducts = productCategories;
    }

    
}
