var exec = require('child_process').exec;
var gulp = require('gulp');
gulp.task('hexo', function(cb){
  exec('node_modules/.bin/hexo clean && node_modules/.bin/hexo g', function(err){
	if(err) return cb(err);
	cb();
  });	
});

gulp.task('default',['hexo']);
