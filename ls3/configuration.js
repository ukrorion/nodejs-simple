var fs = require('fs');
console.log('Start working');
var content = fs.readFileSync('./files/config.json');
console.log('Content '+ content);