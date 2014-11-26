var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config/server.json"));
var http = require('http');
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

var server = http.Server(app);
server.listen(config.port, config.host);
var io = require('socket.io')(server);

var OAuth = require('oauth').OAuth;

var connection = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'wfYzSL9C1BOaf5VlNm1lw',
  '3oe4v2CyFO1Nd0GhdzX8Ww2nWpCxBVLh1CVn0JNkuEo',
  '1.0A',
  null,
  'HMAC-SHA1'
);
var request = connection.get('https://stream.twitter.com/1.1/statuses/filter.json?track=twitter', '271359180-fmh4JpOdTC0K2nF0QlB2GwyI6q5Cr3Q3WDA8jd41', 'r0TCSqMyZDezNjv2JKvunDXPy7XwryjFeOv2gG3qsVuNM');
var message = '';
var socket;

io.on('connection', function (socket_res) { socket = socket_res });

request.on('response', function (response) {
  if (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      message += chunk;
      var newlineIndex = message.indexOf('\r');
      if (newlineIndex !== -1) {
        var tweet_message = message.slice(0, newlineIndex);
        if (tweet_message.length > 10) {
          var tweet = JSON.parse(tweet_message);
          var tweetDb = new Tweet(); // Needs to create new object for each request to prevent double opening of DB
          var data_to_write = {
            'user': tweet.hasOwnProperty('user') ? tweet.user.name : '',
            'text': tweet.hasOwnProperty('text') ? tweet.text : '',
            'source': tweet.hasOwnProperty('source') ? tweet.source : ''
          };
          setTimeout(function () {
            tweetDb.insert(data_to_write, function (result) {
              if (typeof socket != 'undefined') {
                socket.emit("tweet", result[0]);
              }
            });
          }, 1000);
        }
      }
      message = message.slice(newlineIndex + 1);
    });
  } else {
    console.log("Connection lost with error: " + error);
  }
});

request.end();