const express = require('express');
const multer = require('multer');
const { ENV_PORT } = require('../constants');
const { docxToPdfHandler } = require('../api/docxToPdfHandler');
const { fontUploadHandler } = require('../api/fontUploadHandler');
const { applyMiddleware } = require('../functions/applyMiddleware');
const { makeLogger } = require('../functions/logger');

const upload = multer({ storage: multer.memoryStorage() });

const startExpress = () => {
  const server = express();
  const logger = makeLogger(`[EXPRESS]`);
  applyMiddleware(server);

  server.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  server.post('/docx-to-pdf', upload.single('document'), (req, res) => {
    docxToPdfHandler(
      'cli',
      req.file,
      logger,
      ({ status, message }) => {
        logger(`HTTP: ${status}, Message: ${message}`);
        res.status(status).send(message);
      },
      (data) => {
        logger(`HTTP: 200`);
        res.status(200).setHeader('Content-Type', 'application/pdf').send(data);
      }
    );
  });

  server.post('/docx-to-pdf/uno', upload.single('document'), (req, res) => {
    docxToPdfHandler(
      'uno',
      req.file,
      logger,
      ({ status, message }) => {
        logger(`HTTP: ${status}, Message: ${message}`);
        res.status(status).send(message);
      },
      (data) => {
        logger(`HTTP: 200`);
        res.status(200).setHeader('Content-Type', 'application/pdf').send(data);
      }
    );
  });

  server.post('/upload-font', upload.single('font'), (req, res) => {
    fontUploadHandler(
      req.file,
      logger,
      (error) => {
        res.status(error.status).send(error.message);
      },
      (successMessage) => {
        res.status(200).send(successMessage);
      }
    );
  });

  server.listen(ENV_PORT, () => {
    logger(`Started listening on port ${ENV_PORT}`);
  });
};

module.exports = { startExpress };
