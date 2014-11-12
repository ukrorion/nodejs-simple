/**
 * Created by ukrorion on 12.11.2014.
 */

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = "27017";
var client = new mongo.MongoClient(new mongo.Server(host, port, {}));

client.open(function(error, client){
  if(error){
    console.log("Not connected because of error: " + error);
  } else {
    var db = client.db('nodejs-simple');
    var users = db.collection("users");

    users.insert([{name: "Jim", email: "jim@example.com"}, {name: "Jim", email: "jim@example.com"}], function(err, result){
      if(err){
        console.log("Insert error " + err);
      } else {
        console.log("Connected to mongo");
        console.log(result);
      }
    });

    users.find().toArray(function (err, users) {
      if(err) {
        console.log("Find error: " + err);
      } else {
        users.forEach(function (user) {
          console.log("Id: " + user._id + " Name: " + user.name + "Email: " + user.email);
        });
        client.close();
      }
    });
  }
});