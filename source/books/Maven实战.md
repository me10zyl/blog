---
title: Maven实战
tags:
---

mvn -v 
mvn archetype:generate
mvn clean compile
mvn clean test
mvn clean package
mvn clean install

<!-- more -->

```
<groupId>org.sonatype.nexus</groupId>
<artifactId>nexus-indexer</artifactId>
<version>2.0.0</version>
<packaging>jar</packaging>
```
+ groupId 隶属的实际项目（必须）
+ artifactId 实际项目中的一个模块（必须）
+ version 版本（必须）
+ packaging 打包方式 （可选）
+ classifier 该元素用来帮助定义构建输出的一些附属构建，不能直接定义，由附加插件帮助生成

项目构件的**文件名**与坐标相对应
`artifactId-version [-classfier] .packaging`


mvn clean compile
mvn clean test
mvn clean package
mvn clean install 将输出的jar安装到本地仓库

test先执行compile
package先执行test
install先执行package

用maven-shade-plugin配置Main-Class 可运行jar包

# 依赖

#依赖
```
<dependency>
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <type></type>
    <optional></optional>
    <scope></scope>
    <exclusions>
        <exclusion>
        </exclusion>
         ...
    </exclusions>
</dependency>
```
+ groupId、artifactId、version 基本坐标
+ type 依赖类型，对应项目坐标定义的packaging。大部分情况下，该元素不必声明，其默认值为jar
+ scope 依赖的范围
+ optional 标记依赖是否可选
+ exclusions 用来排除传递性依赖

依赖范围
----
+ compile 编译依赖范围。默认
+ test 测试依赖范围
+ priovided 已提供依赖范围
+ runtime 运行时依赖范围
+ system 系统依赖范围
+ import (Maven 2.0.9)导入依赖范围

传递性依赖
----
###传递性依赖和依赖范围
传递性依赖范围表 ... 咩画
###依赖调解
依赖调解第一原则 路径最优者优先
1. A->B->C->X(1.0) 
2. A->D->X(2.0)

*选择2*

依赖调解第二原则 第一声明者优先(Maven 2.0.9)
1. A->B->Y(1.0)
2. A->C->Y(2.0)

如果B的依赖声明在C之前，*Y（1.0）就会被解析使用*
###可选依赖
**依赖将不会被传递**，例如项目B有2个数据库驱动，设置这2个数据库驱动为可选，其他项目依赖项目B的时候就不会下载这2个数据库
`<option>true</option>`
###排除依赖
如果你想排除掉某个传递性依赖，用`<exclusions>`,只需要`<groupId>`和`<artifactId>`
```
<dependencies>
</dependency>
    <groupId></groupId>
    <artifactId></artifactId>
    <version></version>
    <exclusions>
        <exclusion>
            <groupId></groupId>
            <artifactId></artifactId>
         </exclusion>
      <exclusions>
</dependency>
<dependencies>
```
###归类依赖
```
<properties>
    <springframework.verision>2.5</springframework.version>
</properties>

<dependecies>
    <dependency>
     <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>${springframework.version}</version>
    <dependency>
</dependencies>
```

###优化依赖
`mvn dependency:list`
`mvn dependency:tree`

# 仓库

仓库的布局
----------
`log4j:log4j:1.2.15` -> `log4j/log4j/1.2.15`
`groupId/artifactId/version/artifactId-version[-classfier].packaging`

本地仓库
-----
`~/.m2/settings.xml`设置`localRepositroy`元素的值
默认情况下，`~/.m2/settings.xml`不存在，需要拷贝`$M2_HOME/conf/settings.xml`
```
<settings>
<localRepository>D:\Java\repositroy\</localRepository>
</settings>
```

中央仓库
-------
所有Maven项目都会继承的超级POM：`$M2_HOME/lib/maven-mod-el-builder-3.0.jar`->`org/apache/maven/model/pom-4.0.0
```
<repositories>
<repository>
  <id>central</id>
  <name>Central Repository</name>
  <url>https://repo.maven.apache.org/maven2</url>
  <layout>default</layout>
<snapshots>
  <enabled>false</enabled>
  </snapshots>
  </repository>
  </repositories>
