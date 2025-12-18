package com.grocery.business.domain.repository;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;

@Repository("productDao")
public class ProductDAO {

    private static final String FIND_PRODUCT_BY_ID = "SELECT products.id, products.name AS ProductName, grocery_global.category.name AS Category, " +  
        "grocery_global.quantity_type.name AS QuantityType " +  
        "FROM tenant_%s.products products JOIN grocery_global.category ON products.category_id = grocery_global.category.id " +
        "JOIN grocery_global.quantity_type ON products.quantity_type_id = grocery_global.quantity_type.id WHERE products.id = ?";

    private static final String GET_ALL_PRODUCTS = "SELECT products.id, products.name AS ProductName, grocery_global.category.name AS Category, " +  
        "grocery_global.quantity_type.name AS QuantityType " +  
        "FROM tenant_%s.products products JOIN grocery_global.category ON products.category_id = grocery_global.category.id " +
        "JOIN grocery_global.quantity_type ON products.quantity_type_id = grocery_global.quantity_type.id";

    private static final String ADD_PRODUCT = "INSERT INTO tenant_%s.products (name, category_id, quantity_type_id) " + 
        "VALUES(?, (SELECT id AS category_id FROM grocery_global.category WHERE ? = name), (SELECT id AS quantity_type_id FROM grocery_global.quantity_type WHERE ? = name))";

    private static final String DELETE_PRODUCT = "DELETE FROM tenant_%s.products WHERE id = ?";

    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Product> rowMapper = (resultSet, rowNum) -> {
        Product product = new Product();
        product.setProductId(resultSet.getInt("id"));
        product.setName(resultSet.getString("ProductName"));
        product.setCategory(ProductCategory.valueOf(resultSet.getString("Category")));
        product.setQuantityType(QuantityType.valueOf(resultSet.getString("QuantityType")));
        return product;
    };

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); 
    }

    public Product findProductById(String tenantId, int productId) {
        return jdbcTemplate.queryForObject(String.format(FIND_PRODUCT_BY_ID, tenantId), rowMapper, productId);
    }

    public void addProduct(String tenantId, Product product) {
        this.jdbcTemplate.update(String.format(ADD_PRODUCT, tenantId), product.getName(), product.getCategory().toString(), product.getQuantityType().toString());
        
    }

    public void deleteProduct(String tenantId, int id) {
        this.jdbcTemplate.update(String.format(DELETE_PRODUCT, tenantId), id);
    }

    public List<Product> getAllProducts(String tenantId) {
        return jdbcTemplate.query(String.format(GET_ALL_PRODUCTS, tenantId), this.rowMapper);
    }

    
}