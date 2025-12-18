package com.grocery.business.domain.service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.domain.repository.ProductDAO;

import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;

@Service
public class ProductService {
    
    private ProductDAO productRepository;

    @Autowired
    public void setProductDao(ProductDAO dao) {
        this.productRepository = dao;
    }

    public Map<ProductCategory, List<Product>> getProductsByCategory(String tenantId) {
        return this.productRepository.getAllProducts(tenantId).stream().collect(Collectors.groupingBy(Product::getCategory));
    }

    public void addProduct(String tenantId, Product product) {
        this.productRepository.addProduct(tenantId, product);
    }

    public Product getProductById(String tenantId, int productId) {
        return this.productRepository.findProductById(tenantId, productId);
    }

    public List<Product> getAllProducts(String tenantId) {
        return this.productRepository.getAllProducts(tenantId);
    }

    public void deleteProduct(String tenantId, int id) {
        this.productRepository.deleteProduct(tenantId, id);
    }

}