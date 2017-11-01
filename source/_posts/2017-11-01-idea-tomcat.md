---
title: Intelij Idea ʹ�� Tomcat ����/���� Web Ӧ�� ������ϸ��
date: 2017-11-01 15:08:08
tags:
- intellij idea
- java
categories:
- intellij idea
---

���������±������������������� Intellij Idea ������ Tomcat ����/���� Web Ӧ�ã����� Idea �� Tomcat ��ϵ��ԣ�������Ŀ����ʱ�䡣

<!-- more -->

## ��ʹ��

1. Run Configuration -> �½� Tomcat Run Configuration

![image](/images/idea/1.png)

2. ѡ�񵱸��²���(Ctrl + F10)���� Intellij Idea ʧȥ�����ʱ�����Tomcat �е� classes����Դ���Ƚ�����
![image](/images/idea/2.png)

3. ѡ�����artifact������ѡ war exploded, Ϊʲô��ѡ war, ��Ϊwar��war exploded �����ģ� war exploded ����������� war ��֧�� ��̬��Դ���Ȳ���
![image](/images/idea/3.png)


2. Run/Debug 

![image](/images/idea/4.png)

## �߼�Ӧ��

���� Tomcat ���õ�ʱ����Կ����� On Update action �� On frame deactivation�� �����ָʲô������������ܡ�

### On 'Update' action 

����˼�壬���²�������ָ 'Update application'�� ��ݼ�Ϊ Ctrl + F10 �����ߵ������/���� View���½ǣ��� Build Project/Module(Ctrl + F9) ����ͬһ������

![image](/images/idea/5.png)

���� exploded artifacts �� ��ѡ��ѡ��Ϊ

+ Update Resources. ���иı����Դ�����£�CSS��HTML��JS�ȣ�
+ Update classes and resources. ���иı����Դ�͸ı��Java �඼���±������  

> �� Debug ģʽ��, ���µ�������Ƚ���(hot swapped). �� Run ģʽ��, IntelliJ IDEA ֻ��������ļ����еĸı����. �����ʵ���ϵ�������û�У�ȡ�������л����ļ����ԡ�

+ Redeploy. Ӧ�� artifact ���¹��������²���
+ Restart Server. ������������Ӧ�� artifact ���¹��������²���

���� packed artifacts ������exploded��)����ѡ��ѡ��Ϊ

+ Hot swap classes. �ı�������±����������ʱ�ؼ���. ֻ�� **debug** ģʽ������
+ Redeploy. Ӧ�� artifact ���¹��������²���
+ Restart Server. ������������Ӧ�� artifact ���¹��������²���

## On frame deactivation

������ʵ���˼�� ��Intellij idea �л����������򣬴����Ĳ���������
Do nothing ѡ�����ѡ��� 'On Update action'һ�¡�

## Deploy applications configured in Tomcat instance

��ѡ�����ѡ������ͻᲿ�� tomcat �е�����Ӧ�ã� ����

+ docs
+ examples
+ host-manager
+ manager
+ ROOT