/**
 * Created by Administrator on 2014/12/9.
 */
Array.prototype.remove = function(obj)
{
    for(var i =0; i <this.length;i++)
    {
        if(this[i] == obj)
        {
            this.splice(i,1);
            return this;
        }
    }
}
function isColided(obj1,obj2)
{
    var centerX_obj1 = obj1.x + obj1.getCenter().x;
    var centerY_obj1 = obj1.y + obj1.getCenter().y;
    var centerX_obj2 = obj2.x + obj2.getCenter().x;
    var centerY_obj2 = obj2.y + obj2.getCenter().y;
    if(Math.abs(centerX_obj1.x - centerX_obj2.x) <= (obj1.width + obj2.width) / 2 && Math.abs(centerY_obj1.y - centerY_obj2.y) <= (obj1.height + obj2.height) / 2)
    {
        return true;
    }
    return false;
}