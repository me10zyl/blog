---
layout: post
title: MySQL ���ݿⱸ��
---

# MySQL ���ݿⱸ��

## �ȱ����䱸
���ݿ�ı�����ָ���һ�����������ȴ���򵥵Ĺ��������ݲ�ͬ���������ֱ��ݵķ��������ֳ�����������ֱ��ݣ��ȱ����䱸���䱸��ָ�����ݿ�ֹͣ������£�һ��ֻ��Ҫ����������ݿ��ļ������ȱ��������ݿ����е�ʱ��ֱ�ӱ��ݣ����������е����ݿ�û���κ�Ӱ�졣 

����ͨ�����ֱ�������֤���ݵİ�ȫ�����Ʊ�������ձ��ݡ����Ʊ����������ݿ�ʵʱ���ݣ���������Ա�������ݿ���������ʱ������Ҳ��Ӧ�õ������ݿ⣬������Ҫ�Դ����ݿ���п���(snapshot)����ֹ�����ݿ����ݶ�ʧ��

## 1. ���Ʊ���
ͬ�������ϵ�����ݿ�һ������־�ļ���MySQL���ݿ����Ҫ��ɲ��֡�MySQL�м��ֲ�ͬ����־�ļ���ͨ������������־�ļ�����������־��ͨ����־������ѯ��־���ȵȡ���Щ��־���԰������Ƕ�λmysqld�ڲ��������¼������ݿ����ܹ��ϣ���¼���ݵı����ʷ���û��ָ����ݿ�ȵȡ�  

���ж�������־������MySQL���ݿ�ı��ݣ�ͨ��һ����ȫ���ݽ��ж�������־��������������ݿ��point-in-time�Ļָ�������MySQL���ݿ⸴��(replication)��ԭ������첽ʵʱ�ؽ���������־�������Ͳ�Ӧ�õ������ݿ⡣

MySQL ������MySQL���ݿ��ṩ��һ�ָ߿��ø����ܵĽ�����������Ƶ�ԭ�����ѣ���ʵ����һ����ȫ���ݼ��϶�������־���ݵĻ�ԭ��
## 2. ���ձ���
`Logical Volume Manager (LVM)`�ṩ�˶�����һ��`Logical Volume(LV)`�������ա�(snapshot)�Ĺ��ܣ��Դ������һ��������״̬һ���Ա��ݡ�
��ĳһ��״̬�������ݵ�ʱ�򣬿�����Ӧ�����ڷ���ĳһ���ļ��������ݿ⣬�����ʹ�ñ��ݵ�ʱ���ļ�����һ��״̬������������ļ�ȴ��������һ��״̬���Ӷ���ɱ��ݵķ�һ���ԣ�����״̬�ָ����ݿ����ݼ�������ɹ���

״̬�Ľ���취�ǽ����������Ϊֻ����Ȼ��ͨ�����ݿ�ı�������(table-level write locks)����ֹͣ���ݿ����������ݡ�������Щ������������Ӱ���˷���Ŀ����ԡ�ʹ��LVM snapshot�ȿ��Ի��һ���Ա��ݣ��ֲ���Ӱ��������Ŀ����ԡ�
## 3. ��ʼ����
#### 1.׼������
����̨������`192.168.2.5`��`192.168.2.230`����ͬһ��������Ϊ�˿��ٲ����Ҳ�Ӱ�����ϵͳ����ʹ��`docker`��Ϊ����`mysql`��������  
��`docker hub`��ȡ�����Լ�����һ�����������Ѿ���`192.168.2.5`��������һ�����񣬲��Ѿ�push����`192.168.2.230`��

��ʼ��`192.168.2.5` **����MySQL**:

    docker run -d -h mysql-server --restart=always --name=mysql_server -p 3306:3306 -v /mnt1/data/mysql:/mnt/data/mysql-online 192.168.2.230:5000/sunyuki/mysqllinux:latest
    
����������һ��`docker`���������ҽ�`docker`�е�`mysql`���ݿ��ļ�`mnt/data/mysql-online`���ص��˱��ش���`/mnt1/data/mysql`��
    
