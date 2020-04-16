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
                        {
                            value: '5',
                            name: 'Exit',
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
                    case 2: replenishmentList();
                        break;
                    case 3: addInventory();
                        break;
                    case 4: addProduct();
                        break;
                    case 5:
                            connection.end();
                            process.exit();
                            break;

                    default: console.log("\nInvalid Option");
                }
            })
        /////////////////////////////////////////////////////////////////////   
        ////*****      Display Current Product List                *********/
        //////////////////////////////////////////////////////////////////////

        function productList(res) {
            console.table(res)
            console.log("*******************************************************************");
            afterConnection();
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
                    afterConnection();
                }
            )
        }
    }
    )
};

/////////////////////////////////////////////////////////////////////   
////*****     Adding New Items                            *********/
/////////////////////////////////////////////////////////////////////

function addProduct() {
    console.log("Get New Item Information ");
    var questions = [
        {
            type: 'input',
            name: 'productName',
            message: "What is the product name?"
        },
        {
            type: 'input',
            name: 'deptName',
            message: "What's the dept name ?",
        },
        {
            type: 'input',
            name: 'sellingPrice',
            message: "What's the selling price ?",
        },
        {
            type: 'input',
            name: 'inv_qty',
            message: "What's the initial inventory qty ?",
        }
    ]
    inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
        var newQty = parseInt(answers.inv_qty);
        var newPrice = parseInt(answers.sellingPrice);


        connection.query("INSERT INTO products SET ?", { product_name: answers.productName, dept_name: answers.deptName, selling_price: newPrice, stock_qty: newQty },
            function (err, res) {
                if (err) { console.log(err) };
                console.table(res)
                console.log("*******************************************************************");
                afterConnection();
            }
        )
    }
    )
}

/////////////////////////////////////////////////////////////////////   
////*****     Updating inventory Quantity                  *********/
/////////////////////////////////////////////////////////////////////

function addInventory() {
    console.log("Get Product Qty Info ");
    var questions = [
        {
            type: 'input',
            name: 'itemNum',
            message: "What is the item number you want to modify?"
        },

        {
            type: 'input',
            name: 'inv_qty2',
            message: "What's the qty you want to add ?",
        }
    ]
    inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
        var newQty = parseInt(answers.inv_qty2);
        var newItem = parseInt(answers.itemNum);

        var QUERY = "update products set stock_qty = stock_qty + " + newQty + " WHERE item_id =" +  newItem

      //  connection.query("UPDATE products SET ? WHERE ?", { stock_qty = stock_qty + newQty }, { item_id = newItem },
      connection.query(QUERY, function (err, res) {
                if (err) { console.log(err) };
                console.table(res)
                console.log("*******************************************************************");
                afterConnection();
            })
    })
}