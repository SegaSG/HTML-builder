
const path = require('path');
const process = require('process');
const fs = require('fs');
const ref = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(ref, 'utf-8');

readableStream.on('data', (chunk) => {
  process.stdout.write(chunk);
});