const express = require("express");
const {
  getProductByQuery,
  getProductByType,
} = require("../controller/Product/product");

const router = express.Router();

router.get("/get", getProductByQuery);

router.get("/get/:type", getProductByType);
module.exports = router;
