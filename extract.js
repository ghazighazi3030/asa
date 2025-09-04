const fs = require('fs');
const yauzl = require('yauzl');
const path = require('path');

const zipPath = 'blogcraft-dash-main (8).zip';

yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
  if (err) {
    console.error('Error opening zip file:', err);
    return;
  }

  zipfile.readEntry();
  
  zipfile.on('entry', (entry) => {
    if (/\/$/.test(entry.fileName)) {
      // Directory entry
      const dirPath = entry.fileName;
      fs.mkdirSync(dirPath, { recursive: true });
      zipfile.readEntry();
    } else {
      // File entry
      zipfile.openReadStream(entry, (err, readStream) => {
        if (err) {
          console.error('Error reading entry:', err);
          return;
        }

        const filePath = entry.fileName;
        const dirPath = path.dirname(filePath);
        
        // Ensure directory exists
        fs.mkdirSync(dirPath, { recursive: true });
        
        const writeStream = fs.createWriteStream(filePath);
        readStream.pipe(writeStream);
        
        writeStream.on('close', () => {
          console.log(`Extracted: ${filePath}`);
          zipfile.readEntry();
        });
      });
    }
  });

  zipfile.on('end', () => {
    console.log('Extraction complete!');
    // Clean up the extraction script
    fs.unlinkSync('extract.js');
  });
});