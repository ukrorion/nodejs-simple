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
    console.log("Connected to mongo");
    client.close();
  }
});