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
    var query = "SELECT * FROM products";

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

                //Find the id in the database the matches the id given in the prompt
                if (i.id == answer.idQuestion) {

                    //Recalculate stock if there is enough in stock to purchase
                    if (answer.unitQuestion <= i.stock_quantity) {

                        //Calculate new stock total
                        var newStock = parseFloat(i.stock_quantity) - parseFloat(answer.unitQuestion)

                        //Calculate cost if purchase is sucessful
                        var totalCost = parseFloat(i.price) * parseFloat(answer.unitQuestion)

                        console.log("\r\n--------------------------------------------------")
                        console.log("Purchasing " + parseFloat(answer.unitQuestion) + " " + i.product_name + "(s) will cost you $" + totalCost);
                        console.log("--------------------------------------------------\r\n")
                        
                        calcDepartmentSales(i.department_name, totalCost);
                        // update database
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newStock,
                                },
                                {
                                    id: i.id
                                }
                            ],
                            function (err) {
                                if (err) throw err;

                                //End connection after a purchase
                                connection.end(); return;
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

function calcDepartmentSales(productDepartment, purchaseCost) {
    var query = "SELECT total_sales FROM departments WHERE ?";
    connection.query(query, { department_name: productDepartment }, function (err, res) {
        if (err) throw err;

        var departmentSales = res[0].total_sales;
        var updatedDepartmentSales = parseInt(departmentSales) + parseInt(purchaseCost);

        updateDatabaseSales(updatedDepartmentSales, productDepartment)
    })
}

function updateDatabaseSales(updatedCost, productDepartment) {
    var query = "UPDATE departments SET ? WHERE ?";
    connection.query(query, [{
        total_sales: updatedCost
    }, {
        department_name: productDepartment
    }], function (err) {
        if (err) throw err;

    });
}