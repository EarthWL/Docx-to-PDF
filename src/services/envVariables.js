require('dotenv').config();

const loadEnvVariable = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Could not load environment variable: ${key}`);
  }
  return value;
}

const ENV_CLEANUP_AUTOMATION_DRY_MODE = loadEnvVariable('CLEANUP_AUTOMATION_DRY_MODE');
const ENV_CLEANUP_AUTOMATION_INTERVAL_MS = loadEnvVariable('CLEANUP_AUTOMATION_INTERVAL_MS');
const ENV_FILE_MAX_AGE_IN_SECONDS = loadEnvVariable('FILE_MAX_AGE_IN_SECONDS');
const ENV_PORT = loadEnvVariable('PORT');

module.exports = {
  ENV_CLEANUP_AUTOMATION_DRY_MODE,
  ENV_CLEANUP_AUTOMATION_INTERVAL_MS,
  ENV_FILE_MAX_AGE_IN_SECONDS,
  ENV_PORT
};
