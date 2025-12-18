
CREATE TABLE tenant_<TENANT_ID>.items(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    category_id INT DEFAULT 1,
    quantity INT NOT NULL,
    quantity_type_id INT DEFAULT 1,
    added_at TIMESTAMP NOT NULL,
    added_by VARCHAR(50) NOT NULL,
    FOREIGN KEY(category_id) REFERENCES grocery_global.category(id),
    FOREIGN KEY(quantity_type_id) REFERENCES grocery_global.quantity_type(id),
    FOREIGN KEY(added_by) REFERENCES tenant_system.users(id)
);

CREATE TABLE tenant_<TENANT_ID>.products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    category_id INT DEFAULT 1 NOT NULL,
    quantity_type_id INT DEFAULT 1,
    FOREIGN KEY(category_id) REFERENCES grocery_global.category(id),
    FOREIGN KEY(quantity_type_id) REFERENCES grocery_global.quantity_type(id)
);