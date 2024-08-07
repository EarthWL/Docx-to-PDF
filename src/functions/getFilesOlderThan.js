const { stat } = require('fs');
const { logger } = require('./logger');

const getFileAgeInSeconds = (filePath) => new Promise((res, rej) => {
  stat(filePath, (err, meta) => {
    if (err) {
      console.error(err);
      return rej();
    }
    const msToSec = (n) => n / 1000;
    const currentTime = msToSec(new Date().getTime());
    const fileCreationTime = msToSec(meta.ctime.getTime());
    return res(currentTime - fileCreationTime);
  });
});

const getFilesOlderThanNSeconds = (filePaths, targetAgeInSeconds, logger, fk, sk) => {
  Promise.all(
    filePaths.map(filePath => 
      new Promise((res, rej) => 
        getFileAgeInSeconds(filePath).then(computedAge => 
          res({ filePath, ageInSeconds: computedAge })
        ).catch(rej)
      )
    )
  ).then(metas => {
    const oldFiles = metas.filter(meta => meta.ageInSeconds >= targetAgeInSeconds).map(({ filePath }) => filePath);
    logger(`Number of old files found: ${oldFiles.length}`);
    sk(oldFiles);
  }).catch(() => fk('getting files older than n seconds'));
};

module.exports = { getFilesOlderThanNSeconds };
