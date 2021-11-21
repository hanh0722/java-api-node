const express = require('express');
const { confirmUserRegister } = require('../controller/auth');

const Router = express.Router();

Router.get('/confirm', confirmUserRegister);

module.exports = Router;