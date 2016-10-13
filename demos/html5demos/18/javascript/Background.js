/**
 * Created by Administrator on 2014/12/4.
 */
function Background(ctx)
{
    this.ctx = ctx;
    this.image = new Image();
    this.image.src="images/Stars.png";
    this.y = 0;
}
Background.prototype.draw = function()
{
    this.ctx.drawImage(this.image,0,this.y);
    this.ctx.drawImage(this.image,0,this.y - 450);
    this.y++;
    if(this.y > 450)
    {
        this.y = 0;
    }
}