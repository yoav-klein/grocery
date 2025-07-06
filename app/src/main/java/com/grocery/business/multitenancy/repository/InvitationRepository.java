package com.grocery.business.multitenancy.repository;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.grocery.business.multitenancy.model.Invitation;
import com.grocery.business.multitenancy.repository.rowmappers.InvitationMapper;

@Repository
public class InvitationRepository {
    // private static final String REMOVE_ALL_TENANT_INVITATIONS = "DELETE FROM tenant_system.invitations WHERE tenant_id = ?";
    private static final String REMOVE_INVITATION = "DELETE FROM tenant_system.invitations WHERE id = ?";
    private static final String ADD_INVITATION = "INSERT INTO tenant_system.invitations(id, tenant_id, user_id) VALUES(?, ?, ?)";
    private static final String GET_INVITATION_BY_ID = "SELECT * FROM tenant_system.invitations WHERE id = ?";
    private static final String GET_ALL_INVITATIONS_FOR_USER = "SELECT * FROM tenant_system.invitations WHERE user_id = ?";
    private static final String GET_ALL_INVITATIONS_FOR_TENANT = "SELECT * FROM tenant_system.invitations WHERE tenant_id = ?";

    @Autowired
    InvitationMapper invitationRowMapper;

    private JdbcTemplate jdbcTemplate;
    
    public InvitationRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public void addInvitation(String id, String tenantId, String userId) {
        this.jdbcTemplate.update(ADD_INVITATION, id, tenantId, userId);
    }

    public void removeInvitation(String invitationId) {
        this.jdbcTemplate.update(REMOVE_INVITATION, invitationId);
    }

    public Invitation getInvitationById(String invitationId) {
        return this.jdbcTemplate.queryForObject(GET_INVITATION_BY_ID, invitationRowMapper, invitationId);
    }

    public List<Invitation> getAllInvitationsForUser(String userId) {
        return this.jdbcTemplate.query(GET_ALL_INVITATIONS_FOR_USER, invitationRowMapper, userId);

    }

    public List<Invitation> getAllInvitationsForTenant(String tenantId) {
        return this.jdbcTemplate.query(GET_ALL_INVITATIONS_FOR_TENANT, invitationRowMapper, tenantId);
    }

    
}