/**
 * Created by Administrator on 2014/11/11.
 */
var ws = require("websocket-server");
var server = ws.createServer();
//websocket连接事件.[添加事件]
server.addListener("connection", function (conn) {
    var message = conn.id + " connect...current user amount " + server.manager.length;
    console.log(message);
    server.broadcast(message);
    conn.addListener("message", function (msg) {
        console.log(msg);
        server.broadcast(conn.id + " 说：" + msg);
    })
});
var port = 8899;
server.listen(port);
console.log("server is running on port " + port);