package com.grocery.web.dto;

import java.util.List;
import java.util.ArrayList;

public class ProductQuantityDto {
    private List<List<ProductQuantity>> productQuantities = new ArrayList<>();

    public List<List<ProductQuantity>> getProductQuantities() {
        return productQuantities;
    }

    public void setProductQuantities(List<List<ProductQuantity>> productQuantities) {
        this.productQuantities = productQuantities;
    }

}
