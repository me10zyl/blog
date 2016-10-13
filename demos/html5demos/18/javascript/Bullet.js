/**
 * Created by Administrator on 2014/12/9.
 */
function Bullet(ctx)
{
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "images/projecttile.png";
}

Bullet.prototype.draw = function(){
    this.ctx.drawImage(this.img,30,40);
}