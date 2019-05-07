---
title: lsof 命令
date: 2019-05-07 14:57:20
tags: linux
---
在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。所以如传输控制协议 (TCP) 和用户数据报协议 (UDP) 套接字等，系统在后台都为该应用程序分配了一个文件描述符，无论这个文件的本质如何，该文件描述符为应用程序与基础操作系统之间的交互提供了通用接口。lsof(list open files)是一个列出当前系统打开文件的工具。

<!-- more -->
#### lsof 输出意义
lsof [options] filename
列出开启error.log的进程：
```bash
$ sudo  lsof /usr/local/Cellar/nginx/1.15.5/logs/error.log
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
nginx   4536 root    2w   REG   1,11   230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4536 root    4w   REG   1,11   230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4537 root    2w   REG   1,11   230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4537 root    4w   REG   1,11   230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
```
各列信息含义：
+ COMMAND：进程的名称 PID：进程标识符
+ USER：进程所有者
+ FD：文件描述符，应用程序通过文件描述符识别该文件。如cwd、txt等 TYPE：文件类型，如DIR、REG等
+ DEVICE：指定磁盘的名称
+ SIZE：文件的大小
+ NODE：索引节点（文件在磁盘上的标识）
+ NAME：打开文件的确切名称
+ FD 列中的文件描述符

FD: 列中的文件描述符cwd 值表示应用程序的当前工作目录，这是该应用程序启动的目录，除非它本身对这个目录进行更改,txt 类型的文件是程序代码，如应用程序二进制文件本身或共享库，如上列表中显示的 /sbin/init 程序。 

其次数值表示应用程序的文件描述符，这是打开该文件时返回的一个整数。如上的最后一行文件/dev/initctl，其文件描述符为 10。u 表示该文件被打开并处于读取/写入模式，而不是只读 ® 或只写 (w) 模式。同时还有大写 的W 表示该应用程序具有对整个文件的写锁。该文件描述符用于确保每次只能打开一个应用程序实例。初始打开每个应用程序时，都具有三个文件描述符，**从 0 到 2，分别表示标准输入、输出和错误流。**所以大多数应用程序所打开的文件的 FD 都是从 3 开始。

与 FD 列相比，Type 列则比较直观。文件和目录分别称为 REG 和 DIR。而CHR 和 BLK，分别表示字符和块设备；或者 UNIX、FIFO 和 IPv4，分别表示 UNIX 域套接字、先进先出 (FIFO) 队列和网际协议 (IP) 套接字。

#### 查看nginx命令打开的文件：
$ sudo lsof -c nginx
```bash
COMMAND  PID USER   FD     TYPE             DEVICE   SIZE/OFF    NODE NAME
nginx   4536 root  cwd      DIR               1,11        384 2210961 /Users/zyl/Documents/itaojingit/tjk-static/nginx-1.8.0/conf
nginx   4536 root  txt      REG               1,11    1174360 2209488 /usr/local/Cellar/nginx/1.15.5/bin/nginx
nginx   4536 root  txt      REG               1,11     423696 2209051 /usr/local/Cellar/pcre/8.42/lib/libpcre.1.dylib
nginx   4536 root  txt      REG               1,11     381288 7192696 /usr/local/Cellar/openssl/1.0.2q/lib/libssl.1.0.0.dylib
nginx   4536 root  txt      REG               1,11    1871040 7192681 /usr/local/Cellar/openssl/1.0.2q/lib/libcrypto.1.0.0.dylib
nginx   4536 root  txt      REG               1,11     837248  645073 /usr/lib/dyld
nginx   4536 root  txt      REG               1,11 1157259264 4759186 /private/var/db/dyld/dyld_shared_cache_x86_64h
nginx   4536 root    0u     CHR                3,2        0t0     318 /dev/null
nginx   4536 root    1u     CHR                3,2        0t0     318 /dev/null
nginx   4536 root    2w     REG               1,11     230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4536 root    3u    unix 0x55563bb99fd25d3b        0t0         ->0x55563bb99fd2394b
nginx   4536 root    4w     REG               1,11     230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4536 root    5u   systm 0x55563bb99e687ddb        0t0         [ctl com.apple.netsrc id 9 unit 49]
nginx   4536 root    6u    unix 0x55563bb99fd23a13        0t0         ->0x55563bb99fd2556b
nginx   4536 root    7u    unix 0x55563bb99fd2394b        0t0         ->0x55563bb99fd25d3b
nginx   4536 root    8w     REG               1,11     186155 2234614 /usr/local/Cellar/nginx/1.15.5/logs/access.log
nginx   4536 root    9u    IPv4 0x55563bb99e278143        0t0     TCP *:http (LISTEN)
nginx   4537 root  cwd      DIR               1,11        384 2210961 /Users/zyl/Documents/itaojingit/tjk-static/nginx-1.8.0/conf
nginx   4537 root  txt      REG               1,11    1174360 2209488 /usr/local/Cellar/nginx/1.15.5/bin/nginx
nginx   4537 root  txt      REG               1,11     423696 2209051 /usr/local/Cellar/pcre/8.42/lib/libpcre.1.dylib
nginx   4537 root  txt      REG               1,11     381288 7192696 /usr/local/Cellar/openssl/1.0.2q/lib/libssl.1.0.0.dylib
nginx   4537 root  txt      REG               1,11    1871040 7192681 /usr/local/Cellar/openssl/1.0.2q/lib/libcrypto.1.0.0.dylib
nginx   4537 root  txt      REG               1,11     837248  645073 /usr/lib/dyld
nginx   4537 root  txt      REG               1,11 1157259264 4759186 /private/var/db/dyld/dyld_shared_cache_x86_64h
nginx   4537 root    0u     CHR                3,2        0t0     318 /dev/null
nginx   4537 root    1u     CHR                3,2        0t0     318 /dev/null
nginx   4537 root    2w     REG               1,11     230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4537 root    4w     REG               1,11     230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4537 root    5u   systm 0x55563bb99e687ddb        0t0         [ctl com.apple.netsrc id 9 unit 49]
nginx   4537 root    6u    unix 0x55563bb99fd23a13        0t0         ->0x55563bb99fd2556b
nginx   4537 root    7u    unix 0x55563bb99fd2394b        0t0         ->0x55563bb99fd25d3b
nginx   4537 root    8w     REG               1,11     186155 2234614 /usr/local/Cellar/nginx/1.15.5/logs/access.log
nginx   4537 root    9u    IPv4 0x55563bb99e278143        0t0     TCP *:http (LISTEN)
nginx   4537 root   10u  KQUEUE                                       count=0, state=0xa
```

