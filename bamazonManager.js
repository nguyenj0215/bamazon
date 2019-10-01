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
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        }
    ]).then(function (answers) {
        if (answers.promptList === "View Products") {
            viewProducts();
        }
        else if (answers.promptList === "View Low Inventory") {
            lowInventory();
        }
        else if (answers.promptList === "Add to Inventory") {
            addInventory();
        }
        else if (answers.promptList === "Add New Product") {
            addProduct();
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
    console.log("Here are product(s) that are low in inventory: ")
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

//Function to add to inventory
function addInventory() {
    var query = "SELECT * from products";

    connection.query(query, function (error, results) {
        if (error) throw error;

        inquirer.prompt([
            {
                type: "input",
                message: "What is the id of the product you want to add?",
                name: "idAdd"
            },
            {
                type: "input",
                message: "How many units do you want to add?",
                name: "unitAdd"
            }
        ]).then(function (answer) {
            for (var i of results) {

                //Find the id in the database the matches the id given in the prompt
                if (i.id == answer.idAdd) {

                    var newInventory = parseFloat(i.stock_quantity) + parseFloat(answer.unitAdd)

                    console.log("-----------------------------------------------")
                    console.log("Added " + parseFloat(answer.unitAdd) + " " + i.product_name + "(s). The new total in inventory is " + newInventory);
                    console.log("-----------------------------------------------")
                    // update database
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newInventory
                            },
                            {
                                id: i.id
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;

                            initialize()
                        })

                }
            }
        })
    })

}

function addProduct() {
    var query = "SELECT * from products";

    connection.query(query, function (error, results) {
        if (error) throw error;

        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the product you want to add?",
                name: "nameProd"
            },
            {
                type: "input",
                message: "How many units are you initially adding?",
                name: "stockProd"
            },
            {
                type: "input",
                message: "How much does each unit cost?",
                name: "costProd"
            },
            {
                type: "list",
                message: "Which department is this product going under?",
                name: "departmentProd",
                choices: ["Clothing", "Sports", "Fruits", "Tech"]
            }

        ]).then(function (answer) {
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.nameProd,
                    department_name: answer.departmentProd,
                    price: answer.costProd,
                    stock_quantity: answer.stockProd
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------------------")
                    console.log("Sucessfully added " + answer.nameProd + "(s) to inventory.")
                    console.log("-----------------------------------------------")

                }
            );
        })
    })


}