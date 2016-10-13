/**
 * Created by Administrator on 2014/12/1.
 */
/*star
 *loading模块
 *实现图片的预加载，并显示进度条
 *参数：图片数组对象，加载完成的回调函数
 */
var canvas = document.getElementById('planeCanvas');
var ctx = canvas.getContext('2d');
var images = {};

function loadImages(sources,callback){
    var loadedImages = 0;
    var numImages = 0;
    ctx.font='14px bold';
    ctx.lineWidth = 5;
    var clearWidth=canvas.width;
    var clearHeight=canvas.height;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        //当一张图片加载完成时执行
        images[src].onload = function(){
            //重绘一个进度条
            ctx.clearRect(0,0,clearWidth,clearHeight);
            ctx.fillText('Loading:'+loadedImages+'/'+numImages,200,280);
            ctx.save();
            ctx.strokeStyle='#555';
            ctx.beginPath();
            ctx.moveTo(200,300);
            ctx.lineTo(600,300);
            ctx.stroke();
            ctx.beginPath();
            ctx.restore();
            ctx.moveTo(200,300);
            ctx.lineTo(loadedImages/numImages*400+200,300);
            ctx.stroke();
            //当所有图片加载完成时，执行回调函数callback
            if (++loadedImages >= numImages) {
                callback();
            }
        };
        //把sources中的图片信息导入images数组
        images[src].src = sources[src];
    }
}

//定义预加载图片数组对象，执行loading模块
window.onload = function () {
    var sources = {
        explosionEnemy: "images/explosionEnemy.png",
        explosionPlayer: "images/explosionPlayer.png",
        Player: "images/Player.png",
        projectile: "images/projectile.png",
        Rock: "images/Rock.png",
        SpaceShooter_Lose: "images/SpaceShooter_Lose.png",
        SpaceShooter_Win: "images/SpaceShooter_Win.png",
        Stars: "images/Stars.png",
        Start: "images/Start.png"
    };
    //执行图片预加载，加载完成后执行main
    loadImages(sources, main);
};
/*end*/