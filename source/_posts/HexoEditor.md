---
title: 快速写日志，HexoEditor
date: 2018-09-29 09:16:08
tags: hexo
---
项目地址：[https://github.com/zhuzhuyule/HexoEditor](https://github.com/zhuzhuyule/HexoEditor) 
Hexo Editor, 专门为写 Hexo日志而生， 改编自MoeEditor，支持 Markdown，Latex 等。
<!-- more -->
![1](https://raw.githubusercontent.com/zhuzhuyule/HexoEditor/master/screenshots/main.png)
# 特点
* HexoEditor 独有功能
  * 实时预览
  * 支持 Hexo Tag/Filter/Renderer 
  * 支持 Hexo `_config.yml`
  * Hexo source 中快速新建POST
  * 快速修改文件名 (在Hexo文件中编辑)  
  * 快速部署 Hexo
  * 快速 Hexo 命令 `hexo d`,`hexo g`,`hexo s`,`hexo clean`
  * 在Markdown中自动添加图片
    * 支持图片拖拽
    * 支持剪切板粘贴 [重点]
  * 支持图片上传 (一步上传)
    * 支持 [SM.MS](https://sm.ms) 
    * 支持 [QiNiu](https://portal.qiniu.com) 
    * 支持 [Tencent](https://console.cloud.tencent.com) 
  * 快速打开 (公共目录，公共URL)
  * 同步滚动
* HexoEditor (继承 [Moeditor](https://github.com/Moeditor/Moeditor))
  * GitHub 风格的 Markdown
  * TeX 数学表达式
  * UML 图
  * 代码高亮
  * 读/写/预览 模式
  * 自定义字体 / 行高 / 大小
  * 自定义主题
  * 代码高亮主题 (powered by [highlight.js](https://highlightjs.org/))
  * 自动重加载
  * 本地化
  * 专注模式

![https://raw.githubusercontent.com/zhuzhuyule/HexoEditor/master/screenshots/menu.png](https://raw.githubusercontent.com/zhuzhuyule/HexoEditor/master/screenshots/menu.png)

缺点：
+ 一键部署不是很好用，没有自定义添加外部程序的功能 
+ 粘贴图片后地址为/pic.png，而不是/images/pic.png
+ 最后有一个一键打开Hexo根目录命令行的功能
+ hexo 命令执行好像还没成功过，已经配了Hexo的_config.yml，无限操作执行中...如图所示：
![1](/images/HexoEditor/20180929093043591.png)
