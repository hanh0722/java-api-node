const { validationResult } = require("express-validator");
const { throwError, handleNextError, transporter } = require("../../util");
const crypto = require("crypto");
const User = require("../../model/User");
exports.resetPasswordUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({
      message: "email is not valid",
      code: 404,
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      message: "user is not existed",
      code: 404,
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throwError("user is not existed", 404);
    }
    const vefiryUser = user.verified;
    if (!vefiryUser) {
      throwError("email is not activated", 401);
    }
    crypto.randomBytes(12, async (err, buffer) => {
      if (err) {
        throwError("cannot generate token", 500);
      }
      const hash = buffer.toString("hex");
      user.tokenChangePassword = hash;
      const newUserAfterSave = await user.save();
      transporter.sendMail(
        {
          to: user.email,
          from: process.env.EMAIL_SENDER,
          subject: "Change password from user",
          html: `<div style="text-align: center">
            <h1 style="text-align: center">Request reset password from user</h1>
            <p>Click the <a href="http://localhost:3000/reset/validation?uidt=${newUserAfterSave._id.toString()}&token=${hash}">link</a> to reset your account</p>
          </div>`,
        },
        (err, info) => {
          if (err) {
            console.log(err);
          }
          console.log(info);
        }
      );
      return res.json({
        message: "successfully",
        code: 200,
        _id: newUserAfterSave._id.toString(),
        
      });
    });
  } catch (err) {
    handleNextError(err, next);
  }
};
