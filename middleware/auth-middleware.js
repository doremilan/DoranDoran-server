const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user");


module.exports = (req, res, next) => {
    // console.log('지나감')
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ')//Bearer를 제거하고 뒤에있는 토근값만 받기위해 스플릿으로 나누어줬다.
    // console.log(tokenType)
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        });
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "test");

        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });

    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요.'
        });
        return;
    }
};