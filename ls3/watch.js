var fs = require('fs');
console.log('Starting');
var config = JSON.parse(fs.readFileSync('./files/config.json'));
console.log('Initial configuration: ', config);

fs.watchFile('./files/config.json', function(current, previous){
  console.log('Configuration changed');
  config = JSON.parse(fs.readFileSync('./files/config.json'));
  console.log('New configuration: ', config);
});