const { userName, sayHi } = require('./test');

console.log(sayHi(userName));


const os = require('os');

console.log(os.platform());
console.log(os.release());
