---
author: 欧阳罗霄
title:  使用Github Pages 和Hexo搭建自己的独立博客
categories: 
	- hexo
tags:
	- hexo
thumbnail: https://cdn.jsdelivr.net/gh/TRHX/ImageHosting/ITRHX-PIC/thumbnail/hexo.png
# headimg: https://cdn.jsdelivr.net/gh/TRHX/ImageHosting/ITRHX-PIC/A02/01.png
references:
  - title: 使用Github Pages 和Hexo搭建自己的独立博客
    url: https://www.itrhx.com/2018/08/15/A02-hexo-blog/
---

## 前言

{% note message blue,  首先感谢你阅读我的博客：[OYLX'S BLOG](https://guluo.icu) %}

这是一篇有关如何使用[Hexo](https://hexo.io/zh-cn/)搭建博客，并通过[Github Pages](https://pages.github.com/)服务部署上线的详细教程。本人是软件工程专业本科生，目前大三下学期在企业顶岗实习，主要学习java后端技术以及部分前端知识，这是搭建好博客后写得第一篇博客。借这个机会记录一下搭建博客的整体流程，希望能够帮助你更快搭建好自己的独立博客。

## 基本概述

{% note link green, [Github Pages](https://pages.github.com/) %}

Github Pages是github提供的静态网站托管服务，使用Github Pages可以为你提供一个免费的服务器以及一个绑定的域名，通过该域名可以直接访问托管的静态网页。

{% note link green, [Hexo](https://hexo.io/zh-cn/)  %}

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，并根据指定的主题生成静态网页，在存储位置上可以有：`Github Page、OSS 对象存储、云主机`等多种选择。

## 环境准备

### Node.js

NodeJs是Hexo的运行时环境，版本需不低于10.13，建议使用Node.js12.0及以上版本，可以通过在命令行中键入`node -v`命令查看当前系统Node版本。

{% folding green, 安装Node.js %}

点击前往[node下载地址](https://nodejs.org/zh-cn/download/)

![](https://cdn.jsdelivr.net/gh/TRHX/ImageHosting/ITRHX-PIC/A02/02.jpg)

根据你的系统选择不同的安装方式

{% tabs tab-id %}

<!-- tab windows -->

按需下载相应版本，如果选择.msi(安装程序)则默认安装即可。如果选择.zip压缩包，解压后还需要[配置系统变量](https://m.html.cn/qa/node-js/11835.html)。

<!-- endtab -->

<!-- tab linux -->

{% folding cyan open, 官网下载.tar.gz二进制包 %}

按需下载相应版本，打开命令行输入下列命令可以安装node并查看版本

```bash
tar xzvf  node-v10.9.0-linux-x64.tar.xz				// 解压
cd node-v10.9.0-linux-x64/							// 进入解压目录
./bin/node -v										// 查看版本
sudo mv node-v10.9.0-linus-x64 /usr/local/nodejs	// 移动到/usr/local
```

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接使得可以在任何路径下执行node和npm命令：

```bash
ln -s /usr/local/nodejs/bin/npm   /usr/local/bin/ 
ln -s /usr/local/nodejs/bin/node   /usr/local/bin/
```

{% endfolding %}

{% folding cyan , Ubuntu apt-get命令安装 %}

打开命令行执行下列命令：

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

打开命令行工具执行下列命令可以升级nodejs和npm的版本

```bash
npm -v											// 查看npm版本
sudo npm install -g npm@7.7.6					// 升级npm版本
sudo npm install -g n							// 安装n模块
n latest	// 安装最新版node		n stable	//安装最新稳定版	
```

{% note gray, 如果是使用从官网下载的二进制包安装的node也可以直接删除目录，重新在官网下载新版本。 如果是windows安装程序安装可以直接从卸载程序卸载并重新安装%}

{% folding gray , ubutun下使用apt升级nodejs版本 %}

```bash
sudo apt-get remove nodejs					// 卸载nodejs
sudo apt-get remove npm						// 卸载npm
然后重新从官网下载.tar.gz安装
# 自动升级版本（不一定最新）
sudo apt-get update
sudo apt-get upgrade
```

{% endfolding %}

{% endfolding %}

### Git

Git 是一个开源的分布式版本控制系统，用于将自己本地的项目和github仓库绑定，从而可以通过命令一键上传自己更新的文件，通过`git --version`命令查看git版本确定是否安装git。（windows用户可以点击鼠标右键，如果有`Git Bash Here`则已安装Bash）

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

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/init.jpg)

{% note gray, 上述命令需要从github（外网）上获取数据（`git clone`），可能会由于网络问题导致初始化失败，可以手动进行初始化 %}

{% folding cyan , 手动初始化hexo %}

```bash
git clone https://gitee.com/oylxgl/hexo-starter.git					// 从我的站点克隆一份博客
cd hexo-starter														// 进入克隆出来的文件夹
npm install --save													// 安装依赖
npx hexo server 													// 启动服务
```

{% endfolding %}

如果执行`npx hexo init`则会在当前目录下生成初始化的博客。Hexo 安装完成后，将会在指定文件夹中新建所需要的文件，Hexo 文件夹下的目录如下：

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/initfolder.jpg)

```
.
├── _config.yml            # 网站配置文件
├── .gitignore             # Git 忽略文件
├── node_modules           # 插件安装目录
├── package.json           # 描述插件
├── package-lock.json      # 描述插件 更详细
├── scaffolds              # 模板
├── source                 # 资源
└── themes                 # 主题
```

执行以下命令，执行完即可使用浏览器打开 http://localhost:4000/ 查看效果

```
npx hexo server									//启动服务
```

{% note blue, 显示以下信息说明操作成功 %}

```tex
INFO Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.
```

浏览器打开 http://localhost:4000/ 查看效果：

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/initLocal.jpg)

### Hexo的一些常用命令

```bash

```



## Github Pages

一、注册Github账号：[点击此处](https://github.com/)访问 Github 官网，点击 Sign Up 注册账户

二、创建项目代码库：点击 New repository 开始创建，步骤及注意事项见图。

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/repo.png)

如果你希望你的博客能通过 `<你的 GitHub 用户名>.github.io` 域名访问，你的 repository 应该直接命名为 `<你的 GitHub 用户名>.github.io`否则需要通过 `<你的 GitHub 用户名>.github.io/<仓库名>` 访问。

三、将本地的 Hexo 博客文件夹推送到 repository 中。默认情况下不应该 `public` 目录将不会被推送到 repository 中，你应该检查 `.gitignore` 文件中是否包含 `public` 一行，如果没有请加上。

> 注意`.gitignore`文件为隐藏文件，建议使用vscode打开`npx hexo init `生成的文件夹编辑

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/repo1.png)

在本地的博客文件夹下面打开命令行，依次执行以下命令即可完成推送：

```bash
git init -b main   // 初始化版本库

git add .   // 添加文件到版本库（只是添加到缓存区），.代表添加文件夹下所有文件 

git commit -m "first commit" // 把添加的文件提交到版本库，并填写提交备注

git remote add origin 上图获取远程仓库地址  // 把本地库与远程库关联
# 如果提示error: 远程 origin 已经存在，git remote rm origin

git pull origin main --allow-unrelated-histories 

git push -u origin main    // 第一次推送时

# git push origin main  // 第一次推送后，直接使用该命令即可推送修改
```

四、在github仓库页面点击setting，开启pages服务

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/pages.png)

五、使用`hexo-deployer-git`一键部署

1. 安装`hexo-deployer-git`

   ```bash
   npm install hexo-deployer-git --save
   ```

2. 编辑本地Hexo博客文件夹下的`_config.yml`，找到display属性如下修改：

   ```yaml
   deploy:
     type: 'git'
     repo: 
       github: github仓库的地址
     branch: main 							# 希望部署到的分支，即上图中选择的仓库托管分支
   ```

3. 执行命令`npx hexo deploy --generate`即可一键部署服务

然后可以在浏览器中访问上图中`Your site is published at`后面的域名即可看到你的独立博客。上述只会把生成的静态页面保存到github仓库中，如果你希望将源文件也由github存储，并且每次只需要将修改的源代码推送就可以自动部署，请添加travis服务。

{% folding cyan , 添加travis服务 %}

这里我们将会使用 [Travis CI](https://travis-ci.com/) 将 Hexo 博客部署到 GitHub Pages 上。Travis CI 对于开源 repository 是免费的，但是这意味着你希望分享你的博客配置。

四、添加Travis CI服务

**Travis：**

- Travis CI 提供的是持续集成服务。它绑定 GitHub 上的项目，只要有新代码更新，它就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，部署到服务器
- 持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期之后，再将新代码集成到主干
- 持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累计小的变更，而不是在开发周期结束时，一次合并很多代码
- Travis CI 只支持 GitHub，所以必须要有一个 Git 账号
- 该账号下面有一个项目，里面有可运行的代码，还包括构建或测试脚本
- 需要激活一个仓库，Travis 会监听这个仓库的所有变化

第一步，开启Travis监控仓库变更，即本地推送源码

打开 Travis 官网https://www.travis-ci.org/，使用github账号登陆。在左侧导航栏添加需要使用Travis CI服务的仓库。

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/travis.png)

添加成功后可以在左侧查看添加的仓库，并前往github配置travis权限。

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/travs1.png)

你应该会被重定向到 Travis CI 的页面。如果没有，请 [手动前往](https://travis-ci.com/)。

在浏览器新建一个标签页，前往 GitHub [新建 Personal Access Token](https://github.com/settings/tokens)，只勾选 `repo` 的权限并生成一个新的 Token。Token 生成后请复制并保存好。{% note red, 生成token后关闭页面则无法在查看，注意保存好token %}

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/token.png)

回到 Travis CI，在左侧导航栏点击仓库后在右侧选中`More options`然后打开settings，在 **Environment Variables** 下新建一个环境变量，**Name** 为 `GH_TOKEN`，**Value** 为刚才你在 GitHub 生成的 Token。确保 **DISPLAY VALUE IN BUILD LOG** 保持 **不被勾选** 避免你的 Token 泄漏。点击 **Add** 保存。

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/token1.png)

在本地 博客文件夹中新建一个 `.travis.yml` 文件：

```yaml
sudo: false
language: node_js
node_js:
  - 14 # use nodejs v10 LTS
cache: npm
branches:
  only:
    - main # build main branch only
script:
  - hexo generate # generate static files
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GH_TOKEN
  keep-history: true
  on:
    branch: main
  local-dir: public
```

将 `.travis.yml` 推送到 repository 中。Travis CI 应该会自动开始运行，并将生成的文件推送到同一 repository 下的 `gh-pages` 分支下

```bash
git add .
git commit -m '开启travis CI服务'
git push origin main
```

等待一段时间应该可以在github仓库下看到多出了一个命名为`gh-pages`的分支

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/ghpages.png)

第二步修改本地Hexo博客文件夹下的`_config.yml`文件的deploy属性：

```yaml
deploy:
  type: 'git'
  repo: 
    github: https://github.com/oylx-maker/oylx-maker.github.io.git
  branch: gh-pages    #使用一键部署到travis的分支
```

第三步修改Github pages监听的分支为`gh-pages`，在github仓库中点击settings找到Github Pages修改。

![](https://cdn.jsdelivr.net/gh/oylx-maker/CDN@0.2/hexo/pages1.png)

第四步修改本地文件后推送到main分支，等待一段时间后访问即可看到更改后的效果

```bash
git add .
git commit -m '注释信息'
git push origin main
```

{% endfolding %}

