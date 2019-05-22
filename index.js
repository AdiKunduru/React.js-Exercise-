// YOU CAN USE THIS FILE AS REFERENCE FOR SERVER DEVELOPMENT

// include the express module
var express = require("express");

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

// native js function for hashing messages with the SHA-256 algorithm
var crypto = require('crypto');

// include the mysql module
var mysql = require("mysql");

//var db = require("./db.js")
// apply the body-parser middleware to all incoming requests
app.use(bodyparser());

// use express-session
// in mremory session is sufficient for this assignment
var currentUser;
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var connection;
fs.readFile(__dirname + '/db_config.xml', function(err, data) {
	if (err) throw err;
	console.log("data: \n" + data);
    parser.parseString(data, function (err, result) {
		if (err) throw err;
    host = result.dbconfig.host[0];
    user = result.dbconfig.user[0];
    password = result.dbconfig.password[0];
    database = result.dbconfig.database[0];

    connectToDB(host,user,password,database);

	});
});



app.use(session({
  secret: "csci4131secretkey",
  saveUninitialized: true,
  resave: false}
));



// server listens on port 9007 for incoming connections
app.listen(9007, () => console.log('Listening on port 9007!'));

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/welcome.html');
});

// // GET method route for the events page.
// It serves schedule.html present in client folder
app.get('/schedule',function(req, res) {
  //Add Details
  if(req.session.value === 1){
  res.sendFile(__dirname + '/client/schedule.html');

}else{
  res.redirect('/login')
}

});

// GET method route for the addEvents page.
// It serves addSchedule.html present in client folder
app.get('/addSchedule',function(req, res) {
  //Add Details
  if(req.session.value === 1){
  res.sendFile(__dirname + '/client/addSchedule.html');
  }else{
    res.redirect('/login')
  }
});
//GET method for stock page
app.get('/stock', function (req, res) {
  if(req.session.value === 1){
    res.sendFile(__dirname + '/client/stock.html');
  }else{
    res.redirect('/login')
  }
});

// GET method route for the login page.
// It serves login.html present in client folder
app.get('/login',function(req, res) {
  //Add Details

  res.sendFile(__dirname + '/client/login.html');

  if(req.session.value < 0){
    res.status(401)
    console.log("incorrect login attempt")
  }

});

// GET method to return the list of events
// The function queries the table events for the list of places and sends the response back to client
app.get('/getListOfEvents', function(req, res) {
  //Add Details
  getListEvent(res)

});

app.get('/getListOfUsers' ,  function(req,res){
	getListOfUsers(res);
});


app.post('/updateUser' , function(req,res){
	id = req.body.acc_id
	name = req.body.acc_name
	login = req.body.acc_login
	password = req.body.acc_password

	updateUser(id,name,login,password)
});
// POST method to insert details of a new event to tbl_events table
app.post('/postEvent', function(req, res) {
  //Add Details
  eventName = req.body.eventName;
  eventLocation = req.body.eventLocation;
  eventDay = req.body.eventDay;
  eventStartTime = req.body.eventStartTime;
  eventEndTime = req.body.eventEndTime;

  postEvent(eventName , eventLocation, eventDay, eventStartTime, eventEndTime, req , res);

});

// POST method to validate user login
// upon successful login, user session is created
app.post('/sendLoginDetails', function(req, res) {
  //Add Details
 username = req.body.username
 password = req.body.password

validate(username,password,req,res)
});

app.get('/admin', function(req, res) {
  //Add Details
  if(req.session.value  === 1){
    res.sendFile(__dirname + '/client/admin.html');
  }else{
    res.redirect('/login')
  }
});

app.post('/addUser' , function(req,res){

  acc_id = req.body.acc_id;
	acc_name = req.body.acc_name;
	acc_login = req.body.acc_login;
	acc_password = req.body.acc_password;

  addUser(acc_id ,acc_name , acc_login, acc_password, res)
});

// log out of the application
// destroy user session
app.get('/logout', function(req, res) {
  //Add Details
  req.session.value = 0;
  res.redirect('/login')
});

app.post('/deleteUser' , function (req,res){
	id = req.body.acc_id
	deleteUser(id)
});

app.get('/currentUser' , function(req,res){

console.log(currentUser)
res.send({currentUser : currentUser});

});

// middle ware to serve static files
app.use('/client', express.static(__dirname + '/client'));


// function to return the 404 message and error to client
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/404.html');
  // add details

});


function postEvent(eventName , eventLocation, eventDay, eventStartTime, eventEndTime , req, res){

  var rowToBeInserted = {
    event_name : eventName,
    event_location : eventLocation,
    event_day : eventDay,
    event_start_time : eventStartTime,
    event_end_time : eventEndTime
  };

  connection.query('INSERT tbl_events SET ?', rowToBeInserted, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Value inserted");
    res.redirect('/schedule')
  });


}

function updateUser(id, name, login ,password){
	var rowToBeUpdated = {
		acc_id : id,
		acc_name : name,
		acc_login : login,
		acc_password : password
	}

	connection.query('UPDATE tbl_accounts SET ? WHERE acc_id = ?' , [rowToBeUpdated , id] , function(err,result){
		if (err){
			throw err
		}else{
			console.log("Table updated")
		}
	});

}

function deleteUser(id){

	connection.query('DELETE FROM tbl_accounts WHERE acc_id = ?' , id , function (err , result){
		if (err){
			throw err
		}
		else{
			console.log("Deleted")
		}
	});
}

function addUser(acc_id , acc_name , acc_login, acc_password , res){


	var rowToBeInserted = {
		acc_id : acc_id,
		acc_name: acc_name,
		acc_login: acc_login,
		acc_password: crypto.createHash('sha256').update(acc_password).digest('base64')
	};

	connection.query('INSERT tbl_accounts SET ?', rowToBeInserted, function(err, result) {
		if(err) {
			throw err;
		}
		console.log("Value inserted");
		res.redirect('/admin')
	});

}

function validate(username, password, req, res){
  acc_password = crypto.createHash('sha256').update(password).digest('base64')
  console.log(acc_password)
  var loginValues = [username , acc_password];
  var loginQuery =  'SELECT * FROM tbl_accounts WHERE acc_name = ? AND acc_password = ?';
  connection.query(loginQuery, loginValues, function(err,rows,fields){
    if (err){
      throw err;
    }
    if (rows.length === 0){
      console.log("No user with username in DB");

      req.session.value = -1;
      res.redirect('/login')

    }else{
      req.session.value = 1;
			currentUser = username;
      console.log("user exists")
      res.redirect('/schedule');
    }
  })

}

function getListEvent(res){
  connection.query('SELECT * FROM tbl_events' , function(err,rows,fields){
    if(err){
      throw err
    }
    if(rows.length === 0){
      console.log("there is nothing here")
    }else{
      var responseArr = [];
      res.send(rows)
    }
  });
}

function getListOfUsers(res){
	connection.query('SELECT * FROM tbl_accounts' , function(err,rows,fields){
		if (err) {
			throw err
		}
		if (rows.length === 0) {
			console.log("there is nothing here")
		} else {
			var responseArr = [];
			currentUserDP = {currentUser : currentUser}
			rows.push(currentUserDP)
			console.log(rows)
			res.send(rows)
		}
	});
}


function connectToDB(host, user, password , database){
console.log(database);
  connection = mysql.createConnection({
    host: host,
    user: user, // replace with the database user provided to you
    password: password,// replace with the database password provided to you
    database: database
  });

  connection.connect(function(err) {
    if (err) {
      console.log(err);
      throw err;
    };
    console.log("Connected to MYSQL database!");
  });
}
