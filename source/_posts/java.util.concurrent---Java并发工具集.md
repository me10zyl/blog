---
title: java.util.concurrent - Java并发工具集
date: 2019-09-03 10:07:39
tags: [java,concurrency]
---

# java.util.concurrent - Java并发工具集

   Java 5 添加了一个新的Java包， `java.util.concurrent` 包。这个包有一系列的类使开发并发（多线程）程序更简单。在这个包添加之前，你只能自己编写工具类。
    
<!--more-->
    
    在这个教程中我会带你浏览一遍 `java.util.concurrent` 类，一个一个的介绍，所以你可以学习怎样使用他们。我会使用Java 6的版本。我不确定对于Java 5有什么不同。
    我不会解释Java并发核心问题 - 也就是背后的理论。如果你感兴趣，看看我另一个教程 - `Java Concurrency tutorial`。

# BlockingQueue

>+ BlockingQueue的使用
+ BlockingQueue的实现
+ Java BlockingQueue的例子
  
 `java.util.concurrency` 包中的Java `BlockingQueue`代表了一个线程安全队列，用于放入和拿出。接下来会演示如何使用 `BlockingQueue`。
 这个教程不会讨论如何自己实现`BlockQueue`。如果你感兴趣，我有一个`Blocking Queues`的理论教程`Java Concurrency Tutorial`。
 
 ### BlockQueue的使用
 一个`BlockingQueue`典型的用法是一个线程去生产objects，另一个线程去消费。这里有一个图阐述了这个理论：
 ![](/images/java.util.concurrent---Java并发工具集/20190903102554619.png)
    **一个线程放入BlockingQueue，另一个线程拿出**
    
这个生产线程会持续的产生新的objects并插入队列中，直到队列到达上界。这个限制，换句话说。如果这个`blocking queue`到达了他的上界，这个生产线程在插入新的object时就会被阻塞。它会一直被阻塞直到消费线程从这个队列中拿走object。

#### 阻塞队列方法
一个`BlockingQueue`有4套不同的方法，包括插入，移除和检验元素是否在队列中。每套方法或多或少的有阻塞方法。这是一个方法表：

|	|Throws Exception|	Special Value|	Blocks|	Times Out|
|---| ---|---|---|
|Insert|add(o)|offer(o)|put(o)|offer(o, timeout,timeunit)|
|Remove	|remove(o)|	poll()	|take()|	poll(timeout,timeunit)|
|Examine|	element()	|peek()	 	 | | |



