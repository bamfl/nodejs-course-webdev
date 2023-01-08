const http = require("node:http");
const fs = require("fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
    case "/home":
    case "/home.html":
    case "/index":
    case "/index.html":
      res.setHeader("Content-Type", "text/html");

      fs.readFile(path.join(__dirname, "pages", "home.html"), (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.write("<h1>Reading file error</h1>");
          res.end();
        } else {
          res.statusCode = 200;
          res.write(data);
          res.end();
        }
      });

      break;

    case "/api/users":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      const users = JSON.stringify([
        { name: "John" },
        { name: "Alex" },
        { name: "Paul" },
      ]);

      res.write(users);
      res.end();

      break;
    
    // redirect
    case '/old-page':
      res.statusCode = 301;
      res.setHeader("Location", "/");
      res.end();

      break;

    default:
      res.setHeader("Content-Type", "text/html");

      fs.readFile(path.join(__dirname, "pages", "404.html"), (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.write("<h1>Reading file error</h1>");
          res.end();
        } else {
          res.statusCode = 404;
          res.write(data);
          res.end();
        }
      });

      break;
  }
});

const PORT = 3000;

server.listen(PORT, "localhost", (err) => {
  if (err) throw Error(err);

  console.log(`Server started on port ${PORT}`);
});
