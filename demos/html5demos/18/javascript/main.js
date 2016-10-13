/**
 * Created by Administrator on 2014/12/2.
 */
function main() {
    $(document).keydown(function (e) {
        switch (e.which) {
            case keyCode.up:
                keyStatus.up = true;
                break;
            case keyCode.down:
                keyStatus.down = true;
                break;
            case keyCode.left:
                keyStatus.left = true;
                break;
            case keyCode.right:
                keyStatus.right = true;
                break;
        }
    });
    $(document).keyup(function (e) {
        switch (e.which) {
            case keyCode.up:
                keyStatus.up = false;
                break;
            case keyCode.down:
                keyStatus.down = false;
                break;
            case keyCode.left:
                keyStatus.left = false;
                break;
            case keyCode.right:
                keyStatus.right = false;
                break;
        }
    });
    var director = new Director(ctx_bg);
    director.background = new Background(ctx_bg);
    director.backAudio = $("#backMusic")[0];
    //director.player.x = $('bg').width / 2 - images.Player.width / 2;
    director.play();
}

