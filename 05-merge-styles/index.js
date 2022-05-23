const path = require('path');
const fs = require('fs');

const writeableStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css')
);

async function addStyle() {
  const files = await fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  files.map(file => {
    if(path.extname(file.name) === '.css' && file.isFile()) {
      let readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
      readableStream.pipe(writeableStream);
    }
  });
}
addStyle();