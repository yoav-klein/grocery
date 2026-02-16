
CREATE TABLE tenant_<TENANT_ID>.items(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    category_id INT DEFAULT 1,
    quantity INT NOT NULL,
    quantity_type_id INT DEFAULT 1,
    added_at TIMESTAMP NOT NULL,
    added_by VARCHAR(50) NOT NULL,
    UNIQUE (name, category_id),
    FOREIGN KEY(category_id) REFERENCES grocery_global.category(id),
    FOREIGN KEY(quantity_type_id) REFERENCES grocery_global.quantity_type(id),
    FOREIGN KEY(added_by) REFERENCES tenant_system.users(id)
);

CREATE TABLE tenant_<TENANT_ID>.products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    category_id INT DEFAULT 1 NOT NULL,
    quantity_type_id INT DEFAULT 1,
    UNIQUE (name, category_id),
    FOREIGN KEY(category_id) REFERENCES grocery_global.category(id),
    FOREIGN KEY(quantity_type_id) REFERENCES grocery_global.quantity_type(id)
);

CREATE TABLE tenant_<TENANT_ID>.lists(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tenant_<TENANT_ID>.list_product(
    product_id INT NOT NULL,
    list_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES tenant_<TENANT_ID>.products(id) ON DELETE CASCADE,
    FOREIGN KEY (list_id) REFERENCES tenant_<TENANT_ID>.lists(id) ON DELETE CASCADE,
    UNIQUE(product_id, list_id)
);
