// Callback API
const fs = require("fs");
const path = require("node:path");

const readTextPath = path.join(__dirname, "text.txt");
const writeFolderPath = path.join(__dirname, "copy");
const writeTextPath = path.join(writeFolderPath, "text-write.txt");

fs.readFile(readTextPath, (err, data) => {
  if (err) throw err;

  const copiedText = `Copy!!! ${data.toString()}`;

  const writeFile = () => {
    fs.writeFile(writeTextPath, copiedText, (err, data) => {
      if (err) throw err;
    });
  };

  if (!fs.existsSync(writeFolderPath)) {
    fs.mkdir(writeFolderPath, (err, data) => {
      if (err) throw err;

      writeFile();
    });
  } else {
    writeFile();
  }
});

setTimeout(
  () =>
    fs.unlink(writeTextPath, (err, data) => {
      if (err) throw err;
    }),
  3000
);

setTimeout(
  () =>
    fs.rmdir(writeFolderPath, (err, data) => {
      if (err) throw err;
    }),
  6000
);
