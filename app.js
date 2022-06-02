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

// 각종 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("tiny"));
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
