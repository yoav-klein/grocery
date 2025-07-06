package com.grocery.business.multitenancy.repository;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.grocery.business.multitenancy.model.Tenant;
import com.grocery.business.multitenancy.repository.rowmappers.TenantMapper;

@Repository
public class TenantRepository {
    // private static final String GET_ALL_TENANTS = "SELECT * FROM tenant_system.tenants";
    private static final String GET_TENANT_BY_ID = "SELECT * FROM tenant_system.tenants WHERE id = ?";
    private static final String CREATE_TENANT = "INSERT INTO tenant_system.tenants VALUES(?, ?)";
    private static final String DELETE_TENANT = "DELETE FROM tenant_system.tenants WHERE id = ?";
    private static final String INIT_TENANT_TABLES = "CREATE TABLE tenant_%s.product(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50))";

    @Autowired
    TenantMapper tenantRowMapper;

    private JdbcTemplate jdbcTemplate;
    
    public TenantRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    
    public void createTenant(String tenantId, String tenantName) {
        this.jdbcTemplate.update(CREATE_TENANT, tenantId, tenantName);        
    }

    public void deleteTenant(String tenantId) {
        this.jdbcTemplate.update(DELETE_TENANT, tenantId);
    }

    public Tenant getTenantById(String tenantId) {
        return this.jdbcTemplate.queryForObject(GET_TENANT_BY_ID, tenantRowMapper, tenantId);
    }

    public void createTenantSchema(String tenantId) {
        this.jdbcTemplate.execute("CREATE DATABASE " + "tenant_" + tenantId);
        this.jdbcTemplate.execute(String.format(INIT_TENANT_TABLES, tenantId));
    }

    public void deleteTenantSchema(String tenantId) {
        this.jdbcTemplate.execute("DROP DATABASE " + "tenant_" + tenantId);
    }

}