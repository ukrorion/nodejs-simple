/**
 * Created by ukrorion on 12.11.2014.
 */


var https = require("https");

function getRepos(username, callback) {
  var options = {
    host: 'api.github.com',
    path: '/users/' + username + '/repos',
    method: 'GET',
    headers: {'User-Agent': 'Mozilla/5.0'}
  };

  var request = https.request(options, function (response) {
    var body = '';
    response.on("data", function (chunk) {
      body += chunk.toString('utf8');
    });
    response.on("end", function () {
      var repos = [];
      var json_body = JSON.parse(body);
      json_body.forEach(function (repo) {
        repos.push(repo);
      });
      callback(repos);
    });
  });
  request.end();
}

module.exports.getRepos = getRepos;