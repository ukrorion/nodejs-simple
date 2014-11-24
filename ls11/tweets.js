/**
 * Created by ukrorion on 21.11.2014.
 */

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = "27017";

// Private methods
var connectToCollection = function(client){
  return client.db('nodejs-simple').collection("tweets");
};

Tweet = function() {
  this.server = new mongo.Server(host, port, {});
  this.client = new mongo.MongoClient(this.server);
};

Tweet.prototype.openConnection = function(callback){
  if (this.client._db._state == '‌disconnected'){
    this.client.open(function(error, client) {
      if (error) {
        console.log("Not connected because of error: " + error);
      } else {
        callback(client);
      }
    });
  } else {
    callback(this.client);
  }
};

Tweet.prototype.insert = function(collection, callback){
  this.openConnection(function(client){
    var tweets = connectToCollection(client);
    tweets.insert(collection, function (err, result) {
        if (err) {
          console.log("Insert error " + err);
          if (typeof callback == "function")
            callback(false);
        } else {
          if (typeof callback == "function")
            callback(result);
        }
      client.close();
    });
  });
};

module.exports.Tweet = Tweet;