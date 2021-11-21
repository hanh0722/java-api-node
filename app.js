const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const root = require("./util/root");
const authRoute = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Allow-Control-Origin", "*");
  res.setHeader(
    "Access-Allow-Control-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Allow-Control-Headers", "Content-Type, Authorization");
  next();
});
app.use('/', (req, res, next) => {

})

app.use((error, req, res, next) => {
    console.log(error);
    const message = error.message || "Cannot get data from server";
    const code = error.code || 500;
    res.status(code).json({
        message: message,
        code: code
    })
})
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bhp9h.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(9000);
  });
