/**
 * Created by ukrorion on 21.11.2014.
 */

var mongo = require('mongodb');
var host = "127.0.0.1";
var port = "27017";

var connectToCollection = function(client){
  return client.db('nodejs-simple').collection("tweets");
};

Tweet = function() {
  this.server = new mongo.Server(host, port, {});
  this.client = new mongo.MongoClient(this.server);
};

Tweet.prototype.getAll =  function(callback){
  this.client.open(function(error, client){
    if(error){
      console.log("Not connected because of error: " + error);
    } else {
      var tweets = connectToCollection(client);

      tweets.find().toArray(function (err, result) {
        if(err) {
          console.log("Find error: " + err);
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

Tweet.prototype.insert = function(collection, callback){
  if (this.client._db._state == 'connecting')
    this.client.close();
  this.client.open(function(error, client){
    if(error){
      console.log("Not connected because of error: " + error);
    } else {
      var tweets = connectToCollection(client);
      console.log(tweets);
      tweets.insert(collection, function(err, result){
        if(err){
          console.log("Insert error " + err);
          client.close();
          if (typeof callback == "function")
            callback(false);
        } else {
          client.close();
          if (typeof callback == "function")
            callback(result);
        }
      });
    }
    client.close();
  });
};

module.exports.Tweet = Tweet;