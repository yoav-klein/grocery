package com.grocery.business.multitenancy.repository;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.grocery.business.multitenancy.model.Tenant;
import com.grocery.business.multitenancy.model.User;

@Repository
public class TenantUserRepository {
    private static final String ADD_USER_TO_TENANT = "INSERT INTO tenant_system.tenant_user(tenant_id, user_id, role) VALUES(?, ?, ?)";
    // private static final String REMOVE_ALL_TENANT_MEMBERS = "DELETE FROM tenant_system.tenant_user WHERE tenant_id = ?";
    private static final String REMOVE_USER_FROM_TENANT = "DELETE FROM tenant_system.tenant_user WHERE tenant_id = ? AND user_id = ?";
    private static final String GET_ALL_TENANTS_FOR_USER = "SELECT * FROM tenant_system.tenant_user WHERE user_id = ?";
    private static final String GET_ALL_USERS_FOR_TENANT = "SELECT * FROM tenant_system.tenant_user WHERE tenant_id = ?";
    private static final String IS_USER_PART_OF_TENANT = "SELECT COUNT(*) AS COUNT FROM tenant_system.tenant_user WHERE tenant_id = ? AND user_id = ?";
    private static final String GET_ROLE_OF_USER = "SELECT role FROM tenant_system.tenant_user WHERE tenant_id = ? AND user_id = ?";
    
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    TenantRepository tenantRepository;

    @Autowired
    UserRepository userRepository;

    private RowMapper<User> usersRowMapper = (rs, rowNum) -> {
        String userId = rs.getString("user_id");
        User user = userRepository.getUserById(userId).get();
        user.setRole(rs.getString("role"));

        return user;
    };

    private RowMapper<Tenant> tenantsRowMapper = (rs, rowNum) -> {
        String tenantId = rs.getString("tenant_id");
        Tenant tenant = tenantRepository.getTenantById(tenantId);
        tenant.setDisplayName(rs.getString("display_name"));

        return tenant;
    };
    
    
    public TenantUserRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void addUserToTenant(String tenantId, String userId, String role) {
        this.jdbcTemplate.update(ADD_USER_TO_TENANT, tenantId, userId, role);
    }

    public void removeUserFromTenant(String tenantId, String userId) {
        this.jdbcTemplate.update(REMOVE_USER_FROM_TENANT, tenantId, userId);
    }

    public List<Tenant> getAllTenantsForUser(String userId) {
        return this.jdbcTemplate.query(GET_ALL_TENANTS_FOR_USER, tenantsRowMapper, userId);
    }

    public List<User> getAllUsersForTenant(String tenantId) {
        return this.jdbcTemplate.query(GET_ALL_USERS_FOR_TENANT, usersRowMapper, tenantId);
    }
    
    
    public boolean isUserPartOfTenant(String userId, String tenantId) {
        return this.jdbcTemplate.queryForObject(IS_USER_PART_OF_TENANT, Integer.class, tenantId, userId) > 0;
    }

    public String getUserRole(String userId, String tenantId) {
        return this.jdbcTemplate.queryForObject(GET_ROLE_OF_USER, String.class, tenantId, userId);
    }
}