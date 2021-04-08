---
title: 博客优化及主题配置
categories: 
	- hexo
tags:
	- hexo
	- volantis
thumbnail: https://cdn.jsdelivr.net/gh/TRHX/ImageHosting/ITRHX-PIC/thumbnail/hexo.png
---

## 前言
这篇文章主要介绍Hexo的基本使用以及一些优化配置，如果还没有搭建起博客并托管至Github Pages请点[这里]()
本文基于volantis主题，部分配置可能不同请查看相应主题的官方文档自行配置。
### 1.基础配置
1. 网站信息
    {% codeblock _config.yml lang:yaml %}
        title:              # 网站标题
        subtitle: ''        # 副标题
        description: ''     # 描述信息
        keywords:           # 关键字
        author:             # 作者
        language: zh        # 语言
    {% endcodeblock %}
2. 网址信息
    {% codeblock _config.yml lang:yaml %}
        url                 # 网址根路径
        permalink: :title/  # 文章生成的永久链接格式
    {% endcodeblock %} 
### 2.配置主题
[volantis官方文档](https://volantis.js.org/v5/getting-started/)
1. 修改配置文件
   在hexo的配置文件_config.yml中找到theme属性并修改。
    {% codeblock _config.yml  lang:yaml %}theme: volantis{% endcodeblock %}
2. 下载主题
    在终端中输入：`npm i hexo-theme-volantis`
3. 创建主题配置文件
    在根目录下创建文件`_config.volantis.yml`,volantis主题相关配置写在该文件内。
    {% note, PS: 基于hexo5的新特性 %}
主题有关的样式配置请查看主题的官方文档进行配置，本文只对部分内容进行介绍。volantis官方文档[传送门](https://volantis.js.org/v5/theme-settings/)
### 3.页面配置
#### 3.1归档页面
hexo默认会根据`/source/_posts`下的文件生成归档页面，默认存放在`archives`目录，可以在`_config.yml`文件中修改
#### 3.2关于页面
创建一个介绍的独立页面，创建`/source/about/index.md`或者直接使用命令`hexo hexo new about`。
{% codeblock source/about/index.md lang:md %}
  ---
  layout: docs            # 页面布局
  seo_title: 关于
  bottom_meta: false
  sidebar: []             # 侧边栏要显示的部件
  valine:
    placeholder:        # 评论系统的占位字符
  ---
    下面写关于自己的内容
{% endcodeblock %}
#### 3.3分类页面
创建一个文章分类的独立页面，会读取文章的[front-matter](https://volantis.js.org/v5/page-settings/#front-matter)中的category的内容自动生成分类页面。创建`/source/categories/index.md`或者直接使用命令`npx hexo new categories`
{% codeblock source/categories/index.md lang:md %}
    ---
    layout: category
    index: true
    title: 所有分类
    ---
{% endcodeblock %}
#### 3.4标签页面
创建一个存放所有文章标签的独立页面，会读取会读取文章的[front-matter](https://volantis.js.org/v5/page-settings/#front-matter)中的tag的内容自动生成标签页面。创建`/source/tags/index.md`或者直接使用命令`npx hexo new tags`
{% codeblock source/tags/index.md lang:md %}
    ---
    layout: tag
    index: true
    title: 所有标签
    ---
{% endcodeblock %}
#### 3.5友链页面
##### 3.5.1创建页面
创建一个存放所有推荐网站链接的独立页面,创建`/source/friends/index.md`或者直接使用命令`npx hexo new friends`
{% codeblock source/friends/index.md lang:md %}
    ---
    layout: friends # 必须
    title: 我的朋友们 # 可选，这是友链页的标题
    ---
    这里写友链上方的内容。
    <!-- more -->
    这里可以写友链页面下方的文字备注，例如自己的友链规范、示例等。
{% endcodeblock %}
##### 3.5.2选择布局方案
在主题配置文件中配置`pages.friends.layout_scheme`属性
{% codeblock _config.volantis.yml lang:yaml %}
    pages:
        # 友链页面配置
        friends:
        layout_scheme: traditional # simple: 简单布局, traditional: 传统布局,  sites: 网站卡片布局
{% endcodeblock %}
##### 3.5.3设置数据源
{% tabs blog %}
<!-- tab 静态数据源 -->
新建文件`/source/_data/friends.yml`，内容格式如下：
{% codeblock /source/_data/friends.yml lang:yaml %}
   - group: # 分组标题
     description:  # 分组描述
     items:
      - title: # 名称
        avatar: # 头像
        url: # 链接
        screenshot: # 截图
        keywords: # 关键词
        description: # 描述
      - title: # 名称
        avatar: # 头像
        url: # 链接
        screenshot: # 截图
        keywords: # 关键词
        description: # 描述
{% endcodeblock %}
<!-- endtab -->
<!-- tab 动态数据源 -->
后期补充
<!-- endtab -->
{% endtabs %}
#### 3.6 404页面
创建一个在路径出错时显示的独立页面，创建`/source/404.md`
{% codeblock source/404.md lang:md %}
  ---
  cover: true
  robots: noindex,nofollow
  sitemap: false
  seo_title: 404 Not Found
  bottom_meta: false
  sidebar: []
  valine:
    path: /404.html
    placeholder: 请留言告诉我您要访问哪个页面找不到了
  ---
    输出的内容
{% endcodeblock %}
可以自定义更多独立页面，满足更多个性化需求。在source目录下新建文件夹，并新建`/source/example/index.md`就可以自定义独立页面。
### 4常用的功能插件
本文介绍一些常用插件的安装及配置，详情请查看[主题官网](https://volantis.js.org/v5/theme-settings/#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6)
#### 4.1字数和阅读时间统计
终端输入命令`npm install hexo-wordcount --save`安装插件，在主题配置文件中配置文章布局。
{% codeblock _config.volantis.yml lang:yaml %}
article:
    top_meta: [···,wordcount] # 文章头部显示的元信息
    meta_library: # 元信息库
      ···
      wordcount:
        icon_wordcount: fas fa-keyboard
        icon_duration: fas fa-hourglass-half
{% endcodeblock %}
在主题配置文件中开启字数统计插件
{% codeblock _config.volantis.yml lang:yaml %}
plugins:
    ···
    wordcount
        enable: true
{% endcodeblock %}
#### 4.2站内搜索功能
默认配置为 Hexo 搜索，但是需要安装插件才能使用：`npm i -S hexo-generator-search hexo-generator-json-content`
{% codeblock _config.volantis.yml lang:yaml %}
search:
  enable: true
  service: hexo  # hexo, google, algolia, azure, baidu
  js: https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@2.6.4/js/search.js
{% endcodeblock %}
#### 4.3相关文章功能
安装插件：`npm i -S hexo-related-popular-posts`，如果您使用了头图，可以在站点配置文件中添加以下设置来让相关文章显示正确的文章头图：
{% codeblock _config.yml lang:yaml %}
popularPosts:
  eyeCatchImageAttributeName: headimg
{% endcodeblock %}
更多自定义配置请查看官方文档
{% link hexo-related-popular-posts, https://github.com/tea3/hexo-related-popular-posts, https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets@master/logo/256/safari.png %}
{% p center logo large red, 未完待续 %}
### 5.统计分析网站访问量
#### 5.1 百度统计
百度统计主要用于分析网站数据：流量、访客量等。
1. 注册百度统计账号，官网链接：https://tongji.baidu.com
2. 点击`管理>新增网站`，填写数据后点击确定
3. 复制代码并在配置文件中引入代码
{% codeblock _config.yml lang:yaml%}
import:
  script:
    - <script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxx";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();</script> #从图二复制的代码
{% endcodeblock %}

