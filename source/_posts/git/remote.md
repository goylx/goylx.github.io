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
$ git push <remote> <branch>
```

将当前分支推送到 `<remote>` 上，包括所有需要的提交对象推送到远程仓库并合并到`<branch>`分支上，如果没有该分支它会在远程仓库中创建一个本地分支`<branch>`。为了防止你覆盖已有的提交，如果会导致目标仓库`no-fast-foward`合并时即远程仓库`<remote>`上的分支`<branch>`上存在本地分支没有的提交对象，Git 不允许你 push。

**常用选项**

| 选项                                     | 描述                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--set-upstream或者-u` <remote> <branch> | 指定当前分支在远程仓库的上流分支，指定后可以直接使用`git push`提交到上流分支             |
| `--force`                                | 强制推送，即使存在`no-fast-foward`合并依然推送{% span red, 一般情况下不要使用这个选项 %} |
| `--all`                                  | 将所有本地分支推送到指定的远程仓库                                                       |
| `--tags`                                 | 推送默认不会推送标签，这个选项将会推送标签                                               |

### 拉取远程仓库更新到本地

当前仓库第一次拉取时需要指定上流仓库，拉取后只会存放在本地的远程分支上

```bash
$ git fetch <remote> [<branch>]			#如果不指定分支则会拉取全部分支
```

将本地远程分支合并到本地分支

```bash
$ git switch main
$ git merge local/main 或者 git rebase local/main
# 切换到main分支，并让main分支合并local/main分支
```

#### git pull

可以使用更简单的方式实现上述命令，拉取远程分支并合并到本地分支

```bash
$ git pull <remote> <branch>		#如果不指定分支则会拉取全部分支，如果没有指定本地分支的上流分支会默认根据分支名进行合并
# 上述命令等价于 git fetch <remote> + git merge <remote/branch>
```

| 选项                               | 描述                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `--set-upstream` <remote> <branch> | 指定当前分支在远程仓库的上流分支，指定后可以直接使用`git pull`拉取上流分支并合并到当前分支 |
| `--all`                            | 拉取指定仓库的全部分支                                                                     |
| `--tags`                           | 默认不会拉取标签，这个选项将会拉取标签                                                     |
| `--rebase`                         | 拉取后使用`git rebase`命令合并分支，从而保持线性历史                                       |

{%note blue, 使用`git config --global pull.rebase true`可以指定pull时默认使用rebase进行合并 %}

### 远程仓库分支管理

- 查看本地远程分支：`git branch -r`、查看全部分支：`git branch -a`
- 查看本地分支和远程分支的对应关系：`git branch -vv`
- 设置分支的上流分支：`git branch --set-upstream-to=<remote>/<branch> <branch>`

{%note blue, 注意：可以使用`git push -u`、`git pull --set-upstream`、`git branch --set-upstream-to=`设置上流分支，只要设置成功pull或push时则默认推送、拉取合并上流分支 ，但是使用push、branch命令指定上流分支时需要先将远程分支拉取到本地远程分支。使用`git fetch <remote> <branch>`或`git pull <remote> <branch>`命令可以拉取远程分支到本地远程分支 %}

## 克隆

在实际工作中很少会使用上面的方式使用远程仓库，更多情况下使用克隆远程仓库到本地的方式，克隆命令会拉取目标仓库的全部分支到本地并创建默认名为origin的远程仓库名，然后根据本地远程分支（一般是origin/main）创建一个默认的本地分支main并将本地分支main的上流分支设置为origin/main,仓库克隆完成并在本地做出一些提交后可以直接执行`git push`命令不指定仓库和分支推送到远程仓库的main分支下，使用命令`git clone <url> [<文件夹>]`

```bash
$ git clone file:///home/oylx/Desktop/git_learing.git/ git_learing2
正克隆到 'git_learing2'...
remote: 枚举对象中: 13, 完成.
remote: 对象计数中: 100% (13/13), 完成.
remote: 压缩对象中: 100% (8/8), 完成.
remote: 总共 13（差异 2），复用 0（差异 0），包复用 0
接收对象中: 100% (13/13), 完成.
处理 delta 中: 100% (2/2), 完成.
$ cd git_learing2/
$ git branch -avv
* main                  845451d [origin/main] add style.css
  remotes/origin/HEAD   -> origin/main
  remotes/origin/issue  f06ef5d add index.java
  remotes/origin/main   845451d add style.css
  remotes/origin/master ee1b364 Merge remote-tracking branch 'local/master'
# 默认只会创建一个优先级较高的远程分支的下流分支到本地
```

使用`-b`选项可以指定需要创建的本地分支：

```bash
$ git clone -b issue file:///home/oylx/Desktop/git_learing.git/ git_learing3
正克隆到 'git_learing3'...
remote: 枚举对象中: 13, 完成.
remote: 对象计数中: 100% (13/13), 完成.
remote: 压缩对象中: 100% (8/8), 完成.
remote: 总共 13（差异 2），复用 0（差异 0），包复用 0
接收对象中: 100% (13/13), 完成.
处理 delta 中: 100% (2/2), 完成.
$ cd git_learing3
$ git branch -avv
* issue                 f06ef5d [origin/issue] add index.java
  remotes/origin/HEAD   -> origin/main
  remotes/origin/issue  f06ef5d add index.java
  remotes/origin/main   845451d add style.css
  remotes/origin/master ee1b364 Merge remote-tracking branch 'local/master'
```

## GitHub

GitHub 是最大的 Git 版本库托管商，是成千上万的开发者和项目能够合作进行的中心。 大部分 Git 版本库都托管在 GitHub，很多开源项目使用 GitHub 实现 Git 托管、问题追踪、代码审查以及其它事情。访问https://github.com使用一个未被使用的用户名、邮箱注册一个账号，即可开始使用github托管我们的git项目。

### 创建一个仓库

在github上登录之后在左上角点击new创建一个新仓库，填写你仓库的名字、描述，选择初始的文件。
{% image /image/Devops/git/github_new.png, alt=github创建仓库  %}

### 从github上克隆一个仓库
新建仓库后复制仓库的地址，使用`git clone`命令克隆到本地。
{% image /image/Devops/git/githubClone.png, alt=github克隆仓库  %}
```bash
$ git clone https://github.com/goylx/git_learing.git
正克隆到 'git_learing'...
warning: 您似乎克隆了一个空仓库。
$ cd git_learing/
$ echo 学习使用github > README.md
$ git add .
$ git commit -m '初始化提交'
[master（根提交） f8de975] 初始化提交
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
$ git branch -avv
* master f8de975 [origin/master: 丢失] 初始化提交
$ git push
```
{% note blue, 如果你第一次使用github可能需要你输入github的账号和密码，之后每一次pull、push都需要进行身份验证十分麻烦，可以再第一次提交使用命令`git config --global credential.helper store`指定git存储自己的账号密码，这样只需要输入一次账号密码即可 %}
{% image /image/Devops/git/githubFirstCommit.png, alt=初始化提交后的结果 %}