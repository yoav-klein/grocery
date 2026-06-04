package com.grocery.business.tenancy.repository.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import com.grocery.business.tenancy.model.User;

public class UserRowMapper implements RowMapper<User> {

    private String prefix = "";

    public UserRowMapper() {}

    public UserRowMapper(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();

        user.setId(rs.getString(this.prefix + "id"));
        user.setEmail(rs.getString(this.prefix + "email"));
        user.setDisplayName(rs.getString(this.prefix + "display_name"));
        user.setFirstName(rs.getString(this.prefix + "first_name"));
        user.setLastName(rs.getString(this.prefix + "last_name"));
        user.setPictureUrl(rs.getString(this.prefix + "picture_url"));

        return user;
    }
}
