const { exec } = require('child_process');
const { TEMPORARY_LIBREOFFICE_PROFILES_PATH, TEMPORARY_PDF_PATH } = require('../constants');

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const randomStr = (length) => {
  return Array(length).fill(0).map(() => CHARS[(Math.floor(Math.random() * CHARS.length)) - 1]).join('');
};

const docToPdfCli = (input, logger, fk, sk) => {
  exec(`
    libreoffice \
      -env:UserInstallation=file://${TEMPORARY_LIBREOFFICE_PROFILES_PATH}/${randomStr(20)} \
      --headless \
      --convert-to pdf:writer_pdf_Export \
      --outdir ${TEMPORARY_PDF_PATH} \
      "${input}" 
  `, (err) => {
    if (err) {
      fk(err);
      return;
    }
    const pdfPath = `${TEMPORARY_PDF_PATH}/${input}.pdf`;
    logger(`Converted ${input} successfully`);
    sk(pdfPath);
  });
};

module.exports = { docToPdfCli };
