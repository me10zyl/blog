---
title: Wireshark 抓取Https（MAC)
date: 2019-05-08 15:56:25
tags: [https, wireshark]
---
1. 设置环境变量 SSLKEYLOGFILE to /Users/zyl/sslkeylog/sslkeylog.log (此方法不顶用）
2. 用参数运行Chrome:
`open -a Google\ Chrome --args --ssl-key-log-file=/Users/zyl/sslkeylog/sslkeylog.log`
<!-- more -->
3. 设置首选项 设置 sslkeylog 位置
![](/images/Wireshark-抓取Https/20190508040417468.png)
4. 成功抓包
```bash
$ ping www.baidu.com
PING www.a.shifen.com (180.97.33.107): 56 data bytes
64 bytes from 180.97.33.107: icmp_seq=0 ttl=54 time=32.693 ms
64 bytes from 180.97.33.107: icmp_seq=1 ttl=54 time=32.372 ms
```
![](/images/Wireshark-抓取Https/20190508040105610.png)