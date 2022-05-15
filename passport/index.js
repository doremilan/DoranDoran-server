const User = require("../schemas/user")
const passport = require("passport")
const KakaoStrategy = require("passport-kakao").Strategy

module.exports = (app) => {
  app.use(passport.initialize()) // passport를 초기화 하기 위해서 passport.initialize 미들웨어 사용
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(1, profile)
        try {
          const exUser = await User.findOne({
            snsId: profile.id,
          })
          if (exUser) {
            done(null, exUser) // 로그인 인증 완료
          } else {
            console.log(111, profile._json.profile_image)
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.displayName,
              profileImg: profile._json.profile_image,
              snsId: profile.id,
              provider: "kakao",
            })
            console.log(222, newUser)
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
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
