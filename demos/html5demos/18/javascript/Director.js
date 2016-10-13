/**
 * Created by Administrator on 2014/12/2.
 */
function Director(ctx) {
    this.ctx = ctx;
    this.player = new Player(ctx); //玩家对象
    this.enemies = []; //敌人对象
    this.bullets = []; //子弹对象
    this.background = null; //背景对象
    this.backAudio = null;//背景音效
    this.fireAudio = null;//发射音效
    this.playerExplodeAudio = null; //玩家爆炸音效
    this.enemeyExplodeAudio = null; //敌人爆炸音效
    this.animationId = null;
}

//开始游戏方法
Director.prototype.play = function () {
    //this.backAudio.play();
    var fps = 300;
    var director = this;
    //游戏刷帧
    this.animationId = setInterval(function(){
        //1.清屏
        director.ctx.clearRect(0,0,600,450);
        //2.画背景
        director.background.draw();
        //3.画飞机
        director.player.draw();
        //4.画敌人
        //5.画子弹
        //6.碰撞检测
    },1000 / fps);
}
//暂停方法
Director.prototype.pause = function () {
    //clearInterval(director.animationId);
}
