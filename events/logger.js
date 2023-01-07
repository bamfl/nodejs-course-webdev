const EventEmitter = require("node:events");

const usersDB = [
  {
    email: "test@example.com",
    password: "qwas1234",
  },
];

class Logger extends EventEmitter {
  login(candidate) {
    const isCorrectCandidate = usersDB.some((userDB) => {
      return (
        userDB.email === candidate.email &&
        userDB.password === candidate.password
      );
    });

    if (isCorrectCandidate) {
      this.emit("loginSuccess", `Успешный вход! ${JSON.stringify(candidate)}`);
    } else {
      this.emit("loginError", "Неверный email или пароль");
    }
  }
}

module.exports = Logger;
