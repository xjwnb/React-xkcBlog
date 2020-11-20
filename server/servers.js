
const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const session = require("express-session");
const app = express();
// 连接数据库
require("./model/connect");

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(bodyParser.json({ limit: "5mb" }));

app.use("*", (req, res, next) => {
  next();
  /* console.log(req.params[0]);
  let url = req.params[0];
  if (url === "/admin/login") {
    next();
    console.log(req.session);
    return;
  } else if (url === "/admin/user") {
    next();
    return;
  } else if (url === "/admin/publish") {
    next();
    return;
  } else {
    if (!req.session) {
      res.send({
        status: 404,
        url: "/login",
        msg: "请重新登录",
      });
      return;
    }
    res.send({
      status: 200,
      msg: req.session,
    });
    next();
  } */
});

app.use(
  session({
    secret: "session xkc",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600 * 1000 * 6 },
  })
);

const admin = require("./route/admin");
const blog = require("./route/blog");

app.use("/admin", admin);
app.use("/blog", blog);
// require('./model/user')    只插入一个管理员用户即可
// require('./model/admin')    发表第一篇博客张完毕

app.get("/", (req, res) => {
  console.log("客户端成功访问");
  res.send("Hello My Blog");
});

app.listen(8888, () => {
  console.log("服务器启动成功");
});
