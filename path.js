const path = require('path');

// console.log(__dirname); // C:\Users\Dmitriy\Documents\IT\JS\node.js
// console.log(__filename); // C:\Users\Dmitriy\Documents\IT\JS\node.js\path.js

console.log('Название файла:', path.basename(__filename)); // Название файла: path.js

console.log('Имя директории:', path.dirname(__filename)); // Имя директории: C:\Users\Dmitriy\Documents\IT\JS\node.js

console.log('Расширение файла:', path.extname(__filename)); // Расширение файла: .js

console.log('Parse:', path.parse(__filename)); // {  root: 'C:\\',  dir: 'C:\\Users\\Dmitriy\\Documents\\IT\\JS\\node.js',  base: 'path.js',  ext: '.js',  name: 'path' }
console.log('Parse:', path.parse(__filename).name); // Parse: path

console.log('Создать новый путь:', path.join(__dirname, 'server', 'index.html')); // Создать новый путь: C:\Users\Dmitriy\Documents\IT\JS\node.js\server\index.html