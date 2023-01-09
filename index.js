import * as dotenv from "dotenv";
dotenv.config();

import express from "express";

import morgan from "morgan";
import chalk from 'chalk';

import mongoose from "mongoose";
import userRouter from "./src/routers/user-router.js";

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(userRouter);
app.use((req, res) => {
  res.status(404).send({ message: "404 not found" });
});

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(chalk.whiteBright.bgGreen(`Render server cool started at ${PORT}`));
    });
  } catch (e) {
    console.error(chalk.whiteBright.bgRed(e));
  }
};

start();
