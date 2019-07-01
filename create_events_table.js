/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with the database user provided to you
  password: "admin", // replace with the database password provided to you
  database: "react_ex"
});

con.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");
    var sql = `CREATE TABLE tbl_events(event_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       event_name VARCHAR(30),
                                       event_location VARCHAR(30),
                                       event_day VARCHAR(30),
                                       start_time VARCHAR(30),
                                       end_time VARCHAR(30))`;
  con.query(sql, function(err, result) {
    if(err) {
      throw err;
    }
    console.log("Table created");
  });
});






//  document.getElementById("errors").style.visibility = "hidden";
//  document.getElementById("errors").style.textAlign = "center";
//  var currentUser;
//  var idOfNext;
//  var logins = [];
//  var xml = new XMLHttpRequest()
//  var url = '/getListofUsers'
//  xml.open("GET", url, true);
//  xml.send();
//
//  xml.onreadystatechange = function(){
//    console.log(xml.readyState)
//    if(xml.readyState === 4 && xml.status === 200){
//      console.log("i am here")
//      //Format so it fits the table
//      json = JSON.parse(xml.responseText)
//      table = document.getElementById("userTable");
//
//
//      for (var i = 0; i < json.length - 1; i++) {
//        var row = table.insertRow(-1);
//        var cell1 = row.insertCell(0);
//        var cell2 = row.insertCell(1);
//        var cell3 = row.insertCell(2);
//        var cell4 = row.insertCell(3);
//        var cell5 = row.insertCell(4);
//        var cell6 = row.insertCell(5);
//        idOfNext = json[i].acc_id;
//        cell1.innerHTML = idOfNext;
//        cell1.id = "acc_id" + idOfNext
//        cell2.innerHTML = json[i].acc_name
//        cell2.id = "acc_name" + idOfNext
//
//        cell3.innerHTML = json[i].acc_login
//        logins.push([json[i].acc_login]);
//        cell3.id = "acc_login" + idOfNext
//        cell4.innerHTML = ""
//        cell4.id = "acc_password" + idOfNext
//        var editButton = document.createElement("button");
//        editButton.addEventListener("click" , editMode);
//        editButton.innerHTML = "Edit";
//        editButton.id = "edit" + idOfNext;
//        cell5.appendChild(editButton);
//        var deleteButton = document.createElement("button");
//        deleteButton.id = "delete" + idOfNext
//        deleteButton.addEventListener("click" , remove)
//        deleteButton.innerHTML = "Delete";
//        cell6.appendChild(deleteButton);
//      }
//
//      currentUser = json[json.length - 1].currentUser
//      document.getElementById("userWelcome").innerHTML = "Welcome " + currentUser + " !";
//    }
//  }
//
//
//  function addUser(){
//    var table = document.getElementById("userTable")
//    console.log(table.rows.length - 1);
//    if(table.rows.length - 1 === 0){
//      newIdNum = 1;
//    }else{
//      newIdNum = idOfNext + 1;
//    }
//    var row = table.insertRow(-1);
//    var cell1 = row.insertCell(0);
//    var cell2 = row.insertCell(1);
//    var cell3 = row.insertCell(2);
//    var cell4 = row.insertCell(3);
//    var cell5 = row.insertCell(4);
//    var cell6 = row.insertCell(5);
//
//    var nameForm = document.createElement("input")
//    nameForm.type = "text";
//    nameForm.id = "newNameForm" + newIdNum;
//    cell2.appendChild(nameForm);
//    var loginForm = document.createElement("input")
//    loginForm.type = "text";
//    loginForm.id = "newLoginForm" + newIdNum;
//    cell3.appendChild(loginForm);
//    var passwordForm = document.createElement("input")
//    passwordForm.type = "text";
//    passwordForm.id = "newPasswordForm" + newIdNum;
//    cell4.appendChild(passwordForm);
//
//    var saveButton = document.createElement("button");
//    saveButton.id = newIdNum;
//    saveButton.innerHTML = "Save"
//    saveButton.removeEventListener("click" , editMode)
//    saveButton.addEventListener("click" , saveUser)
//    cell5.appendChild(saveButton);
//
//    var deleteButton = document.createElement("button");
//    deleteButton.id = "delete"+newIdNum;
//    deleteButton.innerHTML = "Cancel"
//    deleteButton.removeEventListener("click" , remove)
//    deleteButton.addEventListener("click" , cancel)
//    cell6.appendChild(deleteButton);
//
//  }
//
//
//  function saveUser(){
//    newIdNum = this.id
//    console.log(newIdNum)
//    if (validEdit(document.getElementById("newLoginForm" + newIdNum).value)){
//    user =
//    {
//        acc_id : newIdNum,
//        acc_login : document.getElementById("newLoginForm" + newIdNum).value,
//        acc_name : document.getElementById("newNameForm" + newIdNum).value,
//        acc_password : document.getElementById("newPasswordForm" + newIdNum).value
//    }
//
//
//
//    $.ajax({
//               url: '/addUser',
//               type: 'POST',
//               dataType: 'JSON',
//               data: user,
//               success: location.reload()
//    });
//    }
//  }
//
//  function cancel(){
//    location.reload()
//  }
//
//  function editMode(){
//    id = parseInt(this.id.substring(4,this.id.length) , 10);
//    console.log(parseInt(this.id.substring(4,this.id.length),10))
//    var nameForm = document.getElementById("acc_name" + id)
//    var oldNameInfo = nameForm.innerHTML;
//    nameForm.innerHTML = "";
//    var nameInput = document.createElement("input")
//    nameInput.id = "name" + id
//    nameForm.appendChild(nameInput);
//    var loginForm = document.getElementById("acc_login" + id)
//    var oldLoginInfo = loginForm.innerHTML;
//    loginForm.innerHTML = ""
//    var loginInput = document.createElement("input")
//    loginInput.id = "login" + id
//    loginForm.appendChild(loginInput);
//    var passwordForm = document.getElementById("acc_password" + id)
//    var oldPasswordInfo = passwordForm.innerHTML;
//    passwordForm.innerHTML = "";
//    var passwordInput = document.createElement("input")
//    passwordInput.id = "password" + id
//    passwordForm.appendChild(passwordInput);
//    var editButton = document.getElementById("edit" + id)
//    editButton.innerHTML = "Update"
//    editButton.addEventListener("click" , editMode)
//    editButton.addEventListener("click" , update)
//    var deleteButton = document.getElementById("delete" + id)
//    deleteButton.innerHTML = "Cancel"
//    deleteButton.removeEventListener("click" , remove)
//    deleteButton.addEventListener("click" , cancel)
//
//
//    function update(){
//
//      if(validEdit(loginInput.value)){
//      user =
//      {
//          acc_id : id,
//          acc_login : loginInput.value,
//          acc_name : nameInput.value,
//          acc_password : passwordInput.value
//      }
//
//      $.ajax({
//                 url: '/updateUser',
//                 type: 'POST',
//                 dataType: 'JSON',
//                 data: user,
//                 success: location.reload()
//     });
//    }
//    }
//
//    function cancel(){
//      var nameForm = document.getElementById("acc_name" + id)
//      var nameInput = document.getElementById("name" + id)
//      console.log(id)
//      nameForm.removeChild(nameInput);
//      nameForm.innerHTML = oldNameInfo;
//      var loginForm = document.getElementById("acc_login" + id)
//      var loginInput = document.getElementById("login" + id)
//      loginForm.removeChild(loginInput);
//      loginForm.innerHTML = oldLoginInfo;
//      var passwordForm = document.getElementById("acc_password" + id)
//      var passwordInput = document.getElementById("password" + id)
//      passwordForm.removeChild(passwordInput);
//      passwordForm.innerHTML = "";
//      editButton.innerHTML = "Edit"
//      editButton.removeEventListener("click" , update);
//      editButton.addEventListener("click" , editMode);
//      deleteButton.innerHTML = "Delete"
//      deleteButton.removeEventListener("click" , cancel);
//      deleteButton.addEventListener("click" , remove);
//    }
//}
//
//  function remove(){
//    idNum = parseInt(this.id.substring(6,this.id.length ) , 10);
//    id = {acc_id : idNum}
//    login = document.getElementById("acc_login" + idNum).innerHTML
//    console.log(login)
//    if( login !== currentUser)
//    {
//    for (i = 0; i < logins.length ; i ++){
//      if(logins[i] === login){
//        login[i] === ""
//      }
//    }
//
//    $.ajax({
//               url: '/deleteUser',
//               type: 'POST',
//               dataType: 'JSON',
//               data: id,
//               success: location.reload()
//   });
//    }
//    else{
//      var errMsg = document.getElementById("errors")
//      errMsg.innerHTML = "Cannot delete your own account"
//      errMsg.style.visibility = "visible";
//      errMsg.style.color = "red";
//    }
//  }
//
//  function validEdit(login){
//    console.log(login)
//
//   for(i = 0 ; i < logins.length ; i ++){
//     if(logins[i][0] === login){
//       var errMsg = document.getElementById("errors")
//       errMsg.innerHTML = "This account login is already being used"
//       errMsg.style.visibility = "visible";
//       errMsg.style.color = "red";
//       return false;
//     }
//   }
//
//    return true;
//  }
//          
//          
//  