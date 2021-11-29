const express = require("express");
const cloudinary = require('cloudinary').v2;
const path = require("path");
const crypto = require('crypto');
const mongoose = require("mongoose");
const root = require("./util/root");
const authRoute = require("./routes/auth");
const blogRoute = require('./routes/blog');
const cartRoute = require('./routes/cart');
const checkoutRoute = require('./routes/checkout');
const productRoute = require('./routes/product');
const uploadRoute = require('./routes/upload');
const multer = require("multer");
const app = express();

const fileEngineStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, buffer) => {
            cb(null, buffer.toString('hex') + file.originalname)
        });
    }
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
    secure: true
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "images")));
app.use(multer({storage: fileEngineStorage}).array('image', 5));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/blog', blogRoute);
app.use('/api/product', productRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/checkout', checkoutRoute);
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