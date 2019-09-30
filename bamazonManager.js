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
            message: "Would you like to [POST] an auction or [BID] on an auction?",
            choices: ["POST", "BID", "EXIT"]
        }
    ]).then(function (answers) {
        if (answers.Question1 === "POST") {
            post();
        } else if (
            answers.Question1 === "BID"
        ) {
            bid();
        } else if (answers.Question1 === "EXIT") {
            connection.end(); return;
        }
    });
}
