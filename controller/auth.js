const User = require("../model/User");
const mailer = require("../util/send-mail");
const throwError = require("../util/throwError");
const nextError = require("../util/nextError");

exports.confirmUserRegister = async (req, res, next) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      throwError("not validation", 401);
    }
    const user = await User.findById(userId);
    if (!user) {
      throwError("user is not existed", 404);
    }
    const email = {
      to: user.email,
      from: process.env.EMAIL_SENDER,
      subject: "Thank you for register!",
      html: `<div style="text-align: center">
              <h1>Thank you for register our shop</h1>
              <p>We are so happy when we join in our community, we always try to provide the best products with high quality, reasonable price and fit to any house.</p>
              <p>Your OTP to verify: </p>
        </div>`,
    };
    // crypto.randomBytes(16, async (err, buffer) => {
    //   if (err) {
    //     throwError("Cannot get hash", 500);
    //   }
    //   const tokenVerify = buffer.toString("hex");
    //   user.tokenVerify = tokenVerify;
    //   const generateOTP = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    //   user.OTP = generateOTP;
    //   const userUpdated = await user.save();
    //   mailer.sendMail(email, (err, res) => {
    //     if (err) {
    //       throwError("Cannot send email verify", 500);
    //     }
    //     console.log(res);
    //   });
    //   res.json({
    //     message: "Successfully",
    //     user: userUpdated,
    //     code: 200,
    //   });
    // });
  } catch (err) {
    nextError(err, next);
  }
};
