var https = require('https');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config/twitter.json'));

var options = {
  hostname: "stream.twitter.com",
  path: "/1.1/statuses/filter.json?track=twitter",
  method: "GET",
  headers: {
    "Authorization" : "OAuth oauth_consumer_key='wfYzSL9C1BOaf5VlNm1lw', oauth_nonce='ef762ecb322bb379d907d03730d77f54', oauth_signature='jNDJDqlVFpmpehdgCZ%2FvayjekKE%3D', oauth_signature_method='HMAC-SHA1', oauth_timestamp='1416180711', oauth_token='271359180-JoZG2RKEk5LJWFRy15NHHIYVJxHL1RIbaXzBTRXs', oauth_version='1.0'"
  }
}

var request = https.request(options, function(response){
  var body = '';
  response.on("data", function (chunk) {
    //var tweet = JSON.parse(chunk);
    console.log("Tweet: " + chunk);
    //body += chunk.toString();
  });
  response.on("end", function(){
    console.log("Disconnected from twitter");
  });
});
request.end();

request.on('error', function(error) {
  console.error(error);
});
