/**
 * Created by Administrator on 2014/12/4.
 */
function Player() {
    this.img = images.Player;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.isAlive = true;
    this.bullets = []; //子弹对象
    this.cd = 70;
    this.canShoot = true;
}

Player.prototype.isColide = function (x, y, width, height) {
    var isCrashed = false;
    ctx_bg.strokeStyle = "red";
    ctx_bg.lineWidth = 1;
    //ctx_bg.strokeRect(x, y, width, height);
    var residual = 10;
    if (x >= this.x + residual && y >= this.y + residual && x <= this.x - residual + this.img.width && y <= this.y - residual + this.img.height) {
        isCrashed = true;
    }
    if (x + width >= this.x + residual && y >= this.y + residual && x + width <= this.x - residual + this.img.width && y <= this.y - residual + this.img.height) {
        isCrashed = true;
    }
    if (x >= this.x + residual && y + height >= this.y + residual && x <= this.x - residual + this.img.width && y + height <= this.y - residual + this.img.height) {
        isCrashed = true;
    }
    if (x + width >= this.x + residual && y + height >= this.y + residual && x + width <= this.x - residual + this.img.width && y + height <= this.y - residual + this.img.height) {
        isCrashed = true;
    }
    return isCrashed;
}
Player.prototype.draw = function () {
    ctx_bg.drawImage(director.player.img, this.x, this.y);
}

Player.prototype.wipe = function () {
    //console.log("clear:" + this.x + "," + this.y + "," + director.player.img.width + "," + director.player.img.height);
    //ctx_bg.clearRect(this.x, this.y, director.player.img.width, director.player.img.height);
    ctx_bg.strokeStyle = "red";
    ctx_bg.lineWidth = 1;
}
Player.prototype.left = function () {
    this.wipe();
    //判断飞机越界
    if (director.player.x >= 0) {
        this.x -= this.speed;
    }
    this.draw(this.x, this.y);
}

Player.prototype.right = function () {
    this.wipe();
    //判断飞机越界
    if (director.player.x <= scr_width - this.img.width) {
    this.x += this.speed;}
    this.draw(this.x, this.y);
}

Player.prototype.up = function () {
    this.wipe();
    //判断飞机越界
    if (director.player.y >= 0) {
    this.y -= this.speed;}
    this.draw(this.x, this.y);
}

Player.prototype.down = function () {
    this.wipe();
    //判断飞机越界
    if (director.player.y <= scr_height - this.img.height) {
    this.y += this.speed;}
    this.draw(this.x, this.y);
}

Player.prototype.fire = function () {
    audios.shootMusic.load();
    audios.shootMusic.play();
    this.bullets.push(new Bullet(images.projectile, this.x + (images.Player.width - images.projectile.width) / 2, this.y + 3));
}

Player.prototype.explode = function (director) {
    audios.playerExplosionMusic.play();
    director.playerExplosion = new ExplosionPlayer(this.x,this.y);
}