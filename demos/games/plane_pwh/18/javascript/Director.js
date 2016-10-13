/**
 * Created by Administrator on 2014/12/2.
 */
function Director() {
    this.player = new Player(); //玩家对象
    this.enemies = []; //敌人对象
    this.background = new Background(); //背景对象
    this.enemiesExplosions = []; //敌人爆炸对象
    this.playerExplosion = null; //玩家爆炸对象
    this.backAudio = $('#BGM');//背景音效
    this.fireAudio = $('#shootMusic');//发射音效
    this.playerExplodeAudio = $('#playerExplosionMusic'); //玩家爆炸音效
    this.enemeyExplodeAudio = $('#enemyExplosionMusic'); //敌人爆炸音效
    this.animationId = null;
    this.level = 1;
    this.levelSnippet = 1;
    this.score = 0;
}

//开始游戏方法
Director.prototype.play = function () {
    play();
}
//暂停方法
Director.prototype.pause = function () {
    pause(this);
}




