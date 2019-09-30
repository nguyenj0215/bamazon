var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 3306,
    user: 'root',
    password: 'password',
    database: 'departments_db'
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
            choices: ["View Products Sales by Department", "Create New Department", "EXIT"]
        }
    ]).then(function (answers) {
        if (answers.promptList === "View Products Sales by Department") {
            viewSales();
        }
        else if (answers.promptList === "Create New Department") {
            newDepartment();
        }
        else if (answers.promptList === "EXIT") {
            connection.end(); return;
        }
    });
}
function viewSales() {

}

function newDepartment() {
    var query = "SELECT * from departments";

    connection.query(query, function (error, results) {
        if (error) throw error;

        inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department you want to add?",
                name: "nameDepartment"
            },
            {
                type: "input",
                message: "What is the overhead costs of this department?",
                name: "overhead"
            }

        ]).then(function (answer) {
            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: answer.nameDepartment,
                    over_head_costs: answer.overhead
                },
                function (err) {
                    if (err) throw err;
                    console.log("-----------------------------------------------")
                    console.log("Sucessfully added " + answer.nameDepartment + " to department list.")
                    console.log("-----------------------------------------------")
                    initialize();
                }
            );
        })
    })

}