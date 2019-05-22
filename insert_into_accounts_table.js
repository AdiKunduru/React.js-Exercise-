/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

var mysql = require("mysql");
var crypto = require('crypto');

var con = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with the database user provided to you
  password: "admin", // replace with the database password provided to you
  database: "csci4131"
});

con.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");

  var rowToBeInserted = {
    acc_id : 100,
    acc_name: 'charlie', // replace with acc_name chosen by you OR retain the same value
    acc_login: 'charlie', // replace with acc_login chosen by you OR retain the same value
    acc_password: crypto.createHash('sha256').update("tango").digest('base64') // replace with acc_password chosen by you OR retain the same value
  };

  var sql = ``;
  con.query('INSERT tbl_accounts SET ?', rowToBeInserted, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Value inserted");
  });
});
