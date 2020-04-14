var mysql = require("mysql");
var inquirer = require("inquirer");


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
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });
  console.log("*****************************************************");
  console.log("*****   W E L C O M E   T O   B A M A Z O N   *******");
  console.log("*****************************************************");
  console.log("                                        ");
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res, fields) {
      if (err) throw err;
      for(var i = 0; i < res.length; i++) {
      console.log(res[i].item_id, res[i].product_name  +  "       $ " +  res[i].selling_price)
      console.log("*****************************************************");
      
    }
      connection.end();   
    });
  }
  //what is the item number you want to purchase?
  // how many of do you want to purchase.?
  //store answers as variables
  //check qty avail
  //if qty avail < qty_ordered disply message not enough
  //else
  //res[i].qty - qty_ordered
  //calculate purchase price and display receipt to Customer 'id', name, price, qty,   qtyordered*price.


  
  