ͬ���ģ���`192.168.2.230`ִ����ͬ�������������̨���������е�`mysql`��һ���ģ���������������������`mysql_server`��
    

    
#### 2.�������ݿ��������־
��Ϊ���Ƶ�ԭ����������������־��������ҪΪ��̨���������ö�������־��

��̨������������`docker`���������ӵ�`192.168.2.5`����`mysql_server`�������������ļ�:

    docker exec -it mysql_server /bin/bash


�����ݿ������ļ�������(ͨ��Ϊ`/etc/my.cnf`):
    
    [mysqld]
    log-bin = mysql-bin
    sync_binlog = 1
    innodb_support_xa = 1
    
���ӵ�`192.168.2.230`��ͬ���Ĳ�����
    
������̨�����������˶�������־��
#### 2.�������ݿ� server-id
���㽫`192.168.230`��Ϊ**�ӷ�����**��`192.168.2.5`��Ϊ**��������**����Ҫ����̨���������ݿ�`server-id`���ĵĲ�һ����  

��`192.168.2.230`:  
����docker����:

    docker exec -it mysql_server /bin/bash
    
�������ݿ������ļ�:
    
    [mysqld]
    server-id = 2
    
����������`192.168.2.230`�е� `auto.cnf`:

    mv auto.cnf auto.cnf.bak
    
����������ļ���ԭ��������ļ���������̨��������`uuid`����Ϊ��̨��������`docker`������һ���ģ�����Ҫ��`mysql`��������`uuid`��

`auto.cnf`�е�����һ��:

    [auto]
    server-uuid=9f31bddf-d965-11e6-9c77-0242ac110003

����`mysql`
    
    service mysql restart

��`192.168.2.5`:  
����docker����:

    docker exec -it mysql_server /bin/bash
    
�������ݿ������ļ�:
    
    [mysqld]
    server-id = 1

����`mysql`

    service mysql restart
    
#### 3.�����������ݿ�
��`192.168.2.5`:  
����`192.168.2.5`��`docker`����:  
�������û����ڸ��ƹ���:
    
    mysql> CREATE USER 'repl'@'192.168.2.230' IDENTIFIED BY 'repl';
    mysql> GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.2.230';
    
����뿴һ�½�������Բ鿴`mysql`�û�

    mysql> select user,host from mysql.user;

���Ȳ�ѯ�����ݿ���־�ļ�λ��:  

    mysql> show master status
    
    | file             | position |
    | mysql-bin.000017 | 120      |
    
��ȡ��������Ҫ����Ϣ����������־�ļ�����ִ��λ��  


��`192.168.2.230`:  
����`192.168.2.230`��`docker`����:  
���ôӷ�����:

    mysql> CHANGE MASTER TO
    MASTER_HOST ='192.168.2.5',
    MASTER_USER ='repl',
    MASTER_PASSWORD ='repl',
    MASTER_LOG_FILE ='mysql-bin.000017',
    MASTER_LOG_POS =120;

����`MASTER_LOG_FILE`��`MASTER_LOG_POS`Ҫ�������ݿ��е�`show master status`�Ľ��һ�¡�

���������ݿ�:
    
    mysql> start slave;
    
�鿴�Ƿ����óɹ�:

    mysql> show slave status;
    
    | Slave_IO_Running | Slave_SQL_Running | Last_IO_Error | Last_SQL_Error|
    | yes              | yes               |               |               |
    
���`Slave_SQL_Running`��`Slave_IO_Running`����һ������`yes`����û�����óɹ���������������`Last_IO_Error`��`Last_SQL_Error`�в鿴��

�������ԭ������дһ���ű��û�ʵʱ��ȥ����������ݿ��ǲ��ǳ�����������˾ͷ��ʼ��������ߣ�����ʹ�õ���`python`д�Ľű���
    
��װ`mysql-connector for python`:

    wget https://dev.mysql.com/get/Downloads/Connector-Python/mysql-connector-python-2.1.5-1.el6.x86_64.rpm
    rpm -i mysql-connector-python-2.1.5-1.el6.x86_64.rpm
    
