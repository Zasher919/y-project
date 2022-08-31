//创建Websocket服务器
var Websocket = require("websocket").server;
//因Websocket是基于http，所需创建http服务器
var http = require("http");
//建立端口
var httpSever = http.createServer().listen(8080, function () {
  console.log("http://127.0.0.1:8080");
});
//创建Websocket实例化
var wsSever = new Websocket({
  httpServer: httpSever,
  //Websocket建立之后没有跨域，建立之前是有跨域
  autoAcceptConnections: false,
});
//创建数组保存每次的connection值
var conArr = [];
//利用on监听事件
wsSever.on("request", function (request) {
  var connection = request.accept();
  //将connection追加到数组中
  conArr.push(connection);
  //接受客户端的值
  connection.on("message", function (msg) {
    console.log(msg);
    for (let i = 0; i < conArr.length; i++) {
      //发送给客户端
      conArr[i].send(msg);
    }
  });
});
