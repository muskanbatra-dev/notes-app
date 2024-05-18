//importing packges and middlewares;
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

//configuring env files
require("dotenv").config();

//importing created routers;

const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");

//creating app
const app = express();

//adding middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

//mongoDB connection
const connectToDB = () => {
  try {
    const DB_Url = process.env.MONGODB_URL;
    mongoose
      .connect(DB_Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("mongo db database connected");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("something went wrong...");
  }
};
//util function to make connection with DB
connectToDB();

//normal API;

app.use("/auth", authRouter);
app.use("/notes", notesRouter);
//listing app on port 8000
app.listen(9000, () => {
  console.log("server is running on localhost:8000");
});
