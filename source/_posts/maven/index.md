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
  - title: 廖雪峰Maven基础
    url : https://www.liaoxuefeng.com/wiki/1252599548343744/1255945359327200
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

其中，`groupId`类似于Java的包名，通常是公司或组织名称，`artifactId`类似于Java的类名，通常是项目名称，再加上`version`，一个Maven工程就是由`groupId`，`artifactId`和`version`作为唯一标识。我们在引用其他第三方库的时候，也是通过这3个变量确定。例如，依赖`guava`：

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

[更详细的安装说明](https://www.runoob.com/maven/maven-setup.html)

## 配置

### 环境变量

通过配置环境变量`MAVEN_OPTS`控制JVM虚拟机的参数，比如可以通过如下配置指定Maven使用的内存大小

```bash
MAVEN_OPTS = "-Xms256m -Xmx512m"
```

###  全局配置文件

下载解压后的`/conf/settings.xml`文件是Maven的配置文件，定义本地仓库、仓库镜像列表等信息。可以创建`~/.m2/settings.xml`用户级配置文件，这里面的配置会覆盖`${MAVNE_HOME}/conf/settings.xml`的配置。一般情况下我们不需要更改这些配置，后面会在需要修改时介绍。

[`settings.xml`配置详解](/maven/settings)

## 常用的maven命令及生命周期

Maven定义了一套标准化的构建流程，可以自动实现编译、打包、发布等等。Maven定义了生命周期`lifecycle`、阶段`phase`、goal来管理项目的构建流程。

最常用的生命周期有`default`和`clean`，每个生命周期包含一系列阶段`phase`，大多数阶段在执行过程中需要在pom.xml进行相关配置，否则这些阶段什么也不会做，最常用的阶段有：

- `clean`：清理，注意和生命周期中的clean有区别
- `compile`：编译
- `test`：运行测试
- `package`：打包
- `install`：安装到仓库
- `deploy`：部署

每个phase会触发一个或多个goal：

| 执行的Phase | 对应执行的Goal                         |
| ----------- | -------------------------------------- |
| `compile`   | `compiler:compile`                     |
| `test`      | `compiler:testCompile` `surefire:test` |

**下面就列举一些常用的命令**：

- `mvn clean`：清理所有Maven生成class文件和jar包，执行`clean`生命周期

- `mvn clean compile`：先清理再重新将Java代码编译成class文件，执行default生命周期到compile阶段

- `mvn test`：执行测试代码
- `mvn package`：将项目进行打包
- `mvn install`：将项目打包并安装到本地仓库
- `mvn deploy`：将项目打包并上传到私服

除了`mvn clean`命令其他都是执行default生命周期，后面的命令都包括了前面命令的阶段

### 在IDEA中使用Maven



## 项目配置文件

### 核心描述文件`pom.xml`

`pom`是Project Object Model(项目对象模型)的缩写，描述项目基本信息、依赖、远程仓库，插件信息等等，文件的顶级元素如下：

```xml
<project>  
  <modelVersion>4.0.0</modelVersion>  
  <!--Maven坐标-->
  <groupId>...</groupId>  
  <artifactId>...</artifactId>  
  <version>...</version>
  <!--Maven坐标-->  
    
  <packaging>...</packaging>  <!--打包方式-->
  <dependencies>...</dependencies> <!--依赖配置--> 
  <parent>...</parent>  <!--父项目-->
  <dependencyManagement>...</dependencyManagement>  <!--依赖统一管理-->
  <modules>...</modules>  <!--模块列表-->
  <properties>...</properties>  <!--属性列表-->
  
    
  <build>...</build>  <!--构建配置-->
  <reporting>...</reporting>  <!--报表配置-->
  
  <!--项目信息-->
  <name>...</name>  
  <description>...</description>  
  <url>...</url>  
  <inceptionYear>...</inceptionYear>  
  <licenses>...</licenses>  
  <organization>...</organization>  
  <developers>...</developers>  
  <contributors>...</contributors>  
  <!--项目信息-->
    
  <!--运维配置-->  
  <issueManagement>...</issueManagement>  
  <ciManagement>...</ciManagement>  
  <mailingLists>...</mailingLists>  
  <scm>...</scm>  
  <prerequisites>...</prerequisites>  
  <repositories>...</repositories>  
  <pluginRepositories>...</pluginRepositories>  
  <distributionManagement>...</distributionManagement>  
  <profiles>...</profiles>  
  <!--运维配置-->    
</project>
```

- `project`：pom.xml的根元素，包含了一些约束信息

- `modelVersion`：pom的版本，这是Maven 2&3唯一支持的pom版本，而且不能忽略。

  ```xml
  <modelVersion>4.0.0</modelVersion>
  ```

- Maven坐标

  Maven坐标可以唯一定位一个Maven项目，由三部分组成：

  - `groupId`：项目或者组织的唯一标志，并且配置时生成的路径也是由此生成，如org.codehaus.mojo生成的相对路径为：/org/codehaus/mojo

  - `artifactId`：项目的通用名称

  - `version`：项目的版本，通常来说项目对的版本号分为三段：

    - 主版本号：代表架构变动或者不兼容的实现
    - 次版本号：兼容性修改,功能增强
    - 修订版本号：bug修复

    版本号的后缀意味着项目的不同阶段：

    - SNAPSHOT：开发中的版本
    - RELEASE：正式发布版
    - M1\M2：M指里程碑,表示即将发布
    - RC：Release Candidate,发布候选
    - GA：General Availablity,基本可用版本

  ```xml
  <groupId>com.oylx</groupId>
  <artifactId>MavenProject</artifactId>
  <version>1.0-SNAPSHOT</version>
  ```

- `packaging`：打包的机制、默认值是jar。常用的打包机制：

  - jar：可以直接通过`java -jar xxx.jar`
  - war：打包后放在tomcat等Servlet容器
  - pom：聚合工程中只用于统一规定一些依赖的父项目使用的类型，后面会详细介绍

- `dependencies`：配置依赖项，后面会详细介绍
- 聚合模块相关配置
  - `parent`：聚合项目中指定父项目，如果没有指定父项目则默认继承自[Super POM](https://maven.apache.org/ref/3.0.4/maven-model-builder/super-pom.html)
  - `modules`：聚合项目中指定子模块
  - `dependencyManagement`：在顶层项目中统一规定各依赖的相同因素，如版本，scope

- `properties`：配置文件中的值占位符

  ```xml
  <properties>
      <dependence.version>3.2.5</dependence.version>
  </properties>
  ...
  <dependencies>
      <!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
       <dependency>
          <groupId>com.google.guava</groupId>
          <artifactId>guava</artifactId>
          <!--等价于<version>3.2.5</version>--> 
          <version>${dependence.version}</version>
      </dependency>
  </dependencies>
  ```

- `build`：项目构建配置，后面会详细介绍

- 项目信息

  {% folding  cyan, 一般项目中很少使用这些配置，如果现在不想了解可以跳过 %}

  - `licenses`：许可证列表

    ```xml
    <licenses>
        <license>
            <name>名称</name>
            <url>官方license页面的url</url>
            <distribution>项目发布方式（repo：从Maven仓库下载、manual：手动安装）</distribution>
            <comments>注释</comments>
        </license>
    </licenses>
    ```

  - `organazation`：组织信息

    ```xml
    <organazation>
        <name>组织名称</name>
        <url>组织页面的url</url>
    </organazation>
    ```

  - `developers`：开发者列表

    ```xml
    <developers>
        <developer>
            <id>开发者id</id>
            <name>姓名</name>
            <email>邮箱</email>
            <url>开发者主页的url</url>
            <organazation>所属组织</organazation>
            <organizationUrl>所属组织主页url</organizationUrl>
            <roles>
                <role>角色信息</role>
            </roles>
            <properties>
                开发者属性：如何处理即时消息
            </properties>
        </developer>
    </developers>
    ```

  - `contributors`：贡献者列表，类似与开发者列表

  {% endfolding %}

- 运维配置

  - `repositories`：镜像仓库列表

    ```xml
    <repositories>
        <repository>
            <id>远程仓库的标识符</id>
            <name>远程仓库的名称</name>
            <url>远程仓库的url</url>
        </repository>
    </repositories>
    ```

  - `pluginRepositories`：插件仓库镜像列表，类似于`repositories`

  {% folding  cyan, 一般项目中很少使用这些配置，如果现在不想了解可以跳过 %}

  - `issueManagement`：定义缺陷跟踪系统

    ```xml
    <issueManagement>
        <system>系统名字</system>
        <url>缺陷管理系统的url</url>
    </issueManagement>
    ```

  - `ciManagement`：持续集成管理系统

    ```xml
    <ciManagement>
        <system>系统名称</system>
        <url>持续集成系统的url</url>
        <notifiers>
            <!--配置触发器列表-->
            <notifier>
                <type>如何发送通知，例如：mail</type>
                <sendOnError>ture/false：错误时是否发送</sendOnError>
                <sendOnFailure>ture/false：失败时是否发送</sendOnFailure>
                <sendOnSuccess>ture/false：成功时是否发送</sendOnSuccess>
                <sendOnWarning>ture/false：警告时是否发送</sendOnWarning>
                <configuration>
                    <address>发送的地址</address>
                    ...
                </configuration>
            </notifier>
        </notifiers>
    </ciManagement>
    ```

  - `mailingLists`：邮件列表

    ```xml
    <mailingLists>
        <mailingList>
            <name>邮件名称</name>
            <subscribe>订阅邮件地址或链接</subscribe>
            <unsubscribe>取消订阅邮件或链接</unsubscribe>
            <post>要发送的邮件地址</post>
            <archive>查看旧的邮件的url</archive>
        </mailingList>
    </mailingLists>
    ```

  - `scm`：软件版本管理配置，详情请查看https://blog.csdn.net/fenglibing/article/details/16842645

  {% endfolding %}

- `profiles`：包含一组<profile>,每个<profile>可以定义不同的配置,包含的元素有:

  - `id`：配置文件的id,比如测试的可以叫test.

  - `build`：相关构建信息.

  - `modules`：模块信息.

  - `repositories`：远程仓库信息.

  - `pluginRepositories`：插件仓库信息.

  - `dependencies`：依赖信息.

  - `reporting`：报表信息.

  - `dependencyManagement`：依赖管理信息.

  - `distributeManagement`：分发管理

  - `activation`：activation是profile的关键,profile的强大之处是某些情况下才可以修改基本pom,这些情况通过activation指定

    ```xml
    <activation>
        <activeByDefault>true/false：是否默认激活</activeByDefault>
        <jdk>指定什么jdk版本激活该配置</jdk>
        <os>指定什么操作系统激活该配置</os>
        <property>
            <!--指定含有什么属性且属性值则激活该配置-->
            <name>属性名称</name>
            <value>属性值</value>
        </property>
        <file>
            <exists>文件</exists> <!--存在则激活-->
            <missing>文件</missing> <!--不存在则激活-->
        </file>
    </activation>
    ```

  ### maven配置文件

  可以在项目根目录下创建一个`.mvn`的文件夹，然后可以创建一些额外的配置文件。实际工作中很少用到，详情请查看[官网](https://maven.apache.org/configure.html)

