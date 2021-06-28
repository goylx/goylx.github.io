---
author: 欧阳罗霄
title: Java项目构建工具Maven
categories: 
	- maven
tags:
	- maven
headimg: /image/Devops/maven/headimg.png 
references:
  - title: 学Maven，这篇万余字的教程，真的够用了！
    url : https://www.cnblogs.com/lenve/p/12047793.html
  - title: maven全局配置文件settings.xml详解
    url : https://www.cnblogs.com/jingmoxukong/p/6050172.html
  - title: 廖雪峰Maven基础
    url : https://www.liaoxuefeng.com/wiki/1252599548343744/1255945359327200
  - title: pom.xml详解
    url : https://segmentfault.com/a/1190000021436754
---
Maven是一个Java项目的自动化构建工具，帮助管理项目依赖、源文件、资源文件，编译生成的可执行文件，测试相关代码和资源，提供了清理、编译、打包、发布等生命流程，让开发者可以专注于业务开发。
<!-- more -->
## 解决的问题
在介绍Maven之前先来体验一下不使用任何开发工具来构建一个简单的Java项目，首先创建工程目录如下：
```bash
├── lib										# 存放依赖
└── src										# 存放源代码
    ├── main								
    │   ├── java							# 存放实际代码
    │   └── resource
    └── test								# 存放测试文件
        ├── java							# 存放实际代码
        └── resource
        
```

下载`commons-lang3-3.12.0.jar`到lib目录下，在`/src/main/java`编写主类如下：

```java
import org.apache.commons.lang3.ArrayUtils;

class Main{
    public static void main(String[] args){
        System.out.println(getStringFromArray(new String[]{"a","b","c"}));
    }

    public static String getStringFromArray(Object[] array){
        return ArrayUtils.toString(array);
    }
}
```

使用命令编译并执行上述代码：

```bash
java -cp ~/JavaProject/lib/commons-lang3-3.12.0.jar Main.java
# 上述命令将jar包中的类引入到class-path下，从而让Test.java中的import正确执行，如果需要导入多个jar包则用:或者;（linux使用:、windows使用;）隔开
```

从上面简单的项目中已经可以看见很多问题：

- 依赖的jar需要手动下载并引入到类路径下
- jar级联依赖手动处理很麻烦，版本冲突经常发生
- 复杂工程需要有多个模块，模块之间互相依赖，手动编译引入过于复杂

## 简介

Maven是一个Java项目管理工具或者说Java自动化构建工具，Maven定义了一套标准化的项目结构、完善的依赖管理机制、标准化的构建流程，将每个项目构建为一个对象模型通过`pom。xml`文件描述项目的各项信息

### Maven项目结构

一个使用Maven管理的普通的Java项目，它的目录结构默认如下：

```ascii
MavenProject/
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── Main.java
│   │   └── resources
│   │       └── Main.properties
│   └── test
│       └── java
└── target
    ├── classes
    │   ├── Main.class
    │   └── Main.properties
    └── generated-sources
        └── annotations
```

项目的根目录`MavenProject`是项目名，它有一个项目描述文件`pom.xml`，存放Java源码的目录是`src/main/java`，存放资源文件的目录是`src/main/resources`，存放测试源码的目录是`src/test/java`，存放测试资源的目录是`src/test/resources`，最后，所有编译、打包生成的文件都放在`target`目录里。这些就是一个Maven项目的标准目录结构。

所有的目录结构都是约定好的标准结构，不要随意修改目录结构。使用标准结构不需要做任何配置，Maven就可以正常使用。

### Maven依赖管理机制

Maven中最重要的的项目描述文件`pom.xml`内容类似下面：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project ...>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.oylx</groupId>
    <artifactId>MavenProject</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>15</maven.compiler.source>
        <maven.compiler.target>15</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>30.1.1-jre</version>
        </dependency>
    </dependencies>

