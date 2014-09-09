var fs = require("fs");
console.log("Start working");
fs.readFile("./ls1/sample.txt", function (error, data) {
  console.log("Data from file: "+ data);
});
console.log("Stop working");