<pluginRepositories>
```

`snapsohts`是否允许下载快照版本


##远程仓库的配置
```
<repositories>
<repository>
    <id>jboss</id>
    <name>JBoss Repository</name>
     <url>https://repository.jboss.com/maven2</url>
    <releases>
        <enable>true</enable>
    </releases>
    <snapshots>
      <enabled>false</enabled>
      </snapshots>
    <layout>
        default
    </layout>
  </repository>
  </repositories>
```
任何一个仓库的id必须是唯一的，Maven自带的中央仓库使用的id为central，如果其他仓库的声明也使用该id，就会覆盖中央仓库的配置。
release的enable表明可以下载发布版本，snapshots的enable为false表明不可以下载快照版本。layout元素值为default表示仓库的布局是
Maven2及Maven3的布局，而不是Maven1的布局。
####远程仓库的认证
编辑`settings.xml`
```
<settings>
    <servers>
        <server>
            <id>my-proj</id>
            <username>repo-user</username>
             </password>repo-pwd</password>
        </server>
    </servers>
</settings>
```
####部署远程仓库
将构件上传到服务器
```
<project>
    ...
    <distributionManagement>
        <repository>
            <id>proj-releases</id>
             <name>Proj Release Repositry</name>
              <url>http://192.168.1.100/cotent/repositroies/proj-releases
        </repository>
        <snapshotRepositroy>
        <repository>
            <id>proj-releases</id>
             <name>Proj Release Repositry</name>
              <url>http://192.168.1.100/cotent/repositroies/proj-snapshot
        </repository>
    </snapshotRepositroy>
