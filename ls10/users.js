/**
 * Created by ukrorion on 13.11.2014.
 * Users module
 */

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = "27017";

User = {
  client: new mongo.MongoClient(new mongo.Server(host, port, {})),
  getAll: function(callback){
    this.client.open(function(error, client){
      if(error){
        console.log("Not connected because of error: " + error);
      } else {
        var db = client.db('nodejs-simple');
        var users = db.collection("users");

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
  },
  insert: function(collection, callback){
    this.client.open(function(error, client){
      if(error){
        console.log("Not connected because of error: " + error);
      } else {
        var db = client.db('nodejs-simple');
        var users = db.collection("users");

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
  }
};

module.exports.new = function(){
  return User;
};