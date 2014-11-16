/**
 * Created by ukrorion on 13.11.2014.
 * Users module
 */

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = "27017";

var connectToCollection = function(client){
  return client.db('nodejs-simple').collection("users");
};

User = function() {
  this.client = new mongo.MongoClient(new mongo.Server(host, port, {}));
};

User.prototype.getAll =  function(callback){
  this.client.open(function(error, client){
    if(error){
      console.log("Not connected because of error: " + error);
    } else {
      var users = connectToCollection(client);

      users.find().toArray(function (err, users) {
        if(err) {
          console.log("Find error: " + err);
          client.close();
          callback(false);
        } else {
          client.close();
          callback(users);
        }
      });
    }
  });
};

User.prototype.insert = function(collection, callback){
  this.client.open(function(error, client){
    if(error){
      console.log("Not connected because of error: " + error);
    } else {
      var users = connectToCollection(client);

      users.insert(collection, function(err, result){
        if(err){
          console.log("Insert error " + err);
          client.close();
          callback(false);
        } else {
          client.close();
          callback(result);
        }
      });
    }
  });
};

module.exports.User = User;