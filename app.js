const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const webSocket = require("./socket");
const passportConfig = require("./passport");
require("express-async-errors");
const config = require("./config");
const indexRouter = require("./routers/index");
const connect = require("./schemas/index");
const app = express();

connect();
passportConfig(app);

app.use(cors());
// app.use(cors({ origin: config.cors.cors }));

// app.get("/cors-test", (req, res) => {
//   res.send("hi")
// })

// 각종 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); //보안에 필요한 헤더 추가 미들웨어
app.use(morgan("tiny")); // 서버 요청 모니터링 미들웨어
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequest,
  })
);

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

const server = app.listen(config.host.port, () => {
  console.log("Server is listening...");
});

webSocket(server);
