const Logger = require("./logger.js");

const logger = new Logger();

logger.on("loginSuccess", (message) => console.log(message));
logger.on("loginError", (message) => console.log(message));

logger.login({
  email: "test@example.com",
  password: "qwas1234",
});
