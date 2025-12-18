package com.grocery.business.tenancy.repository.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import com.grocery.business.tenancy.model.Tenant;

@Component
public class TenantMapper implements RowMapper<Tenant> {
    
    @Override
    public Tenant mapRow(ResultSet rs, int rowNum) throws SQLException {
        String tenantId = rs.getString("id");
        String name = rs.getString("name");
        
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        tenant.setName(name);
        
        return tenant;
    }
}
