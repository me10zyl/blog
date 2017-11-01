---
title: Intellij Idea - ��� artifact ����֮����
date: 2017-11-1 15:41:43 
tags:
- openvpn
- linux
categories:
- linux
---

Artifact - Intellij Idea �����������һ����Ҫ�ĸ��������ϸ������Artifact��Intellij Idea �Ĵ�����ʽ��Ӧ�á�

<!-- more -->

## ʲô�� artifact?

Artifact ������Ŀ�е���Դ���ϣ����ڲ��ԡ����𡢷������������������������һ�ѱ���õ� Java �� ���� һ�������Java���� һ���ļ��нṹ����ҳӦ�� ���� һ���������ҳӦ�ã��ȵȣ���  

�ļ��нṹ�� Artifact ���� ����Ľṹ�������������
+ һ������module�ı������
+ module ������ �а����� ��
+ ��Դ���� ����ҳ��ͼƬ�������ļ��ȣ�
+ ���� Artifact
+ �����ļ���Ŀ¼��ѹ����


## ���� artifact

ͨ�� `File | Project Structure | Artifacts` ����Artifact ��ָ����ṹ������

## ���� artifacts

1. ͨ�� ` Build | Build Artifacts` ����
2. ͨ�� ` Run | Debug` �е� Before  Lauch ����� `Build <ArtifactName> artifact` ���� artifact ���ڳ������л��ߵ��Ե�ʱ�� ����
3. artifact ����Ĭ�����Ŀ¼Ϊ`out/artifacts/<artifact_dir>`�����������Maven �Ļ�����Ϊ `target/<artifact_dir>`

## ����ѡ��

����һ��Artifact (Build | Build Artifacts)�������µ�ѡ�
+ **Build.** ��һ��ʹ�ã����� artifact ���������´�ʹ�ã� ֻ��һ���ֵĸı�ᱻ���� ��Ϊ ���Ĺ����Ѿ���ӵ� ���Ŀ¼�ˡ�
+ **Rebuild.** ���� artifact ��������ʵ���ϣ���ʹ����`clean`��ʹ��`build`
+ **Clean.** ɾ�����Ŀ¼������artifact
+ **Edit.** �༭ artifact configuration

## ���� Jar Artifact

 ͨ�� JAR Application run configurations ���С�
 1.  �� Run/Debug Configurations?�Ի��� (e.g. Run | Edit Configurations).
 2. �� + ��ѡ�� JAR Application.

## ���� artifacts ��application servers �� cloud platforms

�кܶ� artifact ��ʽ ������ WAR��Exploded WAR, EAR, Exploded EAR) ���ʺϲ��𵽳�����������Ʒ������������ǲ����裺
1. �ڷ����� ���� Զ�̷����� run/debug configuration��ָ�� artifact ������
2. ���� run/debug configuration ���� �� **Application Servers**, **Run** or **Debug** tool window ��ʹ�� **Deploy** ͼ�ꡣ

## artifact �� exploded artifact ������

artifact �� exploded artifact �����Ĳ�Ʒ�� �� exploded artifact ���ļ��нṹ�ģ��������������Tomcat ���������� artifact ��ʱ�򣬵��Ե�ʱ��Ҳ��һ��������� [Intelij Idea ʹ�� Tomcat ����/���� Web Ӧ�� ������ϸ��](/idea-tomcat)
