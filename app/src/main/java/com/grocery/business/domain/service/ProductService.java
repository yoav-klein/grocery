package com.grocery.business.domain.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.domain.repository.ProductDAO;

import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;

@Service
public class ProductService {
    
    private ProductDAO productRepository;

    @Autowired
    public void setProductDao(ProductDAO dao) {
        this.productRepository = dao;
    }

    public Map<ProductCategory, List<Product>> getProductsByCategory() {
        return this.productRepository.getAllProducts().stream().collect(Collectors.groupingBy(Product::getCategory));
    }

    public void addProduct(Product product) {
        this.productRepository.addProduct(product);
    }

    public List<Product> getAllProducts() {
        return this.productRepository.getAllProducts();
    }

    public void deleteProduct(int id) {
        this.productRepository.deleteProduct(id);
    }

    public Product getProductById(int id) {
        return this.productRepository.getProductById(id);
    }

}
