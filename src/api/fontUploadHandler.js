const fs = require('fs');
const path = require('path');
const { TEMPORARY_UPLOAD_PATH } = require('../constants');

const fontUploadHandler = (file, logger, fk, sk) => {
  if (!file) {
    fk({ status: 400, message: "No font file uploaded" });
    return;
  }

  const uploadPath = path.join('/usr/share/fonts/custom', file.originalname);
  
  // ใช้ fs.writeFile เพื่อเขียนไฟล์
  fs.writeFile(uploadPath, file.buffer, (err) => {
    if (err) {
      logger(err);
      fk({ status: 500, message: "Error saving the font file." });
      return;
    }

    const responseMessage = `Font uploaded successfully: ${file.originalname}`;
    logger(responseMessage);
    sk(responseMessage, uploadPath);
  });
};

module.exports = { fontUploadHandler };
