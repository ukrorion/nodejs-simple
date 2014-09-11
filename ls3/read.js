var fs = require("fs");
console.log("Start async reading");
fs.readFile("./files/sample.txt", function (error, data) {
  console.log("Data from file: "+ data);
});
console.log("Stop async reading");

console.log("Start sync reading");
var data = fs.readFileSync("./files/sample.txt");
console.log("Data from file: " + data);
console.log("Stop sync reading");