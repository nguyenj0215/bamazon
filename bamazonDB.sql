DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Clothing", 10, 100), ("Surfboard", "Sports", 500, 10), 
("Apple", "Fruits", 1, 100), ("Football", "Sports", 15, 10), ("Basketball", "Sports", 20, 20), 
("Banana", "Fruits", 1, 500), ("Gaming PC", "Tech", 1000, 5), ("Laptop", "Tech", 1200, 10), 
("Pants", "Clothing", 50, 20), ("Wetsuit", "Sports", 200, 10);

SELECT * FROM products