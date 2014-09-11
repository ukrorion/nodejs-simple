var fs = require('fs');
console.log('Starting');
fs.writeFile('./files/write_async.txt', 'Some content for async file writing', function(error){
  console.log('Writing');
  console.log('Finished');
});