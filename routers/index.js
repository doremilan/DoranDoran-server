const express = require('express');
const router = express.Router();
// const passport = require("passport");
// const KakaoStrategy = require("passport-kakao").Strategy;

const authRouter = require('./auth');
const userRouter = require('./user');
const mainRouter = require('./main');
const familyRouter = require('./family');
const photoAlbumRouter = require('./photoAlbum');
const photoRouter = require('./photo');
const commentRouter = require('./comment');
const likeRouter = require('./like');
const voiceRouter = require('./voiceAlbum');
const voiceFileRouter = require('./voiceFile');
const calendarRouter = require('./calendar');
const missionRouter = require('./mission');
const badgeRouter = require('./badge');
const randomMsgRouter = require('./randomMsg');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/main', mainRouter);
router.use('/family', familyRouter);
router.use('/photoAlbum', photoAlbumRouter);
router.use('/photo', photoRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
router.use('/voiceAlbum', voiceRouter);
router.use('/voiceFile', voiceFileRouter);
router.use('/calendar', calendarRouter);
router.use('/mission', missionRouter);
router.use('/badge', badgeRouter);
router.use('/randomMsg', randomMsgRouter);

// module.exports = () => {
//     passport.use(
//       new KakaoStrategy(
//         {
//           clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
//           clientSecret: clientSecret,
//           callbackURL: 'http://localhost:3000/oauth/kakao/callback' // 카카오 로그인 Redirect URI 경로
//         },
    
//         // clientID에 카카오 앱 아이디 추가
//         // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
//         // accessToken, refreshToken: 로그인 성공 후 카카오가 보내준 토큰
//         // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
//         async (accessToken, refreshToken, profile, done) => {
          
//             console.log(accessToken,profile,)
//           try {
//             const exUser = await User.findOne({
//               // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
//               email: profile.id
//             });
//             console.log("확인",exUser)
//             // 이미 가입된 카카오 프로필이면 성공
//             if (exUser) {
//               done(null, exUser); // 로그인 인증 완료
//             } else {
//               // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다              
//               const newUser = await User.create({
//                 nickname: profile.username,
//                 email: profile.id,
//                 provider: "kakao",
//               });
//               done(null, newUser); // 회원가입하고 로그인 인증 완료
//             }
//           } catch (error) {
//             console.error(error);
//             done(error);
//           }
//         }
//       )
//     );
// }

module.exports = router;
