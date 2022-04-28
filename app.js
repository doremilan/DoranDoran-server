const express = require("express");
const connect = require("./schemas/index");
const Router = require("./routers/index");
const cors = require("cors");
const app = express();
const port = 3000;

connect();

// 각종 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(port, "Server is listening...");
});
