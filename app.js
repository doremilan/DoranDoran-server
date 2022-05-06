const express = require("express");
const connect = require("./schemas/index");
const Router = require("./routers/index");
const cors = require("cors");
const port = 3000;
const app = express();
const fs = require('fs')

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

const app_low = express();

app_low.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    const to = `https://${req.hostname}:${httpsPort}${req.url}`;
    console.log(to);
    res.redirect(to);
  }
});



app.listen(port, () => {
  console.log(port, "Server is listening...");
});