</project>
```

其中，`groupId`类似于Java的包名，通常是公司或组织名称，`artifactId`类似于Java的类名，通常是项目名称，再加上`version`，一个Maven工程就是由`groupId`，`artifactId`和`version`作为唯一标识。我们在引用其他第三方库的时候，也是通过这3个变量确定。例如，依赖`commons-lang3`：

```bash
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>30.1.1-jre</version>
</dependency>
```

使用`<dependency>`声明一个依赖后，Maven就会自动下载这个依赖包并把它放到classpath中。如果在项目中声明的依赖存在其他依赖也会级联的下载并放到classpath，生成一颗依赖树

{% image /image/Devops/maven/mavenDep.png , alt=maven构建依赖树  %}

### 生命周期

Maven提供了测试、清理、编译、打包、发布、上传到仓库等项目不同状态

## 安装

{% note blue, 如果你使用idea进行开发，且没有使用最新版本的强迫症可以跳过这一部分，idea内置有Maven工具 %}

- Maven本身是一个Java项目因此需要Java环境（安装jdk配置系统变量）,打开命令行窗口查看jdk版本

  ```bash
  $ java -version
  openjdk version "15.0.2" 2021-01-19
  OpenJDK Runtime Environment (build 15.0.2+7-27)
  OpenJDK 64-Bit Server VM (build 15.0.2+7-27, mixed mode, sharing)
  ```

- 从[Maven官网](https://maven.apache.org/download.cgi)下载Maven二进制压缩包，解压缩后配置环境变量

  ```bash
  MAVEN_HOME=/path/to/maven-3.6.x
  PATH=$PATH:$MAVEN_HOME/bin
  $ mvn -version                                       
  Apache Maven 3.6.0 (97c98ec64a1fdfee7767ce5ffb20918...) 
  Maven home: C:\Users\liaoxuefeng\maven                  
  Java version: ...                                       
  ...               
  ```

## 配置

### 环境变量

通过配置环境变量`MAVEN_OPTS`控制JVM虚拟机的参数，比如可以通过如下配置指定Maven使用的内存大小

```bash
MAVEN_OPTS = "-Xms256m -Xmx512m"
```

###  全局配置文件

`settings.xml`文件是Maven的全局配置文件，一般存放于全局配置：`${MAVEN_HOME}/conf/setting.xml`或用户配置：`${user.home}./m2/settings.xml`用户配置优先于全局配置。用户配置优先于全局配置。

`settings.xml`的顶级元素如下：

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                          https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <usePluginRegistry/>
  <offline/>
  <pluginGroups/>
  <servers/>
  <mirrors/>
  <proxies/>
  <profiles/>
  <activeProfiles/>
</settings>
```

- `LocalRepository`：本地仓库的路径、默认值为`~/.m2/repository`

- `InteractiveMode`：Maven是否需要和用户交互以获得输入、默认值为`true`

- `UsePluginRegistry`：maven是否需要使用`plugin-registry.xml`文件来管理插件版本，默认为false

- `Offline`：表示maven是否需要在离线模式下运行、默认值为`false`，当由于网络设置原因或者安全因素，构建服务器不能连接远程仓库的时候，该配置就十分有用。

- `PluginGroups`：当插件的组织id（groupId）没有显式提供时，供搜寻插件组织Id（groupId）的列表。默认包含了`org.apache.maven.plugins`和`org.codehaus.mojo`。

  ```xml
  <pluginGroups>
    <!--plugin的组织Id（groupId） -->
    <pluginGroup>org.codehaus.mojo</pluginGroup>
  </pluginGroups>
  ```

- `Servers`：配置访问部分仓库时安全认知信息

  ```xml
  <!--配置服务端的一些设置。一些设置如安全证书不应该和pom.xml一起分发。这种类型的信息应该存在于构建服务器上的settings.xml文件中。 -->
  <servers>
    <!--服务器元素包含配置服务器时需要的信息 -->
    <server>
      <!--这是server的id（注意不是用户登陆的id），该id与distributionManagement中repository元素的id相匹配。 -->
      <id>server001</id>
      <!--鉴权用户名。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。 -->
      <username>my_login</username>
      <!--鉴权密码 。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。密码加密功能已被添加到2.1.0 +。详情请访问密码加密页面 -->
      <password>my_password</password>
      <!--鉴权时使用的私钥位置。和前两个元素类似，私钥位置和私钥密码指定了一个私钥的路径（默认是${user.home}/.ssh/id_dsa）以及如果需要的话，一个密语。将来passphrase和password元素可能会被提取到外部，但目前它们必须在settings.xml文件以纯文本的形式声明。 -->
      <privateKey>${usr.home}/.ssh/id_dsa</privateKey>
      <!--鉴权时使用的私钥密码。 -->
      <passphrase>some_passphrase</passphrase>
      <!--文件被创建时的权限。如果在部署的时候会创建一个仓库文件或者目录，这时候就可以使用权限（permission）。这两个元素合法的值是一个三位数字，其对应了unix文件系统的权限，如664，或者775。 -->
      <filePermissions>664</filePermissions>
      <!--目录被创建时的权限。 -->
      <directoryPermissions>775</directoryPermissions>
    </server>
  </servers>
  ```

- `Mirrors`：配置下载镜像列表加快依赖下载速度

  ```xml
  <mirrors>
    <!-- 阿里云镜像。 -->
    <mirror>
    <!-- 该镜像的唯一标识符。id用来区分不同的mirror元素。 -->
    <id>nexus-aliyun</id>
    <!-- 镜像名称 -->
    <name>Nexus aliyun</name>
    <!-- 该镜像的URL。构建系统会优先考虑使用该URL，而非使用默认的服务器URL。 -->
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    <mirrorOf>*</mirrorOf>
  </mirror>
  ```

更多配置项请参考官方文档：https://maven.apache.org/settings.html，一般情况下不会改动全局配置文件

### 项目配置文件

#### 核心描述文件`pom.xml`

