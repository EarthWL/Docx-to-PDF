const { stat } = require('fs');

const getFileMetadata = (filePath, sk, fk) => {
  stat(filePath, (err, meta) => {
    if (err) {
      console.error(err);
      return fk();
    }
    return sk(meta);
  });
};

module.exports = { getFileMetadata };
