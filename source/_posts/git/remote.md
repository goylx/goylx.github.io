---
author: 欧阳罗霄
title:  远程团队协作和管理
categories: 
	- git
tags:
	- git
references:
  - title: 《Git Pro2中文Gitbook》
    url: https://bingohuang.gitbooks.io/progit2/content/01-introduction/sections/about-version-control.html
  - title: 高质量的 Git 中文教程
    url : https://github.com/geeeeeeeeek/git-recipes
---

使用git、github进行文件版本分布式管理，从而更好地实现团队合作开发、测试及维护
<!-- more -->
{% note blue, 这里默认你对git本地操作已经很熟练了，能够使用add、commit、branch等命令在本地进行版本控制，如果还不够了解请移步:[搭建本地仓库](/git/local) %}

Git 给予每个开发者一份自己的仓库拷贝，拥有自己完整的本地历史和分支结构。用户通常共享一系列的提交而不是单个变更集合。Git 允许你在仓库间共享整个分支，而不是从工作副本提交一个差异集合到中央仓库。

## 添加远程仓库

首先使用`git init --bare <repo>`创建一个作为中央仓库的裸仓库，然后使用`git remote`命令查看和管理自己的远程仓库链接。远程连接更像是书签，而不是直接跳转到其他仓库的链接。它用方便记住的别名引用不那么方便记住的 URL，而不是提供其他仓库的实时连接。

- 添加远程仓库

  ```bash
  git remote add <name> <url>
  ```

- 查看连接的远程仓库

  ```bash
  git remote -v				# 列出你和其他仓库之间的远程连接，同时显示仓库的url
  ```

- 删除远程连接

  ```bash
  git remote rm <name>
  ```

- 重命名远程连接

  ```bash
  git remote rename <old-name> <new-name>
  ```

### 协议

在上面添加远程仓库时需要指定仓库的url，而不同类型的url使用了不同的协议。

- 本地协议：远程仓库就是同一主机的另一个目录，url可以是绝对路径，或者使用文件传输协议file:///路径
- https协议：使用https://指定远程仓库地址
- ssh协议：ssh://user@server指定远程仓库地址
- git协议：

示例：将本地的新建的裸仓库添加为远程仓库

```bash
$ git init --bare git_learing_remote
$ git remote add local file:///home/oylx/Desktop/git_learing.git/
$ git remote -v
local	file:///home/oylx/Desktop/git_learing.git/ (fetch)
local	file:///home/oylx/Desktop/git_learing.git/ (push)
```

###  推送本地分支到远程仓库

`git push`命令会将本地分支推送到远程仓库：

```bash
git push <remote> <branch>
```

将当前分支推送到 `<remote>` 上，包括所有需要的提交对象推送到远程仓库并合并到`<branch>`分支上，如果没有该分支它会在远程仓库中创建一个本地分支`<branch>`。为了防止你覆盖已有的提交，如果会导致目标仓库`no-fast-foward`合并时即远程仓库`<remote>`上的分支`<branch>`上存在本地分支没有的提交对象，Git 不允许你 push。

**常用选项**

| 选项                               | 描述                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| `--set-upstream` <remote> <branch> | 指定当前分支在远程仓库的上流分支，指定后可以直接使用`git push`提交到上流分支 |
| `--force`                          | 强制推送，即使存在`no-fast-foward`合并依然推送{% span red, 一般情况下不要使用这个选项 %} |
| `--all`                            | 将所有本地分支推送到指定的远程仓库                           |
| `--tags`                           | 推送默认不会推送标签，这个选项将会推送标签                   |

{% note blue, 在推送之后会在本地建立一个本地远程分支，可以使用命令`git branch -r`查看本地远程分支或者使用命令`git branch -a`查看全部分支 %}

### 拉取远程仓库更新到本地

当前仓库第一次拉取时需要指定上流仓库，拉取后只会存放在本地的远程分支上

```bash
$ git fetch --set-upstream  <远程连接的name> <源分支>
```

将本地远程分支合并到本地分支

```bash
$ git merge local/main
```

如果之前做过`git push `或者`git fetcch`后续的拉取就不用重新指定上流仓库

#### git pull

可以使用更简单的方式实现上述命令，拉取远程分支并合并到本地分支

```bash
$ git pull [--set-upstream  <远程连接的name> <源分支>]
```

你可以指定`--rebase`选项在no-fast-foward合并时保持线性历史

## GitHub

GitHub 是最大的 Git 版本库托管商，是成千上万的开发者和项目能够合作进行的中心。 大部分 Git 版本库都托管在 GitHub，很多开源项目使用 GitHub 实现 Git 托管、问题追踪、代码审查以及其它事情。访问https://github.com使用一个未被使用的用户名、邮箱注册一个账号，即可开始使用github托管我们的git项目。

### 创建一个仓库

在github上登录之后在左上角点击new创建一个新仓库，填写你仓库的名字、描述，选择初始的文件。

{% image /image/Devops/git/github_new.png, alt=github创建仓库  %}

