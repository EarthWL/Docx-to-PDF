const { deleteFile } = require('./deleteFile');
const { isFileExist } = require('./isFileExist');

const cleanupFile = (filePath, logger, fk, sk) => {
  isFileExist(filePath, logger, fk, () => deleteFile(filePath, logger, fk, sk));
};

const cleanupFiles = (filePaths, logger, fk, sk) => {
  Promise.all(
    filePaths.map(filePath => 
      new Promise((res, rej) => 
        cleanupFile(filePath, logger, rej, () => res())
      )
    )
  ).then(sk)
  .catch(() => fk('cleaning files'));
};

module.exports = { cleanupFile, cleanupFiles };
