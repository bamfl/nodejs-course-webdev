const fs = require('fs'); // fs - file system

// 1. Прочитать содержимое файла
fs.readFile('./text.txt', (error, text) => {
  // readFile - async function
  console.log(text.toString());
});

// или использовать вторым аргументом кодировку, тогда toString() не нужен
fs.readFile('./text.txt', 'UTF-8', (error, text) => {
  console.log(text);
});

console.log('Sync log');

// 2. Создать новый файл. Он перезаписывает файл с таким же именем, если он существует
fs.writeFile('./text2.txt', 'New file', () => {}); // writeFile - async function

// Если путь не существует, то фай не создастся
fs.writeFile('./new_folder/text2.txt', 'New file', (err) => {
  // console.log(err); // no such file or director
});

// 3. Удалить файл
fs.unlink('./text2.txt', () => {});

// 4. Создать новую папку (директорию)
fs.mkdir('./files', () => {
  fs.writeFile('./files/text3.txt', 'New file text 3', () => {});
}); // mkdir - async function

// 5. Удалить папку - можно удалить только пустую директорию
fs.unlink('./files/text3.txt', () => {}); // удаляем файлы из директории
fs.rmdir('./files', () => {}); // удаляем директорию

// 6. Прверка условий существования файла / папки
fs.mkdir('./files3', () => {});

if (fs.existsSync('./files3')) {
  // exists без Sync устарел и упразнен
  console.log('Directory exists');
}

// Есть синхронные функции-аналоги readFileSync, writeFileSync, mkdirSync, unlinkSync, rmdirSync, existsSync

// Т.к. функии асинхронные, можно использовать Promise и Async/Await вместо callback вложенности
// Перепишем создание файла на Promise и Async/Await:
const readFile = async () => {
  const text = await new Promise((resolve, reject) => {
    fs.readFile('./text.txt', 'utf-8', (err, data) => resolve(data));
  });

  console.log('Text:', text); // read file
};

readFile()
  .then(() => {
    fs.mkdir('./files2', () => {}); // make new directory
  })
  .then(() => {
    fs.writeFile('./files2/text4.txt', 'New super text file 4', () => {}); // write new file
  })
  .then(() => {
    fs.unlink('./files2/text4.txt', () => {}); // delete file
  })
  .then(() => {
    if (fs.existsSync('./files2')) {
      setTimeout(() => {
        fs.rmdir('./files2', () => {}); // delete new directory
      }, 3000);
    }
  });
