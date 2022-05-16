const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
require("express-async-errors")
const indexRouter = require("./routers/index")
const connect = require("./schemas/index")
const passportConfig = require("./passport")
const config = require("./config")
const app = express()

connect()
passportConfig(app)

app.use(cors())
// app.use(cors({ origin: process.env.CORS }))

// app.get("/cors-test", (req, res) => {
//   res.send("hi")
// })

// 각종 미들웨어
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet()) //보안에 필요한 헤더 추가 미들웨어
app.use(morgan("tiny")) // 서버 요청 모니터링 미들웨어
app.use(
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequest,
  })
)

// 라우터 연결
app.use(indexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.sendStatus(404)
})



// cors test 
app.get("/cors-test", (req, res) => {
  console.log(process.env.CORS)
  res.send("hi")
})

// error handler
app.use((error, req, res, next) => {
  console.error(error)
  res.sendStatus(500)
})

// 서버 열기
app.listen(config.host.port, () => {
  console.log("Server is listening...")
})
