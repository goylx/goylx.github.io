---
author: 欧阳罗霄
title:  使用Github Pages 和Hexo搭建自己的独立博客
categories: 
	- hexo
tags:
	- hexo
---

## 前言

{% note message blue,  首先感谢你阅读我的博客：[OYLX'S BLOG](https://oylx-maker.github.io/Blog/) %}

这是一篇有关如何使用[Hexo](https://hexo.io/zh-cn/)搭建博客，并通过[Github Pages](https://pages.github.com/)服务部署上线，本人是软件工程专业本科生，目前大三下册在企业顶岗实习，主要学习java后端技术了解部分前端知识，这是搭建好博客后写得第一篇博客。借这个机会记录一下搭建博客的整体流程，希望能够帮助你更快搭建好自己的独立博客。

## 基本概述

{% note link green, [Github Pages](https://pages.github.com/) %}

Github Pages是github提供的静态网站托管服务，使用Github Pages可以为你提供一个免费的服务器以及一个绑定的域名，通过该域名可以直接访问托管的静态网页。

{% note link green, [Hexo](https://hexo.io/zh-cn/)  %}

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

## 环境准备

### Node.js

Node.js版本需不低于10.13，建议使用Node.js12.0及以上版本，可以通过`node -v`查看当前系统Node版本。

{% folding green, 安装Node.js %}

[node下载地址](https://nodejs.org/zh-cn/download/)

{% tabs tab-id %}

<!-- tab windows -->

按需下载相应版本，如果选择.msi(安装程序)则默认安装即可，如果选择.zip则需要[配置系统变量](https://m.html.cn/qa/node-js/11835.html)。

<!-- endtab -->

<!-- tab linux -->

{% folding cyan open, 官网下载.tar.gz二进制包 %}

按需下载相应版本

```bash
# tar xzvf  node-v10.9.0-linux-x64.tar.xz			// 解压
# cd node-v10.9.0-linux-x64/						// 进入解压目录
# ./bin/node -v										// 查看版本
# sudo mv node-v10.9.0-linus-x64 /usr/local/nodejs	// 移动到/usr/local
v10.9.0
```

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：

```bash
ln -s /usr/local/nodejs/bin/npm   /usr/local/bin/ 
ln -s /usr/local/nodejs/bin/node   /usr/local/bin/
```

{% endfolding %}

{% folding cyan , Ubuntu apt-get命令安装 %}

命令格式如下：

```bash
sudo apt-get install nodejs				// 安装nodejs
sudo apt-get install npm				// 安装npm
node -v									// 查看node版本
```

{% endfolding %}

<!-- endtab -->

{% endtabs %}

{% endfolding %}

{% folding cyan open, 升级nodejs版本 %}

```bash
npm -v											// 查看npm版本
sudo npm install -g npm@7.7.6					// 升级npm版本
sudo npm install -g n							// 安装n模块
n latest	// 安装最新版node		n stable	//安装最新稳定版	
```

{% note, 如果是使用从官网下载的二进制包安装的node也可以直接删除目录，重新在官网下载新版本。 如果是windows安装程序安装可以直接从卸载程序卸载并重新安装%}

```bash
sudo apt-get remove nodejs					// 卸载nodejs
sudo apt-get remove npm						// 卸载npm
然后重新从官网下载.tar.gz安装
# 自动升级版本（不一定最新）
sudo apt-get update
sudo apt-get upgrade
```

{% endfolding %}

### Git

通过`git --version`命令查看git版本确定是否安装git，建议使用最新版本的git否则下面git命令可能会出错。

- Windows：下载并安装 [git](https://git-scm.com/download/win).
- Mac：使用 [Homebrew](http://mxcl.github.com/homebrew/), [MacPorts](http://www.macports.org/) 或者下载 [安装程序](http://sourceforge.net/projects/git-osx-installer/)。
- Linux (Ubuntu, Debian)：`sudo apt-get install git-core`
- Linux (Fedora, Red Hat, CentOS)：`sudo yum install git-core`

## 安装Hexo

新建一个文件夹放置博客相关文件，然后在这个文件夹下打开命令行工具，windows用户可以在该文件夹下右键鼠标，点击{% span red, Git Bash Here %}，输入以下 npm 命令即可安装：

```bash
npm install -g hexo-cli					// 全局安装hexo
# 如果熟悉npm的用户可以仅在局部安装hexo	  // npm install hexo
```

{% note, npm默认从外网下载数据，国内可能速度较慢可以使用如下方式提高速度 %}

{% folding cyan , 加快npm install速度 %}

```bash
# 更换下载的镜像源
npm --registry https://registry.npm.taobao.org install 模块 //临时更换，每次执行install都需要指定镜像源
npm config set registry https://registry.npm.taobao.org //持久更换镜像源
# 配置后可通过下面方式来验证是否成功
# npm config get registry，使用npm config set registry https://registry.npmjs.org可以恢复原来的设置


# 使用cnpm下载，所有使用npm执行的install命令用cnpm替换，例如cnpm installl hexo
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

{% endfolding %}

安装完成后如果是全局安装则可以在任何位置使用`npx hexo <command>`，局部安装则只能在安装目录下使用`npx hexo <command>`。如果希望可以直接使用`hexo <command>`则需要将Hexo所在目录下的 `node_modules` 添加到环境变量之中。

```bash
# linux系统下可以在Hexo安装目录使用如下命令（局部安装，全局安装不用配置）
echo 'PATH="$PATH:./node_modules/.bin"' >> ~/.profile
# windows系统会将Hexo默认安装在C:\Users\你的电脑名称\AppData\Roaming\npm\node_modules\ 
只需要将C:\Users\你的电脑名称\AppData\Roaming\npm\node_modules\.bin配置到系统变量path即可
```

## 初始化博客

执行`npx hexo init blog`命令可以在当前路径下生成一个blog的文件夹安装初始化的hexo博客，`ubutun`系统上出现以下效果表示初始化成功。

![](/home/oylx/Desktop/CDN/hexo/init.jpg)

{% note gray, 上述命令需要从github（外网）上获取数据（`git clone`），可能会由于网络问题导致初始化失败，可以手动进行初始化 %}

{% folding cyan , 手动初始化hexo %}

```bash
git clone https://gitee.com/sczzoylx/hexo-starter.git					// 从我的站点克隆一份博客
cd hexo-starter							// 进入克隆出来的文件夹
npm install --save						// 安装依赖
npx hexo server 						// 启动服务
```

{% endfolding %}

如果执行`npx hexo init`则会在当前目录下生成初始化的博客。Hexo 安装完成后，将会在指定文件夹中新建所需要的文件，Hexo 文件夹下的目录如下：

![](/home/oylx/Desktop/CDN/hexo/initfolder.jpg)

执行以下命令，执行完即可使用浏览器打开 http://localhost:4000/ 查看效果

```
$ hexo server
```

{% note blue, 显示以下信息说明操作成功 %}

```tex
INFO Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.
```

浏览器打开 http://localhost:4000/ 查看效果：

![](/home/oylx/Desktop/CDN/hexo/initLocal.jpg)

## Github Pages

这里我们将会使用 [Travis CI](https://travis-ci.com/) 将 Hexo 博客部署到 GitHub Pages 上。Travis CI 对于开源 repository 是免费的，但是这意味着你希望分享你的博客配置。如果你仅希望使用github托管静态网站，可以跳过本节前往。

一、注册Github账号：[点击此处](https://github.com/)访问 Github 官网，点击 Sign Up 注册账户

二、创建项目代码库：点击 New repository 开始创建，步骤及注意事项见图。

![](/home/oylx/Desktop/CDN/hexo/repo.png)

如果你希望你的博客能通过 `<你的 GitHub 用户名>.github.io` 域名访问，你的 repository 应该直接命名为 `<你的 GitHub 用户名>.github.io`否则需要通过 `<你的 GitHub 用户名>.github.io/<仓库名>` 访问。

三、将本地的 Hexo 博客文件夹推送到 repository 中。默认情况下不应该 `public` 目录将不会被推送到 repository 中，你应该检查 `.gitignore` 文件中是否包含 `public` 一行，如果没有请加上。

> 注意`.gitignore`文件为隐藏文件，建议使用vscode打开`npx hexo init `生成的文件夹编辑

![](/home/oylx/Desktop/CDN/hexo/repo1.png)

在本地的博客文件夹下面打开命令行，依次执行以下命令即可完成推送：

```bash
git init   // 初始化版本库

git add .   // 添加文件到版本库（只是添加到缓存区），.代表添加文件夹下所有文件 

git commit -m "first commit" // 把添加的文件提交到版本库，并填写提交备注

git remote add origin 你的远程库地址  // 把本地库与远程库关联

git push -u origin main    // 第一次推送时

# git push origin main  // 第一次推送后，直接使用该命令即可推送修改
```

