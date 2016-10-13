/**
 * Created by Administrator on 2014/11/20.
 */
//定义消息枚举
var dataType = {
    chatMessage: 0,//聊天消息
    drawMessage: 1,//绘图消息
    tokenMessage: 2//令牌消息
};

//聊天消息的格式
var chat_Message = {
    type: dataType.chatMessage,  //数据类型
    content: null              //聊天内容
}
//绘图消息
var draw_Message = {
    type: dataType.drawMessage,
    startX: 0,//起点的X
    startY: 0,//起点的Y
    endX: 0, //终点X
    endY: 0 //终点Y
}
//令牌消息
var token_Message={
    type:dataType.tokenMessage,//消息类型
    hasToken:false //是否拥有令牌
}

