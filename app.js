const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

const { root } = require("./util");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const productRoute = require('./routes/product');
const blogRoute = require('./routes/blog');
const cartRoute = require('./routes/cart');

const app = express();

const fileEngineStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(8, (err, buffer) => {
      console.log(err);
      const hash = buffer.toString("hex");
      cb(null, hash + file.originalname);
    });
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

app.use(multer({ storage: fileEngineStorage }).array("image", 5));
app.use("/api/auth", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/product", productRoute);
app.use('/api/blog', blogRoute);
app.use('/api/cart', cartRoute);
app.use((err, req, res, next) => {
  const message = err.message || "Cannot get data from server";
  const code = err.code || 500;
  res.status(code).json({
    message: message,
    code: code,
  });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.bhp9h.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(9000);
  })
  .catch((err) => {
    console.log(err);
  });
