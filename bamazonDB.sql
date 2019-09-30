DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  total_sales INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, total_sales)
VALUES ("Shirt", "Clothing", 10, 100, 0), ("Surfboard", "Sports", 500, 10, 0), 
("Apple", "Fruits", 1, 100, 0), ("Football", "Sports", 15, 10, 0), ("Basketball", "Sports", 20, 20, 0), 
("Banana", "Fruits", 1, 500, 0), ("Gaming PC", "Tech", 1000, 5, 0), ("Laptop", "Tech", 1200, 10, 0), 
("Pants", "Clothing", 50, 20, 0), ("Wetsuit", "Sports", 200, 10, 0);

SELECT * FROM products