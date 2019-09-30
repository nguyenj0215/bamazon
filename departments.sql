DROP DATABASE IF EXISTS departments_db;

CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE departments(
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs INTEGER NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 1000)

SELECT * FROM departments