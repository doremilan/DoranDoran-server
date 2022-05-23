const User = require("../schemas/user");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const config = require("../config");

module.exports = (app) => {
  app.use(passport.initialize());
  passport.use(
    new KakaoStrategy(
      {
        clientID: config.kakao.kakaoId,
        callbackURL: config.kakao.kakaoUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            email: profile._json.kakao_account.email,
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.displayName,
              profileImg: profile._json.properties.profile_image,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
