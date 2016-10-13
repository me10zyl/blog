/**
 * Created by Administrator on 2014/12/4.
 */
function Enemey(img, x, y, scale) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = 1.2;
    this.scale = scale;
    this.degree = 0;
    this.isAlive = true;
    this.isAmmo = false;
}

Enemey.prototype.draw2 = function () {
    ctx_bg.save();
    ctx_bg.strokeStyle = "red";
    ctx_bg.lineWidth = 1;
    var imgCenterX = this.img.width / 2;
    var imgCenterY = this.img.height / 2;
    //  ctx_bg.scale(this.scale, this.scale);
//    if (director.player.isColide(this.x, this.y, this.img.width, this.img.height)) {
//        isCrashed = true;
//    }
    ctx_bg.translate(this.x + imgCenterX, this.y + imgCenterY);
//    if (director.player.isColide(-imgCenterX,-imgCenterY, this.img.width, this.img.height)) {
//        isCrashed = true;
//    }
    //ctx_bg.clearRect(-imgCenterX - residualX, -imgCenterY - residualY, this.img.width + residualX, this.img.height + residualY);
    ctx_bg.rotate(Math.PI * 2 / 360 * this.degree);
    if(!this.isAmmo)
        ctx_bg.drawImage(this.img, -imgCenterX, -imgCenterY,this.img.width * this.scale,this.img.height * this.scale);
    else
        ctx_bg.drawImage(images.Ammo, -imgCenterX, -imgCenterY,this.img.width * this.scale,this.img.height * this.scale);
    ctx_bg.restore();

    if (this.degree == 360) {
        this.degree = 0;
    }
    this.y += this.speed;
    this.degree++;
}

Enemey.prototype.draw = function () {
    var isCrashed = false;
    ctx_bg.save();
    ctx_bg.strokeStyle = "red";
    ctx_bg.lineWidth = 1;
    //ctx_bg.scale(this.scale, this.scale);
    ctx_bg.drawImage(this.img, this.x, this.y);
    ctx_bg.restore();
    return isCrashed;
}

Enemey.prototype.explode = function (director) {
    audios.enemyExplosionMusic.load();
    audios.enemyExplosionMusic.play();
    director.enemiesExplosions.push(new ExplosionEnemey(this.x, this.y, images.explosionEnemy,this.speed));
}
Enemey.prototype.isColide = function (x, y, width, height) {
    var isCrashed = false;
    ctx_bg.strokeStyle = "red";
    ctx_bg.lineWidth = 1;
    //ctx_bg.strokeRect(x, y, width, height);
    if (x >= this.x && y >= this.y && x <= this.x + this.img.width && y <= this.y + this.img.height) {
        isCrashed = true;
    }
    if (x + width >= this.x && y >= this.y && x + width <= this.x + this.img.width && y <= this.y + this.img.height) {
        isCrashed = true;
    }
    if (x >= this.x && y + height >= this.y && x <= this.x + this.img.width && y + height <= this.y + this.img.height) {
        isCrashed = true;
    }
    if (x + width >= this.x && y + height >= this.y && x + width <= this.x + this.img.width && y + height <= this.y + this.img.height) {
        isCrashed = true;
    }
    return isCrashed;
}