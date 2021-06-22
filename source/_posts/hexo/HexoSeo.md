---
title: 博客提交搜索引擎收录并进行seo优化
categories: 
	- hexo
tags:
	- hexo
thumbnail: https://cdn.jsdelivr.net/gh/TRHX/ImageHosting/ITRHX-PIC/thumbnail/hexo.png
references:
  - title: Hexo 博客提交百度、谷歌搜索引擎收录
    url: https://www.itrhx.com/2019/09/17/A48-submit-search-engine-inclusion/
---
让百度和谷歌的搜索引擎收录博客
<!-- more -->
## 前言
网站在没有提交搜索引擎收录之前，直接搜索你网站的内容是搜不到的，只有提交搜索引擎之后，搜索引擎才能收录你的站点，通过爬虫抓取你网站的东西，对于 hexo 博客来说，如果你是部署在 GitHub Pages，那么你是无法被百度收录的，因为 GitHub 禁止了百度爬虫，另外百度收录的所需的时间较长，大约半个月左右才会看到效果！
{% p blue, 我们可以输入 site:域名 来查看域名是否被搜索引擎收录 %}
## 1. 添加百度收录
### 1.1 注册网站
访问百度搜索资源平台官网，注册或者登陆百度账号，依次选择【用户中心】-【站点管理】，添加你的网站
{% image /image/hexo/baiduSearchAdd.png, alt="添加网站" %}
点击保存后会让你选择协议头（http 或者 https），如果选择 https，它会验证你的站点，大约能在一天之内完成。
{%p red, 注意：百度网站添加的域名要和_config.yml中的url相同 %}
{% image /image/hexo/baiduSearchUrl.png, alt="" %}
之后会让你验证网站所有权，提供三种验证方式：
- 文件验证：下载给定的文件，将其放到本地主题目录 source 文件夹，然后部署上去完成验证
- HTML 标签验证：一般是给一个 meta 标签，放到首页 <head> 与 </head> 标签之间即可完成验证
- CNAME 验证：个人觉得这种方法最简单，去域名 DNS 添加一个 CNAME 记录即可完成验证

{% image /image/hexo/baiduSearchcheck.png, alt="通过添加CNAME解析记录验证网站" %}
{% image /image/hexo/aliCname.png, alt="阿里云域名服务添加Cname解析" %}
### 1.2 提交百度搜索
百度提供了自动提交和手动提交两种方式，其中自动提交又分为主动推送、自动推送和 sitemap 三种方式，以下是官方给出的解释：

- 主动推送：最为快速的提交方式，推荐您将站点当天新产出链接立即通过此方式推送给百度，以保证新链接可以及时被百度收录
- 自动推送：是轻量级链接提交组件，将自动推送的 JS 代码放置在站点每一个页面源代码中，当页面被访问时，页面链接会自动推送给百度，有利于新页面更快被百度发现
- sitemap：您可以定期将网站链接放到sitemap中，然后将sitemap提交给百度。百度会周期性的抓取检查您提交的sitemap，对其中的链接进行处理，但收录速度慢于主动推送
- 手动提交：如果您不想通过程序提交，那么可以采用此种方式，手动将链接提交给百度

**四种提交方式对比：**

| 方式                     | 主动推送 | 自动推送 | Sitemap | 手动提交 |
| ------------------------ | -------- | -------- | ------- | -------- |
| 速度                     | 最快     | ——       | ——      | ——       |
| 开发成本                 | 高       | 低       | 中      | 不需开发 |
| 可提交量                 | 低       | 高       | 高      | 低       |
| 是否建议提交历史连接     | 否       | 是       | 是      | 是       |
| 和其他提交方法是否有冲突 | 无       | 无       | 无      | 无       |

**个人推荐同时使用主动推送和 sitemap 方式**，下面将逐一介绍这四种提交方式的具体实现方法

#### 1.2.1 主动推送
在博客根目录安装插件`npm install hexo-baidu-url-submit --save`，然后在根目录 _config.yml 文件里写入以下配置：
{% codeblock _config.yml lang:yaml %}
baidu_url_submit:
  count: 1               # 提交最新的多少个链接
  host: xxxxxxxxxxxxx    # 在百度站长平台中添加的域名
  token: your_token      # 密钥
  path: baidu_urls.txt   # 文本文档的地址， 新链接会保存在此文本文档里
{% endcodeblock %}
其中密钥可以在/资源提交/普通收录/API提交中中看到，接口调用地址最后面 token=xxxxx 即为你的密钥
{% image /image/hexo/baiduSearchToken.png, alt="百度主动推送的密钥" %}

最后添加新的deployer进行主动推送
{% codeblock _config.volantis.yml lang:yaml %}
deploy:
  - type: git
    repo: https://github.com/goylx/goylx.github.io.git
    branch: gh-pages
  - type: git
    repo: git@e.coding.net:oylx2021/blog/blog.git
    branch: gh-pages
  - type: git
    repo: https://gitee.com/oylxgl/blog.git
    branch: gh-pages
  - type: baidu_url_submitter                         # 这是新加的主动推送
{% endcodeblock %}
最后执行`npx hexo g -d`部署一遍即可实现主动推送，推送成功的标志是：在执行部署命令最后会显示类似如下代码:
```
https://www.guluo.icu/HexoSeo/
{"remain":2953,"success":47}
```
这表示有 47 个页面已经主动推送成功，remain 的意思是当天剩余的可推送 url 条数
#### 1.2.2 sitemap推送
首先需要安装生成站点地图的插件，`npm install hexo-generator-sitemap --save`、`npm install hexo-generator-baidu-sitemap --save`。
然后使用命令 hexo g -d 将网站部署上去，然后访问 你的首页/sitemap.xml 或者 你的首页/baidusitemap.xml 就可以看到网站地图了
其中 sitemap.xml 文件是搜索引擎通用的 sitemap 文件，baidusitemap.xml 是百度专用的 sitemap 文件

然后来到百度站长平台的 sitemap 提交页面，将你的 sitemap 地址提交即可，如果成功的话状态会显示为正常，初次提交要等几分钟，sitemap.xml 相比 baidusitemap.xml 来说等待时间也会更长，如果以后你博客有新的文章或其他页面，可以点击手动更新文件，更新一下新的 sitemap
{% image /image/hexo/baiduSearchSitemap.png, alt="百度主动推送的密钥" %}
#### 1.2.3 手动推送
手动提交不需要其他额外操作，直接把需要收录的页面的 url 提交即可，这种方法效率较低，更新较慢，不推荐使用
## 2 提交谷歌收录
接下来我们将网站提交谷歌搜索引擎搜索，进入[谷歌站长平台](https://search.google.com/search-console)，登录你的谷歌账号之后会让你验证网站所有权:
{% image /image/hexo/googleSearchAdd.png, alt="google搜索添加网站资源" %}
有两种验证方式，分别是网域和网址前缀，选择网域资源验证方式比较好，只需要一个域名就可以匹配到多种格式的 URL，之后会给你一个 TXT 的记录值，复制它到你域名 DNS 增加一个 TXT 记录，点击验证即可。
## 3 seo优化
{% codeblock _config.volantis.yml lang:yaml %}
seo:
  # When there are no keywords in the article's front-matter, use tags as keywords.
  use_tags_as_keywords: true
  # When there is no description in the article's front-matter, use excerpt as the description.
  use_excerpt_as_description: true
  robots:
    home_first_page: index,follow
    home_other_pages: noindex,follow
    archive: noindex,follow
    category: noindex,follow
    tag: noindex,follow
    # robots can be written in front-matter                     # 这是新加的主动推送
{% endcodeblock %}