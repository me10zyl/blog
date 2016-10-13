/**
 * Created by Administrator on 2014/11/19.
 */

var webSocketGame = {
        isDrawing: false,//是否处于绘制状态
        ctx: null,    //渲染上下文
        $canvas: null,     //$canvas JQuery对象
        oldX: 0,
        oldY: 0,
        lineWidth: 1,
        strokeStyle: "black",
        isReady: false,
        isGameStart: false,
        isTurn: false,
        isSpec: false,
        nickname: "",
        id: -1,
        ws: null
    }
    ;
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
    webSocketGame.ctx.lineWidth = webSocketGame.lineWidth;
    webSocketGame.ctx.strokeStyle = webSocketGame.strokeStyle;
    webSocketGame.ctx.moveTo(x1, y1);
    webSocketGame.ctx.lineTo(x2, y2);
    webSocketGame.ctx.closePath();
    webSocketGame.ctx.stroke();
}
function init() {
    $("canvas")[0].width = $(".col-md-9").width() - 20;
    $(".input-group")[0].style.marginLeft = $("canvas").offset().left + 10;
    $(".input-group")[0].style.width = $("canvas")[0].width + 30;
    $("#title")[0].style.marginLeft = $("canvas").offset().left;
    $("#title")[0].style.width = $("canvas")[0].width;
}
function clearScreen() {
    webSocketGame.ctx.clearRect(0, 0, webSocketGame.$canvas.width(), webSocketGame.$canvas.height())
}
init();
function clickReady(ws) {
    if (webSocketGame.isReady) {
        $("#ready").removeClass("btn-success").addClass("btn-danger");
        $("#ready #icon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
        $("#ready #text").html("准备");
    } else {
        $("#ready").removeClass("btn-danger").addClass("btn-success");
        $("#ready #icon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
        $("#ready #text").html("已准备");
    }
    webSocketGame.isReady = !webSocketGame.isReady;
    sendReady(ws, webSocketGame.isReady);
}
$(function () {
    if (window.WebSocket) {
        //连接WebSocket服务器
        var ws = new WebSocket("ws://zyl-me.xicp.net:1234/WebSocket/DrawNGuessServlet");
        webSocketGame.ws = ws;
        ws.onopen = function () {
        };
        ws.onclose = function () {
            alert('连接关闭');
        };
        ws.onmessage = function (e) {
            var message = e.data;
            var json = JSON.parse(message);
            console.log(message);
//            $('.panel-body#chatBox').html($('.panel-body#chatBox').html() + message + "<br>");
            handle(json);
        };
        webSocketGame.$canvas = $('#drawing-pad');
        webSocketGame.ctx = webSocketGame.$canvas[0].getContext("2d");
        webSocketGame.$canvas.mousedown(function (e) {
            webSocketGame.isDrawing = true;
            var offset = webSocketGame.$canvas.offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            webSocketGame.oldX = x;
            webSocketGame.oldY = y;
            console.log("down")
        }).mousemove(function (e) {
            if (webSocketGame.isDrawing && webSocketGame.isTurn && webSocketGame.isGameStart) {
                console.log("move")
                var offset = webSocketGame.$canvas.offset();
                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;
                var offset_xy = 9;
                drawLine(webSocketGame.oldX - offset_xy, webSocketGame.oldY - offset_xy, x - offset_xy, y - offset_xy);
//                draw(x, y);
                var str_json = JSON.stringify({"strokeStyle": webSocketGame.strokeStyle, "lineWidth": webSocketGame.lineWidth, "oldX": webSocketGame.oldX - offset_xy, "oldY": webSocketGame.oldY - offset_xy, "x": x - offset_xy, "y": y - offset_xy});
                ws.send(str_json);
                webSocketGame.oldX = x;
                webSocketGame.oldY = y;
            }
        });
        $(document).mouseup(function () {
            webSocketGame.isDrawing = false;
            console.log("up")
        });
    }
    $("#msg").keydown(function (e) {
        if (e.which == 13) {
            sendChatMsg(ws);
        }
    })
    $("#btnSend").click(function () {
        sendChatMsg(ws);
    })
    $("#clearScreen").click(function () {
        clearScreen();
        sendClearScreen(ws);
    })
    $("#ready").click(function () {
        clickReady(ws);
    })
    $("#strokeStyle button:eq(0)").click(function () {
        webSocketGame.strokeStyle = "black";
    })
    $("#strokeStyle button:eq(1)").click(function () {
        webSocketGame.strokeStyle = "red";
    })
    $("#strokeStyle button:eq(2)").click(function () {
        webSocketGame.strokeStyle = "green";
    })
    $("#strokeStyle button:eq(3)").click(function () {
        webSocketGame.strokeStyle = "blue";
    })
    $("#lineWidth button:eq(0)").click(function () {
        webSocketGame.lineWidth = 1;
    })
    $("#lineWidth button:eq(1)").click(function () {
        webSocketGame.lineWidth = 2;
    })
    $("#lineWidth button:eq(2)").click(function () {
        webSocketGame.lineWidth = 3;
    })
    $("#lineWidth button:eq(3)").click(function () {
        webSocketGame.lineWidth = 4;
    })
    $("#lineWidth button:eq(4)").click(function () {
        webSocketGame.lineWidth = 5;
    })
    diableButtons();
})
/** send functions **/
function sendClearScreen(ws) {
    ws.send(s({"clear": true}))
}
function sendChatMsg(ws) {
    ws.send(s({"id": webSocketGame.id, "nickname": webSocketGame.nickname, "msg": $("#msg").val()}))
    $("#msg").val("")
}
function sendReady(ws, ready) {
    ws.send(s({"ready": ready}));
}
/** no very useful functions **/
function s(json) {
    return JSON.stringify(json);
}
function initParam() {
    webSocketGame.isReady = false;
    webSocketGame.isGameStart = false;
    webSocketGame.isTurn = false;
    webSocketGame.isSpec = false;
    $("#ready").removeClass("btn-success").addClass("btn-danger");
    $("#ready #icon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
    $("#ready #text").html("准备");
    $("#ready").removeClass("disabled");
    $("#userList li").removeClass("list-group-item-success");
    $("#gameTitle").html("&nbsp;");
    diableButtons();
}
function appendMessage(str) {
    $('.panel-body#chatBox').html($('.panel-body#chatBox').html() + str + "<br>");
}
function drawGameTitle(json) {
    webSocketGame.isGameStart = false;
    webSocketGame.ctx.font = "100px 微软雅黑";
    // 创建渐变
    var gradient = webSocketGame.ctx.createLinearGradient(0, 0, webSocketGame.$canvas.width(), 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // 用渐变填色
    webSocketGame.ctx.fillStyle = gradient;
    webSocketGame.ctx.textAlign = 'center'
    webSocketGame.ctx.fillText("「" + json.gameTitle + "」", webSocketGame.$canvas.width() / 2, webSocketGame.$canvas.height() / 2);
}
function diableButtons() {
    $(".btn-toolbar .btn-group button").addClass("disabled");
}
function activeButtons() {
    $(".btn-toolbar .btn-group button").removeClass("disabled");
}
/** on Message handle **/
function handle(json) {
    handleUserInfo(json);
    handleDrawLine(json);
    handleMsgChat(json);
    handleClearScreen(json);
    handleError(json);
    handleGameInfo(json);
}
function handleGameInfo(json) {
    if ("gameStatus" in json) {
        if (webSocketGame.isReady == false && json.gameStatus == "start") { //检查是否是观察者
            webSocketGame.isSpec = true;
            sendReady(webSocketGame.ws, false);
            $("#ready").addClass("disabled")
        }
        handleNicknamesAppendToLeft(json);
        handleReady(json);
        handleGameStatus(json);
        handleTurn(json);
        handleGameTitle(json);
        handleWin(json);
    }
}
function handleReady(json) {
    for (var i = 0; i < json.users.length; i++) {
        if (json.users[i].ready == true) {
            for (var j = 0; j < $("#userList li").length; j++) {
                if (json.users[i].id == $("#userList li:eq(" + j + ")").data("id")) {
                    $("#userList li:eq(" + j + ")").addClass("list-group-item-success")
                }
            }
        }
    }
}
function handleWin(json) {
    for (var i = 0; i < json.users.length; i++) {
        if (json.users[i].win == true) {
            drawGameTitle(json);
            appendMessage(json.users[i].nickname + "猜对了!");
            initParam();
            break;
        }
    }
}
function handleTurn(json) {
    for (var i = 0; i < json.users.length; i++) {
        if (json.users[i].id == webSocketGame.id) {
            if (json.users[i].turn == true && json.gameStatus == "start") {
                webSocketGame.isTurn = true;
                webSocketGame.ws.send(s({"msg": "该" + json.users[i].nickname + "画了..."}))
            }
        }
    }
}
function handleGameTitle(json) {
    if (webSocketGame.isTurn)
        $("#gameTitle").html(json.gameTitle);
}
function handleError(json) {
    if ("error" in json) {
        alert(json.error);
    }
}

function handleGameStatus(json) {
    if (json.gameStatus == "start" && !webSocketGame.isSpec) {
        clearScreen();
        webSocketGame.ctx.font = "100px 微软雅黑";
        // 创建渐变
        var gradient = webSocketGame.ctx.createLinearGradient(0, 0, webSocketGame.$canvas.width(), 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变填色
        webSocketGame.ctx.fillStyle = gradient;
        webSocketGame.ctx.textAlign = 'center'
        webSocketGame.ctx.fillText("游 戏 开 始!", webSocketGame.$canvas.width() / 2, webSocketGame.$canvas.height() / 2, 300);
        $("#ready").addClass("disabled");
        setTimeout(function () {
            webSocketGame.isGameStart = true;
            if (webSocketGame.isTurn) {
                activeButtons();
            }
            clearScreen();
        }, 1500);
    } else if (json.gameStatus == "end") {
        clearScreen();
        drawGameTitle(json);
        initParam();
    }
}
function handleClearScreen(json) {
    if ("clear" in json) {
        clearScreen();
    }
}
function handleNicknamesAppendToLeft(json) {
    $("#userList li").remove();
    for (var i = 0; i < json.users.length; i++) {
        $("<li class='list-group-item' style='text-align:center;overflow: auto'></li>").data("id", json.users[i].id).html(json.users[i].nickname).appendTo("#userList");
    }
}
function handleMsgChat(json) {
    if ("msg" in json) {
        var name = "";
        if (json.nickname)
            name = "<font color='red'>" + json.nickname + "</font>：";
        $('.panel-body#chatBox').html($('.panel-body#chatBox').html() + name + json.msg + "<br>");
    }
}
function handleDrawLine(json) {
    webSocketGame.lineWidth = json.lineWidth;
    webSocketGame.strokeStyle = json.strokeStyle;
    drawLine(json.oldX, json.oldY, json.x, json.y);//解析错误是因为...服务器代码写错..无语
}
function handleUserInfo(json) {
    if ("nickname" in json && "id" in json && "ready" in json && "score" in json && "turn" in json && "win" in json) {
        webSocketGame.nickname = json.nickname;
        webSocketGame.id = json.id;
    }
}

