DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INTEGER NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Clothing", 10.50, 100), ("Surfboard", "Sports", 500.99, 10), 
("Apple", "Fruits", 1.00, 100), ("Football", "Sports", 15.25, 10), ("Basketball", "Sports", 20.25, 20), 
("Banana", "Fruits", 1.05, 500), ("Gaming PC", "Tech", 1000.99, 5), ("Laptop", "Tech", 1200.99, 10), 
("Pants", "Clothing", 50.00, 20), ("Wetsuit", "Sports", 200.50, 10);

SELECT * FROM products;
SELECT * FROM departments;

ALTER TABLE products ADD COLUMN total_sales DECIMAL(7,2) DEFAULT '0.00';