var fs = require('fs');
console.log('Starting');
fs.writeFileSync('./files/write_sync.txt', 'Some content for file');
console.log('Finished');