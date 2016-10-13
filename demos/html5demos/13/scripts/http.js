/**
 * Created by Administrator on 2014/11/11.
 */

var http = require("http");
http.createServer(function(requeset,respone){
    respone.writeHead(200,{"Content-Type":"text/plain"});
    respone.end("hello,node.js")
}).listen(8899,"127.0.0.1");
console.log("My Server is running now");