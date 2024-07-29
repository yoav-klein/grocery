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

    private static final String GET_ALL_ITEMS = "select item.id, item.name AS ItemName, category.name AS Category, " +  
    "item.quantity AS Quantity, quantity_type.name AS QuantityType " +  
    "from item JOIN category ON item.category_id = category.id " +
    "JOIN quantity_type ON item.quantity_type_id = quantity_type.id";

    private static final String ADD_ITEM = "INSERT INTO item (name, category_id, quantity, quantity_type_id) " + 
    "VALUES(?, (SELECT id AS category_id FROM category WHERE ? = name), ?, (SELECT id AS quantity_type_id FROM quantity_type WHERE ? = name))";
    
    private static final String DELETE_ITEM = "DELETE FROM item WHERE id = ?";
    
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); 
    }

    public List<Item> getAllItems() {
        return this.jdbcTemplate.query(GET_ALL_ITEMS, 
            (resultSet, rowNum) -> {
            Item item = new Item();
            item.setId(resultSet.getInt("id"));
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
    public void deleteItem(int id) {
        this.jdbcTemplate.update(DELETE_ITEM, id);
        //this.jdbcTemplate.update(DELETE_ITEM, item.getName(), item.getCategory().toString(), item.getQuantityType().toString());
    }
    
    
}