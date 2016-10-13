/**
 * Created by Administrator on 2014/11/11.
 */
var fs = require('fs');
eval(fs.readFileSync('dataType.js')+'');

//数组, 记录连接ID
var connIDS=[];

var ws = require("websocket-server");
var server = ws.createServer();
//websocket连接事件.[添加事件]
server.addListener("connection", function (conn) {
    var message = conn.id + " connect...current user amount " + server.manager.length;
    console.log(message)
    connIDS.push(conn.id);
    //把令牌给第1个人
    if(connIDS.length == 1)
    {
        token_Message.hasToken = true;
        server.send(connIDS[0],JSON.stringify(token_Message));
    }
    conn.addListener("message", function (msg) {
        console.log(msg);
        server.broadcast(msg);
    })
});
var port = 8899;
server.listen(port);
console.log("server is running on port " + port);