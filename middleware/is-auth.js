const jwt = require("jsonwebtoken");
const { throwError } = require("../util/throwError");
module.exports = (req, res, next) => {
  const Authorization = req.get("Authorization");
  const parseToken = Authorization.split(" ")[1];
  if (!parseToken) {
    throwError("user is not validation", 401);
  }
  let decoded;
  try {
    decoded = jwt.verify(parseToken, "secret", {
      algorithms: "HS256",
    });
  } catch (err) {
    throwError("Cannot decode token", 500);
  }
  req.userEmail = decoded.sub;
  req.roles = decoded.roles;
  next();
};
