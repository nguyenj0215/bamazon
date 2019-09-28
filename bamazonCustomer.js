var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});