var fs = require('fs');
console.log('Start working');
var content = fs.readFileSync('./files/config.json');
console.log('Content '+ content);
var config = JSON.parse(content);
console.log('Config: ',config);
console.log('Username ', config.username);