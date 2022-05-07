const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/authController');

//유저가 회원가입 요청시 사용하는 API입니다.
//썬더 클론 - 더미 데이터로 테스트 완료.
router.post('/signup', signup);

//유저가 로그인 요청 시 사용하는 API입니다.
//썬더 클론 - 더미 데이터로 테스트 완료.
router.post('/login', login);

//https 적용 부분에 있어서 액세스 토큰과 리프레쉬 토큰이 들어가야 하는데, 이건 로컬 테스트가 불가능하다.
//이유: 애초에 https 인증키가 없기 때문에. 그럼 USER API를 실현할 때, 따로 적용을 못하는가?
//이후 https 적용을 완료한 상태에서 배포를 한 뒤에
//개발을 해야하는 지? 당장의 구현에 있어선 액세스 토큰으로만 해야겠다.
//**기본 구현 다 끝난 이후에 프론트와 얘기를 해서 리프레쉬 토큰 적용을 할 것.

module.exports = router;
