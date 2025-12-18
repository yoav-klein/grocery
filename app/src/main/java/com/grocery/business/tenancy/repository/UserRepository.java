package com.grocery.business.tenancy.repository;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.grocery.business.tenancy.model.User;

@Repository
public class UserRepository {

    private final String GET_USER_BY_EMAIL = "SELECT * FROM tenant_system.users WHERE email = ?";
    private final String GET_USER_BY_ID = "SELECT * FROM tenant_system.users WHERE id = ?";
    private final String ADD_USER = "INSERT INTO tenant_system.users VALUES(?, ?, ?, ?)";

    private JdbcTemplate jdbcTemplate;

    public UserRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    private final RowMapper<User> userRowMapper = (resultSet, rowNum) -> {
        User user = new User();
        user.setId(resultSet.getString("id"));
        user.setName(resultSet.getString("name"));
        user.setEmail(resultSet.getString("email"));
        user.setPictureUrl(resultSet.getString("picture_url"));

        return user;
    };

    public Optional<User> findUserByEmail(String email) {
        User user;
        try {
            user = this.jdbcTemplate.queryForObject(GET_USER_BY_EMAIL, userRowMapper, email);
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        return Optional.of(user);
    }

    public Optional<User> findUserById(String id) {
        User user;
        try {
            user = this.jdbcTemplate.queryForObject(GET_USER_BY_ID, userRowMapper, id);
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        return Optional.of(user);
        
    }

    public void addUser(User user) {
        System.out.println("Adding user: " + user.getId() + "name: " + user.getName() + " email: " + user.getEmail());
        this.jdbcTemplate.update(ADD_USER, user.getId(), user.getName(), user.getEmail(), user.getPictureUrl());
    }
}
