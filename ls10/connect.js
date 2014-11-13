/**
 * Created by ukrorion on 12.11.2014.
 */

/**
 * Creation of an object instance when export was done in the following format:
 * ***  module.exports = User ***
 *
 * var User = require('./users.js');
 * var user = new User();
 *
*/

/*
 * Creation of an object instance when export was done in the following format:
 * ***  module.exports.User = User ***
 *
 * var User = require('./users.js').User;
 * var user = new User();
 *
 */

var User = require('./users.js').User;
var user = new User();

user.insert({name: "Bob", email: "bob@example.com"}, function (res) {
  if(res){
    console.log("Record was inserted successfully");
    user.getAll(function(result){
      if(result) {
        result.forEach(function (user) {
          console.log("Id: " + user._id + " Name: " + user.name + "Email: " + user.email);
        });
      }
    });
  }
});

