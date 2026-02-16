package com.grocery.business.domain.repository;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;

@Repository
public class ListProductDAO {

    private final String ADD_PRODUCT_TO_LIST = "INSERT INTO tenant_%s.list_product(list_id, product_id) VALUES(?, ?)";
    
    private final String DELETE_PRODUCT_FROM_LIST = "DELETE FROM tenant_%s.list_product WHERE list_id = ? AND product_id = ?";

    private final String FIND_ALL_PRODUCTS_FOR_LIST = "SELECT products.id, products.name AS ProductName, category.name AS Category, qt.name AS QuantityType " +
        "FROM tenant_<TENANT_ID>.list_product lp " +
        "JOIN tenant_<TENANT_ID>.products products ON lp.product_id = products.id " + 
        "JOIN grocery_global.category category ON products.category_id = category.id " +
        "JOIN grocery_global.quantity_type qt ON products.quantity_type_id = qt.id " +
        "WHERE list_id = ?";

    private JdbcTemplate jdbcTemplate;

    private final RowMapper<Product> productRowMapper = (resultSet, rowNum) -> {
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
    
    public void addProductToList(String tenantId, int listId, int productId) {
        this.jdbcTemplate.update(String.format(ADD_PRODUCT_TO_LIST, tenantId), listId, productId);
    }

    public List<Product> getAllProductsForList(String tenantId, int listId) {
        return this.jdbcTemplate.query(FIND_ALL_PRODUCTS_FOR_LIST.replace("<TENANT_ID>", tenantId), productRowMapper, listId);
    }

    public void batchAddProductsToList(String tenantId, int listId, List<Integer> productIds) {
        List<Object[]> batch = new ArrayList<>();

        for(Integer productId : productIds) {
            batch.add(new Object[] { listId, productId });
        }

        this.jdbcTemplate.batchUpdate(String.format(ADD_PRODUCT_TO_LIST, tenantId), batch);
    }

    private void batchRemoveProductsFromList(String tenantId, int listId, List<Integer> productIds) { 
        List<Object[]> batch = new ArrayList<>();

        for(Integer productId : productIds) {
            batch.add(new Object[] { listId, productId });
        }

        this.jdbcTemplate.batchUpdate(String.format(DELETE_PRODUCT_FROM_LIST, tenantId), batch);
    }


    public void editProducts(String tenantId, int listId, List<Integer> addProducts, List<Integer> removeProducts) {
        batchAddProductsToList(tenantId, listId, addProducts);
        batchRemoveProductsFromList(tenantId, listId, removeProducts);
    }

}
