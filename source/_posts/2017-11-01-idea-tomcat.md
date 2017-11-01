---
title: Intelij Idea 使用 Tomcat 运行/调试 Web 应用 （超详细）
date: 2017-11-01 15:08:08
tags:
- intellij idea
- java
categories:
- intellij idea
---

工欲善其事必先利其器，本文拟用 Intellij Idea 来启动 Tomcat 运行/调试 Web 应用，深入 Idea 与 Tomcat 结合调试，减少项目部署时间。

<!-- more -->

## 简单使用

1. Run Configuration -> 新建 Tomcat Run Configuration

![image](/images/idea/1.png)

2. 选择当更新操作(Ctrl + F10)或者 Intellij Idea 失去焦点的时候更新Tomcat 中的 classes和资源（热交换）
![image](/images/idea/2.png)

3. 选择部署的artifact，这里选 war exploded, 为什么不选 war, 因为war是war exploded 打包后的， war exploded 不打包，而且 war 不支持 静态资源的热部署
![image](/images/idea/3.png)


2. Run/Debug 

![image](/images/idea/4.png)

## 高级应用

设置 Tomcat 配置的时候可以看到， On Update action 和 On frame deactivation， 这个是指什么，接下来会介绍。

### On 'Update' action 

顾名思义，更新操作，是指 'Update application'， 快捷键为 Ctrl + F10 ，或者点击运行/调试 View左下角，与 Build Project/Module(Ctrl + F9) 不是同一个概念

![image](/images/idea/5.png)

对于 exploded artifacts ， 可选的选项为

+ Update Resources. 所有改变的资源都更新（CSS、HTML、JS等）
+ Update classes and resources. 所有改变的资源和改变的Java 类都重新编译更新  

> 在 Debug 模式下, 更新的类可以热交换(hot swapped). 在 Run 模式下, IntelliJ IDEA 只更新输出文件夹中的改变的类. 这个类实际上到底重载没有，取决于运行环境的兼容性。

+ Redeploy. 应用 artifact 重新构建和重新部署
+ Restart Server. 服务器重启，应用 artifact 重新构建和重新部署

对于 packed artifacts （不带exploded的)，可选的选项为

+ Hot swap classes. 改变的类重新编译和在运行时重加载. 只在 **debug** 模式下有用
+ Redeploy. 应用 artifact 重新构建和重新部署
+ Restart Server. 服务器重启，应用 artifact 重新构建和重新部署

## On frame deactivation

这个名词的意思即 从Intellij idea 切换到其他程序，触发的操作。除了
Do nothing 选项，其他选项都跟 'On Update action'一致。

## Deploy applications configured in Tomcat instance

勾选上这个选项，这样就会部署 tomcat 中的其他应用， 比如

+ docs
+ examples
+ host-manager
+ manager
+ ROOT