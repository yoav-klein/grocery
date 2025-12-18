package com.grocery.business.tenancy.repository;

import java.io.IOException;
import java.nio.file.Files;
import java.sql.SQLException;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptException;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Repository;

import com.grocery.business.tenancy.model.Tenant;
import com.grocery.business.tenancy.repository.rowmappers.TenantMapper;

@Repository
public class TenantRepository {
    
    private static final String GET_TENANT_BY_ID = "SELECT * FROM tenant_system.tenants WHERE id = ?";
    private static final String CREATE_TENANT = "INSERT INTO tenant_system.tenants VALUES(?, ?)";
    private static final String DELETE_TENANT = "DELETE FROM tenant_system.tenants WHERE id = ?";

    @Autowired
    TenantMapper tenantRowMapper;

    private JdbcTemplate jdbcTemplate;
    private DataSource dataSource;
    
    public TenantRepository(DataSource dataSource) {
        this.dataSource = dataSource;
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    
    public void createTenant(String tenantId, String tenantName) {
        this.jdbcTemplate.update(CREATE_TENANT, tenantId, tenantName);        
    }

    public void deleteTenant(String tenantId) {
        this.jdbcTemplate.update(DELETE_TENANT, tenantId);
    }

    public Optional<Tenant> findTenantById(String tenantId) {
        Tenant tenant;
        try {
            tenant = this.jdbcTemplate.queryForObject(GET_TENANT_BY_ID, tenantRowMapper, tenantId);
        } catch(EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        return Optional.of(tenant);
    }

    public void createTenantSchema(String tenantId) throws IOException {
        this.jdbcTemplate.execute("CREATE DATABASE " + "tenant_" + tenantId);
        Resource resource = new ClassPathResource("init_tenant.sql");
        String sql = new String(Files.readAllBytes(resource.getFile().toPath()));
        String preparedScript = sql.replace("<TENANT_ID>", tenantId);
        
        try {
            ScriptUtils.executeSqlScript(dataSource.getConnection(), new ByteArrayResource(preparedScript.getBytes()));
        } catch(ScriptException | SQLException e) { 
            // TODO: handle 
        }
    }

    public void deleteTenantSchema(String tenantId) {
        this.jdbcTemplate.execute("DROP DATABASE " + "tenant_" + tenantId);
    }

}
