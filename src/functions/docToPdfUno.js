const { exec } = require('child_process');
const { TEMPORARY_PDF_PATH } = require('../constants');

const docToPdfUno = (input, logger, fk, sk) => {
  const pdfPath = `${TEMPORARY_PDF_PATH}/${input}.pdf`;

  exec(`
    python3 -m unoserver.converter \
      --convert-to pdf \
      --filter writer_pdf_Export \
      "${input}" \
      "${pdfPath}" 
  `, (err) => {
    if (err) {
      fk(err);
      return;
    }
    logger(`Converted ${input} successfully`);
    sk(pdfPath);
  });
};

module.exports = { docToPdfUno };
