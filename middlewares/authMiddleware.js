const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
require("dotenv").config();

module.exports = (req, res, next) => {
  console.log("authMiddleware")
  //헤더의 이름 authorization 은 프론트와 얘기해야 함.
  const {authorization} = req.headers;
  // console.log("1,autu", authorization)
  const [tokenType, tokenValue] = authorization.split(' ');
  // console.log(tokenType);
  // console.log(tokenValue);

  if(tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage : "로그인 후 이용하세요!"
    });
    return;
  };

  try{
    const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
    console.log('userId-->',userId)
    //error발생 StringToObjectID
    User.find({userId}).exec().then((userId) => {
      res.locals.user = user
      next();
    });
  
  } catch(error){
    res.status(401).send({
      errorMessage : "로그인 후 이용하세요."
    })
    return;
  };
};
