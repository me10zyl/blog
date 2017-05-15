
hexo.extend.helper.register('breadcrum', function(path,title,is_draft){
     if(title == 'index.html'){ return "" };
     var res = "<a href='/'> 首页 </a> &gt ";
     var config = hexo.theme.config;
     var map = config.breadcrum;
     var t = map[title.split("/")[0]];
     if(!t){ t = title.split("/")[0] };
	 if(is_draft === false){
		res +=  "<a href='/essays'> 随笔 </a> &gt "
	 }
     res += "<a href='"+path+"'>"+ t + "</a>";
  return res;
});
