var fs = require("fs");
console.log("Start");
fs.readFile("sample.txt", function(error,data){
  console.log("Content of file" + data);
});
console.log("Stop");