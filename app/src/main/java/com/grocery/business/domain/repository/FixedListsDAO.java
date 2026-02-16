package com.grocery.business.domain.repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.DuplicateKeyException;

import com.grocery.business.domain.model.FixedList;
import com.grocery.business.domain.exception.FixedListNotFoundException;
import com.grocery.business.domain.exception.FixedListAlreadyExistsException;


@Repository
public class FixedListsDAO {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    private final static String FIND_ALL_FIXED_LISTS = "SELECT * FROM tenant_%s.lists";
    private final static String FIND_FIXED_LIST = "SELECT * FROM tenant_%s.lists WHERE id = ?";
    private final static String ADD_FIXED_LIST = "INSERT INTO tenant_%s.lists(name) VALUES(?)";
    private final static String DELETE_FIXED_LIST = "DELETE FROM tenant_%s.lists WHERE id = ?";
    private final static String UPDATE_LIST_NAME = "UPDATE tenant_%s.lists SET name = ? WHERE id = ?";

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); 
    }

    private final RowMapper<FixedList> fixedListMapper = (resultSet, rowNum) -> {
        FixedList fixedList = new FixedList();
        fixedList.setId(resultSet.getInt("id"));
        fixedList.setName(resultSet.getString("name"));

        return fixedList;
    };

    public List<FixedList> getAllFixedLists(String tenantId) {
        return jdbcTemplate.query(String.format(FIND_ALL_FIXED_LISTS, tenantId), fixedListMapper);
    }

    public Optional<FixedList> findFixedList(String tenantId, int listId) throws FixedListNotFoundException {
        try {
            return Optional.of(jdbcTemplate.queryForObject(String.format(FIND_FIXED_LIST, tenantId), fixedListMapper, listId));
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        } 
    }

    public int insertFixedList(String tenantId, String name) throws FixedListAlreadyExistsException {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        String statement = String.format(ADD_FIXED_LIST, tenantId);

        try {
            this.jdbcTemplate.update(new PreparedStatementCreator() {
                public PreparedStatement createPreparedStatement(Connection conn) throws SQLException {
                    PreparedStatement ps = conn.prepareStatement(statement, new String[] {"id"});
                    ps.setString(1, name);
    
                    return ps;
                }
            }, keyHolder);
        } catch(DuplicateKeyException e) {
            logger.error("fixed list with name: {} already exists", name);
            throw new FixedListAlreadyExistsException();
        } 

        return keyHolder.getKey().intValue();
    }

    public void deleteFixedList(String tenantId, int listId) {
        this.jdbcTemplate.update(String.format(DELETE_FIXED_LIST, tenantId), listId);
    }

    public void updateListName(String tenantId, int listId, String listName) throws FixedListNotFoundException {
        int rowsAffected = this.jdbcTemplate.update(String.format(UPDATE_LIST_NAME, tenantId), listName, listId);
        if(0 == rowsAffected) {
            throw new FixedListNotFoundException(listId);
        }
    }
    
}
