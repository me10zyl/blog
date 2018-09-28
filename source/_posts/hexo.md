---
title: GitHub + Hexo + Travis 博客快速搭建指南
date: 2018-09-28 09:26:16
tags: Hexo
---
1.注册一个Github账号
2.创建一个名为 `<username>.github.io` 的仓库，其中`<username>`为你的Github账号，这个仓库不能随便取名。这个仓库用于存储 Hexo 生成的静态HTML(master分支)。
![](/hexo/20180928094051867.png)
3.创建一个名为 `blog` 的仓库，这个仓库也能叫其他名称，用于存储 Hexo 博客源文件。
4.安装 Hexo，前提是你已经安装了必备程序Nodejs
    
    npm install -g hexo-cli
    

> 注： 安装 Node.js 的最佳方式是使用 nvm。
    ```
    curl https://raw.github.com/creationix/nvm/v0.33.11/install.sh | sh
    nvm install stable
    ```
    
5.执行Hexo 博客创建命令
```
hexo init
```
6.配置 `.travis.yml`


