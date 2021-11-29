const express = require("express");

const { uploadSingleImage, uploadMultipleImage } = require("../controller/cdn-image/GenerateCdn");

const router = express.Router();

router.post("/single", uploadSingleImage);

router.post('/multiple', uploadMultipleImage);
module.exports = router;