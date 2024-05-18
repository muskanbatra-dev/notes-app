//importing packages and middlewares
const express = require("express");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const mongoose = require("mongoose");

// creating app
const app = express();

app.get("/", (req, res) => {
  res.send("Helloword");
});
//listening app on port
app.listen(3000, () => {
  console.log("server is running");
});
