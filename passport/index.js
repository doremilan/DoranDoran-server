const passport = require("passport")
const KakaoStrategy = require("passport-kakao").Strategy
const { User } = require("../schemas")

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
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            snsId: profile.id,
          })
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            done(null, exUser) // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nickname: profile.displayName,
              // profileImg: 콘솔 확인후 작성
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
