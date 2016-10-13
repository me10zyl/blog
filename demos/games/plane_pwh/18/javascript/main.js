/**
 * Created by Administrator on 2014/12/2.
 */
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
}

function clr() {
    ctx_bg.clearRect(0, 0, scr_width, scr_height);
}
function clrBg() {
    ctx_bg.clearRect(0, 0, scr_width, scr_height);
}
function clrA() {
    clr();
    clrBg();
}

var director = new Director();
var gameStatus = "start";
var loopTimes = 0;

function main() {
    clrA();
    if (gameStatus == "start") {
        audios.BGM.play();
        director.background.draw(director.background.imgStart);
    }
    else if (gameStatus == "restart") {
        audios.BGM.play();
        director.play();
    }

    $('#planeCanvas').click(function (e) {
        //alert(e.pageX - $(this).offset().left);
    });
    $(document).keydown(function (e) {
        if (gameStatus == "start")
            director.play();
    })
}

function loop() {
    if (loopTimes++ % 100 == 0) {
        var enmey = new Enemey(images.Rock, Math.random() * (scr_width - images.Rock.width), -images.Rock.height, 1)
        var ran = Math.random();
        enmey.isAmmo = ran > 0.6 ? true : false;
        director.enemies.push(enmey);
    }
    //画背景
    director.background.draw(director.background.imgPlay);
    //画玩家
    if (director.player.isAlive) {
            director.player.draw();
    }
    //遍历子弹
    for (var i = 0; i < director.player.bullets.length; i++) {
        if (!director.player.bullets[i].isAlive) {
            director.player.bullets.remove(i);
            continue;
        }
        //画子弹
        director.player.bullets[i].draw();
        //子弹边界移除检测
        if (director.player.bullets[i].y < -images.projectile.height) {
            director.player.bullets[i].isAlive = false;
        }
    }
    //遍历敌人
    for (var i = 0; i < director.enemies.length; i++) {
        if (!director.enemies[i].isAlive) {
            director.enemies.remove(i);
            continue;
        }
        //画敌人
        director.enemies[i].draw2();
        //碰撞检测 - 碰撞玩家
        if (director.player.isAlive)
            if (director.player.isColide(director.enemies[i].x, director.enemies[i].y, director.enemies[i].img.width, director.enemies[i].img.height)) {
                if(director.enemies[i].isAmmo)
                {
                    audios.changeSceneMusic.load();
                    audios.changeSceneMusic.play();
                    director.player.ammo += 5;
                    director.enemies[i].isAlive = false;
                }else{
                director.player.explode(director);
                director.player.isAlive = false;
                break;
                }
            }
        //陨石边界移除检测
        if (director.enemies[i].y > scr_height) {
            director.enemies.isAlive = false;
            // director.enemies.push(new Enemey(images.Rock, Math.random() * (scr_width - images.Rock.width), -images.Rock.height, 1));
            director.levelSnippet++;
        }
        //碰撞检测 - 碰撞子弹
        for (var j = 0; j < director.player.bullets.length; j++) {
            if (director.enemies[i].isColide(director.player.bullets[j].x, director.player.bullets[j].y, images.projectile.width, images.projectile.height)) {
                director.enemies[i].explode(director);
                if (director.enemies[i].isAlive)
                    director.score++;
                director.enemies[i].isAlive = false;
                director.player.bullets[j].isAlive = false;
            }
        }
    }
    //遍历敌人爆炸
    for (var i = 0; i < director.enemiesExplosions.length; i++) {
        if (director.enemiesExplosions[i] == 8) {
            director.enemiesExplosions.remove(i);
        }
        //画敌人爆炸
        director.enemiesExplosions[i].draw();
    }
    //画玩家爆炸
    if (director.playerExplosion) {
        director.playerExplosion.draw();
        if (director.playerExplosion.frame == 6) {
            gameStatus = "lose";
        }
    }
    //画分数
    ctx_bg.beginPath();
    ctx_bg.font = "20px Cursive";
    ctx_bg.strokeText("分数：" + director.score + "", 0, scr_height - 2);
    ctx_bg.closePath();
    //画弹药
    ctx_bg.beginPath();
    ctx_bg.font = "20px Cursive";
    ctx_bg.strokeText("弹药：" + director.player.ammo+ "", scr_width - 100, scr_height - 2);
    ctx_bg.closePath();
    //失败检测
    if (gameStatus == "lose") {
        clrA();
        director.background.y = 0;
        director.background.draw(director.background.imgLose);
        director.pause();
        return;
    }
    //按键检测
    if (director.player.isAlive) {

        if (keyStatus.left) {
            director.player.left();
        }
        if (keyStatus.up) {
            director.player.up();
        }
        if (keyStatus.right) {
            director.player.right();
        }
        if (keyStatus.down) {
            director.player.down();
        }
    }
}

function play() {
    gameStatus = "playing";
    director.player.x = (scr_width - director.player.img.width) / 2;
    director.player.y = scr_height - director.player.img.height;
    //var scale = Math.random() + 0.5;
    var fps = 1000;
    var scale = 1;
    director.enemies.push(new Enemey(images.Rock, Math.random() * (scr_width - images.Rock.width * scale), -images.Rock.height, scale));
    director.animationId = setInterval(function () {
        clr();
        loop();
    }, 1000 / fps);
    $(document).keypress(function (e) {
        if (e.which == 32) {
            if (director.player.isAlive && director.player.canShoot) {
                director.player.fire();
                director.player.canShoot = false
                setTimeout(function () {
                    director.player.canShoot = true;
                }, director.player.cd);
            }

        }
    })
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37:
                keyStatus.left = true;
                break;
            case 38:
                keyStatus.up = true;
                break;
            case 39:
                keyStatus.right = true;
                break;
            case 40:
                keyStatus.down = true;
                break;
            default :
                console.log(e.which);
        }
    });
    $(document).keyup(function (e) {
        switch (e.which) {
            case 37:
                keyStatus.left = false;
                break;
            case 38:
                keyStatus.up = false;
                break;
            case 39:
                keyStatus.right = false;
                break;
            case 40:
                keyStatus.down = false;
                break;
            default :
                console.log(e.which);
        }
    });
}
function pause($this) {
    clearInterval($this.animationId);
    audios.BGM.load();
    audios.changeSceneMusic.play();
    $(document).keypress(function (e) {
        if (gameStatus == "lose") {
            director = new Director();
            gameStatus = "restart";
            loopTimes = 0;
            main();
        }
    })
}
