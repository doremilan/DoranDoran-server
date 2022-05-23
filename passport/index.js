const User = require("../schemas/user")
const passport = require("passport")
const KakaoStrategy = require("passport-kakao").Strategy
const config = require("../config")

module.exports = (app) => {
  app.use(passport.initialize())
  passport.use(
    new KakaoStrategy(
      {
        clientID: config.kakao.kakaoId,
        callbackURL: config.kakao.kakaoUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("카카오에서 보낸 userInfo", profile)
        try {
          const exUser = await User.findOne({
            email: profile._json.kakao_account.email,
          })
          if (exUser) {
            done(null, exUser)
          } else {
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.displayName,
              profileImg: profile._json.properties.profile_image,
              snsId: profile.id,
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
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
