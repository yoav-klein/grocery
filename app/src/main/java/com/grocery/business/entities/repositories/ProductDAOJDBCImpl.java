package com.grocery.business.entities.repositories;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.dao.EmptyResultDataAccessException;

import com.grocery.business.entities.Product;
import com.grocery.business.entities.ProductCategory;
import com.grocery.business.entities.QuantityType;

@Repository("productDao")
public class ProductDAOJDBCImpl implements ProductDAO {

    // SQL STATEMENTS

    private static final String GET_ALL_PRODUCTS = "SELECT product.id, product.name AS ProductName, category.name AS Category, " +  
        "quantity_type.name AS QuantityType " +  
        "FROM product JOIN category ON product.category_id = category.id " +
        "JOIN quantity_type ON product.quantity_type_id = quantity_type.id";

    private static final String ADD_PRODUCT = "INSERT INTO product (name, category_id, quantity_type_id) " + 
    "VALUES(?, (SELECT id AS category_id FROM category WHERE ? = name), (SELECT id AS quantity_type_id FROM quantity_type WHERE ? = name))";

    private static final String DELETE_PRODUCT = "DELETE FROM product WHERE id = ?";

    private static final String GET_PRODUCT_BY_ID = "SELECT product.id, product.name AS productName, category.name AS category, " +
        "quantity_type.name AS QuantityType " +
        "FROM product JOIN category ON product.category_id = category.id " +
        "JOIN quantity_type ON product.quantity_type_id = quantity_type.id " +
        "WHERE product.id = ?"; 

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

    @Override
    public void addProduct(Product product) {
        this.jdbcTemplate.update(ADD_PRODUCT, product.getName(), product.getCategory().toString(), product.getQuantityType().toString());
        
    }

    @Override
    public void deleteProduct(int id) {
        this.jdbcTemplate.update(DELETE_PRODUCT, id);
    }

    @Override
    public List<Product> getAllProducts() {
        return jdbcTemplate.query(GET_ALL_PRODUCTS, this.rowMapper);
    }

    @Override
    public Product getProductById(int id) {
        Product p = null;
        try {
            p = jdbcTemplate.queryForObject(GET_PRODUCT_BY_ID, this.rowMapper, id);
        } catch(EmptyResultDataAccessException e) {}
        
        return p;
    }
    
}
