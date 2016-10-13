/**
 * Created by Administrator on 2014/12/4.
 */
function Background() {
    this.imgWin = images.SpaceShooter_Win;
    this.imgLose = images.SpaceShooter_Lose;
    this.imgPlay = images.Stars;
    this.imgStart = images.Start;
    this.y = 0;
}

Background.prototype.draw = function (img) {
    clrBg();
    ctx_bg.drawImage(img, 0, this.y);
    ctx_bg.drawImage(img, 0, this.y - scr_height);
    if(this.y == scr_height)
    {
        this.y = 0;
    }
    this.y++;
}