/**
 * Created by Administrator on 2014/11/20.
 */
var webSocketGame = {
    isDrawing: false,//是否处于绘制状态
    ctx: null,    //渲染上下文
    $canvas: null,     //$canvas JQuery对象
    oldX: 0,
    oldY: 0,
    drawToken: false,
    ws: null
};
function draw(x, y) {
    var imageData = webSocketGame.ctx.createImageData(1, 1);
    imageData.data[0] = 0;
    imageData.data[1] = 0;
    imageData.data[2] = 0;
    imageData.data[3] = 255;
    webSocketGame.ctx.putImageData(imageData, x, y);
}
function drawLine(x1, y1, x2, y2) {
    webSocketGame.ctx.beginPath();
    webSocketGame.ctx.moveTo(x1, y1);
    webSocketGame.ctx.lineTo(x2, y2);
    webSocketGame.ctx.closePath();
    webSocketGame.ctx.stroke();
}
$(function () {
    if (window.WebSocket) {
        //连接WebSocket服务器
        webSocketGame.ws = new WebSocket("ws://127.0.0.1:8899");

        webSocketGame.ws.onopen = function () {
            //     var json = JSON.parse("{\"oldX\": \"216\", \"oldY\": \"168\", \"x\": \"219\", \"y\": \"172\"}");
        };
        webSocketGame.ws.onclose = function () {
            alert('连接关闭');
        };
        webSocketGame.ws.onmessage = function (e) {
            var message = e.data;
            var json = JSON.parse(message);
            console.log(message)
            switch (json.type) {
                //如果是聊天消息
                case dataType.chatMessage:
                    break;
                //如果是绘图消息
                case dataType.drawMessage:
                    break;
                //如果是令牌消息
                case dataType.tokenMessage:
                    readyToDraw();
                    webSocketGame.drawToken = true;
                    break;
            }
            drawLine(json.oldX, json.oldY, json.x, json.y);//解析错误是因为...服务器代码写错..无语
        };
        webSocketGame.ws.onerror = function () {
        }
        webSocketGame.$canvas = $('#drawing-pad');
        webSocketGame.ctx = webSocketGame.$canvas[0].getContext("2d");
    }
})

function readyToDraw() {
    webSocketGame.$canvas.mousedown(function (e) {
        webSocketGame.isDrawing = true;
        var offset = webSocketGame.$canvas.offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        webSocketGame.oldX = x;
        webSocketGame.oldY = y;
        console.log("down")
    }).mousemove(function (e) {
        if (webSocketGame.isDrawing) {
            console.log("move")
            var offset = webSocketGame.$canvas.offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
//                draw(x, y);
            drawLine(webSocketGame.oldX, webSocketGame.oldY, x, y);
            webSocketGame.oldX = x;
            webSocketGame.oldY = y;
        }
    });
    $(document).mouseup(function () {
        webSocketGame.isDrawing = false;
        console.log("up")
    });
}