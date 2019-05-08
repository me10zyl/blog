---
title: Linux 命令收集
date: 2019-05-08 16:27:12
tags: linux
---
用过的linux命令都在这里。
<!-- more -->

passwd [username] 更改用户密码
pwd 显示当前目录路径 
useradd [username] 添加用户 
ls -a 显示隐藏文件 
touch [filename] 建立一个空文件
cp -r <dir1> <dir2> 递归复制命令
less,more [filename] 分页显示文件内容 上一页Ctrl+PgUp,下一页Ctrl+PgDown(Or Space)
cat 显示文件内容 
grep <string> <filename> 在<filename>文件中查找<string> ，在文本中查询内容
ls | grep <string> 在列出的文件名中查找<string>,|管道 （将结果交予后面的程序处理)
man <command> 查询<command>的手册(使用方法)
find [path] -name Hello.java 查找文件
ls -l > a.txt 结果输入到a.txt（管道定向命令）
ls -l >> a.txt 结果追加到a.txt
chmod 666 改变文件权限为全访问
cat /etc/group,/etc/passwd 查看组，用户
whoami 查看当前组
tar -zxvf ???.tar.gz -C /home/server 解压到指定目录.最简化是tar -xf (extract,file=achive必须要), v是verbose,z是gzip方式
./xxx & 以后台方式执行xxx(不占据控制台输入)
fdisk -l 硬盘参数 hda,IDE硬盘,sda,SATA硬盘,xvda, Xen 虚拟主磁碟
df [path] 查看该路径挂载了哪个硬盘分区 df -h 查看硬盘挂载情况
mount mnt/cdrom 挂载光驱 mount /dev/sda1 /test/ 把sda1硬盘分区挂载到test
umount /boot/ 把boot下面的东西全部卸载掉
env 查看环境变量 (vim /etc/profile编辑环境变量),可以看当前SHELL等
chsh -s /bin/cash 更改shell
ln -s ../test/a.out ./a 在当前目录创建一个a的链接指向../test/a.out
history 5 查询最近使用的5个命令,!5执行历史记录编号为5的命令,!ls执行最近用ls开头的命令(神器)
ifconfig 同windows的ipconfig
ifconfig eth0 192.168.1.2 配置eth0网卡ip地址
ifconfig eth0 network 255.255.255.0 配置子网掩码
crontab -e 编辑任务调度 crontab -r 清除掉任务 contab -l 列出调度的任务
ps aux 列出进程列表
kill [pid] 杀死一进程 kill -9 [pid] 强行杀死一进程.kill -9 bash 把别人踢出去
top 动态监视内存,top -d 10 ，10秒更新一次，u 查看某一user
cal 8 2014 查看2014，8月日历
netstat -an 同windows netstat查看端口占用
unzip xxx.zip 解压某zip文件，太方便了
scp /x/java/workSpace/lalalaServer.zip user@121.145.161.85:/root/zyl/server远程传递文件
& 或 ctrl + Z 指令后台工作,fg恢复到前台(神器)
jobs 查询后台程序
free 展示内存使用情况
uptime 查询开机多久了，多少用户(top,netstat也可看)
bin/mysqld_safe --user=root& 启动mysql的时候注意要加user不然它又要报error:13错误(权限问题)
vim /etc/profile 修改环境变量要logout重登才能生效(巨坑)
netstat -an | grep 3306 查看mysql是否在工作,同ps aux | grep mysql(很乱)
ps aux --sort=%mem 以内存排序列出进程
pgrep -l mysql 列出mysql的程序名与进程id
find / -regex .*mysql 查找mysql，用正则表达式
apt-cache update 更新源(软件库)
apt-cache search xxx 查找xxx软件
apt-get install xxx 安装某软件
apt-get remove 删除某软件
wget <url> 通过url下载软件
grep -n "12" ./zyl/zyl.java /home/* 在/zyl/zyl.java，/home中查找含12的文本文件，显示行数
find /home -amin -10 十分钟之内读过的文件或目录(access)
find /home -atime -10 十小时之内读过的文件或目录
find /home -cmin -10 十小时之内写过的文件或目录
find /home -ctime +10 十小时之前写过的文件或目录
find /home -size +10k 查找大于10k的文件
dpkg -i xxx.deb 安装deb(i 是install)
dpkg -r xxx 卸载这个软件,但不删除配置文件
dpkg -P xxx 彻底清除这个软件，配置文件一起删
dpkg -c xxx.deb 看以下这个deb里面有啥
dpkg -s vsftpd 看一下安装了这个vsftpd没
bc 计算器
mount /dev/sda5 /mnt/diskd5 把D盘挂载到diskd5 (扩展分区=逻辑分区相加,主分区只能有一个，扩展分区+主分区必须<=3)
su - steam 换成steam用户
cat /etc/issue 查看linux版本
Ctrl+Z将某进程终止
bg %n 把某进程扔进背景运行(由Stop变为Running)相当于&
blkid /dev/sda5 查看/dev/sda5的UUID
alias mv='mv -i' 重命名
which mv 查看mv全路径
who 查看登陆的用户
echo 查看文字 比如 echo "hahah"    显示 hahah           将文字写进文件echo "hahah" >> haha.txt
du -sh * 查看文件夹大小
rsync -rv --delete * root@zyl.com:/root/.ssh/xxx 同步本文件夹*
update-rc.d 更新rc012345
ssh -t git@github.com 验证私钥
sudo add-apt-repository ppa:fcitx-team/nightly 添加源
sudo apt-get update  更新源
sudo dpkg --get-selections  查看安装的包
dpkg -L gcc 查看GCC的路径
netstat -ntlp
vipw 等于 vi /etc/passwd
ntpdate cn.pool.ntp.org
tcpdump -i eth1 -n -S -s 0 -A 'tcp dst port 80' | grep -A 60 '/oss/callback'
/usr/local/redis/bin/redis-cli -p 6379 -a TJKpassword monitor > 1135.log
awk '/GET/{a[$3]++}END{for(i in a)print i"\t"a[i]}' 1135.log |sort -k2nr|more
awk '/GET|SET/{a[$4" "$5]++}END{for(i in a)print i"\t"a[i]}' 1135.log |sort -k3nr|more
awk '/GET|SET/{a[$4" "$5]++;b[$4" "$5]+=length($6)}END{for(i in a)print i"\t"a[i]"\t"b[i]}' 1135.log |sort -k4nr|less
ps -eo pid,lstart,etime,cmd | grep tj-im-ser 查看程序启动时间
./bin/mysqlbinlog --start-datetime="2018-08-06 00:00:00" master-bin.00026[2-8] --base64-output="decode-rows" --database=tj_v3_dev -v | grep tj_tjk_customer_IMweb_config -C 50 > /usr/tomcat/tj-im-service/webconfig-binlog180806-5

/usr/local/mysql/bin/mysqlbinlog /usr/local/mysql/data/master-bin.000296

/usr/local/mysql/bin/mysqlbinlog --start-datetime="2019-01-18 00:00:00" binlog.000201 --base64-output="decode-rows" --database=tjk_db_v2 -v
