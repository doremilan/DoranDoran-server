const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const fs = require("fs")
require("dotenv").config();

module.exports = (req, res, next) => {
  // console.log("authMiddleware 처음")
  //헤더의 이름 authorization 은 프론트와 얘기해야 함.
  const Token = req.headers.authorization;
  const logInToken = Token.replace("Bearer ", "");

  try {
    const token = jwt.verify(logInToken, process.env.SECRET_KEY);
    const email = token.email
    // console.log(token)


    //userId가 미들웨어 거칠 때는 _id 에서 userId로 변환이 안되어있기에, 토큰이 안 담김 -> email에 담았음.
    User.findOne({ email })
      .exec()
      .then((user) => {
        res.locals.user = user
        // console.log("middleware의 user:", user)
        //로컬의 DB에 있는 유저 정보를 가지고 있음.
        res.locals.token = logInToken
        //로컬에 존재하는 로그인 토큰
        // console.log("authemiddleware 무사히 통과")

        next();
      });

  } catch (error) {

    console.log("authmiddleware에서 에러났음")
    res.status(401).send({ msg: "토큰이 유효하지 않습니다." })
    return;
  };
};