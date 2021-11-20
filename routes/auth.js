const express = require("express");
const { sendMailAfterRegister } = require("../controller");
const { loginHandler } = require("../controller/Auth/login");
const { resetPasswordUserByEmail } = require("../controller/Auth/reset-password");
const { SerializeLogin, validationUser } = require("../validation");
const router = express.Router();

router.post("/validate", sendMailAfterRegister);

router.post("/login", SerializeLogin, loginHandler);

router.put('/reset', validationUser ,resetPasswordUserByEmail);
module.exports = router;
