/**
 * Created by Administrator on 2014/12/4.
 */
function ExplosionPlayer(x, y) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.loopTime = 0;
}
ExplosionPlayer.prototype.draw = function () {
    ctx_bg.drawImage(images.explosionPlayer, this.frame * 42, 0, 42, 43, this.x + (images.Player.width - 42) / 2, this.y + (images.Player.height - 43) / 2, 42, 43);
    this.y++;
    this.loopTime++;
    if (this.loopTime % 20 == 0) {
        this.frame++;
    }
}