package com.grocery.business.domain.repository;

import java.util.List;

import com.grocery.business.domain.model.Product;

public interface ProductDAO {
    void addProduct(Product product);
    List<Product> getAllProducts();
    void deleteProduct(int id);
    Product getProductById(int id);
}
