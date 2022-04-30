const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const authMiddleware = require("../middlewares/authMiddleware");

router.get('/getUser', authMiddleware, async (req, res) => {
    try {
        const {userId, nickname, profileImg} = res.locals;
        res.send({userId, nickname, profileImg});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send(
            {errorMessage: "사용자 정보를 가져오지 못하였습니다."}
        );
        return;
    }
});


//유저가 회원가입 요청시 사용하는 API입니다.
//썬더 클론 - 더미 데이터로 테스트 완료.
router.post("/signup", async (req, res) => {
    let { userId, password, nickName, profileImg } = req.body;
  
    //const userProfile = initProfile;
    const existUsers = await User.findOne({ userId });
  
    // 유저가 회원가입 할 시, 유저의 초기 프로필 사진 지정 ->  위의 initProfile 에서
    // url 링크를 가져온다 -> 유저의 초기 프로필 사진이 고정된다.
  
    if (existUsers) {
      console.log("중복 아이디 찾기에서 에러 발생");
      res.status(400).send({
        msg:"중복된 아이디가 있습니다.",
      });
      return;
    }
    
    // bcrypt module -> 암호화
        // 10 --> saltOrRound --> salt를 10번 실행 (높을수록 강력)
        const hashed = await bcrypt.hash(password,10);
        const user = new User({ userId, password, nickName, profileImg : hashed})
        console.log('user-->',user);
        await user.save();

        res.status(201).send({ msg:"회원가입이 완료되었습니다." })

    //회원 가입 성공 시의 메시지 호출.
    await User.create({ userId, password, nickName, profileImg });
    console.log(`${userId} 님이 가입하셨습니다.`);
  
    res.status(201).send({ msg:"회원가입이 완료되었습니다." });
});  

//유저가 로그인 요청 시 사용하는 API입니다.
router.post("/login", async (req, res) => {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId, password });
  
    if (!user) {
      res.status(400).send({
        msg:"입력한 정보를 다시 확인해 주세요."
      });
      return;
    }
  
    const payload = { userId };
    const secret = myKey;
    const options = {
      issuer: "백엔드 개발자", // 발행자
      expiresIn: "99d", // 날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위
    };
    const token = jwt.sign(payload, secret, options);
    res.status(200).send({ msg: "로그인이 완료되었습니다.", token: token });
    //토큰 발급.
  });

  module.exports = router;