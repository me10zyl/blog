/**
 * Created by Administrator on 2014/12/1.
 */
/*star
 *loading模块
 *实现图片的预加载，并显示进度条
 *参数：图片数组对象，加载完成的回调函数
 */
var canvas = document.getElementById('planeCanvas');
var bgcanvas = document.getElementById('bgCanvas');
var ctx_bg = bgcanvas.getContext('2d');
var ctx = canvas.getContext('2d');
var images = {};
var scr_width = 600;
var scr_height = 450;
var bar_len = 400;
var audios = {};
var audios_len = 5;

function initCanvas() {
    canvas.style.left = (window.innerWidth - scr_width) / 2 + "px";
    bgcanvas.style.left = (window.innerWidth - scr_width) / 2 + "px";
}

function initObjectImage() {
    director.player.img = images.Player;
    director.background.imgWin = images.SpaceShooter_Win;
    director.background.imgLose = images.SpaceShooter_Lose;
    director.background.imgPlay = images.Stars;
    director.background.imgStart = images.Start;
}

function stokeProgress(clearWidth, clearHeight, step, totalStep) {
    ctx.clearRect(0, 0, clearWidth, clearHeight);
    ctx.fillText('Loading:' + step + '/' + totalStep, (scr_width - bar_len) / 2, (scr_height - ctx.lineWidth) / 2 - 20);// 200 280
    ctx.save();
    ctx.strokeStyle = '#555';
    ctx.beginPath();
    ctx.moveTo((scr_width - bar_len) / 2, (scr_height - ctx.lineWidth) / 2); //200 300
    ctx.lineTo((scr_width - bar_len) / 2 + bar_len, (scr_height - ctx.lineWidth) / 2);// 600 300
    ctx.stroke();
    ctx.beginPath();
    ctx.restore();
    ctx.moveTo((scr_width - bar_len) / 2, (scr_height - ctx.lineWidth) / 2);//200 300
    ctx.lineTo(step / totalStep * 400 + (scr_width - bar_len) / 2, (scr_height - ctx.lineWidth) / 2);//
    ctx.stroke();
}
function loadImages(sources, callback) {
    var loadedImages = 0;
    var numImages = 0;
    ctx.font = '14px bold';
    ctx.lineWidth = 5;
    var clearWidth = canvas.width;
    var clearHeight = canvas.height;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        //当一张图片加载完成时执行
        images[src].onload = function () {
            $('#pretxt').remove();
            //重绘一个进度条
            stokeProgress(clearWidth, clearHeight, loadedImages, numImages + audios_len);
            //当所有图片加载完成时，执行回调函数callback
            if (++loadedImages >= numImages) {
                initObjectImage();
                loadAudios(callback, clearWidth, clearHeight, loadedImages, numImages + audios_len);
            }
        };
        //把sources中的图片信息导入images数组
        images[src].src = sources[src];
    }
}

function loadAudios(callback, clearWidth, clearHeight, step, totalStep) {
    audios.BGM = $("#BGM")[0];
    audios.shootMusic = $("#shootMusic")[0];
    audios.enemyExplosionMusic = $("#enemyExplosionMusic")[0];
    audios.playerExplosionMusic = $("#playerExplosionMusic")[0];
    audios.changeSceneMusic = $("#changeSceneMusic")[0];
    var loadedAudio = 0;
    for (var i in audios) {
        stokeProgress(clearWidth, clearHeight, step + loadedAudio, totalStep);
        if (++loadedAudio >= audios_len) {
            callback();
        }
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
    initCanvas();
    //执行图片预加载，加载完成后执行main
    loadImages(sources, main);
};
/*end*/