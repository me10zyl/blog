/**
 * Created by Administrator on 2014/12/4.
 */
function Bullet(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.isAlive = true;
}
Bullet.prototype.draw = function () {
    ctx_bg.drawImage(this.img, this.x, this.y);
    this.y -= 2;
}

