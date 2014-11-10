/**
 * Created by Ukrorion on 11.11.2014.
 */

var https = require("https");
var username = 'ukrorion';

var options = {
  host: 'api.github.com',
  path: '/users/' + username + '/repos',
  method: 'GET',
  headers: {'User-Agent' : 'Mozilla/5.0'}
};

var request = https.request(options, function(response){
  var body = '';
  response.on("data", function (chunk) {
    body += chunk.toString('utf8');
  });
  response.on("end", function(){
    var json_body = JSON.parse(body);
    json_body.forEach(function(repo){
      console.log("Name: " + repo.name + " Owner: " + repo.owner.login);
    });
    console.log("Repos count: " + json_body.length);
  });
});
request.end();