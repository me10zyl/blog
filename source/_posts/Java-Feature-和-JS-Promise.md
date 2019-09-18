---
title: Java Feature 和 JS Promise
date: 2019-09-18 13:47:34
tags: [java,javascript]
---
Java Feature 和 JS Promise之间的关系，`CompletableFuture`相当于JS中的Promise，而`Futrue`中的get方法相当于JS中Promise的await关键字。
<!--more-->

```java
  final CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "1";
        });

        final ExecutorService executorService = Executors.newCachedThreadPool();
        final Future<String> feture = executorService.submit(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "1";
        });
        future1.thenAccept(System.out::println);

        System.out.println(feture.get());

        future1.join();
        executorService.shutdown();
```

```javascript
 new Promise((rs, rj) => {
        setTimeout(()=>rs(1), 1000)
    }).then(function(res){
        console.log(res)
    })

    async function doWork() {
        console.log(await new Promise((rs, rj) => setTimeout(()=>rs(1), 1000)))
    }

    doWork()
```
