const { ENV_CLEANUP_AUTOMATION_DRY_MODE, ENV_CLEANUP_AUTOMATION_INTERVAL_MS, FILE_MAX_AGE_IN_SECONDS, TEMPORARY_LIBREOFFICE_PROFILES_PATH, TEMPORARY_PDF_PATH, TEMPORARY_UPLOAD_PATH } = require('../constants');
const { cleanupFiles } = require('../functions/deleteFileIfExist');
const { getFilesInDirs } = require('../functions/getFilesInDir');
const { getFilesOlderThanNSeconds } = require('../functions/getFilesOlderThan');
const { makeLogger } = require('../functions/logger');

const prepareForNextCleanup = (logger) => {
  const nextRunTime = new Date(new Date().getTime() + ENV_CLEANUP_AUTOMATION_INTERVAL_MS).toISOString();
  logger(`Next cleanup automation at ${nextRunTime}`);
  setTimeout(() => {
    startCleanupAutomationBot();
  }, ENV_CLEANUP_AUTOMATION_INTERVAL_MS);
};

const startCleanupAutomationBot = () => {
  const logger = makeLogger(`[AUTOMATION]`, `[CLEANUP]`);
  logger('Starting Cleanup Automation');
  const sk = () => {
    logger('Cleanup Automation finished');
    prepareForNextCleanup(logger);
  };

  const fk = (step) => {
    logger(`Cleanup automation failed, step: ${step}`);
    prepareForNextCleanup(logger);
  };

  getFilesInDirs([TEMPORARY_PDF_PATH, TEMPORARY_UPLOAD_PATH, TEMPORARY_LIBREOFFICE_PROFILES_PATH], (allFilePaths) => {
    getFilesOlderThanNSeconds(allFilePaths, FILE_MAX_AGE_IN_SECONDS, logger, fk, (filePathsOlderThanAge) => {
      if (ENV_CLEANUP_AUTOMATION_DRY_MODE) {
        logger(`[DRY MODE]`, `Cleaning ${filePathsOlderThanAge.length} files\n`, filePathsOlderThanAge);
        sk();
      } else {
        cleanupFiles(filePathsOlderThanAge, logger, fk, sk);
      }
    });
  }, fk);
};

module.exports = { startCleanupAutomationBot };
