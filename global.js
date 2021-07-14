// #2 Глобальные объекты (Global Objects)
// console.log(global);

// setTimeout(() => {
// 	console.log('Hello');
// }, 2000);

// console.log(__dirname); // C:\Users\Dmitriy\Documents\IT\JS\node.js
// console.log(__filename); // C:\Users\Dmitriy\Documents\IT\JS\node.js\global.js

// console.log(process.env);
// console.log(process.argv);

const url = new URL('https://yandex.ru/news/name#test');
console.log(url.hostname); // yandex.ru
console.log(url.href); // https://yandex.ru/news/name#test
console.log(url.pathname); // /news/name
console.log(url.hash); // #test
