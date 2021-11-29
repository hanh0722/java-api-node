const User = require("../../model/User");
const crypto = require("crypto");
const { transporter, throwError, handleNextError } = require("../../util");
exports.sendMailAfterRegister = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      message: 'not validation',
      code: 401
    })
  }
  try {
    const user = await User.findOne({email: email});
    if (!user) {
      throwError("user is not existed", 404);
    }
    crypto.randomBytes(12, async (err, buffer) => {
      if(err){
        throwError('cannot generate token', 500);
      }
      const token = buffer.toString('hex');
      const generateNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      const mail = {
        to: user.email,
        from: process.env.EMAIL_SENDER,
        subject: "Verify your account",
        html: `<div><h1 style="text-align: center">Thank you for register account in our store</h1>
                <p>Four number to verify: <span style="font-size: 22px; font-weight: bold;">${generateNumber}</span>
                <p>Click the <a href="http://localhost:3000/register/verify?id=${user._id.toString()}&token=${token}">link</a> to finish verify account</p>
              </div>`,
      }
      user.OTP = generateNumber;
      user.tokenVerify = token;
      const newUser = await user.save();
      res.json({
        message: 'successfully',
        code: 200,
        tokenVerify: token
      });
      transporter.sendMail(mail, (err, result) => {
        if(err){
          throwError('cannot send mail to user', 500);
        }
        console.log(result);
      })
    })
  } catch (err) {
    handleNextError(err, next);
  }
};
