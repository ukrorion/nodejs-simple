var http = require('http');
var fs = require('fs');
console.log("Starting...");
var config = JSON.parse(fs.readFileSync("config/server.json"));
var server = http.createServer(function (request, response) {
	console.log("Received request: " + request.url);
  fs.readFile("public" + request.url, function (error, data) {
    console.log(error);
    if(error){
      fs.readFile("public/404.html", function (error, data) {
        response.writeHead(404, {"Content-type":"text/html"});
        response.end(data);
      });
    } else {
      response.writeHead(200, {"Content-type":"text/html"});
      response.end(data);
    }
  });
});
server.listen(config.port, config.host, function() {
	console.log("Server listening " + config.host + " on " + config.port)
});
fs.watchFile("config/server.json", function () {
  config = JSON.parse(fs.readFileSync("config/server.json"));
  server.close();
  server.listen(config.port, config.host, function() {
    console.log("Server listening " + config.host + " on " + config.port)
  });
});