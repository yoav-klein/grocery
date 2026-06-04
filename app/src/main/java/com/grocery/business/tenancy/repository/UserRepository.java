package com.grocery.business.tenancy.repository;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.repository.rowmappers.UserRowMapper;

@Repository
public class UserRepository {

    private final String FIND_USER_BY_EMAIL = "SELECT * FROM tenant_system.users WHERE email = ?";
    private final String FIND_USER_BY_ID = "SELECT * FROM tenant_system.users WHERE id = ?";
    private final String ADD_USER = "INSERT INTO tenant_system.users(id, email, first_name, last_name, display_name, picture_url) VALUES(?, ?, ?, ?, ?, ?)";

    private JdbcTemplate jdbcTemplate;

    public UserRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public final RowMapper<User> userRowMapper = new UserRowMapper();

    public Optional<User> findByEmail(String email) {
        User user;
        try {
            user = this.jdbcTemplate.queryForObject(FIND_USER_BY_EMAIL, userRowMapper, email);
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        return Optional.of(user);
    }

    public Optional<User> findById(String id) {
        User user;
        try {
            user = this.jdbcTemplate.queryForObject(FIND_USER_BY_ID, userRowMapper, id);
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        return Optional.of(user);
        
    }

    public void save(User user) {
        this.jdbcTemplate.update(ADD_USER, 
            user.getId(),
            user.getEmail(), 
            user.getFirstName(), 
            user.getLastName(), 
            user.getDisplayName(), 
            user.getPictureUrl()
        );
    }

    public Optional<User> findByProviderAndSubject(String provider, String providerSubject) {
        try {
            User user = this.jdbcTemplate.queryForObject("SELECT * FROM tenant_system.users WHERE id = (SELECT user_id FROM tenant_system.user_provider WHERE provider = ? AND provider_subject = ?)", userRowMapper, provider, providerSubject);
            return Optional.of(user);
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}
