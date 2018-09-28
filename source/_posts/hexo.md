---
title: GitHub + Hexo + Travis 博客快速搭建指南
date: 2018-09-28 09:26:16
tags: Hexo
---
1.注册一个Github账号
2.创建一个名为 `<username>.github.io` 的仓库，其中`<username>`为你的Github账号，这个仓库不能随便取名。这个仓库用于存储 Hexo 生成的静态HTML(master分支)。
<!-- more -->
![](/images/hexo/20180928094051867.png)
3.创建一个名为 `blog` 的仓库，这个仓库也能叫其他名称，用于存储 Hexo 博客源文件。
4.安装 Hexo，前提是你已经安装了必备程序Nodejs
    
    npm install -g hexo-cli
    

> 注： 安装 Node.js 的最佳方式是使用 nvm。
    ```
    curl https://raw.github.com/creationix/nvm/v0.33.11/install.sh | sh
    nvm install stable
    ```
    
5.找到一个文件夹 blog/，执行Hexo 博客创建命令
```
hexo init
```
6.在 blog/ 中添加 `gulpfile.js`
```javascript
var exec = require('child_process').exec;
var gulp = require('gulp');
gulp.task('hexo', function(cb){
  exec('hexo clean && hexo g', function(err){
	if(err) return cb(err);
	cb();
  });	
});

gulp.task('default',['hexo']);
```
7.在 blog/ 中添加 `.travis.yml`，按需修改
```yml
language: node_js

env:
  global:
      - GH_PAGES_REPO: me10zyl/me10zyl.github.io

node_js:
  - "node"

before_install:
  - rm -rf node_modules/

install:
  - npm install

before_script:
  - npm install gulp

script:
  - gulp

deploy:
  name: me10zyl
  email: me10zyl@qq.com
  provider: pages
  skip_cleanup: true
  github_token: $GH_TOKEN # Set in travis-ci.org dashboard
  target_branch: master
  local_dir: dist
  fqdn: www.zengyilun.com
  repo: $GH_PAGES_REPO
  on:
    branch: master
```
7.登陆 [travis.org](travis.org)，OAuth你的Github
8.GitHub生成 Travis Access Token
![1](/images/hexo/20180928113319644.png)
 
![2](/images/hexo/20180928113400040.png)
9.在 Travis 仓库配置 $GH_TOKEN 环境变量，拷贝刚才生成的Access Token
![3](/images/hexo/20180928113446154.png)
10.提交代码，等待1分钟，成功访问你的博客： [http://me10zyl.github.io](http://me10zyl.github.io)

