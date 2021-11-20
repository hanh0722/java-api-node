const express = require('express');
const { getCartOfUser } = require('../controller/Cart/cart');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/get', isAuth ,getCartOfUser);

module.exports = router;