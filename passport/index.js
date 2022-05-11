const passport = require("passport")
const KakaoStrategy = require("passport-kakao").Strategy
const local = require("./localStrategy") // 로컬서버로 로그인할때
const kakao = require("./kakaoStrategy") // 카카오서버로 로그인할때
const User = require("../schemas/user")
require("dotenv").config()
module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
      },
      // clientID에 카카오 앱 아이디 추가
      // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
      // accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
      // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao 의 accessToken, profile -->", accessToken, profile)
        try {
          const exUser = await User.findOne({
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            email: profile._json && profile._json.kakao_account_email,
          })
          console.log("kakao email 확인-->", exUser)
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            done(null, exUser) // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nickname: profile.displayName.toString(),
              provider: "kakao",
            })
            done(null, newUser) // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    //? 두번 inner 조인해서 나를 팔로우하는 followerid와 내가 팔로우 하는 followingid를 가져와 테이블을 붙인다
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err))
  })
  local()
  kakao() // 구글 전략 등록
}
