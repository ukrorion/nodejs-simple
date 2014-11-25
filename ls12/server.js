var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config/server.json"));
var express = require('express');
var router = express.Router();
var Tweet = require('./model/tweets').Tweet;

var app = express();


app.get("/", function (request, response, next) {
  var content = fs.readFileSync("./config/template.html");
  var tweets = new Tweet();
  var last_tweets;
  tweets.find({},{"limit":10, "sort":{"_id":-1}}, function(res){
    last_tweets = res;
    console.log(last_tweets.length);
  });
  response.setHeader("Content-Type", "text/html");
  response.send(content);
});


app.listen(config.port, config.host);