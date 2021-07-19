---
author: 欧阳罗霄
title: settings.xml详解
categories: 
	- maven
tags:
	- maven
archive: false
references:
  - title: maven全局配置文件settings.xml详解
    url : https://www.cnblogs.com/jingmoxukong/p/6050172.html
notshow: true
---

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