const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const textFilePath = path.join(__dirname, "text.txt");
const newTextFilePath = path.join(__dirname, "text-new.txt");

const readStream = fs.createReadStream(textFilePath);
const writeStream = fs.createWriteStream(newTextFilePath);
const compressedStream = zlib.createGzip();
const uncompressedStream = zlib.createUnzip();

// readStream.on("data", (chunk) => {
//   writeStream.write(chunk);
// });

// readStream.pipe(writeStream);

const handleError = () => {
  console.log("Ошибка");
  readStream.destroy();
  writeStream.end("Произошла ошибка!");
};

readStream
  .on("error", handleError)
  .pipe(compressedStream)
  .pipe(uncompressedStream)
  .pipe(writeStream)
  .on("error", handleError);
