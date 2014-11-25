var OAuth = require('oauth').OAuth;
var Tweet = require('./tweets').Tweet;

var connection = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'wfYzSL9C1BOaf5VlNm1lw',
  '3oe4v2CyFO1Nd0GhdzX8Ww2nWpCxBVLh1CVn0JNkuEo',
  '1.0A',
  null,
  'HMAC-SHA1'
);
var request = connection.get('https://stream.twitter.com/1.1/statuses/filter.json?track=HromadskeTV', '271359180-fmh4JpOdTC0K2nF0QlB2GwyI6q5Cr3Q3WDA8jd41', 'r0TCSqMyZDezNjv2JKvunDXPy7XwryjFeOv2gG3qsVuNM');
var message = '';

request.on('response', function(response){
  if(response){
    response.setEncoding('utf8');
    response.on('data', function(chunk){
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
          tweetDb.insert(data_to_write, function(result){
            console.log(result);
          });
        }
      }
      message = message.slice(newlineIndex + 1);
    });
  } else {
    console.log("Connection lost with error: " + error);
  }
});
request.end();