const libre = require('libreoffice-convert');
const { getFileData } = require('../functions/getFileData');
const { isPresent } = require('../functions/isPresent');
const { docToPdfCli } = require('../functions/docToPdfCli');
const { docToPdfUno } = require('../functions/docToPdfUno');

const docxToPdfHandler = (mode, file, logger, fk, sk) => {
  if (!isPresent(file)) {
    fk({ status: 400, message: 'No files were provided' });
    return;
  }

  const input = file.buffer;

  if (mode === 'cli') {
    libre.convert(input, '.pdf', undefined, (err, done) => {
      if (err) {
        logger(err);
        fk({ status: 500, message: 'LibreOffice error' });
        return;
      }
      sk(done);
    });
  } else if (mode === 'uno') {
    docToPdfUno(input, logger, fk, sk);
  } else {
    throw new Error(`Unsupported mode: ${mode}`);
  }
};

module.exports = { docxToPdfHandler };
