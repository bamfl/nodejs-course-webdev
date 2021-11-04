// Файл разбивается на части при передачи от сервера к клиенту. Одна такая составная часть - buffer (буффер). 
// Stream (поток) - механизм передачи данных с помощью буфферов.

const fs = require('fs');
const zlib = require('zlib');

// 4 вида Stream:

// 1. Readable (чтение)

const readStream = fs.createReadStream('./docs/lorem.txt');
// readStream.on('data', chunk => {
// 	console.log('----------------');
// 	console.log(chunk.toString());
// });

// 2. Writable (запись)
const writeStream = fs.createWriteStream('./docs/new-lorem.txt');
// readStream.on('data', chunk => {
// 	writeStream.write('\n-------CHUNK-START-------\n');
// 	writeStream.write(chunk);
// 	writeStream.write('\n-------CHUNK-END-------\n');
// });

// 3. Duplex (запись и чтение)
const handlerError = () => {
	console.log('Error');
	readStream.destroy();
	writeStream.end('Finished with error...');
};

// readStream
	// .on('error', handlerError)
	// .pipe(writeStream)
	// .on('error', handlerError);

// 4. Transform (как duplex с изменением данных)
const compressStream = zlib.createGzip();
readStream
	.on('error', handlerError)
	.pipe(compressStream)
	.pipe(writeStream)
	.on('error', handlerError);