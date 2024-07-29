
CREATE DATABASE grocery;

USE grocery;

CREATE TABLE category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO category values(1, 'OTHER');
INSERT INTO category (name) values('VEGETABLES');
INSERT INTO category (name) values('FRUITS');
INSERT INTO category (name) values('PROTEIN');
INSERT INTO category (name) values('DAIRY');
INSERT INTO category (name) values('DRY_GOODS');
INSERT INTO category (name) values('CANNED');
INSERT INTO category (name) values('DAIRY');
INSERT INTO category (name) values('BEVERAGES');
INSERT INTO category (name) values('ALCOHOL');
INSERT INTO category (name) values('HYGIENE');
INSERT INTO category (name) values('DISPOSABLE');
INSERT INTO category (name) values('CLEANING_SUPPLIES');
INSERT INTO category (name) values('COFFEE');
INSERT INTO category (name) values('FROZEN_FOOD');
INSERT INTO category (name) values('BREAD');
INSERT INTO category (name) values('CANDY');


CREATE TABLE quantity_type(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO quantity_type values(1, 'UNIT');
INSERT INTO quantity_type (name) values('KG');


CREATE TABLE item(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    category_id INT DEFAULT 1,
    quantity INT NOT NULL,
    quantity_type_id INT DEFAULT 1,
    FOREIGN KEY(category_id) REFERENCES category(id),
    FOREIGN KEY(quantity_type_id) REFERENCES quantity_type(id)
);

