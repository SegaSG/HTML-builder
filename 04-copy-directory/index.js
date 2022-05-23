const path = require('path');
const fs = require('fs');
const pathMain = path.join(__dirname, 'files'); 
const pathCopy = path.join(__dirname, 'files-copy');

fs.readdir(pathCopy, { withFileTypes: true }, (error, files) => {
    if (files) {
        files.forEach(file => {
            fs.rm(path.join(pathCopy, file.name), (error) => {
                if (error) throw error;
            });
        });
    };
});

fs.promises.mkdir(pathCopy, { recursive: true})
  .then(function() {
      fs.readdir(pathMain, { withFileTypes: true }, (error, files) => {
        files.forEach(file => {
            fs.copyFile(path.join(pathMain, file.name), path.join(pathCopy, file.name), (error) => {
                if (error) throw error;
            });
        });
      });
  })
  .catch(function() {
    console.log('error needs to be fixed');
  });