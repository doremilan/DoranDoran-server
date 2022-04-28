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

app.get(
  "/.well-known/pki-validation/AD424447A620C77C679BD83C2FA6E5BC.txt",
  (req, res) => {
    res.sendFile(__dirname +
      "/well-known/pki-validation/AD424447A620C77C679BD83C2FA6E5BC.txt");
  }
);

app.listen(port, () => {
  console.log(port, "Server is listening...");
});
