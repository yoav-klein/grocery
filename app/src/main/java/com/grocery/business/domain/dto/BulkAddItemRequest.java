package com.grocery.business.domain.dto;

import java.util.List;

import jakarta.validation.Valid;

public class BulkAddItemRequest {
    @Valid
    private List<ProductQuantity> productQuantityList;

    public List<ProductQuantity> getProductQuantityList() {
        return productQuantityList;
    }

    public void setProductQuantityList(List<ProductQuantity> productQuantityList) {
        this.productQuantityList = productQuantityList;
    }


}
