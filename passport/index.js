const passport = require("passport");
const kakao = require("./kakaoStrategy"); //카카오 서버로 로그인 할 때

//user 정보를 세션에 저장한다.
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  kakao();
};
