var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

//socket
var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(process.env.VMC_APP_PORT || 8000);

var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {

  socket.on("C_to_S_message", function (data) {
    console.log("C_to_S_message");
    io.sockets.emit("S_to_C_message", {value:data.value});
  });
  socket.on("disconnect", function () {
  });
});
