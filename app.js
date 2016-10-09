var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

//socket
var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(process.env.VMC_APP_PORT || 3000);

var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {

  socket.on("C_to_S_message", function (data) {
    console.log("C_to_S");
    //この部分で送信したい...
    io.sockets.emit("S_to_C_message", {value:"Unity側への送信Msg"});
  });

  socket.on("disconnect", function () {
    //接続切れ.
  });
});
//Restful API
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3500);
console.log('Server is online.');

app.post('/', function(req, res) {
    // リクエストボディを出力
    console.log(req.body);
    // パラメータ名、nameを出力
    console.log(req.body.name);
    console.log(res);
    //ここでパラメータを取得して.
})