����connector��ʼд`python`�ű�:
```
#!/usr/bin/python
import mysql.connector
import logging
import time
import smtplib
from email.mime.text import MIMEText

# mysql
HOST = '127.0.0.1'
USER = 'xxx'
PASSWORD = 'xxxx'
LOG_FILE = '/var/log/mysqlchk.log'
TIME_GAP = 120  # interval time gap (unit seconds)

# smtp
mailto_list = ["me@qq.com"]
mail_host = "smtp.domain.com"
mail_user = "xxx"
mail_pass = "xxx"
mail_postfix = "domain.com"
mail_nick_name = 'MySQL CHK'
mail_subject = '[ERROR] MySQL Replication Error'

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
# create a file handler
handler = logging.FileHandler(LOG_FILE)
handler.setLevel(logging.INFO)
# create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
# add the handlers to the logger
logger.addHandler(handler)

logger.info('program start')
cnx = mysql.connector.connect(user=USER, password=PASSWORD, host=HOST)


def send_mail(to_list, sub, content):
    me = mail_nick_name + "<" + mail_user + "@" + mail_postfix + ">"
    msg = MIMEText(content, _subtype='plain', _charset='gb2312')
    msg['Subject'] = sub
    msg['From'] = me
    msg['To'] = ";".join(to_list)
    try:
        server = smtplib.SMTP()
        server.connect(mail_host)
        server.login(mail_user, mail_pass)
        server.sendmail(me, to_list, msg.as_string())
        server.close()
        return True
    except Exception, e:
        print str(e)
        return False


try:
    def check():
        logger.info('start check slave status..')
        cur = cnx.cursor()
        query = ("show slave status")
        cur.execute(query)
        res = cur.fetchone()
        (slave_io_running, slave_sql_running, last_io_error) = (res[10], res[11], res[35])
        if slave_io_running != 'yes' and slave_sql_running != 'yes':
            error = '[ERROR]Slave Error:{0}'.format(last_io_error);
            logger.error(error)
            send_mail(mailto_list, mail_subject, error)
        cur.close()


    while True:
        check()
        time.sleep(TIME_GAP)
except Exception, e:
    logger.error(str(e))
    send_mail(mailto_list, mail_subject, str(e))
finally:
    cnx.close
    logger.info('program terminate')
```
����ű����ô�����ÿ������ȥ������ӷ����������Ƿ�������������������ᷢ�ʹ�����Ϣ������Ա��  
�������������ݿ����þ�����ˣ�����ͨ������`192.168.2.5`��ִ�����ݿⴴ��������Ȼ���ٵ�`192.168.2.230`���µ����ݿ��Ƿ񴴽�������`mysql`�ĸ���(replication)���ܡ�
#### 4.�Զ���������
��һ����ʼ��**�����ݿ�**���ڷ�����`192.168.2.230`�����ݿ��ļ����п��յĲ�������ʵ��һ��֮ǰ����`mysql`�����ݿ��ļ�·��`/mnt1/data/mysql`���ص���һ��ר�õ�LVM�߼���  
��`192.168.2.230`ִ�У�������`docker`):  
�鿴����:
```
root@syk230# fdisk -l
    Device     Boot   Start        End    Sectors  Size Id Type
/dev/sda1  *       2048     999423     997376  487M 83 Linux
/dev/sda2       1001470 3907028991 3906027522  1.8T  5 Extended
/dev/sda5       1001472 3907028991 3906027520  1.8T 8e Linux LVM
```
�鿴����:
```
root@syk230# vgdisplay
      --- Volume group ---
  VG Name               syk230-vg
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  52
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                4
  Open LV               3
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               1.82 TiB
  PE Size               4.00 MiB
  Total PE              476809
  Alloc PE / Size       11076 / 43.27 GiB
  Free  PE / Size       465733 / 1.78 TiB
  VG UUID               brRcUd-vF1G-rWjH-EJW5-jiWG-fsrN-j2RtlN
```
    
