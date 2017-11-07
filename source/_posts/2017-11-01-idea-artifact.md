---
title: Intellij Idea - 理解 artifact 并与之工作
date: 2017-11-1 15:41:43 
tags:
- openvpn
- linux
categories:
- linux
---

Artifact - Intellij Idea 与软件工程中一个重要的概念，本文详细解释了Artifact在Intellij Idea 的存在形式与应用。

<!-- more -->

## 什么是 artifact?

Artifact 是你项目中的资源集合，用于测试、部署、发布你的软件解决方案。（例如一堆编译好的 Java 类 或者 一个打包的Java程序， 一个文件夹结构的网页应用 或者 一个打包的网页应用，等等）。  

文件夹结构的 Artifact 或者 打包的结构包括以下组件：
+ 一个或多个module的编译输出
+ module 依赖库 中包含的 库
+ 资源集合 （网页、图片、描述文件等）
+ 其他 Artifact
+ 个别文件，目录和压缩包


## 配置 artifact

通过 `File | Project Structure | Artifacts` 配置Artifact 来指定其结构和内容

## 构建 artifacts

1. 通过 ` Build | Build Artifacts` 构建
2. 通过 ` Run | Debug` 中的 Before  Lauch ，添加 `Build <ArtifactName> artifact` 任务， artifact 会在程序运行或者调试的时候 构建
3. artifact 构建默认输出目录为`out/artifacts/<artifact_dir>`，但是如果有Maven 的话输入为 `target/<artifact_dir>`

## 构建选项

构建一个Artifact (Build | Build Artifacts)，有如下的选项：
+ **Build.** 第一次使用，整个 artifact 都构建。下次使用， 只有一部分的改变会被构建 因为 最后的构建已经添加到 输出目录了。
+ **Rebuild.** 整个 artifact 都构建。实际上，先使用了`clean`再使用`build`
+ **Clean.** 删除输出目录的所有artifact
+ **Edit.** 编辑 artifact configuration

## 运行 Jar Artifact

 通过 JAR Application run configurations 运行。
 1.  打开 Run/Debug Configurations?对话框 (e.g. Run | Edit Configurations).
 2. 点 + 并选择 JAR Application.

## 部署 artifacts 到application servers 和 cloud platforms

有很多 artifact 格式 （比如 WAR，Exploded WAR, EAR, Exploded EAR) 都适合部署到程序服务器和云服务器，下面是部署步骤：
1. 在服务器 或者 远程服务器 run/debug configuration，指定 artifact 来部署。
2. 运行 run/debug configuration 或者 在 **Application Servers**, **Run** or **Debug** tool window 上使用 **Deploy** 图标。

## artifact 与 exploded artifact 的区别

artifact 是 exploded artifact 打包后的产品， 而 exploded artifact 是文件夹结构的，除了这个区别，在Tomcat 部署这两种 artifact 的时候，调试的时候也有一定区别。详见 [Intelij Idea 使用 Tomcat 运行/调试 Web 应用 （超详细）](/idea-tomcat)
