---
title: java.util.concurrent - Java并发工具集
date: 2019-09-03 10:07:39
tags: [java,concurrency]
---
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

    #### BlockingQueue的方法
一个`BlockingQueue`，对于插入，移除和检验元素是否在队列中，都有4个不同的行为。如果请求的操作不能立即执行，每个行为表现也不同。这是一个方法表：

|	|Throws Exception|	Special Value|	Blocks|	Times Out|
|---| ---|---|---|
|Insert|add(o)|offer(o)|put(o)|offer(o, timeout,timeunit)|
|Remove	|remove(o)|	poll()	|take()|	poll(timeout,timeunit)|
|Examine|	element()	|peek()	 	 | | |
4个不同行为的意思是：

1. **Throw Exceptions**:
    如果请求的操作不能立即执行，一个异常抛出
2. **Special Value**：
    如果请求的操作不能立即执行，一个特殊的值被返回（通常是 true/false)
3. **Blocks**:
    如果请求的操作不能立即执行，一个方法会被阻塞。
4. **Times Out**：
    如果请求的操作不能立即执行，一个方法会被阻塞，但是等到给出的超时时间就不再等待。返回了一个特殊的值表明是成功还是失败（经常是true/false)

在`BlockingQueue`中不能插入null。如果你插入null，`BlockingQueue`会抛出 `NullPointerException`。

### BlockingQueue的实现
因为`BlockingQueue`是一个接口，你至少使用其中一个实现来使用它。`BlockQueue`在`java.util.concrrent`包中有以下实现（Java 6）：
    
+ ArrayBlockingQueue
+ DelayQueue
+ LinkedBlockingQueue
+ PriorityBlockingQueue
+ SynchronousQueue

### Java BlockingQueue的例子
这是一个Java`BlockingQueue`例子。这个例子使用了`BlockingQueue`的实现 - `ArrayBlockingQueue`。

第一步，`BlockingQueueExample`类在分别的线程中开启了一个`Producer`和一个`Consumer`。`Producer`在共享的`BlockingQueue`中插入一些字符串，`Consumer`从中拿出。

```java
public class BlockingQueueExample {

    public static void main(String[] args) throws Exception {

        BlockingQueue queue = new ArrayBlockingQueue(1024);

        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);

        new Thread(producer).start();
        new Thread(consumer).start();

        Thread.sleep(4000);
    }
}
```

这是一个`Producer`类。注意它在每次调用`put()`时睡眠了一秒钟。这会导致`Consumer`阻塞，一直等待队列中有东西。

```java
public class Producer implements Runnable{

    protected BlockingQueue queue = null;

    public Producer(BlockingQueue queue) {
        this.queue = queue;
    }

    public void run() {
        try {
            queue.put("1");
            Thread.sleep(1000);
            queue.put("2");
            Thread.sleep(1000);
            queue.put("3");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

这是一个`Consumer`类，他会从队列中拿取东西，然后打印到`System.out`。

```java
public class Consumer implements Runnable{

    protected BlockingQueue queue = null;

    public Consumer(BlockingQueue queue) {
        this.queue = queue;
    }

    public void run() {
        try {
            System.out.println(queue.take());
            System.out.println(queue.take());
            System.out.println(queue.take());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
# ArrayBlockingQueue

`ArrayBlockingQueue`类实现了`BlockingQueue`接口。阅读`BlockingQueue`教程获取这个接口的更多信息。

`ArrayBlockingQueue`是一个有边界，内部存储形式为一个数组的阻塞队列。有边界意思是不能存储无限量的元素。在同一实际存储元素有上界。你可以在实例化的时候设置这个上界，之后就不能改变了。

`ArrayBlockingQueue`内部存储元素为FIFO（先进先出）顺序。队列的头部元素是最先插入的元素，队列的尾部是最后插入的元素。

这里展示了如何实例化和使用`ArrayBlockingQueue`:

```java
BlockingQueue queue = new ArrayBlockingQueue(1024);

queue.put("1");

Object object = queue.take();
```

`BlockingQueue`例子使用了Java泛型。

```java
BlockingQueue<String> queue = new ArrayBlockingQueue<String>(1024);

queue.put("1");

String string = queue.take();
```

# DelayQueue

`DelayQueue`类实现了`BlockingQueue`接口。阅读`BlockingQueue`获取这个接口的更多信息。

`DelayQueue`在内部阻塞元素直到一个特定的延时过期。元素必须实现`java.util.concurrent.Delayed`接口。这是接口的样子：

```java
public interface Delayed extends Comparable<Delayed> {

 public long getDelay(TimeUnit timeUnit);

}
```

`getDelay()`方法返回值在被释放之前应该会被延迟保留，如果返回0或负数，延迟就已过期了，元素会在下一次在`DelayQueue`调用`take()` etc. 被释放。