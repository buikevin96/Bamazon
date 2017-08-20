var mysql = require('mysql');
var inquirer = require('inquirer');


// Connect to mysql server
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
	promptCustomer(res);
	})
}

// User select an option and purchase from here
var promptCustomer = function(res) { //Takes in response object from connection.query
	inquirer.prompt([{
		type: 'input',
		name: 'choice',
		message: "What would you like to buy? [Exit with E]"
	}]).then(function(answer){
		var correct = false;

		// If user enters in E, it will quit application
		if(answer.choice.toUpperCase()=="E"){
			process.exit();
		}
		for(var i =0; i < res.length; i++){
			if(res[i].product_name==answer.choice){
				correct=true;
				var product=answer.choice;
				var id=i;
				inquirer.prompt({
					type: "input",
					name: "quant",
					message: "How many would you like to buy?",
					validate: function(value){
						if(isNaN(value)==false){
							return true;
						} else {
							return false;
						}
					}
				}).then(function(answer){
					if((res[id].stock_quantity-answer.quant)>0){
						connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quant)+"' WHERE product_name= '"+
							product+"'", function(err,res2){
								console.log("Product Purchased!");
								makeTable();
						})
					} else {
						console.log("Not a valid selection!");
						promptCustomer(res);
					}
				})
			}
		}
		// If user enters in a product that does not exist, it will re-run the prompt again
		if(i==res.length && correct == false){
			console.log("Not a valid selection!");
			promptCustomer(res);
		}
	})
}