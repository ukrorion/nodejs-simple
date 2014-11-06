var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config/server.json"));
var express = require('express');

var app = express();

app.get("/", function (request, response) {
  response.send("This is the index page");
});

app.listen(config.port, config.host);