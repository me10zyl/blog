
hexo.extend.helper.register('breadcrum', function(path,title){
     if(title == 'index.html'){ return "" };
     var res = "<a href='/'> 首页 </a> &gt ";
     var config = hexo.theme.config;
     var map = config.breadcrum;
     var t = map[title.split("/")[0]];
     if(!t){ t = title.split("/")[0] };
     res += "<a href='"+path+"'>"+ t + "</a>";
  return res;
});
