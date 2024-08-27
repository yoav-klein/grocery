package com.grocery.business.entities.repositories;


import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.dao.EmptyResultDataAccessException;

import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;
import com.grocery.business.entities.QuantityType;

@Repository("itemDao")
public class ItemDAOJDBCImpl implements ItemDAO {

    private static final String GET_ALL_ITEMS = "select item.id, item.name AS ItemName, category.name AS Category, " +  
    "item.quantity AS Quantity, quantity_type.name AS QuantityType " +  
    "from item JOIN category ON item.category_id = category.id " +
    "JOIN quantity_type ON item.quantity_type_id = quantity_type.id";
    
    private static final String GET_ITEM_BY_NAME = GET_ALL_ITEMS + " WHERE item.name = ?";

    private static final String ADD_ITEM = "INSERT INTO item (name, category_id, quantity, quantity_type_id) " + 
    "VALUES(?, (SELECT id AS category_id FROM category WHERE ? = name), ?, (SELECT id AS quantity_type_id FROM quantity_type WHERE ? = name))";
    
    private static final String DELETE_ITEM = "DELETE FROM item WHERE id = ?";
    private static final String ADD_QUANTITY = "UPDATE item SET quantity = quantity + ? WHERE name = ?";

    private final RowMapper<Item> rowMapper = (resultSet, rowNum) -> {
        Item item = new Item();
        item.setId(resultSet.getInt("id"));
        item.setName(resultSet.getString("ItemName"));
        item.setCategory(ItemCategory.valueOf(resultSet.getString("Category")));
        item.setQuantity(resultSet.getInt("Quantity"));
        item.setQuantityType(QuantityType.valueOf(resultSet.getString("QuantityType")));
        return item;
    };

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); 
    }

    public List<Item> getAllItems() {
        return this.jdbcTemplate.query(GET_ALL_ITEMS, this.rowMapper);
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

    @Override 
    public Item getItemByName(Item item) {
        Item resItem = null;
        try {
            resItem = (Item)this.jdbcTemplate.queryForObject(GET_ITEM_BY_NAME, this.rowMapper, item.getName());
        } catch(EmptyResultDataAccessException e) {}
        
        return resItem;
    }
    
    @Override
    public void addQuantity(Item target, int quantity) {
        this.jdbcTemplate.update(ADD_QUANTITY, quantity, target.getName());
    }
    
}