��`syk230-vg`�����ϴ���һ����Ϊ`mysql`���߼�����СΪ3G:

    lvcreate -L 3G -n mysql syk230-vg
    
�鿴�߼���:
```
root@syk230# lvdisplay
  --- Logical volume ---
  LV Path                /dev/syk230-vg/mysql
  LV Name                mysql
  VG Name                syk230-vg
  LV UUID                09gVIy-r0vY-rGrX-G6sf-EDm4-483o-ZDaO66
  LV Write Access        read/write
  LV Creation host, time syk230, 2017-01-12 12:16:22 +0800
  LV snapshot status     source of
                         mysqlsnap [active]
  LV Status              available
  # open                 1
  LV Size                3.00 GiB
  Current LE             768
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     256
  Block device           252:2
```
��ʽ������(ext4):

    mkfs.ext4 /dev/syk230-vg/mysql
    
���ط���:

    vim /etc/fstab

�������:
    
    /dev/mapper/syk230--vg-mysql /mnt1/data/mysql ext4 defaults 0 2
    
���ˣ�Ϊ�洢mysql�����߼��������ˡ�  
**��д�Զ��������ݵĽű�**:
```
#!/bin/bash
tmppath=/mnt1/data/mysqlbak1
bakpath=/mnt1/data/mysqlbak
filename=`date +%Y%m%d.tar.gz`

mysql -h 172.17.0.3 -u xxx --password=xxx -e "flush tables with read lock"
lvcreate -s -n mysqlsnap1 -L 5G /dev/syk230-vg/mysql
mysql -h 172.17.0.3 -u xxx --password=xxx -e "unlock tables"
if [ ! -d "$tmppath" ]; then
        mkdir $tmppath
fi
if [ ! -d "$bakpath" ]; then
        mkdir $bakpath
fi
mount /dev/syk230-vg/mysqlsnap1 $tmppath
tar -cf "$bakpath/$filename" $tmppath
umount $tmppath
rmdir $tmppath
lvremove -f /dev/syk230-vg/mysqlsnap1
```
����`172.17.0.3`��`docker`��`mysql_server`������������ip������ͨ��

    docker network inspect bridge
    
��ѯ��  
��ִ�нű��ƻ���ӵ�`crontab`��:

    crontab -e

�������
    
    0 0 * * * /bin/bash /mnt1/data/mysqlbak.sh
    
����ÿ���賿����һ�����ݿ⣬���Ҳ���Ҫֹͣ���ݿ⡣

**ɾ��30��֮ǰ�ı���**  

    find /mnt1/data/mysqlbak -mtime +30 -delete > /mnt1/data/mysqldel.sh
    chmod 755 /mnt1/data/mysqldel.sh
    
crontab �������:
    
    0 0 * * * /bin/bash /mnt1/data/mysqldel.sh

#### 5.С��
�ܵ�˵��������MySQL�ĸ��ƹ��ܱ�����LVM��̫��,��Ҫ����Ϊ�Ƿ�����ȷ��ʹ��LVM���չ��ܸ�Ӳ������ѡ����ֱ�ӵĹ�ϵ����Ҫ�����¼�����Ҫע�⵽�� 
- ��װϵͳ��ʱ��ҪѡLVM����Ĵ���
- ��װϵͳ������ʱ��**һ����Ҫ��ϵͳ����ռ����������**������LVM�޷������µĿռ��������߼�����ϵͳ��������ɾ������С(������Ҫ��`cd-live`����`usb-live`)
- �����Ӳ�̵�ʱ����`pvcreate`,`vgcreate`�ֱ������������;���
- �����װϵͳʱû��ѡ��LVM����`fdisk`�����µķ������Ҹ��Ĵ�������Ϊ`8e`(LVM���ʹ���)

���MySQL�ĸ��ƹ��ܺ�LVM�Ŀ��չ��ܣ����ܱ�֤���ݵ�ʵʱͬ�������ܷ�ֹ��������ݿ����Ա���������