const { body } = require("express-validator");
const User = require("../../model/User");
const SerializeLogin = [
  body("email", "email is not valid")
    .isEmail()
    .custom(async (email, { req }) => {
        const user = await User.findOne({email: email});
        if(!user){
            return Promise.reject('user is not existed');
        }
        return true;
    }),
    body('password').isLength({min: 8}).withMessage('password must have at least 8 characters')
];

module.exports = SerializeLogin;