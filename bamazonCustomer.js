var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


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
console.log("*****************************************************");
console.log("*****   W E L C O M E   T O   B A M A Z O N   *******");
console.log("*****************************************************");
console.log("                                        ");

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res, fields) {
    if (err) throw err;
//    for (var i = 0; i < res.length; i++) {
//      console.log(res[i].item_id, res[i].product_name + "       $ " + res[i].selling_price)
//      console.log("*****************************************************");
//    }

console.table(res);

    inquirer.prompt([
      {
        name: "idOrd",
        message: "What is the item number that you want to purchase?"
      }, {
        name: "qtyOrd",
        message: "How many of these do you want to buy?"
      }
    ]).then(function (answers) {

      console.log(answers.idOrd + "    " + answers.qtyOrd);

      var qtyOrdered = parseInt(answers.qtyOrd);
      var itemNum = answers.idOrd;

      console.log(qtyOrdered + "    " + itemNum);
      console.log("*****************************************************");

      purchaseOrder(itemNum, qtyOrdered);
    });
  });

  function purchaseOrder(itemNum, qtyOrdered) {
    connection.query('Select * FROM products WHERE item_id = ' + itemNum, function (err, res) {
      if (err) { console.log(err) };

      if (qtyOrdered <= res[0].stock_qty) {
        var totalCost = res[0].selling_price * qtyOrdered;
        console.log("Good news your order is in stock!");
        console.log("Your total cost for " + qtyOrdered + " " + res[0].product_name + " is   $ " + totalCost + " Thank you!");

        connection.query("UPDATE products SET stock_qty = stock_qty - " + qtyOrdered + " WHERE item_id = " + itemNum);
      } else {
        console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
      };
      afterConnection();
    });
  }
 // connection.end();
};
