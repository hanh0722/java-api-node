const { throwError, handleNextError } = require("../../util");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../../model/User");

exports.loginHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(422).json({
      code: 422,
      message: "Not validate",
      errors: validation.array(),
    });
  }
  try {
    const user = await User.findOne({ email: email });
    const matchHashPassword = await bcrypt.compare(password, user.password);
    if(!matchHashPassword){
        throwError('password is wrong', 422);
    }
    const token = jwt.sign({
        sub: email,
        roles: user.Role
    }, "secret", {algorithm: 'HS256'});
    console.log(token);
  } catch (err) {
    handleNextError(err, next);
  }
};

