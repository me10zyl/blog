/**
 * Created by Administrator on 2014/12/4.
 */
function Player(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = "images/Player.png";
}

Player.prototype.draw = function () {
    if (keyStatus.up == true) {
        this.y -= 2;
    } else if (keyStatus.left == true) {
        this.x -= 2;
    } else if (keyStatus.right == true) {
        this.x += 2;
    } else if (keyStatus.down == true) {
        this.y += 2;
    }
    this.ctx.drawImage(this.image, this.x, this.y);
}