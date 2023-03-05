const path = require("path");
const fs = require("fs");

const getAllFiles = function (dirPath) {
  const files = fs.readdirSync(dirPath);

  let arrayOfFiles = [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

module.exports = getAllFiles;
