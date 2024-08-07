const { startExpress } = require('./services/expressApp');
const { startCleanupAutomationBot } = require('./services/cleanupAutomationBot');
const { startUnoserver } = require('./services/unoserver');
require('./services/envVariables');

startUnoserver().then(() => {
  startExpress();
  startCleanupAutomationBot();
});
