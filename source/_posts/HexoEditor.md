---
title: 快速写日志，Hexo的专用编辑器 - HexoEditor
date: 2018-09-29 09:16:08
tags: hexo
---
项目地址：[https://github.com/zhuzhuyule/HexoEditor](https://github.com/zhuzhuyule/HexoEditor) 
Hexo Editor, 专门为写 Hexo日志而生， 改编自MoeEditor，支持 Markdown，Latex 等。
<!-- more -->
下载地址：
Windows x64: [https://github.com/zhuzhuyule/HexoEditor/releases/download/v1.5.30/HexoEditor_1.5.30_win_x64.exe](https://github.com/zhuzhuyule/HexoEditor/releases/download/v1.5.30/HexoEditor_1.5.30_win_x64.exe)
Mac x64:[https://github.com/zhuzhuyule/HexoEditor/releases/download/v1.5.30/HexoEditor_1.5.30_mac_x64.dmg](https://github.com/zhuzhuyule/HexoEditor/releases/download/v1.5.30/HexoEditor_1.5.30_mac_x64.dmg)
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

Electron 构建，理论上是跨平台的，Windows Mac都能使用。
![https://raw.githubusercontent.com/zhuzhuyule/HexoEditor/master/screenshots/menu.png](https://raw.githubusercontent.com/zhuzhuyule/HexoEditor/master/screenshots/menu.png)

缺点：
+ 一键部署不是很好用，没有自定义添加外部程序的功能 
+ 粘贴图片后地址为/pic.png，而不是/images/pic.png
+ 最好有一个一键打开Hexo根目录命令行的功能
+ hexo 命令执行好像还没成功过，已经配了Hexo的_config.yml，无限操作执行中...如图所示：
![1](/images/HexoEditor/20180929093043591.png)

使用此编辑器后写博客的步骤简化为：
1. 打开 Alfred, 输入 hexo 打开 HexoEditor
![1](/images/HexoEditor/20180929093606497.png)
2. 新建 Post，在_post文件夹自动生成文件，并含有date，修改title, tag，文件名同步 title 修改。
![2](/images/HexoEditor/20180929093729763.png)
![3](/images/HexoEditor/20180929093910225.png)
3. 写博客途中有图片直接截图点粘贴，自动生成图片和路径，把路径前缀加上/images
如 `![](/HexoEditor/20180929094201824.png)`，其中HexoEditor为标题名称，需要手动修改为`![](/images/HexoEditor/20180929094201824.png)`
3. 保存，打开终端，提交代码

