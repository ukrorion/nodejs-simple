var http = require('http');
var fs = require('fs');
console.log("Starting...");
var host = "127.0.0.1";
var port = "3000";
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
server.listen(port, host, function() {
	console.log("Server listening " + host + " on " + port)
});