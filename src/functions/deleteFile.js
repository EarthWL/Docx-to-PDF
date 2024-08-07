const { rm } = require("fs");

const deleteFile = (filePath, logger, fk, sk) => {
  logger(`Deleting file "${filePath}"`);
  rm(filePath, { recursive: true }, (error) => {
    if (error) {
      console.error(error);
      console.error(`Could not delete file "${filePath}"`);
      return fk(error);
    } else {
      logger(`Deleted file "${filePath}" successfully`);
      return sk();
    }
  });
};

module.exports = { deleteFile };
