const pool = require('./db')

module.exports = function routes(app, logger) {
  // GET /
  app.get('/', (req, res) => {
    res.status(200).send('This is the port for the API. Go to port 3000 to view the web page.');
  });

  //  --------------------- productTable ---------------------------------
  // /productTable/{productID}
  // GET
  app.get('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Product Id from the URL parameters
        var productId = req.param('productId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM ProductTable WHERE productId = (?)', productId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
		  // res.status(200).json({
             // "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /productTable/{productID}
  // PUT
  app.put('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Product Id from the URL parameters
        var productId = req.param('productId');
        var name = req.body.name;
        var description = req.body.description;
        var image = req.body.image;
        var minVal = req.body.minVal;

        var query = 'UPDATE ProductTable' +
                    'SET name = (?) ' 
                    'description = (?) ' +
                    'image = (?) ' + 
                    'minVal = (?) ' +
                    'WHERE productId = (?)';


        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [name, description, image, minVal, productId], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /productTable/{productID}
  // DELETE
  app.delete('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Product Id from the URL parameters
        var productId = req.param('productId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('DELETE * FROM ProductTable WHERE productId = (?)', productId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /productTable/{orderID}
  // GET
  app.get('/productTable', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Order Id from the URL parameters
        var orderId = req.param('orderId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM ProductTable WHERE orderId = (?)', orderId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

    //  --------------------- Order ---------------------------------
  // /Order
  // GET
  app.get('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM `Order`', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
            }
        });
      }
    });
  });
// comment
  // /Order
  // POST
  app.post('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // Getting the variables from the body of the request
        var orderDate = req.body.orderDate;
        var deliveryAddress = req.body.deliveryAddress;
        var carrier = req.body.carrier;
        var sentDate = req.body.sentDate;
        var estArrival = req.body.estArrival;
        var delivered = req.body.delivered;
        var restaurantID = req.body.restaurantID;
        var supplierID = req.body.supplierID;
        var query = 'INSERT INTO `Order`(orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered, restaurantID, supplierID)' + 
                    'VALUES ((?)(?)(?)(?)(?)(?)(?)(?))';

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('query', [orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  
  // /order/{orderId}
  // PUT
  app.put('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Order Id from the URL parameters
        // And the remainder of variables from the body
        var orderId = req.param('orderId');
        var orderDate = req.body.orderDate;
        var deliveryAddress = req.body.deliveryAddress;
        var carrier = req.body.carrier;
        var sentDate = req.body.sentDate;
        var estArrival = req.body.estArrival;
        var delivered = req.body.delivered;

        var query = 'UPDATE `Order`' +
                    'SET orderDate = (?) ' 
                    'deliveryAddress = (?) ' +
                    'carrier = (?) ' + 
                    'sentDate = (?) ' +
                    'estArrival = (?) ' +
                    'delivered = (?) ' +
                    'WHERE orderId = (?)';


        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [orderDate, deliveryAddress, carrier, sentDate, estArrival, delivered, orderId], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /order/{orderId}
  // DELETE
  app.delete('/order', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the Order Id from the URL parameters
        var orderId = req.param('orderId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('DELETE * FROM `db`.`order_table` WHERE orderId = (?)', orderId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // ---------------------------------------------- Users -----------------------------------
// /user
  // GET
  app.get('/allusers', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM UserTable', function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
           // res.status(200).json({
		res.end(JSON.stringify(rows)); // Result in JSON format
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // given a user ID return the user's restaurant ID
  app.get('/getRestaurantId', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        var userID = req.body.userID;

        connection.query('SELECT * FROM restaurantEmployee where userID = ?', userID, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		         res.end(JSON.stringify(rows)); // Result in JSON format
          }
        });
      }
    });
  });

  // given a username return the user's userId
  app.get('/userid', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        var username = req.body.username;

        connection.query('SELECT * FROM UserTable where username = ?', username, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		         res.end(JSON.stringify(rows)); // Result in JSON format
          }
        });
      }
    });
  });

  // /user
  // POST
  app.post('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {

        // Getting the variables from the body of the request
        var username = req.body.username;
        var password = req.body.password;
        var usertype = req.body.usertype;


        var query = 'INSERT INTO UserTable(username, password, userType)' +
                    'VALUES (?,?,?)';

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [username, password, usertype], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
          		res.end(JSON.stringify(rows)); // Result in JSON format
          }
        });
      }
    });
  });

  // /user/{userId}
  // GET
  app.get('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the User Id from the URL parameters
        var userId = req.param('userId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('SELECT * FROM UserTable WHERE userId = (?)', userId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
	    res.end(JSON.stringify(rows));
           // res.status(200).json({
            //  "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /user/{userId}
  // PUT
  app.put('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the User Id from the URL parameters
        var userId = req.param('userId');
        var username = req.body.username;
        var password = req.body.password;
        var userType = req.body.userType;

        var query = 'UPDATE UserTable' +
                    'SET username = (?) ' 
                    'password = (?) ' +
                    'userType = (?) ' + 
                    'WHERE userId = (?)';


        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query(query, [username, password, userType, userId], function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });

  // /user/{userId}
  // DELETE
  app.delete('/user', (req, res) => {
    // obtain a connection from our pool of connections
    pool.getConnection(function (err, connection){
      if(err){
        // if there is an issue obtaining a connection, release the connection instance and log the error
        logger.error('Problem obtaining MySQL connection',err)
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        // Getting the User Id from the URL parameters
        var userId = req.param('userId');

        // if there is no issue obtaining a connection, execute query and release connection
        // Will need to change the query to the appropriately named table
        connection.query('DELETE * FROM `db`.`user_table` WHERE userId = (?)', userId, function (err, rows, fields) {
          connection.release();
          if (err) {
            logger.error("Error while fetching values: \n", err);
            res.status(400).json({
              "data": [],
              "error": "Error obtaining values"
            })
          } else {
		res.end(JSON.stringify(rows)); // Result in JSON format
//            res.status(200).json({
//              "data": JSON.stringify(rows)});
          }
        });
      }
    });
  });


app.get('/allInventory', function (req, res) {
    pool.getConnection(function (err, con){
	con.query("SELECT * FROM InventoryTable", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});

// /inventoryTable/{restaurantID}
app.get('/inventoryTable', function(req, res){
    pool.getConnection(function (err, con){
        var restaurantID = req.param("restaurantID");
        con.query("SELECT * FROM InventoryTable WHERE RestaurantID = (?)", restaurantID, function(err, result, fields){
            if(err) throw err;
            res.end(JSON.stringify(result));
        });
    });
});
// /inventoryTable/{productID}
app.get('/inventoryTable', function(req, res){
    pool.getConnection(function (err, con){
        var productID = req.param("productID");
        con.query("SELECT * FROM InventoryTable WHERE productID = (?)", productID, function(err, result, fields){
            if (err) throw err;
            res.end(JSON.stringify(result));
	});
    });
});
app.get('/allOrderDetails', function (req, res) {
    pool.getConnection(function (err, con){
	con.query("SELECT * FROM OrderDetails", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});

app.put('/inventoryTable', function(req, res){
    pool.getConnection(function (err, con){
      var stock = req.body.stock;
    var restaurantID = req.body.restaurantID;
    var productID = req.body.productID;
        con.query("UPDATE InventoryTable SET stock=(?) WHERE restaurantID= (?) AND productID =(?)", [stock, restaurantID, productID], function(err, result, fields){
            if(err) throw err;
            res.end(JSON.stringify(result));
	});
    });
});

app.post('/inventoryTable', function(req, res){
    pool.getConnection(function (err, con){
      var restaurantID=req.body.restaurantID;
    var productID= req.body.productID;
    var stock= req.body.stock;
    var minVal= req.body.minVal;
        con.query("INSERT INTO InventoryTable(restaurantID, productID, stock, minVal) VALUES(?, ?, ?, ?)", [restaurantID, productID, stock, minVal], function(err, result, fields){
            if(err) throw err;
            res.end(JSON.stringify(result));
	});
    });
});
app.post('/orderDetails', function(req, res){
    pool.getConnection(function (err, con){
      var orderID = req.body.orderID;
      var productID = req.body.productID;
      var quantity = req.body.quantity;
        con.query("INSERT INTO OrderDetails(orderID, productID, quantity) VALUES((?), (?), (?))", [orderID, productID, quantity], function(err, result, fields){
            if(err) throw err;
            res.end(JSON.stringify(result));
	});
    });
});

app.delete('/inventoryTable', function(req, res){
    pool.getConnection(function (err, con){
      var restaurantID=req.body.restaurantID;
      var productID= req.body.productID;
        con.query("DELETE FROM InventoryTable WHERE restaurantID=(?) AND productID=(?)", [restaurantID, productID], function(err, result, fields){
            if(err) throw err;
            res.end(JSON.stringify(result));
	});
    });
});






//GET
	
// /Supplier
app.get('/Supplier', function (req, res) {
    pool.getConnection(function (err, con){
	con.query("SELECT * FROM Supplier",function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});
	

// /Supplier/{supplierID}
app.get('/Supplier', function (req, res) {
    pool.getConnection(function (err, con){
        var supplierID = req.param('supplierID');
       	con.query("SELECT * FROM Supplier WHERE supplierID = (?)", supplierID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});

		
app.get('/orderRestaurantID', function (req, res) {
    pool.getConnection(function (err, con){
        var orderID = req.param('orderID');
       	con.query("select orderID, restaurantID from `Order` where supplierID = ?", orderID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});


// /orderDetail/{orderId}
app.get('/orderDetail', function (req, res) {
    pool.getConnection(function (err, con){
        var orderID = req.param('orderID');
       	con.query("SELECT * FROM orderDetails WHERE orderID = (?)", orderID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});


// /allrestaurant
app.get('/allrestaurant', function (req, res) {
    pool.getConnection(function (err, con){
	con.query("SELECT * FROM Restaurant",function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});

// /restaurant/{restaurantID}
app.get('/Restaurant', function (req, res) {
    pool.getConnection(function (err, con){
        var restaurantID = req.param('restaurantID');
	con.query("SELECT * FROM Restaurant WHERE restaurantID = (?)", restaurantID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});

// /productTable
app.get('/allProductTable', function (req, res) {
    pool.getConnection(function (err, con){
	con.query("SELECT * FROM ProductTable",function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});


//PUT
// /Supplier/{supplierID}
app.put('/Supplier', async (req, res) => {
    pool.getConnection(function (err, con){
	var newName = req.body.newName
	var supplierID = req.param('supplierID');

	 con.query("UPDATE Supplier SET supplierName = (?) WHERE supplierID = (?)", [newName, supplierID] ,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
     });
});
	
	
	
// /orderDetail/{orderId}
app.put('/OrderDetail', async (req, res) => {
    pool.getConnection(function (err, con){
	var newQuantity = req.body.newQuantity
	var orderID = req.param('orderID');

	 con.query("UPDATE OrderDetails SET Quantity = (?) WHERE orderID = (?)", [newQuantity, orderId] ,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
     });
});

///restaurant/{restaurantID}
app.put('/Restaurant', async (req, res) => {
    pool.getConnection(function (err, con){
	var newActivity = req.body.newActivity
	var restaurantID = req.param('restaurantID');
         con.query("UPDATE Restaurant SET Activity = (?) WHERE restaurantID = (?)", [newActivity, restaurantID] ,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
    });
});


//POST 
// /Supplier
app.post('/Supplier', async (req, res) => {
    pool.getConnection(function (err, con){
        var supplierID = req.body.supplierID
        var supplierName = req.body.supplierName
    
        con.query("INSERT INTO Supplier (supplierID, supplierName) VALUES (?, ?)", [supplierID, supplierName],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});	
	
	
// /restaurant
app.post('/Restaurant', async (req, res) => {
    pool.getConnection(function (err, con){
        var restaurantID = req.body.restaurantID
        var name = req.body.name
        var dateJoined = req.body.dateJoined 
        var active = req.body.active
    
        con.query("INSERT INTO Restaurant (restaurantID, name, dateJoined, active) VALUES (?, ?, ?, ?)", [restaurantID, name, dateJoined, active],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});



// /productTable
app.post('/ProductTable', async (req, res) => {
    pool.getConnection(function (err, con){
        var productID = req.body.restaurantID
        var name = req.body.name
        var description = req.body.dateJoined 
        var image = req.body.active
    
        con.query("INSERT INTO ProductTable (productID, name, description, image) VALUES (?, ?, ?, ?)", [productID, name, description, image, minVal ],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
	});
    });
});


// DELETE
	
// /Supplier/{supplierID}
app.delete('/Supplier/:supplierID', async (req, res) => {
    pool.getConnection(function (err, con){
	var supplierID = req.param('supplierID');
	con.query("DELETE FROM Supplier WHERE supplierID = ? ", supplierID,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
    });
});
	

// /orderDetails/{orderId}
app.delete('/OrderDetails/:orderID', async (req, res) => {
    pool.getConnection(function (err, con){
	var orderID = req.param('orderID');
	con.query("DELETE FROM OrderDetails WHERE orderID = ? ", orderID,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
    });
});



// /restaurant/{restaurantID}
app.delete('/Restaurant/:restaurantID', async (req, res) => {
    pool.getConnection(function (err, con){
	var restaurantID = req.param('restaurantID');
	con.query("DELETE FROM Restaurant WHERE restaurantID = ? ", restaurantID,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
    });
});

}