lsof所有参数：
```bash
$ lsof --help
lsof: illegal option character: -
lsof: illegal option character: e
lsof: no process ID specified
lsof 4.89
 latest revision: ftp://lsof.itap.purdue.edu/pub/tools/unix/lsof/
 latest FAQ: ftp://lsof.itap.purdue.edu/pub/tools/unix/lsof/FAQ
 latest man page: ftp://lsof.itap.purdue.edu/pub/tools/unix/lsof/lsof_man
 usage: [-?abhlnNoOPRtUvV] [+|-c c] [+|-d s] [+D D] [+|-f[cgG]]
 [-F [f]] [-g [s]] [-i [i]] [+|-L [l]] [+|-M] [-o [o]] [-p s]
 [+|-r [t]] [-s [p:s]] [-S [t]] [-T [t]] [-u s] [+|-w] [-x [fl]] [--] [names]
Defaults in parentheses; comma-separated set (s) items; dash-separated ranges.
  -?|-h list help          -a AND selections (OR)     -b avoid kernel blocks
  -c c  cmd c ^c /c/[bix]  +c w  COMMAND width (9)    +d s  dir s files
  -d s  select by FD set   +D D  dir D tree *SLOW?*   -i select IPv[46] files
  -l list UID numbers      -n no host names           -N select NFS files
  -o list file offset      -O no overhead *RISKY*     -P no port names
  -R list paRent PID       -s list file size          -t terse listing
  -T disable TCP/TPI info  -U select Unix socket      -v list version info
  -V verbose search        +|-w  Warnings (+)         -- end option scan
  +f|-f  +filesystem or -file names     +|-f[cgG] Ct flaGs
  -F [f] select fields; -F? for help
  +|-L [l] list (+) suppress (-) link counts < l (0 = all; default = 0)
  +|-M   portMap registration (-)       -o o   o 0t offset digits (8)
  -p s   exclude(^)|select PIDs         -S [t] t second stat timeout (15)
  -T fqs TCP/TPI Fl,Q,St (s) info
  -g [s] exclude(^)|select and print process group IDs
  -i i   select by IPv[46] address: [46][proto][@host|addr][:svc_list|port_list]
  +|-r [t[m<fmt>]] repeat every t seconds (15);  + until no files, - forever.
       An optional suffix to t is m<fmt>; m must separate t from <fmt> and
      <fmt> is an strftime(3) format for the marker line.
  -s p:s  exclude(^)|select protocol (p = TCP|UDP) states by name(s).
  -u s   exclude(^)|select login|UID set s
  -x [fl] cross over +d|+D File systems or symbolic Links
  names  select named files or files on named file systems
Anyone can list all files; /dev warnings disabled; kernel ID check disabled.
```

#### 查看端口
lsof -i i   select by IPv[46] address: [46][proto][@host|addr][:svc_list|port_list]
```bash
lsof -i:80
```

#### 查看TCP Listen端口
```bash
sudo lsof -a -i4 -itcp -s TCP:LISTEN -P
sudo lsof -aPi4 -itcp -sTCP:LISTEN
```
-a 并且 （默认不加-a是或)

#### 查看打开的文件夹
```bash
sudo lsof +d /usr/local/Cellar/nginx/1.15.5/logs/
#递归
sudo lsof +D /usr/local/Cellar/nginx/1.15.5/logs/ 
```

#### 查看某个进程打开的文件
```bash
sudo lsof -p 3361
```

#### 根据文件描述范围列出文件信息
```bash
sudo lsof -d 2-3
```

#### 查找nginx 错误日志在哪
```bash
$ sudo lsof -a -d 2 -c nginx
COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
nginx   4536 root    2w   REG   1,11   230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
nginx   4537 root    2w   REG   1,11   230269 2234613 /usr/local/Cellar/nginx/1.15.5/logs/error.log
```
或者
```bash
sudo lsof -d 2 | grep nginx
```





    
