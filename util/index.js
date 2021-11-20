const root = require("./root");
const transporter = require("./send-mail");
const { handleNextError, throwError } = require("./throwError");
module.exports = {
  root,
  transporter,
  throwError,
  handleNextError,
};
