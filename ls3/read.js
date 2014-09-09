var fs = require("fs");
console.log("Start async reading");
fs.readFile("./ls1/sample.txt", function (error, data) {
  console.log("Data from file: "+ data);
});
console.log("Stop async reading");

console.log("Start sync reading");
var data = fs.readFileSync("./ls1/sample.txt");
console.log("Data from file: " + data);
console.log("Stop sync reading");