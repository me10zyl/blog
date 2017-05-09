---
title: Spark 远程调试
tags: spark
date: 2017-05-09 12:00:00
---

使用 java remote debug 功能， 借助intellij idea 远程调试 WordCount 程序。

<!-- more -->

Java 中进行远程调试步骤：
1. 在服务端配置启动参数，激活服务端的远程调试功能。
2. 本地客户端连接调试服务端。
3. 添加断点并且启动本地程序。

配置 Master 远程调试： 配置 Spark java 运行参数。

找到 `SPARK_HOME/conf/spark-env.sh`

```
SPARK_MASTER_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```

修改后， 启动 Spark 集群 `SPARK_HOME/sbin/start-all.sh`

``` bash
$ ps -ef | grep java | grep master
root     21610     1  6 02:58 pts/0    00:00:05 /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.131-2.b11.el7_3.x86_64/jre/bin/java -cp /usr/local/spark-2.1.0-bin-hadoop2.7/conf/:/usr/local/spark-2.1.0-bin-hadoop2.7/jars/* -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -Xmx1g org.apache.spark.deploy.master.Master --host 192.168.2.5 --port 7077 --webui-port 8080
```

可以看到 java 运行参数已经被加上了。

添加 Spark Master 程序断点 `Master.scala`

![](/images/spark/spark-04.png)

点击调试按钮，连接调试服务端

![](/images/spark/spark-02.png)

![](/images/spark/spark-10.png)

启动本地驱动程序，Master 程序已经调试成功了

![](/images/spark/spark-09.png)

![](/images/spark/spark-08.png)

接下来，配置 Worker 远程调试。

同理配置 `SPARK_HOME/conf/spark-env.sh`

```
SPARK_WORKER_OPTS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
```
在 Worker.scala 打上断点

![](/images/spark/spark-11.png)

客户端连接服务端

![](/images/spark/spark-07.png)

![](/images/spark/spark-06.png)

执行本地驱动程序，Worker 程序调试成功

![](/images/spark/spark-09.png)

![](/images/spark/spark-05.png)


附录
---

``` java WordCount.java
public class WordCount {

    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("wordCount")
                .setJars(new String[]{".//target//wordcount.jar"})
                .setMaster("spark://192.168.2.5:7077");
        JavaSparkContext sc = new JavaSparkContext(conf);
        JavaRDD<String> input = sc.textFile("/usr/local/spark-2.1.0-bin-hadoop2.7/README.md");
        JavaRDD<String> words = input.flatMap(new FlatMapFunction<String, String>() {
            public Iterator<String> call(String s) throws Exception {
                return Arrays.asList(s.split(" ")).iterator();
            }
        });
        JavaPairRDD<Object, Object> counts = words.mapToPair(new PairFunction<String, Object, Object>() {
            public Tuple2<Object, Object> call(String s) throws Exception {
                return new Tuple2<Object, Object>(s, 1);
            }
        }).reduceByKey(new Function2<Object, Object, Object>() {
            public Integer call(Object x, Object y) throws Exception {
                return (Integer)x + (Integer)y;
            }
        });
        counts.saveAsTextFile("/tmp/wc");
    }
}

```