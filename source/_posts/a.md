---
title: 如何上传jar包到maven中心仓库
date: 2019-10-24 10:24:56
tags:
---
如何上传jar包到maven中心仓库
<!-- more -->
1.
pom 里添加：
```xml
<parent>
        <groupId>org.sonatype.oss</groupId>
        <artifactId>oss-parent</artifactId>
        <version>7</version>
</parent>
```

```xml
<licenses>
        <license>
            <name>The Apache Software License, Version 2.0</name>
            <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
            <distribution>repo</distribution>
        </license>
    </licenses>

    <scm>
        <connection>scm:git:git://github.com/me10zyl/surfing.git</connection>
        <developerConnection>scm:git:git@github.com:me10zyl/surfing.git</developerConnection>
        <url>https://github.com/me10zyl/surfing</url>
    </scm>

    <developers>
        <developer>
            <name>yilnz</name>
            <email>me10zyl@qq.com</email>
            <url>https://www.yilnz.com</url>
        </developer>
    </developers>

    <profiles>
        <profile>
            <id>local</id>
            <distributionManagement>
                <repository>
                    <id>releases</id>
                    <name>Releases</name>
                    <url>http://192.168.4.13:8081/nexus/content/repositories/releases</url>
                </repository>
            </distributionManagement>
        </profile>
        <profile>
            <id>sonatype-oss-release</id>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.sonatype.plugins</groupId>
                        <artifactId>nexus-staging-maven-plugin</artifactId>
                        <version>1.6</version>
                        <extensions>true</extensions>
                        <configuration>
                            <serverId>sonatype-nexus-staging</serverId>
                            <nexusUrl>https://oss.sonatype.org/</nexusUrl>
                            <autoReleaseAfterClose>true</autoReleaseAfterClose>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>
```

添加完成后 
```shell
export GPG_TTY=$(tty)
proxychains4 mvn deploy -DskipTests -P sonatype-oss-release
```

2.创建JIRA ISSUE 请求添加repo。[https://issues.sonatype.org/browse/OSSRH-51503](https://issues.sonatype.org/browse/OSSRH-51503)

3.[https://oss.sonatype.org/#stagingRepositories ](https://oss.sonatype.org/#stagingRepositories)close repo and release repo



