const { spawn } = require('child_process');

const startUnoserver = () => {
  return new Promise((res, rej) => {
    const child = spawn('python3', ['/usr/local/lib/python3.8/dist-packages/unoserver/server.py']);

    child.stdout.on('data', (data) => {
      console.log(`[UNOSERVER] ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`[UNOSERVER] ${data}`);
    });

    child.on('error', (error) => {
      console.error(`Error starting unoserver: ${error.message}`);
      rej(error);
    });

    child.on('spawn', () => {
      console.log('Started unoserver');
      res(child);
    });
  });
};

module.exports = { startUnoserver };
