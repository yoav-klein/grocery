
CREATE TABLE users(
    id VARCHAR(70) PRIMARY KEY,
    display_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    picture_url VARCHAR(100)
);

CREATE TABLE providers(
    name VARCHAR(30) PRIMARY KEY
);

INSERT INTO providers VALUES('google');

CREATE TABLE user_provider(
    user_id VARCHAR(70),
    provider VARCHAR(30) NOT NULL,
    provider_subject VARCHAR(50) NOT NULL,
    PRIMARY KEY(provider, provider_subject),
    FOREIGN KEY (provider) REFERENCES providers(name) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tenants(
    id varchar(50) PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
);

CREATE TABLE tenant_user(
    tenant_id VARCHAR(50) NOT NULL, 
    user_id VARCHAR(70) NOT NULL,
    role VARCHAR(10) NOT NULL,
    display_name VARCHAR(50),
    since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_since TIMESTAMP NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (tenant_id, user_id)
);

CREATE TABLE invitations(
    id varchar(50) PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL,
    invited_by VARCHAR(70) NOT NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE CASCADE
);