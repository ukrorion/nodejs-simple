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
app.get("/user/:id", function (req, res) {
  fs.readFile("public/users.json", function (err, data) {
    if(err){
      res.send("Something went wrong!");
    } else {
      var users = JSON.parse(data);
      var user = users[req.params.id];
      if(user){
        res.send("<h1>"+user.name+"</h1><br/><a href='mailto:"+user.email+"'> Send mail to "+user.email+"</a>");
      } else {
        res.send("Sorry! User does not exist.", 404)
      }
    }
  });
});

app.listen(config.port, config.host);