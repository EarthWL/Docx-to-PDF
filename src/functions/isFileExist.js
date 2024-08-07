const { stat } = require('fs');

const isFileExist = (filePath, logger, fk, sk) => {
  stat(filePath, (error) => {
    if (error) {
      console.error(`File not found: ${filePath}`);
      return fk(error);
    }
    return sk();
  });
};

module.exports = { isFileExist };
