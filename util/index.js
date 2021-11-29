const root = require("./root");
const transporter = require("./send-mail");
const { handleNextError, throwError } = require("./throwError");
const generateRandom = require('./randomString');
module.exports = {
  root,
  transporter,
  throwError,
  handleNextError,
  generateRandom
};
