var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    //Initialize only if there is no error
    initialize();
});


function initialize() {

    inquirer.prompt([
        {
            name: "promptList",
            type: "list",
            message: "What would you like to do: ",
            choices: ["View Products", "View Low Inventory", "Add to inventory", "Add New Product", "EXIT"]
        }
    ]).then(function (answers) {
        if (answers.promptList === "View Products") {
            viewProducts();
        }
        else if (
            answers.promptList === "View Low Inventory"
        ) {
            lowInventory();
        }
        else if (answers.promptList === "Add To Inventory") {
            addInventory()
        }
        else if (answers.promptList === "Add New Product") {
            addProduct()
        }
        else if (answers.promptList === "EXIT") {
            connection.end(); return;
        }
    });
}
//Function to view current products
function viewProducts() {
    var query = "SELECT * from products";
    connection.query(query, function (error, results) {
        if (error) throw error;

        //Print updated table everytime initialized
        console.table(results)

        //Return to main screen
        initialize()
    })
}

//Function to view low inventory
function lowInventory() {
    var query = "SELECT * from products";
    console.log("-----------------------------------------------")
    console.log("Here are products that are low in inventory: ")
    console.log("-----------------------------------------------")

    connection.query(query, function (error, results) {
        if (error) throw error;

        for (var i of results) {

            //Find the id in the database the matches the id given in the prompt
            if (i.stock_quantity <= 5) {
                console.log("Item ID: " + i.id + " \r\nItem Name: " + i.product_name + "\r\nRemaining in stock: " + i.stock_quantity)
                console.log("-----------------------------------------------")
            }
        }

        //Return to main screen
        initialize()
    })
}