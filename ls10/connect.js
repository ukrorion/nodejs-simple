/**
 * Created by ukrorion on 12.11.2014.
 */

var User = require('./users.js');

user = User.new();

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

