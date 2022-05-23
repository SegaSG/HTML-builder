const fs = require('fs');
const path = require('path');
const pathDir= path.join(__dirname, 'secret-folder');

fs.readdir(pathDir, { withFileTypes: true }, (error, data) => {
  if (error) {
    console.log(error.message);
  }
  data.forEach((file) => {
    if (file.isFile()) {
      fs.stat(pathDir + '/' + file.name, (error, stats) => {
        if (error) {
            console.log (error.message);
        }
        console.log (path.parse(pathDir + '/' + file.name).name + ' - ' + path.parse(pathDir + '/' + file.name).ext.slice(1) + ' - ' + (stats.size / 1024 + 'kB')
        );
      });
    }
  });
});