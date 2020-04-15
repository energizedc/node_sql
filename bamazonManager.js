var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
console.log("START")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "S0cc3r22@@",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
console.log("**************************************************************************");
console.log("*****   W E L C O M E   T O   B A M A Z O N   M A N A G E R   A P P ******");
console.log("**************************************************************************");
console.log("                                        ");

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res, fields) {
        if (err) throw err;
       


       // console.table( res);

        inquirer
            .prompt([
                {
                    type: 'rawlist',
                    name: 'manager',
                    message: 'Please choose a selection',
                    choices: [
                        {
                            value: '1',
                            name: 'View Products For Sale',
                        },
                        {
                            value: '2',
                            name: 'View Low Inventory',
                        },
                        {
                            value: '3',
                            name: 'Add To Inventory',
                        },
                        {
                            value: '4',
                            name: 'Add New Product',
                        },
                    ],
                },
            ])
            .then(answers => {
                // setTimeout(function(){ console.log("You chose  ", answers.manager); }, 5000);
                console.log('Answer:', answers.manager);




                switch (parseInt(answers.manager)) {
                    case 1: productList(res);
                        break;
                    case 2: replenishmentList(answers.manager);
                        break;
                    case 3: addInventory(answers.manager);
                        break;
                    case 4: addProduct(answers.manager);
                        break;
                    default: console.log("\nInvalid Option");
                }
            })
        /////////////////////////////////////////////////////////////////////   
        ////*****      Display Current Product List                *********/
        /////////////////////////////////////////////////////////////////////
            
        function productList(res) {
            console.table(res)
            console.log("*******************************************************************");
        }

        /////////////////////////////////////////////////////////////////////   
        ////*****      Display Items To Be Replenished             *********/
        /////////////////////////////////////////////////////////////////////
        function replenishmentList() {
            connection.query('Select * FROM products WHERE stock_qty < 5 ', 
                function (err, res, fields) {
                if (err) { console.log(err) };
                console.table(res)
                console.log("*******************************************************************");
            }
        )}}
    )};
