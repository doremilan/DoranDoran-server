const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const passport = require('passport')
// const KakaoStrategy = require('passport-kakao').Strategy
require('dotenv').config();


const userSchema = Joi.object({

  email: Joi.string()
    .pattern(new RegExp(
      "^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$"
    )).required(),
  // 이메일 양식 / 

  password: Joi.string()
    .pattern(new RegExp(
      "^(?=.\d)(?=.[!@$%^+&-?#])([^\s]){8,20}$|^(?=.\d)(?=.[a-zA-Z])([^\s]){8,20}$|^(?=.[a-zA-Z])(?=.[!@$%^+&-?#])([^\s]){8,20}$"
    )).required(),

  //8-20자 /영문, 숫자, 특수문자 (!@$%^+&-?#) 중 2종류 이상 조합

  passwordCheck: Joi.string().required(),

  nickname: Joi.string().min(3).max(15)
    .pattern(new RegExp(
      '^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣+]*$'
    )).required(),

  //3-15자 / 숫자,영어,한글만 가능 / 특수문자 불가능/ 띄어쓰기 불가.

  profileImg: Joi.string(),
  todayMood: Joi.string()

});

//유저가 회원가입 요청시 사용하는 API입니다.
const signup = async (req, res) => {
  try {

    const {
      email,
      password,
      passwordCheck,
      nickname,
      profileImg,
      todayMood
    } = await userSchema.validateAsync(req.body);

    console.log("req.body-->", req.body)

    const existUsers = await User.findOne({ email });

    //중복 아이디 체크 기능
    if (existUsers) {
      console.log('중복 아이디 찾기에서 에러 발생', error);
      res.status(400).send({
        msg: '중복된 아이디가 있습니다.',
      });

      return;

      //비번 체크 기능
    } else if (password !== passwordCheck) {
      console.log('비번 체크에서 오류!', error);
      res.status(400).send({
        errorMessage: '비밀번호가 일치하지 않습니다.',
      });

      return;

    }

    // console.log("hash 이전 password-->", password)

    // bcrypt module -> 암호화
    // 10 --> saltOrRound --> salt를 10번 실행 (높을수록 강력) 대신 암호화 연산이 증가해서 속도가 느려짐.
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, nickname, profileImg, todayMood })

    console.log('가입 시의 user-->', user);

    await user.save();

    // console.log("hash 이후 password-->", password)


    //회원 가입 성공 시의 메시지 호출.
    console.log(`${email} 님이 가입하셨습니다.`);

    res.status(201).json({ msg: '회원가입이 완료되었습니다.' });

  } catch (error) {
    res.status(400).send({ msg: "요청한 조건 형식이 올바르지 않습니다." })
  }
};



//유저가 로그인 요청 시 사용하는 API입니다.
const login = async (req, res) => {
  const { email, password } = await userSchema.validateAsync(req.body);
  const user = await User.findOne({ email });

  //bcrypt의 hash 적용으로 달라진 Pw를 비교해서 맞는 지 비교하기.
  const unHashPw = await bcrypt.compareSync(password, user.password)

  if (user.email !== email || unHashPw == false) {
    res.status(400).send({
      msg: "아이디 또는 비밀번호가 틀렸습니다."
    })
    return;
  }

  const payload = { email };
  const secret = process.env.SECRET_KEY;
  const options = {
    issuer: '백엔드 개발자', // 발행자
    expiresIn: '10d', // 날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위
  };
  const token = jwt.sign(payload, secret, options);
  res.status(200).send({ msg: '로그인이 완료되었습니다.', logIntoken: token });
  //토큰 발급.
};
//https 적용 부분에 있어서 액세스 토큰과 리프레쉬 토큰이 들어가야 하는데, 이건 로컬 테스트가 불가능하다.
//이유: 애초에 https 인증키가 없기 때문에. 그럼 USER API를 실현할 때, 따로 적용을 못하는가?
//이후 https 적용을 완료한 상태에서 배포를 한 뒤에
//개발을 해야하는 지? 당장의 구현에 있어선 액세스 토큰으로만 해야겠다.
//**기본 구현 다 끝난 이후에 프론트와 얘기를 해서 리프레쉬 토큰 적용을 할 것.


// new kakaoStragegy({
//   clientId: process.env.KAKAO_ID, //카카오 로그인에서 발급받은 REST 키
//   callbackURL: "/oauth/kakao" // 카카오 로그인 Redirect URL 경로
// })

// const kakaoCallback = (req, res, next) => {
//   passport.authenticate(
//     "kakao",
//     { failureRedirect: "/" },
//     (err, user, info) => {
//       if (err) return next(err);
//       console.log("콜백~~~")
//       const { email, nickname } = user;
//       const token = jwt.sign({email: email}, 'SECRET_KEY');

//       result = {
//         token,
//         email: email,
//         nickname: nickname,
//       };

//       console.log(result)
//       res.send({ user: result });
//     }
//   )(req, res, next);  

// };

module.exports = {
  login,
  signup,
  // kakaoCallback
};