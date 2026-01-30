package com.grocery.business.domain.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.dao.EmptyResultDataAccessException;

import com.grocery.business.domain.dto.ProductRequest;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;
import com.grocery.business.domain.exception.ProductAlreadyExistsException;

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

    public Optional<Product> findProductById(String tenantId, int productId) {
        try {
            return Optional.of(jdbcTemplate.queryForObject(String.format(FIND_PRODUCT_BY_ID, tenantId), rowMapper, productId));
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        
    }

    public int addProduct(String tenantId, ProductRequest product) throws ProductAlreadyExistsException {
        String statement = String.format(ADD_PRODUCT, tenantId);

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            this.jdbcTemplate.update(
                new PreparedStatementCreator() {
                    public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
                        PreparedStatement ps = conn.prepareStatement(statement, new String[] {"id"});
                        ps.setString(1, product.getName());
                        ps.setString(2, product.getCategory().toString());
                        ps.setString(3, product.getQuantityType().toString());
                        
                        return ps;
                    }
                }, keyHolder
            );
        } catch(org.springframework.dao.DuplicateKeyException e) {
            throw new ProductAlreadyExistsException(product.getName(), product.getCategory());
        }
        
        int id = keyHolder.getKey().intValue();

        return id;
    }

    public void deleteProduct(String tenantId, int id) {
        this.jdbcTemplate.update(String.format(DELETE_PRODUCT, tenantId), id);
    }

    public List<Product> getAllProducts(String tenantId) {
        return jdbcTemplate.query(String.format(GET_ALL_PRODUCTS, tenantId), this.rowMapper);
    }

    
}