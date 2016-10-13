/**
 * Created by Administrator on 2014/12/4.
 */
function ExplosionEnemey(x, y, img, speed) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speed = speed;
    this.frame = 0;
    this.loopTime = 0;
}
ExplosionEnemey.prototype.draw = function () {
    ctx_bg.drawImage(images.explosionEnemy,  this.frame * 44, 0, 44, 49, this.x, this.y, 44, 49);
    this.y++;
    this.loopTime++;
    if(this.loopTime % 10 == 0)
    {
        this.frame++;
    }
}