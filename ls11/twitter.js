var https = require('https');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config/twitter.json'));

var request = https.request(config.options, function(response){
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
