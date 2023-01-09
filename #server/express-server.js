const express = require("express");
const app = express();
const PORT = 3000;

const path = require("node:path");

const morgan = require("morgan");

const mongoose = require("mongoose");
const mongooseDBURL =
  "mongodb+srv://Dmitriy:qwas1234@cluster0.zchmymg.mongodb.net/node-learn?retryWrites=true&w=majority";
const UserModel = require("./models/user.js");

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongooseDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

const getPath = (paths) => path.join(__dirname, ...paths);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static(getPath(["styles"])));

app.use(express.json());

app.get("/favicon.ico", (req, res) => {
  res.sendFile(getPath(["images", "icons", "favicon.png"]));
});

const homeUrls = ["/", "/home", "/home.html", "/index", "/index.html"];

app.get(homeUrls, (req, res) => {
  res.sendFile(getPath(["pages", "home.html"]));
});

app.get("/old-page", (req, res) => {
  res.redirect("/");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).send(users);
  } catch (error) {
    res.status(500);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    res.status(200).send(user);
  } catch (error) {
    res.status(500).sendFile(getPath(["pages", "404.html"]));
  }
});

app.put("/api/users/update/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    res.status(200).send({ user: updatedUser });
  } catch (error) {
    res.status(503).send({ message: "fail" });
  }
});

app.post("/api/users/add", async (req, res) => {
  const user = req.body;

  try {
    const createdUser = await UserModel.create(user);
    res.status(201).send({ message: "success", user: createdUser });
  } catch (error) {
    console.log(error);
    res.status(503).send({ message: "fail" });
  }
});

app.delete("/api/users/delete/:id", async (req, res) => {
  try {
    await UserModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(503).send({ error });
  }
});

// middleware
app.use((req, res, next) => {
  res.status(404).sendFile(getPath(["pages", "404.html"]));
});
