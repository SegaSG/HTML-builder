const path = require('path');
const fs = require('fs');
const projectDist = path.join(__dirname, 'project-dist');
const dirPath = path.join(__dirname, 'assets');
const dirDist = path.join(projectDist, 'assets');

async function createFolder(nameFolder) {
  await fs.promises.mkdir(nameFolder, { recursive: true });
}

async function copyDir(oldDir, newDir) {
  await createFolder(newDir);
  const files = await fs.promises.readdir(oldDir, { withFileTypes: true });
  files.forEach(async (item) => {
    if (item.isFile()) {
      await fs.promises.copyFile(path.join(oldDir, item.name), path.join(newDir, item.name));
    } else copyDir(path.join(oldDir, item.name), path.join(newDir, item.name));
  });
}

async function createStyles(fromFile, toFile) {
  const stylesDist = path.join(projectDist, 'style.css');
  const writeStream = fs.createWriteStream(stylesDist, 'utf-8');
  const dirWithStyles = path.join(fromFile, toFile);
  const files = await fs.promises.readdir(dirWithStyles, { withFileTypes: true });
  const filesStyle = files.filter((item) => path.extname(item.name) === '.css');
  filesStyle.forEach((item) => {
    if (item.isFile()) {
      const readStream = fs.createReadStream(path.join(dirWithStyles, item.name), 'utf-8');
      readStream.on('data', (data) => writeStream.write(data));
    } else {createStyles(dirWithStyles, item.name);
    }
  });
}

async function changeTemplates() {
  const template = path.join(__dirname, 'template.html');
  const readStream = fs.createReadStream(template, 'utf-8');
  const writeStream = fs.createWriteStream(path.join(projectDist, 'index.html'));
  let html = '';
  readStream.on('data', async (data) => {
    html = data;
    const files = await fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
    const filesHtml = files.filter((item) => path.extname(item.name) === '.html');
    filesHtml.forEach((item, ind) => {
      if (item.isFile()) {
        const readable = fs.createReadStream(path.join(__dirname, 'components', item.name));
        const reg = `{{${path.parse(item.name).name}}}`;
        readable.on('data', (data) => {
          html = html.replace(reg, data);
          if (ind === filesHtml.length - 1) {
            writeStream.write(html);
          }
        });
      }
    });
  });
}

fs.rm(projectDist, { recursive: true }, async () => {
  await createFolder(projectDist);
  await copyDir(dirPath, dirDist);
  await createStyles(__dirname, 'styles');  
  await changeTemplates();
});