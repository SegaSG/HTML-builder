const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const fs = require('fs');
const ref= path.join(__dirname, 'text.txt');
const writeableStream = fs.createWriteStream(ref, 'utf-8');

const stdout = process.stdout;
stdout.write('Hello! Enter message, please\n');

rl.on('line', data => {
  if (data == 'exit') {
    rl.close();
  } else {
    writeableStream.write(data);
  }
});

function sayBye() {
  stdout.write('Good luck!');
}
process.on('exit', sayBye);

