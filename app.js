const express = require("express");
const connect = require("./schemas/index");
const indexRouter = require("./routers/index");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const port = 3000;
const app = express();

// const http = require('http') // https 연결
// const https = require('https') // https 연결

connect();

// 각종 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); //보안에 필요한 헤더 추가 미들웨어
app.use(morgan("tiny")); // 서버 요청 모니터링 미들웨어

// 라우터 연결
app.use(indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// https 연결코드
// app.get(
//   "/.well-known/pki-validation/AD424447A620C77C679BD83C2FA6E5BC.txt",
//   (req, res) => {
//     res.sendFile(__dirname +
//       "/well-known/pki-validation/AD424447A620C77C679BD83C2FA6E5BC.txt");
//   }
// );

// https 인증서
// const privateKey = fs.readFileSync(__dirname + '/private.key', "utf8");
// const certificate = fs.readFileSync(__dirname + '/certificate.crt', "utf8");
// const ca = fs.readFileSync(__dirname + '/ca_bundle.crt', 'utf8');
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// const app_low = express();

// https 연결코드
// const httpPort = 3000;
// const httpsPort = 443;

// https 연결코드
// app_low.use((req, res, next) => {
//   if (req.secure) {
//     next();
//   } else {
//     const to = `https://${req.hostname}:${httpsPort}${req.url}`;
//     console.log(to);
//     res.redirect(to);
//   }
// });

// https 연결코드
// http.createServer(app_low).listen(httpPort, () => {
//   console.log('http서버 켜짐');
// });

// https.createServer(credentials, app).listen(httpsPort, () => {
//   console.log('https서버 켜짐');
// });

// 서버 열기
app.listen(port, () => {
  console.log(port, "Server is listening...");
});
