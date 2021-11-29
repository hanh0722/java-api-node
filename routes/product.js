const express = require("express");
const {
  getProductByQuery,
  getProductByType,
  findProductByKeyword,
  removeProductById,
} = require("../controller/Product/product");

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/get", getProductByQuery);

router.get("/get/:type", getProductByType);

router.get('/search', findProductByKeyword);

router.delete('/delete', isAuth, removeProductById);
module.exports = router;
