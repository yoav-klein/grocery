CREATE TABLE users(id VARCHAR(70) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    picture_url VARCHAR(70)
);

CREATE TABLE tenants(id varchar(50) PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
);

CREATE TABLE tenant_user(tenant_id VARCHAR(50) NOT NULL, 
    user_id VARCHAR(70) NOT NULL,
    role VARCHAR(10) NOT NULL,
    display_name VARCHAR(50),
    since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_since TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (tenant_id, user_id)
);

CREATE TABLE invitations(id varchar(50) PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(70) NOT NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (tenant_id, user_id)
);