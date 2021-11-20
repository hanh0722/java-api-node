const User = require("../../model/User");
const { body } = require("express-validator");

const validationUser = [
  body("email", "email is not valid")
    .isEmail()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email: email });
      if(!user){
          return Promise.reject('user is not existed');
      }
      return true;
    }),
];

module.exports = validationUser;
