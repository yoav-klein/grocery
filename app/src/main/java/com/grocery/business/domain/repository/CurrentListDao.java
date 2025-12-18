package com.grocery.business.domain.repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;
import java.sql.Connection;

import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;


import com.grocery.business.domain.model.CurrentListItem;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;
import com.grocery.business.tenancy.model.User;

@Repository
public class CurrentListDao {

    private JdbcTemplate jdbcTemplate;

    private final String FIND_ALL_ITEMS = """
        SELECT li.*, 
        u.id          as user_id, 
        u.name        as user_name, 
        u.picture_url as user_picture_url, 
        u.email       as user_email,
        category.name as category_name,
        qt.name as quantity_type_name
        FROM tenant_%s.items li 
        JOIN tenant_system.users u ON li.added_by = u.id
        JOIN grocery_global.category category ON li.category_id = category.id
        JOIN grocery_global.quantity_type qt ON li.quantity_type_id = qt.id 
    """;

    private static final String SAVE_ITEM = """
        INSERT INTO tenant_%s.items (name, category_id, quantity, quantity_type_id, added_at, added_by) 
        VALUES(?, 
            (SELECT id AS category_id FROM grocery_global.category WHERE ? = name), 
            ?, 
            (SELECT id AS quantity_type_id FROM grocery_global.quantity_type WHERE ? = name),
            ?,
            ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    """;

    private static final String FIND_LAST_ITEM_ID = "SELECT MAX(ID) FROM tenant_%s.items";

    private static final String DELETE_ITEM_ID = "DELETE FROM tenant_%s.items WHERE id = ?";

    private final RowMapper<CurrentListItem> listItemRowMapper = (resultSet, rowNum) -> {
        CurrentListItem item = new CurrentListItem();
        User user = new User();
        user.setId(resultSet.getString("user_id"));
        user.setName(resultSet.getString("user_name"));
        user.setEmail(resultSet.getString("user_email"));
        user.setPictureUrl(resultSet.getString("user_picture_url"));
        item.setId(resultSet.getInt("id"));
        item.setName(resultSet.getString("name"));
        item.setQuantity(resultSet.getInt("quantity"));
        item.setCategory(ProductCategory.valueOf(resultSet.getString("category_name")));
        item.setQuantityType(QuantityType.valueOf(resultSet.getString("quantity_type_name")));
        LocalDateTime addedAt = resultSet.getTimestamp("added_at").toLocalDateTime();
        item.setAddedAt(addedAt);

        return item;
    };
    
    public CurrentListDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<CurrentListItem> getAllListItems(String tenantId) {
        return this.jdbcTemplate.query(String.format(FIND_ALL_ITEMS, tenantId), listItemRowMapper);
    }
    
    public int saveItem(String tenantId, String userId, CurrentListItem item) {
        String statement = String.format(SAVE_ITEM, tenantId);

        KeyHolder keyHolder = new GeneratedKeyHolder();
        this.jdbcTemplate.update(
            new PreparedStatementCreator() {
                public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
                    PreparedStatement ps = conn.prepareStatement(statement, new String[] {"id", "added_at"});
                    ps.setString(1, item.getName());
                    ps.setString(2, item.getCategory().toString());
                    ps.setInt(3, item.getQuantity());
                    ps.setString(4, item.getQuantityType().toString());
                    ps.setTimestamp(5, Timestamp.valueOf(item.getAddedAt()));
                    ps.setString(6, userId);
                    
                    return ps;
                }
            }, keyHolder
        );

        return keyHolder.getKey().intValue();
    }

    public void bulkSave(String tenantId, List<CurrentListItem> items) {
        String statement = String.format(SAVE_ITEM, tenantId);

        List<Object[]> batch = new ArrayList<>();
        for(CurrentListItem item : items) {
            Object[] params = new Object[] { 
                item.getName(),
                item.getCategory().toString(),
                item.getQuantity(),
                item.getQuantityType().toString(),
                Timestamp.valueOf(item.getAddedAt()),
                item.getAddedBy().getId()
             };
             batch.add(params);
        }

        this.jdbcTemplate.batchUpdate(statement, batch);
    }

    public void deleteItem(final String tenantId, final String itemId) {
        this.jdbcTemplate.update(String.format(DELETE_ITEM_ID, tenantId), itemId);
    }
}
