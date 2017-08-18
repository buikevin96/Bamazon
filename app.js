var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazon"
})

connection.connect(function(err){
	if (err) throw err;
	console.log("Connection Successful!");
	// Function to run when connection is established
	makeTable();
})

// Collect all data we need from sql database and print to screen
var makeTable = function(){
	connection.query("SELECT * FROM products", function(err,res){
		for(var i=0; i<res.length; i++){
			console.log(res[i].item_id+" || "+res[i].product_name+" || "+
				res[i].department_name+" || "+res[i].price+" || "+
				res[i].stock_quantity+"\n");
		}
	})
}