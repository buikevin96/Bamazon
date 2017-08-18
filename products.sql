CREATE DATABASE bamazon

USE bamazon

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NULL,
    department_name VARCHAR(40) NULL, 
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    primary key (item_id)
    );
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gold iPhone 6", "Phones", 350, 40),
	("Grand Theft Auto San Andreas PC", "Games", 40, 40),
    ("American Eskie", "Pets", 500, 2),
    ("Rolex", "Watches", 15000, 4),
    ("Blue Nike SBs", "Shoes", 45, 10),
    ("Samsung Galaxy S6", "Phone", 300, 30),
    ("Call Of Duty: World At War", "Games", 45, 35),
    ("Brown Poodle", "Pets", 450, 2),
    ("Movado", "Watches", 1000, 8),
    ("Nike Air Forces", "Shoes", 100, 15);
    
SELECT * FROM products