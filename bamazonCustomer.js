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

    //Target products table in database
    var query = "SELECT * from products";

    connection.query(query, function (error, results) {
        if (error) throw error;

        //Print updated table everytime initialized
        console.table(results)
        inquirer.prompt([
            {
                type: "input",
                message: "What is the id of the product you want to buy?",
                name: "idQuestion"
            },
            {
                type: "input",
                message: "How many units do you want to buy?",
                name: "unitQuestion"
            }
        ]).then(function (answer) {
            for (var i of results) {

                //console log tested results and answers, both working properly

                //Find the id in the database the matches the id given in the prompt
                if (i.id == answer.idQuestion) {

                    //Recalculate stock if there is enough in stock to purchase
                    if (answer.unitQuestion <= i.stock_quantity) {

                        var newStock = parseFloat(i.stock_quantity) - parseFloat(answer.unitQuestion)
                        var totalCost = parseFloat(i.price) * parseFloat(answer.unitQuestion)
                        console.log("Purchasing " + parseFloat(answer.unitQuestion) + " " + i.product_name + "(s) will cost you $" + totalCost);

                        // update database
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newStock,
                                    total_sales: i.total_sales += totalCost 
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
                    else {
                        console.log("Sorry, we do not have that many in stock. Try again");
                        initialize(); 
                    }

                }

            }

        });
    });
}
