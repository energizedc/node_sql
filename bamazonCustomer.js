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
    console.log("                                        ");
    afterConnection();
});
console.log("*****************************************************");
console.log("*****   W E L C O M E   T O   B A M A Z O N   *******");
console.log("*****************************************************");
console.log("                                        ");
//////////////////////////////////////////////////////////////////////////////////////////
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res, fields) {
    if (err) throw err;
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
////////////////////////////////////////////////////////////////////////////////////////////
  function purchaseOrder(itemNum, qtyOrdered) {
    connection.query('Select * FROM products WHERE item_id = ' + itemNum, function (err, res) {
      if (err) { console.log(err) };

      if (qtyOrdered <= res[0].stock_qty) {
        var totalCost = res[0].selling_price * qtyOrdered;
        console.log("***    Good news your order is in stock!");
        console.log("***    Your total cost for " + qtyOrdered + " " + res[0].product_name + " is   $ " + totalCost);
        console.log("***     T h a n k   Y o u !!              ***");  
        console.log("***  ");
        console.log("  ");

        connection.query("UPDATE products SET stock_qty = stock_qty - " + qtyOrdered + " WHERE item_id = " + itemNum, function(err,res){
          purchaseMore()
        });

      } else {

        console.log("******************************************************************************************************");  
        console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
        console.log("******************************************************************************************************");
        console.log("  ");
        console.log("  ");
        purchaseMore()

      }; 
      
      
    });
   }};
  
  
    ///////////////////////////////////////////////////////////////////////
    /////   Ask customer if they want to make another purchase     ////////
    ///////////////////////////////////////////////////////////////////////
  

 
  function purchaseMore() {
      inquirer.prompt([
        {
          name: "anotherPurch",
          message: "Do you want to make another purchase?  Y or N"
        }
      ]).then(function (answers) {
        console.log(answers.anotherPurch);
        if (answers.anotherPurch === "y" ) {
            afterConnection();
        }
        else {
          console.log(" B Y E ");
          connection.end();
          process.exit;
        }}     
      )}