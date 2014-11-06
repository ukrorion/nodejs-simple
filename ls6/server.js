var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config/server.json"));
var express = require('express');
var router = express.Router();
var logger = require('morgan');

var app = express();

router.use(logger());
app.get("/", function (request, response, next) {
  response.send("This is the index page");
});
app.use(express.static(__dirname + '/public'));
app.get("/news/:id",  function (req, res) {
  res.send("News #" + req.params.id);
});
app.get(function(req, res){
  res.send("Page not found!");
});

app.listen(config.port, config.host);