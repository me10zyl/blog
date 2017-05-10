var pagination = require('hexo-pagination');
var assign = require('object-assign');

hexo.config.essay_generator = assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.essay_generator);


hexo.extend.generator.register('essays', function(locals){
  var config = this.config;
  var posts = locals.posts.filter(function(p){
	  if(p.published){
		  return false;
	  }
	return true;
  }).sort(config.essay_generator.order_by);
  var pn = pagination('essays', posts, {
    perPage: 10,
    layout: ['essays'],
    data: {
	__index: true,
        essays: true
    }
  });

  return pn;
});

