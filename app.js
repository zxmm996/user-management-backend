var express = require("express");
var app = express();
var router = require("./controller/router.js");


//罗列路由中间件
app.post("/login", router.login);
app.post("/addUser", router.addUser);
app.get("/getUserList", router.getUserList);
app.get("/getUserInfoById", router.getUserInfoById);
app.get("/deleteUser", router.deleteUser);
app.post("/updateUser", router.updateUser);

app.listen(3000);
console.log('server running on port 3000')