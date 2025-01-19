package com.grocery.business.entities.repositories;

import java.util.List;

import com.grocery.business.entities.Product;


public interface ProductDAO {
    void addProduct(Product product);
    List<Product> getAllProducts();
    void deleteProduct(int id);
    Product getProductById(int id);
}
