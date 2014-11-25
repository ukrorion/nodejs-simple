var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config/server.json"));
var express = require('express');
var router = express.Router();
var Tweet = require('./model/tweets').Tweet;

var app = express();


app.get("/", function (request, response, next) {
  var template = fs.readFileSync("./config/template.html");
  var tweets = new Tweet();
  tweets.find({},{"limit":10, "sort":{"_id":-1}}, function(res){
    var content = '';
    res.forEach(function(tweet){
      content += "<li><strong>"+tweet.user+"</strong> "+tweet.text+" "+ tweet.source +"</li>";
    });
    template = template.toString('utf8').replace("{{INITIAL_TWEETS}}", content);
    response.setHeader("Content-Type", "text/html");
    response.send(template);
  });

});

app.listen(config.port, config.host);