/**
 * Created by Administrator on 2014/11/27.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;//全局变量便于改变大小
var RADIUS = 8;//设置圆的半径
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
const endTime = new Date(2014,11,27,16,30,30);//const用法
var curShowTimeSeconds = 0;

window.onload = function() {//初始化
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSecond();
    render(context);//绘制每个数字
};

function getCurrentShowTimeSecond(){
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();//getTime()得到1970年至今间相隔的毫秒数
    ret = Math.round(ret/1000);//round()函数用法转换成整数 并将毫秒转换成秒
//     alert(ret);//测试
    return (ret >= 0) ? ret : 0;
//      return ret;
}
function render(cxt){
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);//一个一个数字绘制时间函数，起始坐标
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="yellow";
    var haha = digit[num];
   // alert(haha[0][0])
    //--
//    for(var i = 0; i < digit[num][0].length;i++){
//        for(var j = 0;j < digit[num][0].length;j++){
//            if(digit[num][i][j]==1){
//                cxt.beginPath();
//                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
//                cxt.closePath();
//
//                cxt.fill();
//            }
//        }
//    }
}