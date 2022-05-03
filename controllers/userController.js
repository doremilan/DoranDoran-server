const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const authMiddleware = require("../middlewares/authMiddleware");

//유저 데이터 get API
export async function Getuser(req, res) {
    try {
    const {userId, nickname, profileImg} = res.locals;
    res.send({userId, nickname, profileImg});

    }   catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    console.log("유저 데이터 GET에서 오류 발생!", error)

    res.status(400).send(
        {errorMessage: "사용자 정보를 가져오지 못하였습니다."}
    );
    return;

    }
}

//유저가 회원가입 요청시 사용하는 API입니다.
export async function Signup(req, res) {
    let { userId, password, passwordCheck, nickName, profileImg } = req.body;
   
    //const userProfile = initProfile;
    const existUsers = await User.findOne({ userId });
  
    // 유저가 회원가입 할 시, 유저의 초기 프로필 사진 지정 ->  위의 initProfile 에서
    // url 링크를 가져온다 -> 유저의 초기 프로필 사진이 고정된다.
    // **논의 이후에 결정.
  
    //중복 아이디 체크 기능
    if (existUsers) {
      console.log("중복 아이디 찾기에서 에러 발생", error);
      res.status(400).send({
        msg:"중복된 아이디가 있습니다.",
      });

      return;
      //**회원 가입 조건에 대해서 디자인이 나온 이후에 결정할 것.
      //**validation(글자 수 제한 및 검사) 체크 기능은 디자인 이후 결정!

      //비번 체크 기능
    } else if(password !== passwordCheck){
      console.log("비번 체크에서 오류!", error)
      res.status(400).send({
          errorMessage : "비밀번호가 일치하지 않습니다."
      })

      return;
  }

    //회원 가입 성공 시의 메시지 호출.
    await User.create({ userId, password, nickName, profileImg });
    console.log(`${userId} 님이 가입하셨습니다.`);
  
    res.status(201).send({ msg:"회원가입이 완료되었습니다." });
};    

//유저가 로그인 요청 시 사용하는 API입니다.
export async function Login(req, res) {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId, password });

    if (!user) {
    console.log("유저 로그인 요청에서 오류!", error)

    res.status(400).send({msg:"입력한 정보를 다시 확인해 주세요."});

    return;
    } 

    const payload = { userId };
    const JWTKEY = process.env.SECRET_KEY
    const options = {
    issuer: "백엔드 개발자", // 발행자
    expiresIn: "99d", // 날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위
};
    const token = jwt.sign(payload, JWTKEY, options);
    res.status(200).send({ msg: "로그인이 완료되었습니다.", token: token });
    //토큰 발급.

}
  //https 적용 부분에 있어서 액세스 토큰과 리프레쉬 토큰이 들어가야 하는데, 이건 로컬 테스트가 불가능하다. 
  //이유: 애초에 https 인증키가 없기 때문에. 그럼 USER API를 실현할 때, 따로 적용을 못하는가? 
  //이후 https 적용을 완료한 상태에서 배포를 한 뒤에
  //개발을 해야하는 지? 당장의 구현에 있어선 액세스 토큰으로만 해야겠다.
  //**기본 구현 다 끝난 이후에 프론트와 얘기를 해서 리프레쉬 토큰 적용을 할 것.

  //프로필 조회 API
  export async function Getprofile(req, res) {
    try{
      const {user} = res.locals
      const {userId} = user;
      const getMyprofile = res.status(200).send({nickname, profileImg, todayMood})
  
      await getMyprofile

    } catch(error) {
      console.log("프로필 조회에서 오류!", error)
      res.status(400).send({ result: false})
    }
  }

  //프로필 수정 API
  export async function Editprofile(req, res) {
    const {userId} = res.locals
    const {nickname, profileImg} = req.body
    const EditMyProfile = await User.updateOne({userId}, {$set: {nickname, profileImg}})

    if( !nickname || !profileImg){
    return res.status(200).send({
      nickname, profileImg
    })

  } else if (!EditMyProfile){
    console.log("프로필 수정에서 오류!", error)
    res.status(400).send({result: false})
  }
  }

  //오늘의 기분 수정 API
  export async function EditTodaymood(req, res) {
    try{
      const {userId} = res.locals
      const {todayMood} = req.body
      await User.updateOne({userId}, {$set: {todayMood}})

      res.status(200).send({
        todayMood
    })
  } catch(error) {
      console.log("오늘의기분 수정에서 오류!", error)
      res.status(400).send({result: false})
    }
  }





  module.exports = router;