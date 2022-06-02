const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const config = require("../config");

module.exports = (req, res, next) => {
  const Token = req.headers.authorization;
  const logInToken = Token.replace("Bearer ", "");
  try {
    const token = jwt.verify(logInToken, config.jwt.secretKey);
    const email = token.email;
    User.findOne({ email })
      .exec()
      .then((user) => {
        res.locals.user = user;
        next();
      });
  } catch (error) {
    console.log("authmiddleware 오류", error);
    res.status(401).send({
      msg: "토큰이 유효하지 않습니다.",
    });
    return;
  }
};
