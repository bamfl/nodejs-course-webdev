console.log(global);

setTimeout(() => console.log('Hi'), 2000);

console.log('dirname:', __dirname);
console.log('filename:', __filename);
console.log('process.env', process.env);
console.log('process.argv', process.argv);

const url = new URL('https://localhost:8080/users/admin#1');
console.log(url.hostname);
console.log(url.port);
console.log(url.href);
console.log(url.pathname);
console.log(url.hash);