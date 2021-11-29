const express = require("express");
const { checkOutGeneratePDF } = require("../controller/checkout/checkout");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/post", isAuth, checkOutGeneratePDF);

module.exports = router;
