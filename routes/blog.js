const express = require("express");
const { getBlogByPage } = require("../controller/blog/blog");

const router = express.Router();

router.get("/get", getBlogByPage);

module.exports = router;
