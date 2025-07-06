package com.grocery.business.multitenancy.repository.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.grocery.business.multitenancy.model.Invitation;
import com.grocery.business.multitenancy.model.User;
import com.grocery.business.multitenancy.model.Tenant;
import com.grocery.business.multitenancy.repository.TenantRepository;
import com.grocery.business.multitenancy.repository.UserRepository;

@Component
public class InvitationMapper implements RowMapper<Invitation> {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TenantRepository tenantRepository;

    @Override
    public Invitation mapRow(ResultSet rs, int rowNum) throws SQLException {
        String invitationId = rs.getString("id");
        String tenantId = rs.getString("tenant_id");
        String userId = rs.getString("user_id");

        User user = userRepository.getUserById(userId).get();
        Tenant tenant = tenantRepository.getTenantById(tenantId);

        return new Invitation(invitationId, tenant, user);
    }
}