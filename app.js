const express = require("express");
const connect = require("./schemas/index");
const Router = require("./routers/index");
const cors = require("cors");
const port = 3000;
const app = express();
const fs = require('fs')
const http = require('http')
const https = require('https')

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

//인증서
const privateKey = fs.readFileSync(__dirname + '/private.key', "utf8");
const certificate = fs.readFileSync(__dirname + '/certificate.crt', "utf8");
const ca = fs.readFileSync(__dirname + '/ca_bundle.crt', 'utf8');
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const app_low = express();


const httpPort = 80;
const httpsPort = 443;

app_low.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    const to = `https://${req.hostname}:${httpsPort}${req.url}`;
    console.log(to);
    res.redirect(to);
  }
});

http.createServer(app_low).listen(httpPort, () => {
  console.log('http서버 켜짐');
});

https.createServer(credentials, app).listen(httpsPort, () => {
  console.log('https서버 켜짐');
});



// app.listen(port, () => {
//   console.log(port, "Server is listening...");
// });
