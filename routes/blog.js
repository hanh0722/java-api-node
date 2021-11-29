const express = require("express");
const { getBlogByPage, getBlogByKeyword, deleteBlogById } = require("../controller/blog/blog");
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get("/get", getBlogByPage);

router.get('/blogs', getBlogByKeyword);

router.delete('/delete', isAuth, deleteBlogById);
module.exports = router;
