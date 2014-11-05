var http = require('http');
console.log("Starting...");
var host = "127.0.0.1";
var port = "3000";
var server = http.createServer(function (request, response) {
	console.log("Received request: " + request.url);
	response.writeHead(200, {"Content-type":"text/plain"});
	// response.write("Text for user");
	response.end("Text for user"); //Set a body message to an end method instead a write method.
});
server.listen(port, host, function() {
	console.log("Server listening " + host + " on " + port)
});