package com.grocery.business.entities.repositories;


import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;
import com.grocery.business.entities.QuantityType;

@Repository("itemDao")
public class ItemDAOJDBCImpl implements ItemDAO {

    private static final String GET_ALL_ITEMS = "select items.name AS ItemName, categories.name AS Category, " +  
    "items.quantity AS Quantity, quantitytypes.name AS QuantityType " +  
    "from items JOIN categories ON items.category_id = categories.id " +
    "JOIN quantitytypes ON items.quantity_type_id = quantitytypes.id";

    private static final String ADD_ITEM = "INSERT INTO items (name, category_id, quantity, quantity_type_id) " + 
    "VALUES(?, (SELECT id AS category_id FROM categories WHERE ? = name), ?, (SELECT id AS quantity_type_id FROM quantitytypes WHERE ? = name))";
    
    private static final String DELETE_ITEM = "DELETE FROM items WHERE name = ? AND category_id = (SELECT id FROM categories WHERE name = ?) " + 
    "AND quantity_type_id = (SELECT id FROM quantitytypes WHERE name = ?)";
    
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); 
    }

    public List<Item> getAllItems() {
        return this.jdbcTemplate.query(GET_ALL_ITEMS, 
            (resultSet, rowNum) -> {
            Item item = new Item();
            item.setName(resultSet.getString("ItemName"));
            item.setCategory(ItemCategory.valueOf(resultSet.getString("Category")));
            item.setQuantity(resultSet.getInt("Quantity"));
            item.setQuantityType(QuantityType.valueOf(resultSet.getString("QuantityType")));
            return item;
        });
    }

    @Override
    public void addItem(Item item) {
        this.jdbcTemplate.update(ADD_ITEM, item.getName(), item.getCategory().toString(), item.getQuantity(), item.getQuantityType().toString());
        
    }

    @Override
    public void deleteItem(Item item) {
        this.jdbcTemplate.update(DELETE_ITEM, item.getName(), item.getCategory().toString(), item.getQuantityType().toString());
        
    }
    
    
}