</distributionManagement>
...
</project>
```
往往需要认证:参见`远程仓库的认证`
配置完成后,运行`mvn clean deploy`
###快照版本
SNAPSHOT能解决开发中依赖问题，带上时间戳，默认情况，MAVEN每天检查一次更新，有仓库配置的`updatePolicy`控制
`-U`让Maven强制检查更新，如`mvn clean install-U`
###从仓库解析依赖的机制
1. 当依赖范围为system时，Maven会从本地文件系统解析构件
2. 根据依赖坐标计算仓库路径后，尝试从本地仓库寻找构件，如果发现相应构件，则解析成功
3. 在本地仓库不存在相应构件的情况下，如果依赖的版本是显式的发布版本构件，如1.2,1.2-beta等，则遍历所有的远程仓库，发现后，下载并解析使用
4. 如果依赖的版本是`RELEASE`或者`LASTEST`，则基于更新策略读取所有远程仓库的元数据groupId/aritifactId/maven-metadata.xml，将其与本地仓库的对应元数据合并后，计算出`RELEASE`或者`LASTEST`真实的值，然后基于这个真实的值检查本地和远程仓库，如步骤2,3
5. 如果依赖版本是`SNAPSHOT`,则基于更新策略读取所有远程仓库的元数据groupId/aritifactId/maven-metadata.xml，将其与本地仓库的对应元数据合并后，得到最新快照版本的值,然后基于该值检查本地仓库,或从远程仓库下载
6. 如果最后解析得到的构件版本是时间戳格式的快照,如1.4.1-20091104.121450-121，则复制其时间戳格式至非时间戳格式，如`SNAPSHOT`，并使用该非时间戳格式的构件。
      当依赖版本不明晰的时候，如`SNAPSHOT`、`LASTEST`和`RELEASE`,Maven就需要基于更新远程仓库的策略来检查更新。更新策略：`<release> <snapshot>`，检查更新的频率：`<updatePolicy>`，可以用-U参数强制检查更新。

   `LASTEST`：最新的，包括`SNAPSHOT`
   `RELEASE` : 最新的发布版本
   Maven3不再支持在插件配置中使用`LASTEST`和`RELEASE`
   如果不设置插件版本，其效果就和`RELEASE`一样。
###镜像
+ 覆盖中央仓库
`http://maven.net.cn/content/groups/public`是中央仓库`http://repo1.maven.org/maven2/`在中国的镜像
`settings.xml`
```
<settings>
    <mirrors>
        <mirror>
            <id>maven.net.cn</id>
            <name>one of the central mirrors in China</name>
            <url>http://maven.net.cn/content/groups/public</url>
            <mirrorOf>Central</mirrorOf>
        </mirror>
    </mirrors>
</settings>
```
+ 私服
任何请求都会跳转至`http://192.168.1.100/maven2/`
```
<settings>
    <mirrors>
        <mirror>
            <id>internal-repositroy</id>
            <name>Internal Repositroy Manager</name>
            <url>http://192.168.1.100/maven2/</url>
            <mirrorOf>*</mirrorOf>
        </mirror>
    </mirrors>
</settings>
```
`<mirrorOf>*</mirrorOf>` 匹配所有远程仓库
`<mirrorOf>external:*</mirrorOf>` 匹配所有远程仓库.除localhost(也就是说使用file://协议的除外)
`<mirrorOf>repo1,repo2</mirrorOf>` 匹配id为repo1,repo2的远程仓库
`<mirrorOf>*,!repo1</mirrorOf>` 匹配所有远程仓库,repo1除外

###仓库搜索服务
+ Sonatype Nexus : `http://repositroy.sonatype.org/`
+ Jarvana : `http://www.jarvana.com/jarvana/`
+ MVNbrowser : `http://www.mvnbrowser.com/`
+ MVNrepositry : `http://mvenrepositroy.com/`
+ Maven : `http://maven.org/`

# 生命周期与插件

项目构建工具基本的生命周期：
------
+ 清理
+ 初始化
+ 编译
+ 测试
+ 打包
+ 集成测试
+ 验证
+ 部署
+ 站点生成

三套生命周期：
-----------
+ clean 清理项目
+ default 真正构建的所有步骤  |  ref: `http://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html`
    + validate
    + intitalize
    + generate-sources
    + process-sources
    + generate-resources
    + process-resources
    + compile
    + process-classes
    + generate-test-sources
    + process-test-sources
    + generate-test-resources
    + process-test-resources
    + test-compile
    + process-test-classes
    + test
    + prepare-package
    + package
    + pre-integration-test
    + integration-test
    + post-integration-test
    + verify
    + install 安装到本地
    + deploy 将最终的包复制到远程仓库
+ site 建立和发布项目站点，MAVEN能基于POM所包含的信息，自动生成一个友好的站点

命令行与生命周期：
-----
`mvn clean deploy site-deploy`
包含了clean生命周期的`clean`，default生命周期的`deploy`，以及site生命周期的`site-deploy`
其他见  Maven实战

插件目标
--------
一个插件目标就是一个功能。
如`dependency:analyze`、`dependency:tree`和`dependency:list`。
插件绑定 & 内置绑定
---------
Maven的生命周期与插件相互绑定，用以完成实际的构建任务。
为了让用户几乎不用任何配置就能构建Maven项目，Maven的核心为一些主要的生命周期阶段绑定了很多插件的目标。
自定义绑定
--------
```
<build>
    <plugins>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-source-plugin</artifactId>
        <version>2.1.1</version>
        <executions>
            <execution>
                <id>attach-sources omg it's just a name</id>
                <phase>verify</phase>
                <goals>
                    <goal>jar-no-fork</goal>
                </goals>
            </execution>
        </executions>
    </plugins>
</build>
```
插件配置
------
Concept: 用户可以配置插件目标的参数，进一步调整目标所完成的任务，以满足项目的需求。
命令行插件配置
---
-D允许传入插件的参数
`mvn install -Dmaven.test.skip=true`
全局插件配置
------
并没有特指什么阶段执行插件目标，Configuration标签就在Execution标签外面。只要执行了该插件目标的任务，都会用这个配置。
```
<build>
    <plugins>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.1.1</version>
        <configuration>
            <source>1.5</source>
            <target>1.5</target>
        </configuration>
    </plugins>
</build>
```
POM中插件配置
-------
```
<build>
    <plugins>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-antrun-plugin</artifactId>
        <version>1.3</version>
        <executions>
            <execution>
                <id>ant  validate that sdafdsasd</id>
                <phase>validate</phase>
                <goals>
                    <goal>run</goal>
                </goals>
                <configuration> 
                    <tasks>
                        <echo>helloworld!!!</echo>
                    <tasks>
                </configuration>
            </execution>
            <execution>
                <id>ant  verfiry that sdafdsasd</id>
                <phase>verfiry</phase>
                <goals>
                    <goal>run</goal>
                </goals>
                <configuration> 
                    <tasks>
                        <echo>helloworld!!!</echo>
                    <tasks>
                </configuration>
            </execution>
        </executions>
    </plugins>
</build>
```
###在线插件信息
查看插件：`http://maven.apache.org/
###使用maven-help-plugin描述插件
`mvn help:descibe-Dplugin=org.apache.maven.plugins:maven-complier-plugin:2.1`
###从命令行调用插件
`mvn -h`
`mvn [options] [<goal(s)>] [<phase(s)>]
除了执行绑定在生命周期阶段的插件目标，Maven还支持直接从命令行调用插件目标。Maven支持这种方式是因为有些任务不适合绑定在生命周期上。

`mvn help:describe-Dplugin=compiler` == `mvn org.apache.maven.plugins:maven-help-plugin:2.1:descibe-Dplugin-compiler`
`help`是`maven-help-plugin`的前缀、有了前缀，Maven就能找到对应的artifactId。除了artifactId，Maven还需要得到groupId和version才能精确定位到某个插件。
###插件仓库
原理跟依赖一样，先从本地找插件，如果不存在，就从远程仓库中下载后再使用
```
<span style="font-family:Microsoft YaHei;"><repositories>  
    <repository>  
        <id>jboss</id>  
        <url>http://repository.jboss.com/maven2/</url>  
        <releases>  
            <enabled>true</enabled>  
        </releases>  
        <snapshots>  
            <enabled>false</enabled>  
        </snapshots>  
        <layout>default</layout>  
    </repository>  
</repositories></span>
```
###插件默认的groupId
```
<build>
    <plugins>
         <artifactId>maven-compiler-plugin</artifactId>
        <version>2.1.1</version>
        <configuration>
            <source>1.5</source>
            <target>1.5</target>
        </configuration>
    </plugins>
</build>
```
这个插件全局配置并没有指定groupId,Maven在解析该插件的时候，会自动默认gourpId org.apache.maven.plugins补齐。
###插件前缀
插件前缀与groupId:artifactId是一一对应的，这种匹配关系存储在仓库元数据中。与之前提到的groupId/artifactId/maven-metadata.xml不同，这里的仓库元数据为groupId/maven-metadata.xml，maven会默认检查org.apache.maven.plugins和org.codehaus.mojo两个groupId的元数据。也可用配置settings.xml让xml检查其他插件仓库元数据以达到插件前缀的效果。
```
<settings>
        <pluginGroups>
            <pluginGroup>com.ur.plugin</pluginGroup>
        <pluginGroups>
</settings>
```
元数据`org\apache\maven\plugins\maven-metadata-central.xml`
```
<?xml version="1.0" encoding="UTF-8"?>
<metadata>
  <plugins>
    <plugin>
      <name>Apache Maven ACR Plugin</name>
      <prefix>acr</prefix>
      <artifactId>maven-acr-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Ant Plugin</name>
      <prefix>ant</prefix>
      <artifactId>maven-ant-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven ANTLR Plugin</name>
      <prefix>antlr</prefix>
      <artifactId>maven-antlr-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven AntRun Plugin</name>
      <prefix>antrun</prefix>
      <artifactId>maven-antrun-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Archetype Plugin</name>
      <prefix>archetype</prefix>
      <artifactId>maven-archetype-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Assembly Plugin</name>
      <prefix>assembly</prefix>
      <artifactId>maven-assembly-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Changelog Plugin</name>
      <prefix>changelog</prefix>
      <artifactId>maven-changelog-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Changelog Plugin</name>
      <prefix>changelog</prefix>
      <artifactId>maven-changelog-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Changes Plugin</name>
      <prefix>changes</prefix>
      <artifactId>maven-changes-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Checkstyle Plugin</name>
      <prefix>checkstyle</prefix>
      <artifactId>maven-checkstyle-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Checkstyle Plugin</name>
      <prefix>checkstyle</prefix>
      <artifactId>maven-checkstyle-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Clean Plugin</name>
      <prefix>clean</prefix>
      <artifactId>maven-clean-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Clover Plugin</name>
      <prefix>clover</prefix>
      <artifactId>maven-clover-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Compiler Plugin</name>
      <prefix>compiler</prefix>
      <artifactId>maven-compiler-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Continuum Plugin</name>
      <prefix>continuum</prefix>
      <artifactId>maven-continuum-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Core Integration Test Plugin</name>
      <prefix>core-it</prefix>
      <artifactId>maven-core-it-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Dependency Plugin</name>
      <prefix>dependency</prefix>
      <artifactId>maven-dependency-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Deploy Plugin</name>
      <prefix>deploy</prefix>
      <artifactId>maven-deploy-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Deploy Plugin</name>
      <prefix>deploy</prefix>
      <artifactId>maven-deploy-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven DOAP Plugin</name>
      <prefix>doap</prefix>
      <artifactId>maven-doap-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Documentation Checker Plugin</name>
      <prefix>docck</prefix>
      <artifactId>maven-docck-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven EAR Plugin</name>
      <prefix>ear</prefix>
      <artifactId>maven-ear-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven EAR Plugin</name>
      <prefix>ear</prefix>
      <artifactId>maven-ear-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven EAR Plugin</name>
      <prefix>ear</prefix>
      <artifactId>maven-ear-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Eclipse Plugin</name>
      <prefix>eclipse</prefix>
      <artifactId>maven-eclipse-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven EJB Plugin</name>
      <prefix>ejb</prefix>
      <artifactId>maven-ejb-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Enforcer Plugin</name>
      <prefix>enforcer</prefix>
      <artifactId>maven-enforcer-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Enforcer Plugin</name>
      <prefix>enforcer</prefix>
      <artifactId>maven-enforcer-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Failsafe Plugin</name>
      <prefix>failsafe</prefix>
      <artifactId>maven-failsafe-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven GPG Plugin</name>
      <prefix>gpg</prefix>
      <artifactId>maven-gpg-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven GPG Plugin</name>
      <prefix>gpg</prefix>
      <artifactId>maven-gpg-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Help Plugin</name>
      <prefix>help</prefix>
      <artifactId>maven-help-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven IDEA Plugin</name>
      <prefix>idea</prefix>
      <artifactId>maven-idea-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven IDEA Plugin (RETIRED)</name>
      <prefix>idea</prefix>
      <artifactId>maven-idea-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Install Plugin</name>
      <prefix>install</prefix>
      <artifactId>maven-install-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Install Plugin</name>
      <prefix>install</prefix>
      <artifactId>maven-install-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Invoker Plugin</name>
      <prefix>invoker</prefix>
      <artifactId>maven-invoker-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven JAR Plugin</name>
      <prefix>jar</prefix>
      <artifactId>maven-jar-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Jar Plugin</name>
      <prefix>jar</prefix>
      <artifactId>maven-jar-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Jarsigner Plugin</name>
      <prefix>jarsigner</prefix>
      <artifactId>maven-jarsigner-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Jarsigner Plugin</name>
      <prefix>jarsigner</prefix>
      <artifactId>maven-jarsigner-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Javadoc Plugin</name>
      <prefix>javadoc</prefix>
      <artifactId>maven-javadoc-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Javadoc Plugin</name>
      <prefix>javadoc</prefix>
      <artifactId>maven-javadoc-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven JXR Plugin</name>
      <prefix>jxr</prefix>
      <artifactId>maven-jxr-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Linkcheck Plugin</name>
      <prefix>linkcheck</prefix>
      <artifactId>maven-linkcheck-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven 1.x Plugin</name>
      <prefix>maven-one-plugin</prefix>
      <artifactId>maven-one-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven One Plugin</name>
      <prefix>maven-one-plugin</prefix>
      <artifactId>maven-one-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven One Plugin (RETIRED)</name>
      <prefix>one</prefix>
      <artifactId>maven-one-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Patch Plugin</name>
      <prefix>patch</prefix>
      <artifactId>maven-patch-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Patch Plugin</name>
      <prefix>patch</prefix>
      <artifactId>maven-patch-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven PDF Plugin</name>
      <prefix>pdf</prefix>
      <artifactId>maven-pdf-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Plugin Plugin</name>
      <prefix>plugin</prefix>
      <artifactId>maven-plugin-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven PLUGIN Plugin</name>
      <prefix>plugin</prefix>
      <artifactId>maven-plugin-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven PMD Plugin</name>
      <prefix>pmd</prefix>
      <artifactId>maven-pmd-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Project Info Reports Plugin</name>
      <prefix>project-info-reports</prefix>
      <artifactId>maven-project-info-reports-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Project-Help Plugin</name>
      <prefix>projecthelp</prefix>
      <artifactId>maven-projecthelp-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven RAR Plugin</name>
      <prefix>rar</prefix>
      <artifactId>maven-rar-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven RAR Plugin</name>
      <prefix>rar</prefix>
      <artifactId>maven-rar-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Reactor Plugin (RETIRED)</name>
      <prefix>reactor</prefix>
      <artifactId>maven-reactor-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Release Plugin</name>
      <prefix>release</prefix>
      <artifactId>maven-release-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Release Plugin</name>
      <prefix>release</prefix>
      <artifactId>maven-release-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Remote Resources Plugin</name>
      <prefix>remote-resources</prefix>
      <artifactId>maven-remote-resources-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Remote Resources Plugin</name>
      <prefix>remote-resources</prefix>
      <artifactId>maven-remote-resources-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Repository Plugin</name>
      <prefix>repository</prefix>
      <artifactId>maven-repository-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Resources Plugin</name>
      <prefix>resources</prefix>
      <artifactId>maven-resources-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven SCM Plugin</name>
      <prefix>scm</prefix>
      <artifactId>maven-scm-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven SCM Publish Plugin</name>
      <prefix>scm-publish</prefix>
      <artifactId>maven-scm-publish-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Shade Plugin</name>
      <prefix>shade</prefix>
      <artifactId>maven-shade-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Shade Plugin</name>
      <prefix>shade</prefix>
      <artifactId>maven-shade-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Shade Plugin</name>
      <prefix>shade</prefix>
      <artifactId>maven-shade-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Site Plugin</name>
      <prefix>site</prefix>
      <artifactId>maven-site-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Site plugin</name>
      <prefix>site</prefix>
      <artifactId>maven-site-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Site Plugin 3</name>
      <prefix>site</prefix>
      <artifactId>maven-site-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Site Plugin 2</name>
      <prefix>site</prefix>
      <artifactId>maven-site-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Source Plugin</name>
      <prefix>source</prefix>
      <artifactId>maven-source-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Source Plug-In</name>
      <prefix>source</prefix>
      <artifactId>maven-source-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Stage Plugin</name>
      <prefix>stage</prefix>
      <artifactId>maven-stage-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Surefire Plugin</name>
      <prefix>surefire</prefix>
      <artifactId>maven-surefire-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Surefire Report Plugin</name>
      <prefix>surefire-report</prefix>
      <artifactId>maven-surefire-report-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven Toolchains Plugin</name>
      <prefix>toolchains</prefix>
      <artifactId>maven-toolchains-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven Verifier Plugin</name>
      <prefix>verifier</prefix>
      <artifactId>maven-verifier-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven WAR Plugin</name>
      <prefix>war</prefix>
      <artifactId>maven-war-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Maven War Plugin</name>
      <prefix>war</prefix>
      <artifactId>maven-war-plugin</artifactId>
    </plugin>
    <plugin>
      <name>Apache Maven WAR Plugin</name>
      <prefix>war</prefix>
      <artifactId>maven-war-plugin</artifactId>
    </plugin>
  </plugins>
</metadata>
```

# 聚合与继承

聚合
-----
想要一次构建两个项目，而不是分别到模块的目录下执行mvn命令。Maven聚合（或者成为多模块）这一特性就是为该需求服务的。
aggregator:
```
<project
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
    xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sunyuki.ec</groupId>
    <artifactId>sunyuki-erp-aggregator</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>sunyuki ec erp</name>  
    <modules>
        <module>../sunyuki-erp-base</module>
        <module>../sunyuki-erp-api</module>
        <module>../sunyuki-erp-external-api</module>
    </modules>  
</project>
```
请注意`packaging`为`POM`
继承
----
两个POM有着许多相同的配置，例如有相同的groupId和version。在maven中，POM的继承这样的机制能让我们抽取出重复的配置。
parent:
```
<project
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
    xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sunyuki.ec</groupId>
    <artifactId>sunyuki-erp-parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>sunyuki ec erp</name>  
</project>
```
请注意`packaging`为`POM`
child:
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <artifactId>sunyuki-erp-api</artifactId>
    <packaging>jar</packaging>
    <parent>
        <groupId>com.sunyuki.ec</groupId>
        <artifactId>sunyuki-erp-parent</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../sunyuki-erp-parent/pom.xml</relativePath>
    </parent>  
</project>
``` 
####可继承的POM元素
+ groupId
+ version
+ desciption
+ organization
+ inceptionYear
+ url
+ developers
+ contributors
+ distributionManagement
+ issueManagement
+ ciManagement
+ scm 软件配置管理（版本控制系统）
+ mailingLists
+ properties
+ dependecies
+ denpendecyManagement
+ repositroies
+ build 包括项目的源码目录配置、输出目录配置、插件配置、插件管理配置等
+ reporting

依赖管理
-------
依赖可以继承，这时候容易想到在父类配置`<repositroies>`而子类不配置`<repositroies>`就可以继承，是可行的，但是存在问题，不需要对应库的子模块就一定要继承父类的`<repositroies>`吗?
maven提供的dependecyManagement元素能让子模块继承到父模块的依赖配置，又不会让子类引入实际的依赖。
父类：
```
<?xml version="1.0" encoding="UTF-8"?>
<project
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
    xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sunyuki.ec</groupId>
    <artifactId>sunyuki-erp-parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <name>sunyuki ec erp</name>
    <dependencyManagement>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <scope>test</scope>
            <version>1.0</version>
        </dependency>
    </dependencies> 
</project>
``` 

子类也会继承到依赖管理，子类在写依赖时，version和scope都省去了，方便于统一管理
子类：
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <artifactId>sunyuki-erp-external-api</artifactId>
    <packaging>jar</packaging>
    <parent>
        <groupId>com.sunyuki.ec</groupId>
        <artifactId>sunyuki-erp-parent</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../sunyuki-erp-parent/pom.xml</relativePath>
    </parent> 
    <dependencies>  
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
        </dependency>
    </dependecies>
</project>
``` 
引入repositroyManagement的方式：
+ 复制
+ 继承
+ import - 引入`com.juvenxu.mvnbook.account.accout-parent`项目的`dependencyManagement`，`scope`为`import`,`type`为`pom`
```
<dependencyManagement>
    <dependencies> 
        <dependency>
            <groupId>com.juvenxu.mvnbook.account</groupId>
            <artifactId>accout-parent</artifactId>
            <scope>import</scope>
            <version>1.0-SNAPSHOT</version>
            <type>pom</type>
        </dependency>
    </dependencies> 
</dependencyManagement>
```

# 灵活的构建

Maven属性
------
+ 内置属性 ${basedir} 项目根目录（即包含pom.xml的目录),${version} 表示项目版本
+ POM属性 引用POM文件中对应元素的值
    + ${project.build.sourceDirectory} 项目源码路径,默认为src/main/java
    + ${project.build.testSourceDirectory} 项目测试源码路径,默认为src/test/java/
    + ${project.build.directory} 项目构建输出目录，默认为target/
    + ${proect.outputDirectory} 项目主代码编译目录，默认为target/classes/
    + ${project.testOutputDirector} 项目测试代码编译输出目录,默认为target/test-classes
    + ${project.groupId} 项目的groupId
    + ${project.artifactId} 项目的artifactId
    + ${project.version} 与${version}等价
    + ${project.build.finalName} 项目打包输出文件的名称，默认为${project.artifactId}-${project.version}
+ 自定义属性，用`<properties>`元素定义的属性
+ Settings属性，如${settings.localRepositroy}
+ Java属性，所有的Java系统属性都可以使用Maven属性引用，如${user.home},可以用mvn help:system查看所有Java属性
+ 环境变量属性,如${env.JAVA_HOME}，可以用mvn help:system查看所有环境变量
