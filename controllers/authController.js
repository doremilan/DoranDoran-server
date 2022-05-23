const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const passport = require("passport");
const FamilyMember = require("../schemas/familyMember");
const Family = require("../schemas/family");
const RandomImg = require("../schemas/randomImg");
const config = require("../config");

const userSchema = Joi.object({
  email: Joi.string()
    .pattern(
      new RegExp(
        "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$"
      )
    )
    .required(),
  // 이메일 양식 /
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)-_=+]).{8,20}"
      )
    )
    .required(),
  //조건1. 8~20 영문 대소문자
  //조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
  passwordCheck: Joi.string(),
  nickname: Joi.string().pattern(
    new RegExp("^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$")
  ),
  //2-15자 / 숫자, 영어, 한국어와 언더스코어, 공백 허용
  profileImg: Joi.string(),
  todayMood: Joi.string(),
});

//유저가 회원가입 요청시 사용하는 API입니다.
const signup = async (req, res) => {
  try {
    const { email, password, passwordCheck, nickname, profileImg, todayMood } =
      await userSchema.validateAsync(req.body);
    const existUsers = await User.findOne({ email });
    //중복 아이디 체크 기능
    if (existUsers) {
      console.log("중복 아이디 찾기에서 에러 발생", error);
      res.status(400).json({
        msg: "중복된 아이디가 있습니다.",
      });
      return;
      //비번 체크 기능
    } else if (password !== passwordCheck) {
      console.log("비번 체크에서 오류!", error);
      res.status(400).json({
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const randomImg = await RandomImg.aggregate([{ $sample: { size: 1 } }]);
    const user = new User({
      email,
      password: hashed,
      nickname,
      profileImg: randomImg[0].randomImg,
      todayMood: null,
    });
    await user.save();
    console.log(`${email} 님이 가입하셨습니다.`);
    res.status(201).json({
      msg: "회원가입이 완료되었습니다.",
      user,
    });
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    res.status(400).json({
      msg: "요청한 조건 형식이 올바르지 않습니다.",
      result: `${req.method} ${req.originalUrl} : ${error.message}`,
    });
  }
};

//유저가 로그인 요청 시 사용하는 API입니다
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (email === "" || email === undefined || email === null) {
      res.status(400).json({
        msg: "아이디를 입력하세요.",
      });
      return;
    } else if (password === "" || password === undefined || password === null) {
      res.status(400).json({
        msg: "비밀번호를 입력하세요.",
      });
      return;
    }
    const unHashPw = await bcrypt.compareSync(req.body.password, user.password);
    if (user.email !== email || unHashPw == false) {
      res.status(400).json({
        msg: "아이디 또는 비밀번호가 틀렸습니다.",
      });
      return;
    }
    const payload = { email };
    const options = {
      issuer: "백엔드 개발자",
      expiresIn: "2d",
    };
    const token = jwt.sign(payload, config.jwt.secretKey, options);
    const userInfo = await User.findOne({ email });
    const familyChk = await FamilyMember.find({ userId: userInfo._id });
    let familyList = [];
    if (familyChk.length) {
      for (let family of familyChk) {
        const Checkedfamily = await Family.findOne({ _id: family.familyId });
        familyList.push(Checkedfamily);
      }
      console.log("일반로그인", token);
      res.status(200).json({
        logIntoken: token,
        userInfo,
        familyList,
        msg: "로그인이 완료되었습니다.",
      });
    } else {
      res.status(200).json({
        logIntoken: token,
        userInfo,
        familyList,
        msg: "로그인이 완료되었습니다.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      result: false,
    });
  }
};

const kakaoCallback = (req, res, next) => {
  passport.authenticate("kakao", { failureRedirect: "/" }, (err, user) => {
    console.log("카카오로그인 userInfo", user);
    if (err) return next(err);
    const options = {
      issuer: "백엔드 개발자",
      expiresIn: config.jwt.expiresIn,
    };
    const token = jwt.sign(
      { email: user.email },
      config.jwt.secretKey,
      options
    );
    console.log("카카오토큰", token);
    res.json({
      token,
      user,
    });
  })(req, res, next);
};

module.exports = {
  login,
  signup,
  kakaoCallback,
};
