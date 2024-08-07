const { readFile } = require('fs');

const getFileData = (path, sk, fk) => {
  readFile(path, (err, data) => {
    if (err) {
      fk(err);
      return;
    }
    sk(data);
  });
};

module.exports = { getFileData };
