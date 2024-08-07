const { readdir } = require('fs');
const path = require('path');
const { flatten } = require('./flatten');

const getFilesInDir = (dirPath, sk, fk) => {
  readdir(dirPath, (err, fileNames) => {
    if (err) {
      return fk();
    }
    return sk(fileNames.map(fileName => path.join(dirPath, fileName)));
  });
};

const getFilesInDirs = (dirPaths, sk, fk) => {
  Promise.all(
    dirPaths.map(dirPath => 
      new Promise((res, rej) => 
        getFilesInDir(dirPath, res, rej)
      )
    )
  ).then(filesPerDir => sk(flatten(filesPerDir)))
    .catch(() => fk('Get files in dirs'));
};

module.exports = { getFilesInDir, getFilesInDirs };
