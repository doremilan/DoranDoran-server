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
  "/.well-known/pki-validation/B8957A61CAF512916A6C2B6FD4641338.txt",
  (req, res) => {
    res.sendFile(__dirname +
      "/well-known/pki-validation/B8957A61CAF512916A6C2B6FD4641338.txt");
  }
);

app.listen(port, () => {
  console.log(port, "Server is listening...");
});
