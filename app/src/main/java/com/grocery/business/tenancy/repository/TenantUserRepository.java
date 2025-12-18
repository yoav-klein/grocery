package com.grocery.business.tenancy.repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.grocery.business.tenancy.model.Tenant;
import com.grocery.business.tenancy.model.TenantMembership;
import com.grocery.business.tenancy.model.User;

@Repository
public class TenantUserRepository {
    private static final String ADD_USER_TO_TENANT = "INSERT INTO tenant_system.tenant_user(tenant_id, user_id, role, since, admin_since) VALUES(?, ?, ?, ?, ?)";
    // private static final String REMOVE_ALL_TENANT_MEMBERS = "DELETE FROM tenant_system.tenant_user WHERE tenant_id = ?";
    private static final String REMOVE_USER_FROM_TENANT = "DELETE FROM tenant_system.tenant_user WHERE tenant_id = ? AND user_id = ?";
    private static final String GET_ALL_TENANTS_FOR_USER = "SELECT * FROM tenant_system.tenant_user WHERE user_id = ?";
    private static final String GET_ALL_USERS_FOR_TENANT = "SELECT * FROM tenant_system.tenant_user WHERE tenant_id = ?";
    private static final String IS_USER_PART_OF_TENANT = "SELECT COUNT(*) AS COUNT FROM tenant_system.tenant_user WHERE tenant_id = ? AND user_id = ?";
    private static final String GET_ROLE_OF_USER = "SELECT role FROM tenant_system.tenant_user WHERE tenant_id = ? AND user_id = ?";
    private static final String PROMOTE_TO_ADMIN = "UPDATE tenant_system.tenant_user SET role = 'admin', admin_since = ? WHERE tenant_id = ? AND user_id = ?";
    
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    TenantRepository tenantRepository;

    @Autowired
    UserRepository userRepository;

    private RowMapper<TenantMembership> tenantMembershipMapper = (rs, rowNum) -> {
        String userId = rs.getString("user_id");
        String tenantId = rs.getString("tenant_id");
        
        User user = userRepository.findUserById(userId).get();
        Tenant tenant = tenantRepository.findTenantById(tenantId).get();
        LocalDateTime since = rs.getTimestamp("since").toLocalDateTime();
        LocalDateTime adminSince = null;
        if(rs.getTimestamp("admin_since") != null) adminSince = rs.getTimestamp("admin_since").toLocalDateTime();
        String role = rs.getString("role");
        
        TenantMembership tm = new TenantMembership(user, tenant, role, since, adminSince);

        return tm;
    };

    
    public TenantUserRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void addUserToTenant(String tenantId, String userId, String role) {
        Timestamp now = Timestamp.from(Instant.now());
        if(role.equals("admin")) {
            this.jdbcTemplate.update(ADD_USER_TO_TENANT, tenantId, userId, role, now, now);
        } else {
            this.jdbcTemplate.update(ADD_USER_TO_TENANT, tenantId, userId, role, now, null);
        }
    }

    public void removeUserFromTenant(String tenantId, String userId) {
        this.jdbcTemplate.update(REMOVE_USER_FROM_TENANT, tenantId, userId);
    }

    public List<TenantMembership> getAllTenantsForUser(String userId) {
        return this.jdbcTemplate.query(GET_ALL_TENANTS_FOR_USER, tenantMembershipMapper, userId);
    }

    public List<TenantMembership> getAllUsersForTenant(String tenantId) {
        return this.jdbcTemplate.query(GET_ALL_USERS_FOR_TENANT, tenantMembershipMapper, tenantId);
    }
    
    public boolean isUserPartOfTenant(String userId, String tenantId) {
        return this.jdbcTemplate.queryForObject(IS_USER_PART_OF_TENANT, Integer.class, tenantId, userId) > 0;
    }

    public String getUserRole(String userId, String tenantId) {
        return this.jdbcTemplate.queryForObject(GET_ROLE_OF_USER, String.class, tenantId, userId);
    }

    public void promoteToAdmin(String tenantId, String userId) {
        this.jdbcTemplate.update(PROMOTE_TO_ADMIN, Timestamp.from(Instant.now()), tenantId, userId);
    }
}
