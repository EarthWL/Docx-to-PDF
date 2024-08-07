# DOCX to PDF Conversion Service

This is a Node.js-based service for converting DOCX files to PDF. It also allows for font uploads to be used in the conversion process. The service is built using Express and Multer, and it leverages LibreOffice and unoserver for the conversion.

## Features

- Convert DOCX files to PDF using LibreOffice CLI or unoserver
- Upload custom fonts to be used in the conversion
- Automated cleanup of temporary files

## Prerequisites

- Docker
- Node.js
- npm

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/docx-to-pdf.git
cd docx-to-pdf
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
CLEANUP_AUTOMATION_DRY_MODE=OFF
CLEANUP_AUTOMATION_INTERVAL_MS=50000
PORT=8011
FILE_MAX_AGE_IN_SECONDS=300
```

### Build Docker Image

```bash
docker build -t docx2pdf .
```

### Run Docker Container

```bash
docker run -d -p 8011:8011 --env-file .env docx2pdf
```

## Usage

### Convert DOCX to PDF

#### CLI Mode

```sh
curl --location 'http://localhost:8011/docx-to-pdf' \
--form 'document=@"/path/to/your/TEST_DOCX.docx"'
```

#### UNO Mode

```sh
curl --location 'http://localhost:8011/docx-to-pdf/uno' \
--form 'document=@"/path/to/your/TEST_DOCX.docx"'
```

### Upload Font

```sh
curl --location 'http://localhost:8011/upload-font' \
--form 'font=@"/path/to/your/font.ttf"'
```

## Project Structure

```
/docx-to-pdf
  |-- .dockerignore
  |-- .env
  |-- Dockerfile
  |-- package.json
  |-- package-lock.json
  |-- /fonts
  |-- /src
      |-- index.js
      |-- /api
          |-- docxToPdfHandler.js
          |-- fontUploadHandler.js
      |-- /constants
          |-- index.js
      |-- /functions
          |-- applyMiddleware.js
          |-- deleteFile.js
          |-- deleteFileIfExist.js
          |-- docToPdfCli.js
          |-- docToPdfUno.js
          |-- flatten.js
          |-- getFileData.js
          |-- getFileMetadata.js
          |-- getFilesInDir.js
          |-- getFilesOlderThan.js
          |-- isFileExist.js
          |-- isPresent.js
          |-- logger.js
      |-- /services
          |-- cleanupAutomationBot.js
          |-- envVariables.js
          |-- expressApp.js
          |-- unoserver.js
```

## License

This project is licensed under the MIT License.
